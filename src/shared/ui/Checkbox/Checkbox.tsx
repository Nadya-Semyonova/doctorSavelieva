import { Link } from "react-router-dom";
import styles from "./Checkbox.module.css";

interface ICheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  labelText: string;
  linkText: string;
  linkHref: string;
  disabled?: boolean;
}

const Checkbox: React.FC<ICheckboxProps> = ({
  checked,
  onChange,
  labelText,
  linkText,
  linkHref,
  disabled = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <label className={`${styles.checkboxLabel} ${disabled ? styles.disabled : ""}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className={styles.checkboxInput}
      />
      <span className={styles.checkboxCustom}></span>
      <span className={styles.checkboxText}>
        {labelText}{" "}
        <Link to={linkHref} className={styles.checkboxLink}>
          {linkText}
        </Link>
      </span>
    </label>
  );
};

export default Checkbox;
