import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import type { IUsersCardsSwiper } from "../../../types/types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./CarouselSlider.module.css";
import ChevronRight from "../../../assets/images/IconsSvg/ChevronRight";

export default function CarouselSlider({
  children,
  spaceBetween = 20,
  slidesPerView = 1,
  slidesPerViewMobile = 1,
  slidesPerViewTablet = 2,
  slidesPerViewDesktop = 3,
  showPagination = true,
  sliderId,
}: IUsersCardsSwiper) {
  const [begButton, setBegButton] = useState<boolean>(true);
  const [endButton, setEndButton] = useState<boolean>(false);
  const [, setCurrentBreakpoint] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const swiperRef = useRef<SwiperType | null>(null);

  // Определение брейкпоинтов для Swiper
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
      spaceBetween: spaceBetween,
    },
  };

  // Отслеживание текущего брейкпоинта для анимации
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCurrentBreakpoint("mobile");
      } else if (width < 1024) {
        setCurrentBreakpoint("tablet");
      } else {
        setCurrentBreakpoint("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onEnd = () => {
    setEndButton(true);
  };

  const handleClickPrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
    setEndButton(false);
  };

  const onBeginning = () => {
    setBegButton(true);
  };

  const handleClickNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
    setBegButton(false);
  };

  // Преобразуем children в массив, если это не массив
  const slidesArray = Array.isArray(children) ? children : [children];

  return (
    <div className={styles.container} id={sliderId}>
      <Swiper
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        slidesPerGroup={1}
        modules={[Navigation, Pagination]}
        navigation={false}
        pagination={
          showPagination
            ? {
                clickable: true,
                dynamicBullets: false,
              }
            : false
        }
        breakpoints={breakpoints}
        onReachBeginning={onBeginning}
        onReachEnd={onEnd}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setBegButton(swiper.isBeginning);
          setEndButton(swiper.isEnd);
        }}
      >
        {slidesArray.map((slide, index) => (
          <SwiperSlide key={index}>{slide}</SwiperSlide>
        ))}
      </Swiper>

      <button
        className={`${styles.customButtonPrev} ${begButton ? styles.buttonDeactive : ""}`}
        onClick={handleClickPrev}
        type="button"
        tabIndex={0}
        aria-label="Предыдущий слайд"
      >
        <ChevronRight />
      </button>

      <button
        className={`${styles.customButtonNext} ${endButton ? styles.buttonDeactive : ""}`}
        onClick={handleClickNext}
        type="button"
        tabIndex={0}
        aria-label="Следующий слайд"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
