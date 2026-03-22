import type { IButtonDefault } from "../../../types/types";
import style from "./ButtonDefault.module.css";

export default function ButtonDefault({
  name,
  handleClick,
  styleButton,
  type,
  ariaLabel,
  children,
  status = true,
}: IButtonDefault) {
  if (handleClick) {
    return (
      <button
        type={type}
        onClick={handleClick}
        className={`${style.button} ${styleButton}`}
        aria-label={ariaLabel}
        disabled={!status}
      >
        {children || name}
      </button>
    );
  }

  return (
    <button type={type} className={`${style.button} ${styleButton}`}>
      {children || name}
    </button>
  );
}