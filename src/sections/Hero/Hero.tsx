import doctorImage from "../../assets/images/Gallery/Photo/IMG_9916рт.jpg";
import Wave from "../../shared/ui/Waves/Wave";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.textBlock}>
            <h1>Ревматолог</h1>

            <p className={styles.text}>врач доказательной медицины с опытом работы 16 лет</p>
          </div>

          <div className={styles.textBlock}>
            <h1>Савельева Юлия Олеговна</h1>

            <p className={styles.text}>
              Онлайн консультации по всему миру <br />
              Очный приём в Калининграде
            </p>
          </div>
        </div>

        <div className={styles.imageWrapper}>
          <img src={doctorImage} alt="Савельева Юлия Олеговна" className={styles.image} />
        </div>
      </div>

      <Wave className={styles.wave} variant="hero" />
    </section>
  );
}
