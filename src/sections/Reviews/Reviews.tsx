import { useRef, useEffect } from "react";
import { reviews } from "../../assets/data/reviews.data";
import ButtonDefault from "../../shared/ui/Button/ButtonDefault";
import CarouselSlider from "../../shared/ui/CarouselSlider/CarouselSlider";
import ReviewCard from "./ReviewCard";
import styles from "./Reviews.module.css";
import Wave from "../../shared/ui/Waves/Wave";

export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);

  // Вычисляем средний рейтинг
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  // Форматируем рейтинг до 1 десятичного знака
  const formattedRating = averageRating.toFixed(1);

  // Анимация появления при скролле
  useEffect(() => {
    // Сохраняем текущее значение ref в переменную
    const currentSection = sectionRef.current;

    if (!currentSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".animate-on-scroll");
            cards.forEach((card, idx) => {
              setTimeout(() => {
                card.classList.add(styles.animated);
              }, idx * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(currentSection);

    return () => {
      observer.unobserve(currentSection);
    };
  }, []); // Пустой массив зависимостей, так как используем сохраненную переменную

  // Создаем слайды из отзывов
  const reviewSlides = reviews.map((review, index) => (
    <ReviewCard
      key={review.id}
      date={review.date}
      rating={review.rating}
      text={review.text}
      index={index}
    />
  ));

  return (
    <section ref={sectionRef} className={styles.reviews}>
      <div className={styles.container}>
        <div className={styles.reviewsHeader}>
          <div className={styles.headerLeft}>
            <h2 className={styles.title}>Отзывы</h2>
            <div className={styles.ratingBlock}>
              <span className={styles.ratingLabel}>Рейтинг на ПроДокторов</span>
              <div className={styles.ratingDisplay}>
                <span className={styles.ratingNumber}>{formattedRating}</span>
                <div className={styles.starsDisplay}>
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`${styles.starIcon} ${i < Math.floor(parseFloat(formattedRating)) ? styles.starIconFilled : ""}`}
                    >
                      {i < Math.floor(parseFloat(formattedRating)) ? "★" : "☆"}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <ButtonDefault
            name="Все отзывы"
            href="https://prodoctorov.ru/kaliningrad/vrach/144413-saveleva/"
            target="_blank"
            styleButton={styles.allReviewsButton}
          />
        </div>

        <div className={styles.sliderWrapper}>
          <CarouselSlider
            slidesPerViewDesktop={3}
            slidesPerViewTablet={2}
            slidesPerViewMobile={1}
            spaceBetween={20}
            showPagination={false}
            variant="side"
          >
            {reviewSlides}
          </CarouselSlider>
        </div>
      </div>
      <Wave className={styles.wave} variant="reviews" />
    </section>
  );
}
