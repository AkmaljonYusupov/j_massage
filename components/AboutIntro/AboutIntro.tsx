"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Phone } from "lucide-react";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import {
  ABOUT_IMAGE_CARD,
  ABOUT_IMAGE_LARGE,
  ABOUT_IMAGE_SMALL,
  ABOUT_PHONE_DISPLAY,
  ABOUT_PHONE_HREF,
  ABOUT_STATS,
} from "./aboutIntro.data";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/**
 * Noldan berilgan songacha sanaydi - blok ekranga kirganda bir marta.
 * Raqam ortidagi belgi ("+", "k+") o'zgarmasdan qoladi.
 */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();

  // "500+" -> raqam 500, qo'shimcha "+"
  const target = parseInt(value.replace(/\D/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setShown(target);
      return;
    }

    const duration = 1600;
    const started = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / duration);
      // easeOutCubic - oxiriga borib sekinlashadi
      const eased = 1 - Math.pow(1 - progress, 3);
      setShown(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, reduceMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {shown}
      {suffix}
    </span>
  );
}

interface ShineImageProps {
  src: string;
  sizes: string;
  /** Tashqi o'ram uchun klasslar (aspect, radius, ring va h.k.) */
  className?: string;
}

/**
 * HomeAbout dagi bilan AYNAN bir xil hover effekti:
 * hover qilinganda oq yorug'lik ikkita qarama-qarshi burchakdan -
 * YUQORI-CHAP va PASTKI-O'NG burchaklardan boshlanib, rasm bo'ylab
 * markazga qarab sekin yoyiladi. Rasmning o'zi joyida qoladi.
 *
 * clip-path va animatsiya inline style orqali berilgan - shu sababli
 * Tailwind sozlamalariga bog'liq emas va har doim ishlaydi.
 */
function ShineImage({ src, sizes, className }: ShineImageProps) {
  const [hovered, setHovered] = useState(false);

  const wedge = (
    clipPath: string,
    transformOrigin: string
  ): React.CSSProperties => ({
    position: "absolute",
    inset: 0,
    clipPath,
    backgroundColor: "rgba(255, 255, 255, 0.38)",
    transform: hovered ? "scale(1)" : "scale(0)",
    transformOrigin,
    transition: "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
    pointerEvents: "none",
    zIndex: 2,
  });

  return (
    <div
      className={cn("relative isolate overflow-hidden", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image src={src} alt="" fill sizes={sizes} className="object-cover" />

      {/* YUQORI-CHAP burchakdan boshlanib yoyiladi */}
      <span style={wedge("polygon(0 0, 100% 0, 0 100%)", "top left")} />
      {/* PASTKI-O'NG burchakdan boshlanib yoyiladi */}
      <span
        style={wedge("polygon(100% 0, 100% 100%, 0 100%)", "bottom right")}
      />
    </div>
  );
}

/** O'ng pastdagi dekorativ bargcha chizmasi */
function LeafOrnament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 140"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M60,138 C60,96 54,58 30,24" />
      <path d="M52,104 C30,104 16,92 12,70 C36,68 50,80 52,104 Z" />
      <path d="M64,92 C86,88 98,74 98,52 C74,54 62,68 64,92 Z" />
      <path d="M46,72 C26,68 16,54 18,34 C40,40 50,54 46,72 Z" />
      <path d="M66,58 C84,50 92,34 88,14 C68,22 60,38 66,58 Z" />
      <path d="M56,34 C42,26 36,12 40,0" />
    </svg>
  );
}

