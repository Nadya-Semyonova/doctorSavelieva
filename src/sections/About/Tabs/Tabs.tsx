import styles from "./Tabs.module.css";

export type TabId = "education" | "experience" | "directions";

interface ITabsProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function Tabs({ activeTab, onTabChange }: ITabsProps) {
  const tabs = [
    { id: "education", label: "Образование" },
    { id: "experience", label: "Опыт работы" },
    { id: "directions", label: "Направления работы" },
  ] as const;

  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ""}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
