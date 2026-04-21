import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import type { IHeader } from "../../types/types";
import ButtonDefault from "../../shared/ui/Button/ButtonDefault";
import styles from "./Header.module.css";
import Logo from "../../shared/ui/Logo/Logo";

export default function Header({ onNavigate, onConsultationClick }: IHeader) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleNavClick = (sectionId: string) => {
    if (onNavigate) {
      onNavigate(sectionId);
    } else if (isHomePage) {
      handleScrollToSection(sectionId);
    } else {
      navigate("/");
      setTimeout(() => {
        handleScrollToSection(sectionId);
      }, 100);
    }
  };

  // Новый обработчик для перехода на страницу школы
  const handleSchoolClick = () => {
    navigate("/school");
  };

  const handleConsultation = () => {
    if (onConsultationClick) {
      onConsultationClick();
    } else if (isHomePage) {
      handleScrollToSection("appointment");
    } else {
      navigate("/");
      setTimeout(() => {
        handleScrollToSection("appointment");
      }, 100);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.nav} aria-label="Основная навигация">
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <NavLink
                to="/"
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
                to="/"
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
                to="/"
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
            <li className={styles.navItem}>
              <NavLink
                to="/school"
                className={({ isActive }) =>
                  isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                }
                onClick={(e) => {
                  e.preventDefault();
                  handleSchoolClick();
                }}
                aria-label="Перейти на страницу школа для пациентов"
              >
                Школа
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={styles.logoCenter}>
          <Logo />
        </div>
        <div className={styles.consultationButton}>
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              handleConsultation();
            }}
          >
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
