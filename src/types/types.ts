export interface IButtonDefault {
  name?: string;
  handleClick?: () => void;
  styleButton?: string;
  type?: "button" | "submit" | "reset";
  variant?: "outline" | "continue";
  ariaLabel?: string;
  children?: React.ReactNode;
  status?: boolean;
  href?: string; // добавляем для внешних ссылок
  target?: "_blank" | "_self"; // добавляем target
}

export interface IUsersCardsSwiper {
  children: React.ReactNode | React.ReactNode[]; // расширяем тип для поддержки массива слайдов
  bgButtons?: string;
  spaceBetween?: number;
  slidesPerView?: number;
  slidesPerViewMobile?: number; // добавлено для адаптива
  slidesPerViewTablet?: number; // добавлено для адаптива
  slidesPerViewDesktop?: number; // добавлено для адаптива
  showPagination?: boolean; // добавляем пагинацию
  sliderId?: string;
}

export interface IReview {
  id: number;
  date: string;
  rating: number;
  text: string;
}

export interface IReviewCard {
  date: string;
  rating: number;
  text: string;
  index: number; // для анимации
}

export interface IHeader {
  onNavigate?: (sectionId: string) => void; // Опциональный колбэк для навигации
  onConsultationClick?: () => void; // Опциональный колбэк для кнопки консультации
}
