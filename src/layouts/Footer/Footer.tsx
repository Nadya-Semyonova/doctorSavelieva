import { Link as RouterLink } from "react-router-dom";
import styles from "./Footer.module.css";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={`${styles.footer} ${className || ""}`}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Левая колонка - юридические документы */}
          <div className={styles.legalSection}>
            <RouterLink to="/offer-agreement" className={styles.legalLink}>
              Договор оферты
            </RouterLink>
            <RouterLink to="/privacy-policy" className={styles.legalLink}>
              Политика конфиденциальности
            </RouterLink>
          </div>
        </div>

        {/* Нижняя строка с копирайтом */}
        <div className={styles.copyright}>
          <p>© {new Date().getFullYear()} Все права защищены</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
