import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import AccordionSection from "../AccordionSection/AccordionSection";
import CarouselSlider from "../../../shared/ui/CarouselSlider/CarouselSlider";
import { educationData } from "../../../assets/data/educationData";

import styles from "./EducationTab.module.css";

import diploma from "../../../assets/images/Gallery/Full/diploma.png";
import diplomaRevma from "../../../assets/images/Gallery/Full/diploma_revma.png";
import diplomaUltrasound from "../../../assets/images/Gallery/Full/diploma_ultrasaund.png";
import pkGibt from "../../../assets/images/Gallery/Full/PK_GIBT.png";
import pkGibt2 from "../../../assets/images/Gallery/Full/PK_GIBT2.png";
import pkLit from "../../../assets/images/Gallery/Full/PK_LIT.png";
import pkUs2 from "../../../assets/images/Gallery/Full/PK_US2.png";
import pkUs3 from "../../../assets/images/Gallery/Full/PK_US3.png";
import pkUs4 from "../../../assets/images/Gallery/Full/PK_US4.png";
import pkUs5 from "../../../assets/images/Gallery/Full/PK_US5.png";

export default function EducationTab() {
  const images = [
    diploma,
    diplomaRevma,
    diplomaUltrasound,
    pkGibt,
    pkGibt2,
    pkLit,
    pkUs2,
    pkUs3,
    pkUs4,
    pkUs5,
  ];

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") swiperRef.current?.slideNext();
      if (e.key === "ArrowLeft") swiperRef.current?.slidePrev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex]);

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
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt="Документ"
              onClick={() => setSelectedIndex(index)}
              style={{ cursor: "zoom-in" }}
            />
          ))}
        </CarouselSlider>
      </div>

      {selectedIndex !== null && (
        <div className={styles.modal} onClick={() => setSelectedIndex(null)}>
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            initialSlide={selectedIndex}
            slidesPerView={1}
            spaceBetween={0}
            className={styles.modalSwiper}
          >
            {images.map((src, index) => (
              <SwiperSlide key={index}>
                <div className={styles.slideCenter}>
                  <img
                    src={src}
                    alt="Документ"
                    className={styles.modalImage}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            className={styles.modalPrev}
            onClick={(e) => {
              e.stopPropagation();
              swiperRef.current?.slidePrev();
            }}
          >
            ←
          </button>

          <button
            className={styles.modalNext}
            onClick={(e) => {
              e.stopPropagation();
              swiperRef.current?.slideNext();
            }}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
