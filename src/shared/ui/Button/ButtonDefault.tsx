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
  href,
  target = "_self",
}: IButtonDefault) {
  // Если есть href, рендерим как ссылку
  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={`${style.button} ${styleButton}`}
        aria-label={ariaLabel}
      >
        {children || name}
      </a>
    );
  }

  // Если есть handleClick, рендерим кнопку с обработчиком
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

  // Обычная кнопка
  return (
    <button type={type} className={`${style.button} ${styleButton}`}>
      {children || name}
    </button>
  );
}
