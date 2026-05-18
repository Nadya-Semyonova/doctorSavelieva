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
  const [consentPersonal, setConsentPersonal] = useState(false);
  const [consentOffer, setConsentOffer] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({
    fullName: "",
    phone: "",
    email: "",
  });

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

    return isFullNameValid && isPhoneValid && isEmailValid && consentPersonal && consentOffer;
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
      consentPersonal &&
      consentOffer
    );
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Очистка формы
      setFullName("");
      setPhone("");
      setEmail("");
      setConsentPersonal(false);
      setConsentOffer(false);
      setErrors({ fullName: "", phone: "", email: "" });

      // Показать модальное окно
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.");
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
              Консультация проводится в формате видеозвонка или текстовом.
            </p>
            <p className={styles.infoText}>
              После вашей заявки с вами свяжется доктор для обсуждения деталей
            </p>
            <p className={styles.price}>
              Стоимость консультации составляет <strong>2500 рублей</strong>.
            </p>
            <div className={styles.notice}>
              <p className={styles.noticeTitle}>Обратите внимание:</p>
              <p className={styles.noticeText}>
                онлайн консультация не предполагает выписку справок, рецептов, заключений врача и
                других медицинских документов.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
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
              onBlur={() => validateFullName(fullName)}
            />

            <Input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="+7 (___) ___-__-__"
              error={errors.phone}
              required
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
              onBlur={() => validateEmail(email)}
            />

            <div className={styles.checkboxes}>
              <Checkbox
                checked={consentPersonal}
                onChange={setConsentPersonal}
                labelText="согласен на"
                linkText="обработку персональных данных"
                linkHref="/privacy-policy"
              />

              <Checkbox
                checked={consentOffer}
                onChange={setConsentOffer}
                labelText="принимаю"
                linkText="условия договора-оферты"
                linkHref="/offer-agreement"
              />
            </div>

            <ButtonDefault
              name="Записаться на консультацию"
              handleClick={handleSubmit}
              type="button"
              status={!isSubmitting && isFormValid()}
              styleButton={styles.submitButton}
            />
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
