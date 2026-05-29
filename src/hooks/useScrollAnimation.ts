import { type RefObject, useEffect } from "react";

export default function useScrollAnimation(
  ref: RefObject<HTMLElement | null>,
  className: string,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const items =
            entry.target.querySelectorAll(".animate-on-scroll");

          items.forEach((item, idx) => {
            setTimeout(() => {
              item.classList.add(className);
            }, idx * 100);
          });

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(el);

    return () => observer.disconnect();
  }, [ref, className]);
}