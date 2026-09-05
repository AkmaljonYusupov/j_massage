"use client";

import { useEffect } from "react";

/**
 * Butun sayt bo'ylab ishlaydigan yagona tinglovchi.
 *
 * Sichqoncha tugmaga KIRGAN nuqtani ham, undan CHIQQAN nuqtani ham
 * CSS o'zgaruvchilariga (--rx, --ry) yozib qo'yadi. Shu sababli
 * to'ldirish kirgan joydan yoyiladi va chiqqan joyga qarab yig'iladi -
 * harakat sichqonchani "ergashib" boradi.
 *
 * Telefonlarda hover yo'q, shuning uchun barmoq tekkan nuqta ham
 * hisobga olinadi va effekt bosilganda ishlaydi.
 */
export function RippleProvider() {
  useEffect(() => {
    const setPoint = (el: HTMLElement, clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--rx", `${clientX - rect.left}px`);
      el.style.setProperty("--ry", `${clientY - rect.top}px`);
    };

    const onPointerMove = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const el = target?.closest<HTMLElement>("[data-ripple]");
      if (!el) return;
      // Faqat effekt hali boshlanmagan bo'lsa yangilanadi
      if (el.dataset.rippleActive === "1") return;
      el.dataset.rippleActive = "1";
      setPoint(el, event.clientX, event.clientY);
    };

    const onPointerLeave = (event: MouseEvent) => {
      const el = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-ripple]"
      );
      if (!el) return;
      delete el.dataset.rippleActive;
      // Chiqish nuqtasi: doira o'sha tomonga yig'iladi
      setPoint(el, event.clientX, event.clientY);
    };

    const onTouch = (event: TouchEvent) => {
      const el = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-ripple]"
      );
      const touch = event.touches[0];
      if (!el || !touch) return;
      setPoint(el, touch.clientX, touch.clientY);
    };

    document.addEventListener("mouseover", onPointerMove);
    document.addEventListener("mouseout", onPointerLeave);
    document.addEventListener("touchstart", onTouch, { passive: true });

    return () => {
      document.removeEventListener("mouseover", onPointerMove);
      document.removeEventListener("mouseout", onPointerLeave);
      document.removeEventListener("touchstart", onTouch);
    };
  }, []);

  return null;
}