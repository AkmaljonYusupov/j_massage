"use client";

import { useEffect } from "react";

/**
 * Butun sayt bo'ylab ishlaydigan yagona tinglovchi.
 *
 * "data-ripple" atributi bo'lgan istalgan elementga sichqoncha kirganda,
 * kirish nuqtasini CSS o'zgaruvchilariga (--rx, --ry) yozib qo'yadi.
 * Qolgan ishni globals.css dagi ".ripple-btn" klassi bajaradi.
 *
 * Shu sababli yangi tugmaga effekt qo'shish uchun JS yozish shart emas -
 * faqat ikkita narsa kerak: data-ripple atributi va ripple-btn klassi.
 */
export function RippleProvider() {
  useEffect(() => {
    const onEnter = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const el = target?.closest<HTMLElement>("[data-ripple]");
      if (!el) return;

      const rect = el.getBoundingClientRect();
      el.style.setProperty("--rx", `${event.clientX - rect.left}px`);
      el.style.setProperty("--ry", `${event.clientY - rect.top}px`);
    };

    // "mouseover" ishlatiladi, chunki u ko'pikka chiqadi (mouseenter esa yo'q)
    document.addEventListener("mouseover", onEnter);
    return () => document.removeEventListener("mouseover", onEnter);
  }, []);

  return null;
}