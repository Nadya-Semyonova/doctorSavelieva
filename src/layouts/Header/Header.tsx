import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { IHeader } from "../../types/types";
import ButtonDefault from "../../shared/ui/Button/ButtonDefault";
import styles from "./Header.module.css";
import Logo from "../../shared/ui/Logo/Logo";

export default function Header({ onNavigate, onConsultationClick }: IHeader) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1200 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
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
    setIsMobileMenuOpen(false);
  };

  const handleSchoolClick = () => {
    navigate("/school");
    setIsMobileMenuOpen(false);
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
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: "about", label: "Обо мне" },
    { id: "benefit", label: "Польза" },
    { id: "reviews", label: "Отзывы" },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Логотип */}
        <div className={styles.logoLeft}>
          <Logo />
        </div>

        {/* Десктопная навигация  */}
        <nav className={styles.nav} aria-label="Основная навигация">
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.id} className={styles.navItem}>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  aria-label={`Перейти к разделу ${item.label.toLowerCase()}`}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
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
                Школа для пациентов
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Десктопная кнопка консультации  */}
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

        {/* Бургер-меню для мобильных */}
        <div className={styles.burgerMenu}>
          <button
            className={`${styles.burgerButton} ${isMobileMenuOpen ? styles.open : ""}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isMobileMenuOpen}
          >
            <span className={styles.burgerLine}></span>
            <span className={styles.burgerLine}></span>
            <span className={styles.burgerLine}></span>
          </button>

          {isMobileMenuOpen && (
            <nav className={styles.mobileNav}>
              <ul className={styles.mobileNavList}>
                {navItems.map((item) => (
                  <li key={item.id} className={styles.mobileNavItem}>
                    <button
                      className={styles.mobileNavLink}
                      onClick={() => handleNavClick(item.id)}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
                <li className={styles.mobileNavItem}>
                  <button className={styles.mobileNavLink} onClick={handleSchoolClick}>
                    Школа для пациентов
                  </button>
                </li>
                <li className={styles.mobileNavItem}>
                  <button className={styles.mobileConsultBtn} onClick={handleConsultation}>
                    Записаться на консультацию
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
