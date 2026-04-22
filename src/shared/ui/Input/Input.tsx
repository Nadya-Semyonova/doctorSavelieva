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

const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    { type, value, onChange, placeholder, error, required = false, disabled = false, onBlur },
    ref,
  ) => {
    const [isTouched, setIsTouched] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    const handleBlur = () => {
      setIsTouched(true);
      onBlur?.();
    };

    const showError = isTouched && error;

    return (
      <div className={styles.inputWrapper}>
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={`${styles.input} ${showError ? styles.inputError : ""}`}
          required={required}
        />
        {showError && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
