import { useState } from "react";
import EducationTab from "./EducationTab/EducationTab";
import Tabs, { type TabId } from "./Tabs/Tabs";
import styles from "./About.module.css";
import DirectionsTab from "./DirectionsTab/DirectionsTab";
import ExperienceTab from "./ExperienceTab/ExperienceTab";

export default function About() {
  const [activeTab, setActiveTab] = useState<TabId>("education");

  return (
    <section className={styles.about}>
      <div className={styles.info}> 
        <h2 className={styles.title}>Обо мне</h2>
        <p className={styles.intro}>
          Савельева Юлия Олеговна - опытный врач- ревматолог с 16-летним стажем. Придерживаюсь принципов доказательной медицины, что гарантирует пациентам эффективное и безопасное лечение.
        </p>
      </div>

      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "education" && <EducationTab />}

      {activeTab === "experience" && <ExperienceTab />}

      {activeTab === "directions" && <DirectionsTab />}

    </section>
  );
}
