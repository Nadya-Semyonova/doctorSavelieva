import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import styles from "./CarouselSlider.module.css";

interface SliderNavigationButtonProps {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
  variant?: "side" | "bottom";
}

export default function SliderNavigationButton({
  direction,
  disabled,
  onClick,
  variant = "side",
}: SliderNavigationButtonProps) {
  const Icon =
    direction === "prev"
      ? ChevronLeft
      : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={
        direction === "prev"
          ? "Предыдущий слайд"
          : "Следующий слайд"
      }
      className={[
        direction === "prev"
          ? styles.customButtonPrev
          : styles.customButtonNext,
        variant === "bottom" && styles.bottom,
        disabled && styles.buttonDeactive,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Icon size={32} />
    </button>
  );
}