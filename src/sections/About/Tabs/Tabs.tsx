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
          <button
            key={id}
            type="button"
            onClick={() => onTabChange(id)}
            className={`${styles.tabButton} ${isActive ? styles.active : ""}`}
            aria-pressed={isActive}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}