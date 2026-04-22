import { useEffect } from "react";
import styles from "./Modal.module.css";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<IModalProps> = ({ isOpen, onClose, children, title }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        {title && <h3 className={styles.modalTitle}>{title}</h3>}
        <button className={styles.modalClose} onClick={onClose} aria-label="Закрыть">
          ×
        </button>
        <div className={styles.modalBody}>{children}</div>
        <button className={styles.modalButton} onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default Modal;
