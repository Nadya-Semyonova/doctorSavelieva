// надо корректировать под наш макет, также вопрос к иконкам кнопок переключения


import { useState, useRef } from 'react';
import { Swiper } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import type { IUsersCardsSwiper } from '../../../types/types';

import 'swiper/css';
import 'swiper/css/navigation';
import styles from './CarouselSlider.module.css';
import ChevronRight from '../../../assets/images/IconsSvg/ChevronRight';


export default function CarouselSlider({
  children,
  bgButtons,
  spaceBetween,
  slidesPerView,
}: IUsersCardsSwiper) {
  const [begButton, setBegButton] = useState<boolean>(true);
  const [endButton, setEndButton] = useState<boolean>(false);
  const swiperRef = useRef<SwiperType | null>(null);

  const onEnd = () => {
    setEndButton(true);
  };

  const handleClickPrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
    setEndButton(false);
  };

  const onBegging = () => {
    setBegButton(true);
  };

  const handleClickNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
    setBegButton(false);
  };

  return (
    <div className={styles.container}>
      <Swiper
        spaceBetween={spaceBetween || 0}
        slidesPerView={slidesPerView || 1}
        slidesPerGroup={1}
        modules={[Navigation]}
        navigation={false} // ОТКЛЮЧАЕМ встроенную навигацию Swiper
        onReachBeginning={onBegging}
        onReachEnd={onEnd}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {children}
      </Swiper>
      <button
        className={`custom-button-prev ${bgButtons} ${styles.customButtonPrev} ${begButton ? styles.buttonDeactive : ''}`}
        onClick={handleClickPrev}
        type="button"
        tabIndex={0}
        aria-label="Предыдущий слайд"
      >
        <ChevronRight/>
      </button>
      <button
        className={`custom-button-next ${bgButtons} ${styles.customButtonNext} ${endButton ? styles.buttonDeactive : ''}`}
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