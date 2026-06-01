import { useState } from "react";
import Tabs, { type TabId } from "./Tabs/Tabs";
import EducationTab from "./EducationTab/EducationTab";
import ExperienceTab from "./ExperienceTab/ExperienceTab";
import DirectionsTab from "./DirectionsTab/DirectionsTab";
import styles from "./About.module.css";

const TAB_CONTENT: Record<TabId, React.ReactNode> = {
  education: <EducationTab />,
  experience: <ExperienceTab />,
  directions: <DirectionsTab />,
};

export default function About() {
  const [activeTab, setActiveTab] = useState<TabId>("education");

  return (
    <section className={styles.about}>
      <div className={styles.info}>
        <h2 className={styles.title}>Обо мне</h2>
        <p className={styles.intro}>
          Савельева Юлия Олеговна — опытный врач-ревматолог с 16-летним стажем.
          <br />
          Придерживаюсь принципов доказательной медицины, что гарантирует пациентам
          эффективное и безопасное лечение.
        </p>
      </div>

      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

      {TAB_CONTENT[activeTab]}
    </section>
  );
}