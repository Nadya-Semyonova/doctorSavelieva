export interface IButtonDefault {
  name?: string;
  handleClick?: () => void;
  styleButton?: string;
  type?: "button" | "submit" | "reset";
  variant?: "outline" | "continue";
  ariaLabel?: string;
  children?: React.ReactNode;
  status?: boolean;
}

export interface IUsersCardsSwiper {
  children: React.ReactElement; // готовые слайды в формате указанном ниже
  bgButtons?: string; // bg для кнопок вперед назад
  spaceBetween?: number; // gap между слайдами
  slidesPerView?: number; // количество слайдов  в видимой зоне (для карточек 4 для фото 1)
  sliderId?: string; // ДОБАВЛЯЕМ для переключения разных слайдеров Скорее всего не нужно
}

export interface IHeader {
  onNavigate?: (sectionId: string) => void; // Опциональный колбэк для навигации
  onConsultationClick?: () => void; // Опциональный колбэк для кнопки консультации
}

// import { SwiperSlide } from "swiper/react";
//         <SwiperSlide>
//         Нужый компонент в 1 экземпляре
//         </SwiperSlide>
