import { useState } from "react";
import { educationData } from "../../assets/data/educationData";
import AccordionSection from "./AccordionSection/AccordionSection";
import Tabs, { type TabId } from "./Tabs/Tabs";

export default function About() {
  const [activeTab, setActiveTab] = useState<TabId>("education");

  return (
    <section className="about">
      <h2>Обо мне</h2>
      <p>
        Ревматолог Савельева - опытный врач-ревматолог с 16-летним стажем. Придерживаюсь принципов доказательной медицины, что
        гарантирует пациентам эффективное и безопасное лечение.
      </p>

      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "education" && (
        <>
          {educationData.map((item) => (
            <AccordionSection key={item.id} title={item.title}>
              <p>{item.content}</p>
            </AccordionSection>
          ))}
        </>
      )}

      {activeTab === "experience" && <p>Контент опыта</p>}

      {activeTab === "directions" && <p>Контент направлений</p>}

    </section>
  );
}
