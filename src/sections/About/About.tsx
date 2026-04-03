import { educationData } from "../../assets/data/educationData";
import AccordionSection from "./AccordionSection/AccordionSection";

export default function About() {
  return (
    <section className="about">
      <h2>Обо мне</h2>
      <p>
        Ревматолог Савельева - опытный врач с 16-летним стажем, специализирующийся на лечении
        ревматических заболеваний. Она придерживается принципов доказательной медицины, что
        гарантирует пациентам эффективное и безопасное лечение.
      </p>

      {/* пример как вставлять аккордеон */}
      {educationData.map((item) => (
        <AccordionSection key={item.id} title={item.title}>
          <p>{item.content}</p>
        </AccordionSection>
      ))}

    </section>
  );
}
