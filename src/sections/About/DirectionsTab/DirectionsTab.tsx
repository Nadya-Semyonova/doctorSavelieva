import styles from "./DirectionsTab.module.css";
export default function DirectionsTab() {
  const directions = [
    "ревматоидный артрит",
    "спондилоартрит (например Болезнь Бехтерева, Псориатический артрит)",
    "микрокристаллические артриты (Подагра, Болезнь депонирования пирофосфата кальция)",
    "остеоартрит (артроз)",
    "остеопороз",
    "хронический болевой синдром у пациентов ревматологического профиля",
    "системные заболевания соединительной ткани (например Системная красная волчанка, болезнь Шегрена, системная склеродермия, васкулиты и тд.)",
  ];

  return (
    <div className={styles.directions}>
      <p className={styles.intro}>
        ‌Врач-ревматолог занимается диагностикой, лечением пациентов с заболеваниями суставов,
        позвоночника и соединительной ткани, а также профилактикой заболеваний суставов.
      </p>
      <div className={styles.directionsContent}>
        <p className={styles.directionsTitle}>Ведущие направления в работе:</p>
        <ul className={styles.directionsList}>
          {directions.map((direction) => (
            <li key={direction}>{direction};</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
