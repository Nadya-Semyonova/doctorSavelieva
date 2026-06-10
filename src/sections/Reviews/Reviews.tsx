import { useRef, useMemo } from "react";
import { reviews } from "../../assets/data/reviews.data";

import {
  calculateRating,
  getFilledStars,
} from "../../utils/rating";

import ButtonDefault from "../../shared/ui/Button/ButtonDefault";
import CarouselSlider from "../../shared/ui/CarouselSlider/CarouselSlider";
import ReviewCard from "./ReviewCard";

import styles from "./Reviews.module.css";
import useScrollAnimation from "../../hooks/useScrollAnimation";

export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const rating = useMemo(() => calculateRating(reviews), []);
  const filledStars = useMemo(() => getFilledStars(rating), [rating]);
  useScrollAnimation(sectionRef, styles.animated);

  const reviewSlides = useMemo(
    () =>
      reviews.map((review, index) => (
        <ReviewCard
          key={review.id}
          date={review.date}
          rating={review.rating}
          text={review.text}
          index={index}
        />
      )),
    [],
  );

  return (
    <section ref={sectionRef} className={styles.reviews}>
      <div className={styles.container}>
        <div className={styles.reviewsHeader}>
          <div className={styles.headerLeft}>
            <h2 className={styles.title}>Отзывы</h2>

            <div className={styles.ratingBlock}>
              <span className={styles.ratingLabel}>
                Рейтинг на ПроДокторов
              </span>

              <div className={styles.ratingDisplay}>
                <span className={styles.ratingNumber}>{rating}</span>

                <div className={styles.starsDisplay}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`${styles.starIcon} ${
                        i < filledStars
                          ? styles.starIconFilled
                          : ""
                      }`}
                    >
                      {i < filledStars ? "★" : "☆"}
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
    </section>
  );
}