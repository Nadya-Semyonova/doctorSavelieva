import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

interface LogoProps {
  onClick?: () => void;
}

export default function Logo({ onClick }: LogoProps) {
  return (
    <Link
      to="/"
      className={styles.logo}
      onClick={onClick}
      aria-label="Вернуться на главную страницу"
    >
      <div className={styles.logoCircle}>
        <span className={styles.logoInitials}>РС</span>
      </div>
      <div className={styles.logoText}>
        <span className={styles.logoName}>Ревматолог</span>
        <span className={styles.logoSurname}>Савельева</span>
      </div>
    </Link>
  );
}
