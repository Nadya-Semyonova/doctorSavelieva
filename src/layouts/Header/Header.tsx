import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { IHeader } from "../../types/types";
import ButtonDefault from "../../shared/ui/Button/ButtonDefault";
import Logo from "../../shared/ui/Logo/Logo";
import BurgerMenu from "./BurgerMenu";
import styles from "./Header.module.css";

const DESKTOP_BREAKPOINT = 1200;

const NAV_ITEMS = [
  { id: "about", label: "Обо мне" },
  { id: "benefit", label: "Польза" },
  { id: "reviews", label: "Отзывы" },
] as const;

export default function Header({
  onNavigate,
  onConsultationClick,
}: IHeader) {
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > DESKTOP_BREAKPOINT) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const navigateAndScroll = (sectionId: string) => {
    navigate("/");

    setTimeout(() => {
      handleScrollToSection(sectionId);
    }, 100);
  };

  const handleNavClick = (sectionId: string) => {
    if (onNavigate) {
      onNavigate(sectionId);
    } else if (isHomePage) {
      handleScrollToSection(sectionId);
    } else {
      navigateAndScroll(sectionId);
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
      navigateAndScroll("appointment");
    }

    setIsMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoLeft}>
          <Logo />
        </div>

        <nav className={styles.nav} aria-label="Основная навигация">
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.id} className={styles.navItem}>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.navLink} ${styles.active}`
                      : styles.navLink
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
                  isActive
                    ? `${styles.navLink} ${styles.active}`
                    : styles.navLink
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

        <ButtonDefault
          name="Записаться на консультацию"
          handleClick={handleConsultation}
          styleButton={styles.consultationButton}
          ariaLabel="Записаться"
        />

        <BurgerMenu
          isOpen={isMobileMenuOpen}
          navItems={NAV_ITEMS}
          onToggle={handleToggleMobileMenu}
          onNavClick={handleNavClick}
          onSchoolClick={handleSchoolClick}
          onConsultationClick={handleConsultation}
        />
      </div>
    </header>
  );
}