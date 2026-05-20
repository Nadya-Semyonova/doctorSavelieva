import { useState } from "react";
import styles from "./Header.module.css";

export const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.burgerMenu}>
      <button className={styles.burgerButton} onClick={() => setIsOpen(!isOpen)} aria-label="Меню">
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
      </button>

      {isOpen && (
        <nav className={styles.mobileNav}>
          <ul className={styles.mobileNavList}>
            <li>
              <button>О враче</button>
            </li>
            <li>
              <button>Преимущества</button>
            </li>
            <li>
              <button>Отзывы</button>
            </li>
            <li>
              <button>Контакты</button>
            </li>
            <li>
              <button className={styles.mobileConsultBtn}>Запись на приём</button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};
