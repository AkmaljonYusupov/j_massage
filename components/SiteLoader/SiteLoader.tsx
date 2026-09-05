"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/** Halqa to'liq chizilishi uchun ketadigan vaqt (ms) - CSS bilan mos bo'lishi shart */
const RING_DURATION = 2200;
/** Xavfsizlik chorasi: biror resurs osilib qolsa ham loader ketadi */
const MAX_DURATION = 5000;
/** So'nib yo'qolish vaqti */
const FADE_DURATION = 600;

export function SiteLoader() {
  const [mounted, setMounted] = useState(true);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const started = Date.now();
    let fadeTimer = 0;

    const finish = () => {
      const elapsed = Date.now() - started;
      const wait = Math.max(0, RING_DURATION - elapsed);

      window.setTimeout(() => {
        setHiding(true);
        fadeTimer = window.setTimeout(() => setMounted(false), FADE_DURATION);
      }, wait);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    const failsafe = window.setTimeout(() => {
      setHiding(true);
      fadeTimer = window.setTimeout(() => setMounted(false), FADE_DURATION);
    }, MAX_DURATION);

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
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-[#5F6E4D] transition-opacity duration-[600ms] ease-in-out ${
        hiding ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative flex h-[280px] w-[280px] items-center justify-center sm:h-[360px] sm:w-[360px]">
        {/*
          Halqa sekin-asta chiziladi.
          Animatsiya "loaderRing" nomi bilan globals.css da yozilgan:
          stroke-dashoffset 604 dan 0 gacha kamayadi (604 - doira uzunligi).
          -90 daraja burilgan, shuning uchun chizish tepadan boshlanadi.
        */}
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