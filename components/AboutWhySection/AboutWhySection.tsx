"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { GraduationCap, Phone, Sparkles } from "lucide-react";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import {
  ABOUT_WHY_IMAGE_MAIN,
  ABOUT_WHY_IMAGE_SECOND,
  ABOUT_WHY_SINCE,
  ABOUT_WHY_YEARS,
} from "./aboutWhy.data";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/** Noldan berilgan songacha sanaydi - ekranga kirganda bir marta */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();

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
  className?: string;
}

/**
 * HomeAbout va AboutIntro dagi bilan aynan bir xil hover effekti:
 * oq yorug'lik yuqori-chap va pastki-o'ng burchaklardan boshlanib
 * rasm bo'ylab markazga qarab yoyiladi.
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
      <span style={wedge("polygon(0 0, 100% 0, 0 100%)", "top left")} />
      <span
        style={wedge("polygon(100% 0, 100% 100%, 0 100%)", "bottom right")}
      />
    </div>
  );
}

/** Chap pastdagi nuqtali naqsh */
function DotPattern({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        backgroundImage:
          "radial-gradient(rgba(60,50,40,0.22) 1.5px, transparent 1.5px)",
        backgroundSize: "14px 14px",
      }}
      aria-hidden="true"
    />
  );
}

export function AboutWhySection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-[#fffef6] py-20 text-revoza-ink sm:py-28">
      <div className="container relative">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-16">
          {/* --- Chap: rasmlar kompozitsiyasi --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto aspect-[10/11] w-full max-w-[520px] lg:mx-0"
          >
            {/* Nuqtali naqsh */}
            <DotPattern className="absolute left-[27%] top-[78%] z-0 h-[12%] w-[21%]" />

            {/* Asosiy rasm */}
            <ShineImage
              src={ABOUT_WHY_IMAGE_MAIN}
              sizes="(max-width: 1024px) 80vw, 380px"
              className="absolute left-[9%] top-0 z-10 h-[78%] w-[72%] rounded-2xl"
            />

            {/* Ikkinchi rasm */}
            <ShineImage
              src={ABOUT_WHY_IMAGE_SECOND}
              sizes="(max-width: 1024px) 55vw, 260px"
              className="absolute bottom-0 right-0 z-20 h-[62%] w-[54%] rounded-2xl ring-[6px] ring-[#fffef6]"
            />

            {/* Yashil karta */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
              className="absolute left-0 top-[9%] z-30 w-[31%] max-w-[160px] rounded-2xl bg-revoza-sage-dark px-4 py-6 text-center text-white shadow-[0_18px_45px_-24px_rgba(60,50,40,0.6)]"
            >
              <Sparkles strokeWidth={1.4} className="mx-auto h-7 w-7" />
              <p className="mt-4 text-[13px] leading-snug text-white/80">
                {t("aboutWhy.sinceLabel")}
              </p>
              <p className="mt-1 text-[1.5rem] font-extrabold tracking-tight">
                {ABOUT_WHY_SINCE}
              </p>
            </motion.div>
          </motion.div>

          {/* --- O'ng: matn va kartalar --- */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.span
              variants={item}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-revoza-ink/15 bg-white/70 px-4 py-2 text-xs font-semibold tracking-wide"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-revoza-sage" />
              {t("aboutWhy.badge")}
            </motion.span>

            <motion.h2
              variants={item}
              className="mt-6 text-[2rem] font-extrabold leading-[1.12] tracking-tight sm:text-[2.5rem]"
            >
              {t("aboutWhy.titleLine1")}
              <br className="hidden sm:block" /> {t("aboutWhy.titleLine2")}
            </motion.h2>

            <motion.p
              variants={item}
              className="mt-5 max-w-xl text-[15px] leading-relaxed text-revoza-ink/65"
            >
              {t("aboutWhy.description")}
            </motion.p>

            {/* Ikkita karta */}
            <motion.div
              variants={item}
              className="mt-9 grid gap-5 sm:grid-cols-[1.35fr_1fr]"
            >
              {/* Och karta */}
              <div className="flex flex-col rounded-2xl bg-[#edf0e6] p-6">
                <h3 className="text-[17px] font-bold tracking-tight">
                  {t("aboutWhy.cardOneTitle")}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-revoza-ink/60">
                  {t("aboutWhy.cardOneText")}
                </p>

                <span className="mt-auto block h-px w-full bg-revoza-ink/12" />

                <p className="mt-5 flex items-start gap-2 text-sm text-revoza-ink/75">
                  <span className="leading-none text-revoza-sage">*</span>
                  {t("aboutWhy.cardOneNote")}
                </p>
              </div>

              {/* To'q karta */}
              <div className="flex flex-col rounded-2xl bg-revoza-ink p-6 text-white">
                <div className="flex items-start gap-4">
                  <p className="text-[1.7rem] font-extrabold leading-none tracking-tight">
                    <CountUp value={ABOUT_WHY_YEARS} />
                  </p>
                  <p className="pt-1 text-sm leading-snug text-white/70">
                    {t("aboutWhy.yearsLabel")}
                  </p>
                </div>

                <span className="mt-5 block h-px w-full bg-white/15" />

                <GraduationCap
                  strokeWidth={1.4}
                  className="mt-5 h-8 w-8 text-white"
                />

                <p className="mt-4 text-sm font-semibold leading-relaxed text-white/85">
                  {t("aboutWhy.cardTwoText")}
                </p>
              </div>
            </motion.div>

            <motion.div variants={item} className="mt-9">
              <span className="block h-px w-full bg-revoza-ink/10" />

              <Link
                href="/contact"
                className="mt-8 inline-flex h-12 items-center gap-2.5 rounded-full bg-revoza-sage-dark pl-1.5 pr-6 text-[15px] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-revoza-sage"
              >
                <motion.span
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-revoza-sage-dark"
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
                {t("aboutWhy.cta")}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}