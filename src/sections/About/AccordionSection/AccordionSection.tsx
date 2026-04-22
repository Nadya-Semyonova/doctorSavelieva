import { useEffect, useRef, useState } from "react";
import ChevronUp from "./../../../assets/images/IconsSvg/ChevronUp";
import style from "./AccordionSection.module.css";

type Props = {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export default function AccordionSection({ title, children, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    setHeight(open ? ref.current.scrollHeight : 0);
  }, [open]);

  return (
    <div className={style.accordion}>
      <button
        type="button"
        className={style.accordionHeader}
        onClick={() => setOpen((prev) => !prev)}
      >
        <h3 className={style.accordionTitle}>{title}</h3>

        <ChevronUp className={`${style.accordionIcon} ${open ? style.accordionIconOpen : ""}`} />
      </button>

      <div className={style.accordionContent} style={{ height }}>
        <div ref={ref} className={style.accordionInner}>
          {children}
        </div>
      </div>
    </div>
  );
}
