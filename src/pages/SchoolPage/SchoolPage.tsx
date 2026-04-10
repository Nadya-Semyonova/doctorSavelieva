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

      {/* Основной контент */}
      <section className={style.schoolContent}>
        <div className={style.container}>
          {/* Заглушка с сообщением */}
          <div className={style.comingSoon}>
            <div className={style.comingSoon__icon}></div>
            <h2 className={style.comingSoon__title}>Скоро здесь будут полезные материалы</h2>
            <p className={style.comingSoon__text}>Мы готовим для вас:</p>
            <ul className={style.comingSoon__list}>
              <li>Видеоуроки с упражнениями</li>
              <li>Памятки и инструкции в формате PDF</li>
              <li>Фотогалерею с полезными иллюстрациями</li>
              <li>Новости и статьи о здоровье</li>
            </ul>
            <div className={style.comingSoon__note}>
              <span></span>
              <p>Следите за обновлениями — материалы появятся совсем скоро!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};