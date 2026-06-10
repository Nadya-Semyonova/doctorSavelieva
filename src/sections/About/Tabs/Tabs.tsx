import ButtonDefault from "../../../shared/ui/Button/ButtonDefault";
import styles from "./Tabs.module.css";

export type TabId = "education" | "experience" | "directions";

interface ITabsProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const TABS: ReadonlyArray<{ id: TabId; label: string }> = [
  { id: "education", label: "Образование" },
  { id: "experience", label: "Опыт работы" },
  { id: "directions", label: "Направления работы" },
];

export default function Tabs({ activeTab, onTabChange }: ITabsProps) {
  return (
    <div className={styles.tabs}>
      {TABS.map(({ id, label }) => {
        const isActive = activeTab === id;

        return (
          <ButtonDefault
            key={id}
            type="button"
            handleClick={() => onTabChange(id)}
            ariaLabel={label}
            styleButton={`${styles.tabButton} ${isActive ? styles.active : ""}`}
          >
            {label}
          </ButtonDefault>
        );
      })}
    </div>
  );
}