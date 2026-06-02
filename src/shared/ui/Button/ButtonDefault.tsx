import type { IButtonDefault } from "../../../types/types";
import style from "./ButtonDefault.module.css";

export default function ButtonDefault({
  name,
  handleClick,
  styleButton,
  type = "button",
  ariaLabel,
  children,
  status = true,
  href,
  target = "_self",
  disabled = false,
}: IButtonDefault) {
  const content = children ?? name;
  const className = `${style.button} ${styleButton ?? ""}`;

  const commonProps = {
    className,
    "aria-label": ariaLabel,
  };

  if (href) {
    return (
      <a
        {...commonProps}
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      {...commonProps}
      type={type}
      onClick={handleClick}
      disabled={disabled || !status}
    >
      {content}
    </button>
  );
}