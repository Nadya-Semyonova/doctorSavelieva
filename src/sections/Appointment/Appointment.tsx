import { useState } from "react";
import Input from "../../shared/ui/Input/Input";
import Checkbox from "../../shared/ui/Checkbox/Checkbox";
import Modal from "../../shared/ui/Modal/Modal";
import ButtonDefault from "../../shared/ui/Button/ButtonDefault";
import styles from "./Appointment.module.css";

const Appointment = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consentData, setConsentData] = useState(false);
  const [consentPolicy, setConsentPolicy] = useState(false);
  const [consentOffer, setConsentOffer] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false);   
  const [errors, setErrors] = useState({
    fullName: "",
    phone: "",
    email: "",
  });

  
  const isFormDisabled = false; 

  // Функция для маски телефона
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    let formatted = "+7";

    if (cleaned.length > 1) {
      formatted += " (";
      if (cleaned.length > 1) {
        formatted += cleaned.substring(1, 4);
      }
      if (cleaned.length >= 4) {
        formatted += ") ";
        formatted += cleaned.substring(4, 7);
      }
      if (cleaned.length >= 7) {
        formatted += "-";
        formatted += cleaned.substring(7, 9);
      }
      if (cleaned.length >= 9) {
        formatted += "-";
        formatted += cleaned.substring(9, 11);
      }
    }

    return formatted;
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    setPhone(formatted);
    if (errors.phone) {
      validatePhone(formatted);
    }
  };

  const validateFullName = (value: string) => {
    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, fullName: "Пожалуйста, введите Фамилию Имя Отчество" }));
      return false;
    }
    const nameParts = value.trim().split(/\s+/);
    if (nameParts.length < 2) {
      setErrors((prev) => ({
        ...prev,
        fullName: "Пожалуйста, введите полное ФИО (минимум 2 слова)",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, fullName: "" }));
    return true;
  };

  const validatePhone = (value: string) => {
    const phoneDigits = value.replace(/\D/g, "");
    if (phoneDigits.length !== 11) {
      setErrors((prev) => ({
        ...prev,
        phone: "Пожалуйста, введите полный номер телефона (11 цифр)",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, phone: "" }));
    return true;
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, email: "Пожалуйста, введите email" }));
      return false;
    }
    if (!emailRegex.test(value)) {
      setErrors((prev) => ({ ...prev, email: "Пожалуйста, введите корректный email" }));
      return false;
    }
    setErrors((prev) => ({ ...prev, email: "" }));
    return true;
  };

  const validateForm = () => {
    const isFullNameValid = validateFullName(fullName);
    const isPhoneValid = validatePhone(phone);
    const isEmailValid = validateEmail(email);

    return (
      isFullNameValid &&
      isPhoneValid &&
      isEmailValid &&
      consentData &&
      consentPolicy &&
      consentOffer
    );
  };

  const isFormValid = () => {
    const isFullNameFilled = fullName.trim() !== "";
    const isPhoneFilled = phone.replace(/\D/g, "").length === 11;
    const isEmailFilled = email.trim() !== "";
    const isEmailFormatValid = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(email);
    const hasNoErrors = !errors.fullName && !errors.phone && !errors.email;

    return (
      isFullNameFilled &&
      isPhoneFilled &&
      isEmailFilled &&
      isEmailFormatValid &&
      hasNoErrors &&
      consentData &&
      consentPolicy &&
      consentOffer
    );
  };

  const handleSubmit = async () => {
    // Проверка honeypot
    if (honeypot) {
      console.warn("Бот обнаружен");
      return;
    }

    if (!validateForm()) {
      return;
    }

    // Если форма заблокирована — не отправляем
    if (isFormDisabled) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Реальный запрос к PHP-скрипту
      const response = await fetch("/api/appointment.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, phone, email, website: honeypot }),
      });
      const data = await response.json();

      if (data.success) {
        // Очистка формы
        setFullName("");
        setPhone("");
        setEmail("");
        setConsentData(false);
        setConsentPolicy(false);
        setConsentOffer(false);
        setErrors({ fullName: "", phone: "", email: "" });
        setHoneypot("");

        // Показываем модалку с подтверждением
        setIsModalOpen(true);
      } else {
        alert(data.message || "Ошибка при отправке. Попробуйте позже.");
      }
    } catch (error) {
      console.error("Ошибка отправки:", error);
      alert("Не удалось связаться с сервером. Проверьте интернет и попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.appointment}>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <h2 className={styles.title}>Записаться на онлайн-информационную консультацию</h2>
          <div className={styles.infoBlock}>
            <p className={styles.infoText}>
              Консультация проводится в формате видеозвонка или текстовом
            </p>
            <p className={styles.infoText}>
              После вашей заявки с вами свяжется доктор для обсуждения деталей
            </p>
            <p className={styles.price}>
              Стоимость консультации составляет <strong>2500 рублей</strong>
            </p>
            <div className={styles.notice}>
              <p className={styles.noticeTitle}>Обратите внимание:</p>
              <p className={styles.noticeText}>
                Услуги согласно договору-оферты носят исключительно информационный и консультационный
                характер и НЕ являются медицинскими услугами. <br></br>Онлайн консультация не предполагает
                выписку справок, рецептов, заключений врача и других медицинских документов.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            {/* Honeypot — невидимое поле для ботов */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{
                position: "absolute",
                left: "-9999px",
                opacity: 0,
                pointerEvents: "none",
              }}
            />

            {/* Сообщение о временной недоступности */}
            {isFormDisabled && (
              <div className={styles.formNotice}>
                <div className={styles.formNoticeIcon}>⏳</div>
                <p className={styles.formNoticeTitle}>Форма записи временно недоступна</p>
                <p className={styles.formNoticeText}>
                  Мы готовим всё необходимое для приёма заявок. Пожалуйста, свяжитесь с нами по
                  email: <a href="mailto:doc.savelieva@mail.ru">doc.savelieva@mail.ru</a>
                </p>
              </div>
            )}

            <Input
              type="text"
              value={fullName}
              onChange={(value) => {
                setFullName(value);
                if (errors.fullName) validateFullName(value);
              }}
              placeholder="Фамилия Имя Отчество"
              error={errors.fullName}
              required
              disabled={isFormDisabled}
              onBlur={() => validateFullName(fullName)}
            />

            <Input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="+7 (___) ___-__-__"
              error={errors.phone}
              required
              disabled={isFormDisabled}
              onBlur={() => validatePhone(phone)}
            />

            <Input
              type="email"
              value={email}
              onChange={(value) => {
                setEmail(value);
                if (errors.email) validateEmail(value);
              }}
              placeholder="E-mail"
              error={errors.email}
              required
              disabled={isFormDisabled}
              onBlur={() => validateEmail(email)}
            />

            <div className={styles.checkboxes}>
              <Checkbox
                checked={consentData}
                onChange={setConsentData}
                labelText="Я даю "
                linkText="согласие на обработку персональных данных"
                linkHref="/consent-personal-data"
                disabled={isFormDisabled}
              />

              <Checkbox
                checked={consentPolicy}
                onChange={setConsentPolicy}
                labelText="Я ознакомлен(а) с "
                linkText="Политикой обработки персональных данных"
                linkHref="/privacy-policy"
                disabled={isFormDisabled}
              />

              <Checkbox
                checked={consentOffer}
                onChange={setConsentOffer}
                labelText="Я принимаю "
                linkText="условия договора-оферты"
                linkHref="/offer-agreement"
                disabled={isFormDisabled}
              />
            </div>

            <ButtonDefault
              type="button"
              handleClick={handleSubmit}
              disabled={isFormDisabled || isSubmitting || !isFormValid()}
              styleButton={styles.submitButton}
            >
              {isFormDisabled
                ? "Скоро откроется"
                : isSubmitting
                ? "Отправка..."
                : "Записаться на консультацию"}
            </ButtonDefault>
          </form>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p style={{ fontSize: "var(--font-size-text)", lineHeight: 1.5 }}>
          Ваша заявка принята, доктор свяжется с вами в ближайшее время по указанному телефону,
          чтобы подобрать удобную площадку, время и формат консультации.
        </p>
      </Modal>
    </section>
  );
};

export default Appointment;