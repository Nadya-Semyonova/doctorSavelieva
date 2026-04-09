import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import type { IUsersCardsSwiper } from "../../../types/types";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./CarouselSlider.module.css";
import ChevronRight from "../../../assets/images/IconsSvg/ChevronRight";

type Props = IUsersCardsSwiper & {
  variant?: "side" | "bottom";
};

export default function CarouselSlider({
  children,
  spaceBetween = 20,
  slidesPerViewMobile = 1,
  slidesPerViewTablet = 2,
  slidesPerViewDesktop = 3,
  showPagination = true,
  sliderId,
  variant = "side",
}: Props) {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const swiperRef = useRef<SwiperType | null>(null);

  const breakpoints = {
    320: {
      slidesPerView: slidesPerViewMobile,
      spaceBetween: 12,
    },
    768: {
      slidesPerView: slidesPerViewTablet,
      spaceBetween: 16,
    },
    1024: {
      slidesPerView: slidesPerViewDesktop,
      spaceBetween,
    },
  };

  const slidesArray = Array.isArray(children) ? children : [children];

  return (
    <div className={`${styles.container} ${variant === "side" ? styles.side : ""}`} id={sliderId}>
      <Swiper
        modules={[Pagination]}
        pagination={showPagination ? { clickable: true } : false}
        breakpoints={breakpoints}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
      >
        {slidesArray.map((slide, index) => (
          <SwiperSlide key={index}>{slide}</SwiperSlide>
        ))}
      </Swiper>

      {variant === "bottom" ? (
        <div className={styles.controls}>
          <button
            className={`${styles.customButtonPrev} ${styles.bottom} ${
              isBeginning ? styles.buttonDeactive : ""
            }`}
            onClick={() => swiperRef.current?.slidePrev()}
            type="button"
            aria-label="Предыдущий слайд"
          >
            <ChevronRight />
          </button>

          <button
            className={`${styles.customButtonNext} ${styles.bottom} ${
              isEnd ? styles.buttonDeactive : ""
            }`}
            onClick={() => swiperRef.current?.slideNext()}
            type="button"
            aria-label="Следующий слайд"
          >
            <ChevronRight />
          </button>
        </div>
      ) : (
        <>
          <button
            className={`${styles.customButtonPrev} ${
              isBeginning ? styles.buttonDeactive : ""
            }`}
            onClick={() => swiperRef.current?.slidePrev()}
            type="button"
            aria-label="Предыдущий слайд"
          >
            <ChevronRight />
          </button>

          <button
            className={`${styles.customButtonNext} ${
              isEnd ? styles.buttonDeactive : ""
            }`}
            onClick={() => swiperRef.current?.slideNext()}
            type="button"
            aria-label="Следующий слайд"
          >
            <ChevronRight />
          </button>
        </>
      )}
    </div>
  );
}