"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/** Halqa to'liq chizilishi uchun ketadigan vaqt (ms) - globals.css bilan mos bo'lishi shart */
const RING_DURATION = 2200;
/** Xavfsizlik chorasi: biror resurs osilib qolsa ham loader ketadi */
const MAX_DURATION = 5000;
/** So'nib yo'qolish vaqti */
const FADE_DURATION = 700;

export function SiteLoader() {
  const [mounted, setMounted] = useState(true);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const started = Date.now();
    let fadeTimer = 0;

    const startExit = () => {
      setHiding(true);
      fadeTimer = window.setTimeout(() => setMounted(false), FADE_DURATION);
    };

    const finish = () => {
      const elapsed = Date.now() - started;
      const wait = Math.max(0, RING_DURATION - elapsed);
      window.setTimeout(startExit, wait);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    const failsafe = window.setTimeout(startExit, MAX_DURATION);

    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(failsafe);
      window.clearTimeout(fadeTimer);
    };
  }, []);

  // Loader ochiq turganda sahifa scroll qilinmasin
  useEffect(() => {
    document.body.style.overflow = mounted ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[#5F6E4D] transition-all duration-700 ease-in-out ${
        hiding ? "pointer-events-none scale-[1.04] opacity-0" : "opacity-100"
      }`}
    >
      {/* Sekin suzuvchi yorug'lik dog'lari - fonga chuqurlik beradi */}
      <span className="loader-glow loader-glow-a pointer-events-none absolute h-[38rem] w-[38rem] rounded-full bg-white/[0.07] blur-3xl" />
      <span className="loader-glow loader-glow-b pointer-events-none absolute h-[30rem] w-[30rem] rounded-full bg-black/10 blur-3xl" />

      <div className="relative flex h-[280px] w-[280px] items-center justify-center sm:h-[360px] sm:w-[360px]">
        {/* Suvga tomchi tushgandek tarqaluvchi halqalar */}
        <span className="loader-ripple loader-ripple-1 pointer-events-none absolute inset-0 rounded-full border border-white/25" />
        <span className="loader-ripple loader-ripple-2 pointer-events-none absolute inset-0 rounded-full border border-white/20" />
        <span className="loader-ripple loader-ripple-3 pointer-events-none absolute inset-0 rounded-full border border-white/15" />

        {/* Chizilib boruvchi halqa */}
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
            className="loader-ring"
          />
        </svg>

        {/* Halqa uchida yurib boruvchi yorug' nuqta */}
        <span className="loader-orbit pointer-events-none absolute h-[96%] w-[96%]">
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_12px_4px_rgba(255,255,255,0.55)]" />
        </span>

        {/* Logo */}
        <div className="loader-logo relative px-12">
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
      </div>
    </div>
  );
}