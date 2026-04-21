// import style from "./School.module.css";

// export const SchoolPage: React.FC = () => {
//   return (
//     <div className={style.schoolPage}>
//       {/* Hero секция */}
//       <section className={style.schoolHero}>
//         <div className={style.container}>
//           <h1 className={style.schoolHero__title}>Школа пациентов</h1>
//           <p className={style.schoolHero__subtitle}>
//             Образовательные материалы для пациентов с ревматологическими заболеваниями
//           </p>
//         </div>
//       </section>

//       {/* Основной контент */}
//       <section className={style.schoolContent}>
//         <div className={style.container}>
//           {/* Заглушка с сообщением */}
//           <div className={style.comingSoon}>
//             <div className={style.comingSoon__icon}></div>
//             <h2 className={style.comingSoon__title}>Скоро здесь будут полезные материалы</h2>
//             <p className={style.comingSoon__text}>Мы готовим для вас:</p>
//             <ul className={style.comingSoon__list}>
//               <li>Видеоуроки с упражнениями</li>
//               <li>Памятки и инструкции в формате PDF</li>
//               <li>Фотогалерею с полезными иллюстрациями</li>
//               <li>Новости и статьи о здоровье</li>
//             </ul>
//             <div className={style.comingSoon__note}>
//               <span></span>
//               <p>Следите за обновлениями — материалы появятся совсем скоро!</p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

import style from "./School.module.css";

export const SchoolPage: React.FC = () => {
  return (
    <div className={style.schoolPage}>
      {/* Hero секция */}
      <section className={style.schoolHero}>
        <div className={style.container}>
          <h1 className={style.schoolHero__title}>Школа пациентов</h1>
          <p className={style.schoolHero__subtitle}>
            Образовательные материалы для пациентов с ревматологическими заболеваниями
          </p>
        </div>
      </section>

      {/* Основной контент - Баннер */}
      <section className={style.schoolContent}>
        <div className={style.container}>
          <div className={style.comingSoonBanner}>
            <div className={style.bannerDecoration}></div>
            <div className={style.bannerContent}>
              <div className={style.bannerIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="12" cy="12" r="3" fill="currentColor"/>
                </svg>
              </div>
              <h2 className={style.bannerTitle}>Скоро здесь появится что-то полезное!</h2>
              <p className={style.bannerText}>
                Мы готовим для вас образовательную платформу, где вы сможете найти:
              </p>
              <ul className={style.bannerList}>
                <li>
                  Видеоуроки с упражнениями
                </li>
                <li>
                  Памятки и инструкции в формате PDF
                </li>
                <li>
                  Фотогалерею с полезными иллюстрациями
                </li>
                <li>
                  Новости и статьи о здоровье
                </li>
              </ul>
              <div className={style.bannerNote}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <p>Следите за обновлениями — материалы появятся совсем скоро!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};