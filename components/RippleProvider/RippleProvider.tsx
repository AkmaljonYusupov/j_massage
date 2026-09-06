"use client";

import { useEffect } from "react";

/**
 * Butun sayt bo'ylab ishlaydigan yagona tinglovchi.
 *
 * Sichqoncha tugmaning qaysi TOMONIDAN kirganini aniqlaydi va shu
 * yo'nalishni CSS o'zgaruvchilariga (--ex, --ey) yozadi. To'ldirish
 * o'sha tomondan surilib kiradi. Sichqoncha chiqqanda esa chiqish
 * tomoni yoziladi va to'ldirish o'sha tomonga surilib chiqadi.
 *
 * Telefonlarda hover yo'q, shuning uchun barmoq tekkan nuqta ham
 * hisobga olinadi va effekt bosilganda ishlaydi.
 */
export function RippleProvider() {
  useEffect(() => {
    /** Nuqta qaysi chetga eng yaqin ekanini aniqlaydi */
    const setDirection = (
      el: HTMLElement,
      clientX: number,
      clientY: number
    ) => {
      const rect = el.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const distances = [
        { edge: "left", value: x },
        { edge: "right", value: rect.width - x },
        { edge: "top", value: y },
        { edge: "bottom", value: rect.height - y },
      ];

      const nearest = distances.reduce((a, b) => (a.value < b.value ? a : b));

      const vectors: Record<string, [number, number]> = {
        left: [-1, 0],
        right: [1, 0],
        top: [0, -1],
        bottom: [0, 1],
      };

      const [ex, ey] = vectors[nearest.edge];
      el.style.setProperty("--ex", `${ex}`);
      el.style.setProperty("--ey", `${ey}`);
    };

    const onEnter = (event: MouseEvent) => {
      const el = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-ripple]"
      );
      if (!el || el.dataset.rippleActive === "1") return;
      el.dataset.rippleActive = "1";
      setDirection(el, event.clientX, event.clientY);
    };

    const onLeave = (event: MouseEvent) => {
      const el = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-ripple]"
      );
      if (!el) return;
      delete el.dataset.rippleActive;
      setDirection(el, event.clientX, event.clientY);
    };

    const onTouch = (event: TouchEvent) => {
      const el = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-ripple]"
      );
      const touch = event.touches[0];
      if (!el || !touch) return;
      setDirection(el, touch.clientX, touch.clientY);
    };

    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    document.addEventListener("touchstart", onTouch, { passive: true });

    return () => {
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      document.removeEventListener("touchstart", onTouch);
    };
  }, []);

  return null;
}