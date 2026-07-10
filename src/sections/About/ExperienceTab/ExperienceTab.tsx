import CarouselSlider from "../../../shared/ui/CarouselSlider/CarouselSlider";
import styles from "./ExperienceTab.module.css";
import orthosisPhoto from "../../../assets/images/Gallery/Photo/2jw25Zv1QU.png";

export default function ExperienceTab() {
  const photos = [orthosisPhoto];
  const experienceText = `
  Опыт работы более 16 лет.

  Опыт очного приема в ревматологических отделениях в городе Мурманск, в Калининградской областной клинической больнице.

  На текущее время осуществляю очный прием в городе Калининград- клиника «Добрый Докторъ» и онлайн-прием.

  Занимаюсь изготовлением ортезов на очном приеме.
  `;
  return (
    <div className={styles.experience}>
      <p className={styles.intro}>{experienceText}</p>

      <div className={styles.right}>
        <CarouselSlider
          slidesPerViewMobile={1}
          slidesPerViewTablet={1}
          slidesPerViewDesktop={1}
          variant="bottom"
        >
          {photos.map((photo) => (
            <img key={photo} src={photo} alt="Ортез" />
          ))}
        </CarouselSlider>
      </div>
    </div>
  );
}
