import { useState, forwardRef } from "react";
import styles from "./Input.module.css";

interface IInputProps {
  type: "text" | "tel" | "email";
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  onBlur?: () => void;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(function Input(
  {
    type,
    value,
    onChange,
    placeholder,
    error,
    required = false,
    disabled = false,
    onBlur,
  },
  ref,
) {
  const [isTouched, setIsTouched] = useState(false);

  const showError = Boolean(isTouched && error);

  const handleBlur = () => {
    setIsTouched(true);
    onBlur?.();
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        ref={ref}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleBlur}
        className={`${styles.input} ${showError ? styles.inputError : ""}`}
      />

      {showError && (
        <span className={styles.errorMessage}>{error}</span>
      )}
    </div>
  );
});

export default Input;