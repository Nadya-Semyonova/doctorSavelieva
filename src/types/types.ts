export interface IButtonDefault {
  name?: string;
  handleClick?: () => void;
  styleButton?: string;
  type?: "button" | "submit" | "reset";
  variant?: "outline" | "continue";
  ariaLabel?: string;
  children?: React.ReactNode;
  status?: boolean;
  href?: string;
  target?: "_blank" | "_self";
  disabled?: boolean;
}

export interface IUsersCardsSwiper {
  children: React.ReactNode | React.ReactNode[];
  bgButtons?: string;
  spaceBetween?: number;
  slidesPerView?: number;
  slidesPerViewMobile?: number; // добавлено для адаптива
  slidesPerViewTablet?: number; // добавлено для адаптива
  slidesPerViewDesktop?: number; // добавлено для адаптива
  showPagination?: boolean;
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
  index: number;
}

export interface IHeader {
  onNavigate?: (sectionId: string) => void;
  onConsultationClick?: () => void;
}

export interface IEducationSection {
  id: string;
  title: string;
  content: string;
}

export interface IAppointmentFormData {
  fullName: string;
  phone: string;
  email: string;
  consentPersonal: boolean;
  consentOffer: boolean;
}
