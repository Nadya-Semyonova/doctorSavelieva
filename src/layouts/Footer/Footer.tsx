import { Copyright } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

interface FooterProps {
  className?: string;
}

const LEGAL_LINKS = [
  {
    to: "/offer-agreement",
    label: "Договор оферты",
  },
  {
    to: "/privacy-policy",
    label: "Политика обработки персональных данных",
  },
];

export default function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${styles.footer} ${className ?? ""}`}>
      <div className={styles.container}>
        <nav className={styles.legalLinks}>
          {LEGAL_LINKS.map(({ to, label }) => (
            <Link key={to} to={to} className={styles.legalLink}>
              {label}
            </Link>
          ))}
        </nav>

        <p className={styles.copyright}>
          <Copyright size={16} />
          <span>{currentYear} Все права защищены</span>
        </p>
      </div>
    </footer>
  );
}