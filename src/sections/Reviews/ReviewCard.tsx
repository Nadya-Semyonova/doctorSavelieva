import type { IReviewCard } from "../../types/types";
import styles from "./Reviews.module.css";

export default function ReviewCard({ date, rating, text, index }: IReviewCard) {
  return (
    <div
      className={`${styles.reviewCard} animate-on-scroll`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={styles.reviewHeader}>
        <span className={styles.reviewRating}>
          <span className={styles.ratingValue}>{rating}</span>

          <span className={styles.ratingStars}>
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`${styles.star} ${i < Math.floor(rating) ? styles.starFilled : ""}`}
              >
                {i < Math.floor(rating) ? "★" : "☆"}
              </span>
            ))}
            <span className={styles.reviewDate}>{date}</span>
          </span>
        </span>
      </div>
      <div className={styles.reviewText}>
        <p>{text}</p>
      </div>
    </div>
  );
}
