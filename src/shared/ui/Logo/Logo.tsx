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
      <span className={styles.logoText}>
        <strong> Ревматолог Савельева</strong>
      </span>
    </Link>
  );
}
