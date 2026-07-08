<?php
// api/appointment.php

// Разрешаем запросы только с вашего домена
$allowed_origins = [
    'https://doctor-savelieva.ru',
    'https://www.doctor-savelieva.ru',
    'http://localhost:5173' // для локальной разработки
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
} else {
    http_response_code(403);
    exit('Forbidden');
}

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Принимаем только POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Метод не разрешён']);
    exit;
}

// Получаем данные
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Некорректные данные']);
    exit;
}

// Извлекаем и очищаем данные
$fullName = trim(strip_tags($input['fullName'] ?? ''));
$phone    = trim(strip_tags($input['phone'] ?? ''));
$email    = trim(strip_tags($input['email'] ?? ''));

// === ВАЛИДАЦИЯ НА СЕРВЕРЕ (обязательно!) ===
$errors = [];

if (mb_strlen($fullName) < 5) {
    $errors[] = 'Некорректное ФИО';
}
if (!preg_match('/^\+7\s?\(?[\d\s\-]{9,10}\)?$/', $phone)) {
    $errors[] = 'Некорректный телефон';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Некорректный email';
}

// Honeypot-защита от ботов
if (!empty($input['website'])) {
    http_response_code(200); // Притворяемся, что всё ок
    echo json_encode(['success' => true]);
    exit;
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

// === ФОРМИРУЕМ ПИСЬМО ===
$to = 'doctor@example.ru'; // ← ЗАМЕНИТЕ НА РЕАЛЬНЫЙ EMAIL ВРАЧА
$subject = '=?UTF-8?B?' . base64_encode('Новая заявка на консультацию') . '?=';

$message = "
<html>
<head>
  <meta charset='UTF-8'>
  <style>
    body { font-family: Arial, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; }
    .field { margin-bottom: 12px; }
    .label { font-weight: bold; color: #004887; }
  </style>
</head>
<body>
  <div class='container'>
    <h2>Новая заявка на онлайн-консультацию</h2>
    <div class='field'><span class='label'>ФИО:</span> " . htmlspecialchars($fullName) . "</div>
    <div class='field'><span class='label'>Телефон:</span> " . htmlspecialchars($phone) . "</div>
    <div class='field'><span class='label'>Email:</span> " . htmlspecialchars($email) . "</div>
    <div class='field'><span class='label'>Время заявки:</span> " . date('d.m.Y H:i') . "</div>
    <hr>
    <p><small>Заявка отправлена с сайта doctor-savelieva.ru</small></p>
  </div>
</body>
</html>
";

$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: =?UTF-8?B?' . base64_encode('Сайт доктора Савельевой') . '?= <noreply@doctor-savelieva.ru>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion()
];

$emailSent = mail($to, $subject, $message, implode("\r\n", $headers));

// === ОТПРАВКА В TELEGRAM (опционально) ===
$telegramSent = false;
$telegramToken = 'ВАШ_ТОКЕН_БОТА'; // ← ЗАМЕНИТЕ
$telegramChatId = 'ВАШ_CHAT_ID';   // ← ЗАМЕНИТЕ

$telegramText = "
🔔 <b>Новая заявка на консультацию</b>

👤 <b>ФИО:</b> " . htmlspecialchars($fullName) . "
📞 <b>Телефон:</b> " . htmlspecialchars($phone) . "
📧 <b>Email:</b> " . htmlspecialchars($email) . "
🕐 <b>Время:</b> " . date('d.m.Y H:i') . "
";

$telegramUrl = "https://api.telegram.org/bot$telegramToken/sendMessage";
$telegramData = [
    'chat_id' => $telegramChatId,
    'text' => $telegramText,
    'parse_mode' => 'HTML'
];

$ch = curl_init($telegramUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($telegramData));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 5);
$telegramResponse = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$telegramSent = ($httpCode === 200);

// === ОТВЕТ КЛИЕНТУ ===
if ($emailSent || $telegramSent) {
    echo json_encode([
        'success' => true,
        'message' => 'Заявка успешно отправлена'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Не удалось отправить заявку. Попробуйте позже.'
    ]);
}