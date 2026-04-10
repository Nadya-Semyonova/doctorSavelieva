// import { Link as RouterLink } from "react-router-dom";
// import styles from "./Footer.module.css";
// import ButtonDefault from "../../shared/ui/Button/ButtonDefault";

// interface FooterProps {
//   className?: string;
// }

// const Footer: React.FC<FooterProps> = ({ className }) => {
//   const scrollToSection = (sectionId: string) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//   };

//   const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
//     e.preventDefault();
//     scrollToSection(sectionId);
//   };

//   function handleAppointmentClick(): void {
//     throw new Error("Function not implemented.");
//   }

//   return (
//     <footer className={`${styles.footer} ${className || ""}`}>
//       <div className={styles.container}>
//         <div className={styles.footerContent}>
//           {/* Левая колонка - юридические документы (заглушки) */}
//           <div className={styles.legalSection}>
//             <RouterLink to="/offer-agreement" className={styles.legalLink}>
//               Договор оферты
//             </RouterLink>
//             <RouterLink to="/privacy-policy" className={styles.legalLink}>
//               Политика конфиденциальности
//             </RouterLink>
//           </div>

//           {/* Центральная колонка - якорные ссылки */}
//           <div className={styles.navSection}>
//             <a
//               href="#about"
//               className={styles.anchorLink}
//               onClick={(e) => handleAnchorClick(e, "about")}
//             >
//               Обо мне
//             </a>
//             <a
//               href="#benefit"
//               className={styles.anchorLink}
//               onClick={(e) => handleAnchorClick(e, "benefit")}
//             >
//               Польза
//             </a>
//             <a
//               href="#reviews"
//               className={styles.anchorLink}
//               onClick={(e) => handleAnchorClick(e, "reviews")}
//             >
//               Отзывы
//             </a>
//           </div>

//           {/* Правая колонка - кнопка записи */}
//           <div className={styles.ctaSection}>
//             <ButtonDefault
//               name="Записаться на консультацию"
//               handleClick={handleAppointmentClick}
//               styleButton={styles.ctaButton}
//               type="button"
//               ariaLabel="Перейти к форме записи на консультацию"
//             />
//           </div>
//         </div>

//         {/* Нижняя строка с копирайтом */}
//         <div className={styles.copyright}>
//           <p>© {new Date().getFullYear()} Все права защищены</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import { Link as RouterLink } from "react-router-dom";
import styles from "./Footer.module.css";
// import ButtonDefault from "../../shared/ui/Button/ButtonDefault";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  // const scrollToSection = (sectionId: string) => {
  //   const element = document.getElementById(sectionId);
  //   if (element) {
  //     element.scrollIntoView({
  //       behavior: "smooth",
  //       block: "start",
  //     });
  //   }
  // };

  // const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
  //   e.preventDefault();
  //   scrollToSection(sectionId);
  // };

  // function handleAppointmentClick(): void {
  //   throw new Error("Function not implemented.");
  // }

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