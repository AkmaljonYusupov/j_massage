"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/** Doira uzunligi: 2 * PI * 96 */
const CIRCUMFERENCE = 604;
/** Hech qanday holatda shundan uzoq kutilmaydi */
const FAILSAFE = 8000;
/** So'nib yo'qolish vaqti */
const FADE_DURATION = 700;

export function SiteLoader() {
  const [mounted, setMounted] = useState(true);
  const [hiding, setHiding] = useState(false);
  const [progress, setProgress] = useState(0);

  const targetRef = useRef(6);
  const shownRef = useRef(0);

  useEffect(() => {
    /**
     * Haqiqiy yuklanish bosqichlari kuzatiladi:
     *   DOM tayyor        -> 35%
     *   shriftlar tayyor  -> 45%
     *   rasmlar           -> 35% dan 90% gacha (yuklanganlari nisbatida)
     *   window load       -> 100%
     * Qiymat hech qachon orqaga qaytmaydi.
     */
    const bump = (value: number) => {
      targetRef.current = Math.max(targetRef.current, Math.min(96, value));
    };

    const complete = () => {
      targetRef.current = 100;
    };

    // DOM
    const onDomReady = () => bump(35);
    if (document.readyState !== "loading") {
      onDomReady();
    } else {
      document.addEventListener("DOMContentLoaded", onDomReady, { once: true });
    }

    // Shriftlar
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => bump(45)).catch(() => undefined);
    }

    // Rasmlar - qanchasi yuklangani nisbatida
    const imageTimer = window.setInterval(() => {
      const images = Array.from(document.images);
      if (images.length === 0) return;
      const done = images.filter((img) => img.complete).length;
      bump(35 + (done / images.length) * 55);
    }, 120);

    // To'liq yuklanish
    if (document.readyState === "complete") {
      complete();
    } else {
      window.addEventListener("load", complete, { once: true });
    }

    /*
      "Sudralish": agar biror bosqich cho'zilib ketsa, ko'rsatkich juda
      sekin bo'lsa ham oldinga siljiydi - foydalanuvchi qotib qolgan deb
      o'ylamasligi uchun. 96% dan oshmaydi, oxirgi 4% faqat haqiqiy
      yuklanish tugagach beriladi.
    */
    const creepTimer = window.setInterval(() => {
      bump(targetRef.current + 0.5);
    }, 220);

    // Ko'rsatkichni silliq tortib boruvchi tsikl
    let frame = 0;
    const tick = () => {
      const target = targetRef.current;
      shownRef.current += (target - shownRef.current) * 0.08;
      if (target - shownRef.current < 0.25) shownRef.current = target;
      setProgress(shownRef.current);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const failsafe = window.setTimeout(complete, FAILSAFE);

    return () => {
      document.removeEventListener("DOMContentLoaded", onDomReady);
      window.removeEventListener("load", complete);
      window.clearInterval(imageTimer);
      window.clearInterval(creepTimer);
      window.clearTimeout(failsafe);
      cancelAnimationFrame(frame);
    };
  }, []);

  // 100% ga yetganda chiqish
  useEffect(() => {
    if (progress < 99.6 || hiding) return;
    const t = window.setTimeout(() => {
      setHiding(true);
      window.setTimeout(() => setMounted(false), FADE_DURATION);
    }, 260);
    return () => window.clearTimeout(t);
  }, [progress, hiding]);

  // Loader ochiq turganda sahifa scroll qilinmasin
  useEffect(() => {
    document.body.style.overflow = mounted ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mounted]);

  if (!mounted) return null;

  const percent = Math.min(100, Math.round(progress));
  const dashOffset = CIRCUMFERENCE - (CIRCUMFERENCE * percent) / 100;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[#5F6E4D] transition-all duration-700 ease-in-out ${
        hiding ? "pointer-events-none scale-[1.04] opacity-0" : "opacity-100"
      }`}
    >
      {/* Fondagi sekin suzuvchi yorug'lik dog'lari */}
      <span className="loader-glow-a pointer-events-none absolute h-[38rem] w-[38rem] rounded-full bg-white/[0.07] blur-3xl" />
      <span className="loader-glow-b pointer-events-none absolute h-[30rem] w-[30rem] rounded-full bg-black/10 blur-3xl" />

      <div className="relative flex h-[280px] w-[280px] items-center justify-center sm:h-[360px] sm:w-[360px]">
        {/* Suvga tomchi tushgandek tarqaluvchi halqalar */}
        <span className="loader-ripple loader-ripple-1 pointer-events-none absolute inset-0 rounded-full border border-white/25" />
        <span className="loader-ripple loader-ripple-2 pointer-events-none absolute inset-0 rounded-full border border-white/20" />
        <span className="loader-ripple loader-ripple-3 pointer-events-none absolute inset-0 rounded-full border border-white/15" />

        {/* Haqiqiy foizga qarab to'ladigan halqa */}
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 h-full w-full -rotate-90"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="100"
            cy="100"
            r="96"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="1.4"
          />
          <circle
            cx="100"
            cy="100"
            r="96"
            stroke="#ffffff"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
          />
        </svg>

        {/* Halqa uchida yurib boruvchi yorug' nuqta */}
        <span
          className="pointer-events-none absolute h-[96%] w-[96%]"
          style={{ transform: `rotate(${(percent / 100) * 360}deg)` }}
        >
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_12px_4px_rgba(255,255,255,0.55)]" />
        </span>

        {/* Logo va foiz */}
        <div className="relative flex flex-col items-center px-12">
          <div className="loader-logo">
            <Image
              src="/logo-white.png"
              alt="J Massage School"
              width={1756}
              height={652}
              priority
              quality={100}
              unoptimized
              className="h-14 w-auto sm:h-16"
            />
          </div>

          <span className="mt-5 text-[13px] font-bold tabular-nums tracking-[0.2em] text-white/70">
            {percent}%
          </span>
        </div>
      </div>
    </div>
  );
}