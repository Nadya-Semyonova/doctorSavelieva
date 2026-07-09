<?php
/**
 * Обработчик формы записи на консультацию
 * 
 * @author Doctor Savelieva
 * @version 1.0
 */

declare(strict_types=1);

// === ЗАГРУЗКА .ENV ===
require_once __DIR__ . '/../src/EnvLoader.php';
EnvLoader::load(__DIR__ . '/../.env');

// === НАСТРОЙКИ ИЗ .ENV ===
$adminEmail = EnvLoader::get('ADMIN_EMAIL');
$telegramToken = EnvLoader::get('TELEGRAM_BOT_TOKEN');
$telegramChatId = EnvLoader::get('TELEGRAM_CHAT_ID');
$siteDomain = EnvLoader::get('SITE_DOMAIN', 'doctor-savelieva.ru');
$appEnv = EnvLoader::get('APP_ENV', 'production');
$logErrors = EnvLoader::get('LOG_ERRORS', 'true') === 'true';

// === ЛОГИРОВАНИЕ ===
function logMessage(string $message, string $level = 'INFO'): void
{
    global $logErrors, $appEnv;
    
    if (!$logErrors) {
        return;
    }
    
    $logDir = __DIR__ . '/../logs';
    if (!is_dir($logDir)) {
        mkdir($logDir, 0755, true);
    }
    
    $logFile = $logDir . '/appointments.log';
    $timestamp = date('Y-m-d H:i:s');
    $logMessage = "[{$timestamp}] [{$level}] {$message}" . PHP_EOL;
    
    file_put_contents($logFile, $logMessage, FILE_APPEND | LOCK_EX);
}

// === БЕЗОПАСНОСТЬ: Отключаем вывод ошибок в браузер ===
if ($appEnv === 'production') {
    error_reporting(0);
    ini_set('display_errors', '0');
} else {
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
}

// === CORS БЕЗОПАСНОСТЬ ===
$allowedOrigins = [
    "https://{$siteDomain}",
    "https://www.{$siteDomain}",
    'http://localhost:5173',
    'http://localhost:5174',
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: {$origin}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
}

// Обработка preflight запроса
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

header('Content-Type: application/json; charset=utf-8');

// === ПРОВЕРКА МЕТОДА ===
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    logMessage('Invalid request method: ' . $_SERVER['REQUEST_METHOD'], 'ERROR');
    echo json_encode([
        'success' => false,
        'message' => 'Метод не разрешён'
    ]);
    exit;
}

// === ПОЛУЧЕНИЕ JSON ===
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    logMessage('Invalid JSON: ' . json_last_error_msg(), 'ERROR');
    echo json_encode([
        'success' => false,
        'message' => 'Некорректные данные'
    ]);
    exit;
}

// === ОЧИСТКА И ВАЛИДАЦИЯ ДАННЫХ ===
function sanitizeInput(string $input): string
{
    return htmlspecialchars(strip_tags(trim($input)), ENT_QUOTES, 'UTF-8');
}

$fullName = sanitizeInput($input['fullName'] ?? '');
$phone = sanitizeInput($input['phone'] ?? '');
$email = filter_var(trim($input['email'] ?? ''), FILTER_SANITIZE_EMAIL);

// === ВАЛИДАЦИЯ ===
$errors = [];

// ФИО: минимум 5 символов, минимум 2 слова
if (mb_strlen($fullName) < 5) {
    $errors[] = 'Некорректное ФИО (минимум 5 символов)';
} elseif (count(preg_split('/\s+/', $fullName)) < 2) {
    $errors[] = 'ФИО должно содержать минимум 2 слова';
}

// Телефон: формат +7 (XXX) XXX-XX-XX
if (!preg_match('/^\+7\s?\(?[\d\s\-]{9,10}\)$/', $phone) && 
    !preg_match('/^\+7\d{10}$/', str_replace([' ', '(', ')', '-'], '', $phone))) {
    $errors[] = 'Некорректный телефон';
}

// Email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Некорректный email';
}

// Honeypot (защита от ботов)
if (!empty($input['website'])) {
    logMessage('Honeypot triggered - possible bot', 'WARNING');
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'OK']);
    exit;
}

