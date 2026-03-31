import { CONTACTS } from "../../assets/data/contacts";
import ButtonDefault from "../../shared/ui/Button/ButtonDefault";
import Map from "../../shared/ui/Map/Map";
import Wave from "../../shared/ui/Waves/Wave";
import styles from "./Address.module.css";

export default function Address() {
  const handleClinicBooking = () => {
    window.open("https://dobrodoctor39.ru/", "_blank", "noopener,noreferrer");
  };
  return (
    <section className={styles.address}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Адреса</h2>

        <div className={styles.content}>
          <div className={styles.info}>
            <p className={styles.text}>
              Очный приём проводится в городе Калининград в клинике «Добрый Докторъ».
            </p>

            <div className={styles.action}>
              <ButtonDefault
                handleClick={handleClinicBooking}
                ariaLabel="Перейти на сайт клиники Добрый Докторъ"
              >
                Записаться в клинике
              </ButtonDefault>
            </div>

            <div className={styles.textSecondary}>
              <p>На очном приеме использую в своей работе:</p>

              <ul className={styles.list}>
                <li>УЗИ-навигацию,</li>
                <li>Инъекционную терапию,</li>
                <li>Изготовливаю индивидуальные кистевые ортезы</li>
                <li>Анализирую МРТ, рентген и КТ исследования</li>
              </ul>
            </div>
          </div>

          <div className={styles.map}>
            <Map src={CONTACTS.mapUrl} />
          </div>
        </div>
      </div>

      <Wave className={styles.wave} variant="address" />
    </section>
  );
}
