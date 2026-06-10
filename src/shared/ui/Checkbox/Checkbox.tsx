import { Link } from "react-router-dom";
import styles from "./Checkbox.module.css";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  labelText: string;
  linkText: string;
  linkHref: string;
  disabled?: boolean;
}

export default function Checkbox({
  checked,
  onChange,
  labelText,
  linkText,
  linkHref,
  disabled = false,
}: CheckboxProps) {
  return (
    <label className={`${styles.checkboxLabel} ${disabled ? styles.disabled : ""}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className={styles.checkboxInput}
      />
      <span className={styles.checkboxCustom} />
      <span className={styles.checkboxText}>
        {labelText}{" "}
        <Link to={linkHref} className={styles.checkboxLink}>
          {linkText}
        </Link>
      </span>
    </label>
  );
}
