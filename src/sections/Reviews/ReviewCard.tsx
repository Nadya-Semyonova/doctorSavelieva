import type { IReviewCard } from "../../types/types";
import styles from "./Reviews.module.css";
import { getFilledStars } from "../../utils/rating";

export default function ReviewCard({
  date,
  rating,
  text,
  index,
}: IReviewCard) {
  const filledStars = getFilledStars(rating);
  const stars = Array.from({ length: 5 });

  return (
    <div
      className={`${styles.reviewCard} animate-on-scroll`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={styles.reviewHeader}>
        <span className={styles.ratingValue}>{rating}</span>

        <div className={styles.ratingStars}>
          {stars.map((_, i) => (
            <span
              key={i}
              className={`${styles.star} ${
                i < filledStars ? styles.starFilled : ""
              }`}
            >
              {i < filledStars ? "★" : "☆"}
            </span>
          ))}
        </div>

        <span className={styles.reviewDate}>{date}</span>
      </div>

      <div className={styles.reviewText}>
        <p>{text}</p>
      </div>
    </div>
  );
}