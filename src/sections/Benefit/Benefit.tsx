import Wave from "../../shared/ui/Waves/Wave";
import styles from './Benefit.module.css'

const benefits = [
  'Получите дальнейшую тактику лечения и маршрутизацию исходя из жалоб и/или диагноза',
  'Получите второе мнение по поводу уже имеющегося диагноза и/или лечения',
  'Получите расшифровку и/или комментарии по результатам анализов и/или исследований',
  'Получите информацию, какие состояния могут быть связаны с вашими симптомами',
]

export default function Benefit() {
  return (
    <section className={styles.benefit}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Польза онлайн-консультации</h2>

        <p className={styles.subtitle}>
          Чем полезна информационная онлайн консультация?
        </p>

        <div className={styles.grid}>
          {benefits.map((item, index) => (
            <div key={index} className={styles.card}>
              {item}
            </div>
          ))}
        </div>
      </div>

      <Wave className={styles.wave} variant="benefit" />
    </section>
  )
}