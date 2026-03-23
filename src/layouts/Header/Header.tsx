import { NavLink, Link } from 'react-router-dom';
import type { IHeader } from "../../types/types";
import ButtonDefault from "../../shared/ui/Button/ButtonDefault";
import styles from "./Header.module.css";

export default function Header({ 
  onNavigate, 
  onConsultationClick 
}: IHeader) {
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleNavClick = (sectionId: string) => {
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      handleScrollToSection(sectionId);
    }
  };

  const handleConsultation = () => {
    if (onConsultationClick) {
      onConsultationClick();
    } else {
      handleScrollToSection("appointment");
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.nav} aria-label="Основная навигация">
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <NavLink
                to="/#about"
                className={({ isActive }) => 
                  isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                }
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("about");
                }}
                aria-label="Перейти к разделу обо мне"
              >
                Обо мне
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink
                to="/#benefit"
                className={({ isActive }) => 
                  isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                }
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("benefit");
                }}
                aria-label="Перейти к разделу о пользе"
              >
                Польза
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink
                to="/#reviews"
                className={({ isActive }) => 
                  isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                }
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("reviews");
                }}
                aria-label="Перейти к разделу отзывов"
              >
                Отзывы
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.consultationButton}>
          <Link to="/#appointment" onClick={(e) => {
            e.preventDefault();
            handleConsultation();
          }}>
            <ButtonDefault
              name="Записаться на консультацию"
              handleClick={handleConsultation}
              styleButton={styles.buttonConsultation}
              ariaLabel="Записаться на консультацию"
              type="button"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}