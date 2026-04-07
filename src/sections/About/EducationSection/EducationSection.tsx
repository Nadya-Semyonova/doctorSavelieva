import AccordionSection from "../AccordionSection/AccordionSection";
import CarouselSlider from "../../../shared/ui/CarouselSlider/CarouselSlider";
import { educationData } from "../../../assets/data/educationData";
import styles from "./EducationSection.module.css";
import diploma from "../../../assets/images/Gallery/Thumbs/diploma.png";
import diplomaRevma from "../../../assets/images/Gallery/Thumbs/diploma_revma.png";
import diplomaUltrasound from "../../../assets/images/Gallery/Thumbs/diploma_ultrasaund.png";
import pkGibt from "../../../assets/images/Gallery/Thumbs/PK_GIBT.png";
import pkGibt2 from "../../../assets/images/Gallery/Thumbs/PK_GIBT2.png";
import pkLit from "../../../assets/images/Gallery/Thumbs/PK_LIT.png";
import pkUs2 from "../../../assets/images/Gallery/Thumbs/PK_US2.png";
import pkUs3 from "../../../assets/images/Gallery/Thumbs/PK_US3.png";
import pkUs4 from "../../../assets/images/Gallery/Thumbs/PK_US4.png";
import pkUs5 from "../../../assets/images/Gallery/Thumbs/PK_US5.png";

export default function EducationSection() {
  return (
    <div className={styles.education}>
      <div className={styles.left}>
        <p className={styles.intro}>
          Моя врачебная практика началась в 2009 году и продолжается по сегодняшний день.
        </p>
        {educationData.map((item) => (
          <AccordionSection key={item.id} title={item.title}>
            <p>{item.content}</p>
          </AccordionSection>
        ))}
      </div>

      <div className={styles.right}>
        <CarouselSlider 
          slidesPerViewMobile={1}
          slidesPerViewTablet={1}
          slidesPerViewDesktop={1}
          variant="bottom"
        >
          <img src={diploma} alt="Диплом" />
          <img src={diplomaRevma} alt="Диплом" />
          <img src={diplomaUltrasound} alt="Диплом" />
          <img src={pkGibt} alt="Удостоверение" />
          <img src={pkGibt2} alt="Удостоверение" />
          <img src={pkLit} alt="Удостоверение" />
          <img src={pkUs2} alt="Удостоверение" />
          <img src={pkUs3} alt="Удостоверение" />
          <img src={pkUs4} alt="Удостоверение" />
          <img src={pkUs5} alt="Удостоверение" />
        </CarouselSlider>
      </div>
    </div>
  );
}