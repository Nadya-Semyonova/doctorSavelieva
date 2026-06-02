import { useNavigate } from "react-router-dom";
import Telegram from "../../assets/images/IconsSvg/Telegram";
import ThumbsUp from "../../assets/images/IconsSvg/ThumbsUp";
import ButtonDefault from "../../shared/ui/Button/ButtonDefault";
import styles from "./Links.module.css";
import Wave from "../../shared/ui/Waves/Wave";
import { useMemo } from "react";

export default function Links() {
  const navigate = useNavigate();
  const isCompact = useMemo(() => window.innerWidth <= 1440, []);

  const handleSchoolNavigate = () => {
    navigate("/school");
  };

  return (
    <section className={styles.links}>
      <h2 className={styles.title}>Присоединяйся к сообществу в Telegram</h2>

      <div className={styles.card}>
        <Telegram className={styles.icon} />
        <p className={styles.text}>Телеграм-канал Ревматолог Савельева</p>
        <ButtonDefault
          name="Вступить"
          href="https://t.me/revmaSavelieva"
          target="_blank"
          styleButton={styles.LinkButton}
        />
      </div>

      <div className={styles.card}>
        <ThumbsUp className={styles.icon} />
        <p className={styles.text}>Полезные материалы: вебинары, памятки</p>
        <ButtonDefault
          name="Получить"
          handleClick={handleSchoolNavigate}
          styleButton={styles.LinkButton}
        />
      </div>
      <Wave className={styles.wave} variant="links" compact={isCompact} />
    </section>
  );
}