// Rate limiting (простая защита от спама)
$sessionFile = sys_get_temp_dir() . '/appointment_' . md5($_SERVER['REMOTE_ADDR'] ?? '');
if (file_exists($sessionFile)) {
    $lastSubmit = (int)file_get_contents($sessionFile);
    if (time() - $lastSubmit < 60) { // Не чаще 1 раза в минуту
        logMessage('Rate limit exceeded for IP: ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'), 'WARNING');
        http_response_code(429);
        echo json_encode([
            'success' => false,
            'message' => 'Пожалуйста, подождите 1 минуту перед следующей отправкой'
        ]);
        exit;
    }
}
file_put_contents($sessionFile, (string)time());

// Если есть ошибки валидации
if (!empty($errors)) {
    http_response_code(400);
    logMessage('Validation errors: ' . implode(', ', $errors), 'WARNING');
    echo json_encode([
        'success' => false,
        'errors' => $errors
    ]);
    exit;
}

// === ФОРМИРОВАНИЕ ПИСЬМА ===
$to = $adminEmail;
$subject = '=?UTF-8?B?' . base64_encode('🔔 Новая заявка на консультацию') . '?=';

$messageHTML = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #004887; color: white; padding: 20px; text-align: center; }
        .field { margin: 15px 0; padding: 10px; background: #f8f9fa; border-left: 4px solid #004887; }
        .label { font-weight: bold; color: #004887; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>Новая заявка на консультацию</h2>
        </div>
        <div class='field'>
            <span class='label'>👤 ФИО:</span><br>
            {$fullName}
        </div>
        <div class='field'>
            <span class='label'>📞 Телефон:</span><br>
            {$phone}
        </div>
        <div class='field'>
            <span class='label'>📧 Email:</span><br>
            {$email}
        </div>
        <div class='field'>
            <span class='label'>🕐 Время заявки:</span><br>
            " . date('d.m.Y H:i:s') . "
        </div>
        <div class='field'>
            <span class='label'>🌐 Сайт:</span><br>
            {$siteDomain}
        </div>
        <div class='footer'>
            <p>Это письмо отправлено автоматически. Не отвечайте на него.</p>
        </div>
    </div>
</body>
</html>
";

$messagePlain = "
Новая заявка на консультацию

ФИО: {$fullName}
Телефон: {$phone}
Email: {$email}
Время: " . date('d.m.Y H:i:s') . "
Сайт: {$siteDomain}
";

$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: =?UTF-8?B?' . base64_encode('Сайт доктора Савельевой') . "?= <noreply@{$siteDomain}>",
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'X-Priority: 1'
];

// === ОТПРАВКА EMAIL ===
$emailSent = false;
try {
    $emailSent = mail($to, $subject, $messageHTML, implode("\r\n", $headers));
    if ($emailSent) {
        logMessage("Email sent to {$to} for {$fullName}");
    } else {
        logMessage("Failed to send email to {$to}", 'ERROR');
    }
} catch (Exception $e) {
    logMessage("Email exception: " . $e->getMessage(), 'ERROR');
}

// === ОТПРАВКА В TELEGRAM ===
$telegramSent = false;

if (!empty($telegramToken) && !empty($telegramChatId)) {
    $telegramText = "
🔔 <b>Новая заявка на консультацию</b>

👤 <b>ФИО:</b> {$fullName}
📞 <b>Телефон:</b> {$phone}
📧 <b>Email:</b> {$email}
🕐 <b>Время:</b> " . date('d.m.Y H:i') . "
🌐 <b>Сайт:</b> {$siteDomain}
    ";

    $telegramUrl = "https://api.telegram.org/bot{$telegramToken}/sendMessage";
    $telegramData = [
        'chat_id' => $telegramChatId,
        'text' => $telegramText,
        'parse_mode' => 'HTML',
        'disable_web_page_preview' => true
    ];

    $ch = curl_init($telegramUrl);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($telegramData));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/x-www-form-urlencoded'
    ]);
    
    $telegramResponse = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($httpCode === 200) {
        $telegramSent = true;
        logMessage("Telegram notification sent to chat {$telegramChatId}");
    } else {
        logMessage("Telegram API error (HTTP {$httpCode}): {$curlError} - {$telegramResponse}", 'ERROR');
    }
}

// === ФИНАЛЬНЫЙ ОТВЕТ ===
if ($emailSent || $telegramSent) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Заявка успешно отправлена'
    ]);
    logMessage("Application successfully sent for {$fullName} ({$email})");
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Не удалось отправить заявку. Пожалуйста, свяжитесь с нами по телефону.'
    ]);
    logMessage("Failed to send application for {$fullName} ({$email})", 'ERROR');
}