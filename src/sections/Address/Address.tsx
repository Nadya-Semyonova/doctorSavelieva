import { CONTACTS } from "../../assets/data/contacts";
import ButtonDefault from "../../shared/ui/Button/ButtonDefault";
import Map from "../../shared/ui/Map/Map";
import styles from './Address.module.css'

export default function Address() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Адреса</h2>

      <div className={styles.content}>
        <div className={styles.info}>
          <p className={styles.text}>
            Очный приём проводится в городе Калининград в клинике
            «Добрый Докторъ».
          </p>

          <div className={styles.action}>
            <ButtonDefault status={false}>
              Записаться в клинике
            </ButtonDefault>
          </div>

          <div className={styles.textSecondary}>
            <p>
              На очном приеме использую в своей работе:
            </p>

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
    </section>
  )
}