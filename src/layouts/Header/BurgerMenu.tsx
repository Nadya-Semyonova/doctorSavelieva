import styles from "./Header.module.css";
import type { BurgerMenuProps } from "../../types/types";
import { Menu, X } from "lucide-react";
import ButtonDefault from "../../shared/ui/Button/ButtonDefault";

export default function BurgerMenu({
  isOpen,
  navItems,
  onToggle,
  onNavClick,
  onSchoolClick,
  onConsultationClick,
}: BurgerMenuProps) {
  return (
    <div className={styles.burgerMenu}>
      <button
        type="button"
        className={styles.burgerButton}
        onClick={onToggle}
        aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {isOpen && (
        <nav className={styles.mobileNav}>
          <ul className={styles.mobileNavList}>
            {navItems.map((item) => (
              <li key={item.id} className={styles.mobileNavItem}>
                <button
                  type="button"
                  className={styles.mobileNavLink}
                  onClick={() => onNavClick(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}

            <li className={styles.mobileNavItem}>
              <button type="button" className={styles.mobileNavLink} onClick={onSchoolClick}>
                Школа для пациентов
              </button>
            </li>

            <li className={styles.mobileNavItem}>
              <ButtonDefault
                name="Записаться на консультацию"
                handleClick={onConsultationClick}
                ariaLabel="Записаться на консультацию"
              />
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
