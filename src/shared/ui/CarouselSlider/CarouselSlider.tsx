import { Children, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import type { IUsersCardsSwiper } from "../../../types/types";

import "swiper/css";
import "swiper/css/pagination";
import styles from "./CarouselSlider.module.css";
import SliderNavigationButton from "./SliderNavigationButton";

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

  const slides = Children.toArray(children);

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

  const updateNavigationState = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handleSwiperInit = (swiper: SwiperType) => {
    swiperRef.current = swiper;
    updateNavigationState(swiper);
  };

  const navigationButtons = (
    <>
      <SliderNavigationButton
        direction="prev"
        disabled={isBeginning}
        onClick={() => swiperRef.current?.slidePrev()}
        variant={variant}
      />

      <SliderNavigationButton
        direction="next"
        disabled={isEnd}
        onClick={() => swiperRef.current?.slideNext()}
        variant={variant}
      />
    </>
  );

  return (
    <div
      id={sliderId}
      className={`${styles.container} ${
        variant === "side" ? styles.side : ""
      }`}
    >
      <Swiper
        modules={[Pagination]}
        pagination={showPagination ? { clickable: true } : false}
        breakpoints={breakpoints}
        observer
        observeParents
        onSwiper={handleSwiperInit}
        onSlideChange={updateNavigationState}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>{slide}</SwiperSlide>
        ))}
      </Swiper>

      {variant === "bottom" ? (
        <div className={styles.controls}>
          {navigationButtons}
        </div>
      ) : (
        navigationButtons
      )}
    </div>
  );
}