export function AboutIntro() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-[#fffef6] py-20 text-revoza-ink sm:py-28">
      <div className="container relative">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* --- Chap ustun --- */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.span
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-revoza-ink/15 bg-white/70 px-4 py-2 text-xs font-semibold tracking-wide"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-revoza-sage" />
              {t("aboutIntro.badge")}
            </motion.span>

            <motion.h2
              variants={item}
              className="mt-6 text-[2rem] font-extrabold leading-[1.12] tracking-tight sm:text-[2.6rem]"
            >
              {t("aboutIntro.titleLine1")}
              <br className="hidden sm:block" /> {t("aboutIntro.titleLine2")}
            </motion.h2>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-base leading-relaxed text-revoza-ink/65"
            >
              {t("aboutIntro.description")}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6"
            >
              <FeatureLine text={t("aboutIntro.featureOne")} />
              <FeatureLine text={t("aboutIntro.featureTwo")} />
            </motion.div>

            {/* Statistika */}
            <motion.div
              variants={item}
              className="mt-9 grid gap-6 rounded-3xl bg-revoza-ink/[0.04] p-6 sm:grid-cols-2 sm:gap-0 sm:p-8"
            >
              {ABOUT_STATS.map((stat, i) => (
                <div
                  key={stat.key}
                  className={cn(
                    i === 1 && "sm:border-l sm:border-revoza-ink/10 sm:pl-8"
                  )}
                >
                  <p className="text-[2rem] font-extrabold leading-none tracking-tight">
                    <CountUp value={stat.value} />
                  </p>
                  <p className="mt-2.5 max-w-[15rem] text-sm leading-relaxed text-revoza-ink/60">
                    {t(stat.key)}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={item} className="mt-9">
              <Link
                href="/contact"
                className="hover-fill fill-sage group inline-flex h-14 items-center gap-3 rounded-full bg-revoza-sage-dark pl-2 pr-7 text-[15px] font-bold text-white transition-transform duration-300 hover:-translate-y-0.5"
              >
                {/* Tinimsiz sekin tebranadigan telefon ikonkasi */}
                <motion.span
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-revoza-sage-dark"
                  animate={{ rotate: [0, -14, 12, -10, 8, 0, 0, 0] }}
                  transition={{
                    duration: 1.6,
                    times: [0, 0.08, 0.18, 0.28, 0.38, 0.48, 0.7, 1],
                    repeat: Infinity,
                    repeatDelay: 1.4,
                    ease: "easeInOut",
                  }}
                >
                  <Phone className="h-4 w-4" />
                </motion.span>
                {t("aboutIntro.cta")}
              </Link>
            </motion.div>
          </motion.div>

          {/* --- O'ng ustun: rasmlar kompozitsiyasi --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto aspect-square w-full max-w-[560px] lg:mx-0"
          >
            {/* Katta rasm: tepasi arka, pasti to'g'ri burchak */}
            <ShineImage
              src={ABOUT_IMAGE_LARGE}
              sizes="(max-width: 1024px) 60vw, 360px"
              className="absolute left-[11%] top-0 z-10 h-[89%] w-[63%] rounded-t-[999px]"
            />

            {/* O'ng yuqoridagi karta + telefon paneli */}
            <div className="absolute right-0 top-[17%] z-20 w-[36%] overflow-hidden rounded-2xl shadow-[0_18px_45px_-24px_rgba(60,50,40,0.55)]">
              <ShineImage
                src={ABOUT_IMAGE_CARD}
                sizes="200px"
                className="aspect-[5/4] w-full"
              />
              <a
                href={ABOUT_PHONE_HREF}
                className="flex items-center justify-center gap-1.5 bg-revoza-sage-dark px-2 py-2 text-center text-[10px] font-bold leading-none tracking-tight text-white transition-colors hover:bg-revoza-sage sm:text-[11.5px]"
              >
                <Phone className="h-3 w-3 shrink-0" />
                <span className="whitespace-nowrap tabular-nums">
                  {ABOUT_PHONE_DISPLAY}
                </span>
              </a>
            </div>

            {/* Pastki chapdagi arka rasm */}
            <ShineImage
              src={ABOUT_IMAGE_SMALL}
              sizes="(max-width: 1024px) 40vw, 220px"
              className="absolute bottom-0 left-0 z-20 h-[50%] w-[39%] rounded-t-[999px] ring-[6px] ring-[#fffef6]"
            />

            {/* Dekorativ bargcha */}
            <LeafOrnament className="absolute bottom-[3%] right-[8%] z-0 h-[22%] w-[16%] text-revoza-ink/25" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeatureLine({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 text-lg leading-none text-revoza-sage">*</span>
      <p className="text-sm leading-relaxed text-revoza-ink/75">{text}</p>
    </div>
  );
}