import CarouselSlider from "../../../shared/ui/CarouselSlider/CarouselSlider";
import styles from "./ExperienceTab.module.css";

export default function ExperienceTab() {
  return (
    <div className={styles.experience}>
      <p className={styles.intro}>
        {`Опыт работы более 16 лет.

          Опыт очного приема в ревматологических отделениях в городе Мурманск, в Калининградской областной клинической больнице.

          На текущее время осуществляю очный прием в городе Калининград, клиника “Добрый Докторъ” и онлайн прием.

          Занимаюсь изготовлением ортезов на очном приеме.`}
      </p>

      <div className={styles.right}>
        <CarouselSlider 
          slidesPerViewMobile={1}
          slidesPerViewTablet={1}
          slidesPerViewDesktop={1}
          variant="bottom"
        >
          <img src="" alt="Ортез" />
        </CarouselSlider>
      </div>
    </div>
  );
}