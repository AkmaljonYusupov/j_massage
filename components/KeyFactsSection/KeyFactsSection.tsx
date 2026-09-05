"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  GraduationCap,
  HeartHandshake,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { KEY_FACTS, type FactIconId, type KeyFact } from "./keyFacts.data";

const ICONS: Record<FactIconId, LucideIcon> = {
  graduates: GraduationCap,
  teachers: HeartHandshake,
  courses: Sparkles,
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/** Noldan berilgan songacha sanaydi - bo'lim ekranga kirganda bir marta */
function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setValue(to);
      return;
    }

    const duration = 1600;
    const started = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / duration);
      // easeOutCubic - oxiriga borib sekinlashadi
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(to * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, reduceMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

function FactCard({ fact }: { fact: KeyFact }) {
  const { t } = useLanguage();
  const Icon = ICONS[fact.id];

  return (
    <motion.article
      variants={item}
      className="group flex flex-col rounded-2xl bg-[#edf0e6] p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_-26px_rgba(60,50,40,0.55)] sm:p-8"
    >
      <Icon
        strokeWidth={1.3}
        className="h-11 w-11 text-revoza-ink transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110"
      />

      <div className="mt-12 flex items-start gap-5">
        <p className="text-[2.6rem] font-extrabold leading-none tracking-tight">
          <CountUp to={fact.value} suffix={fact.suffix} />
        </p>
        <p className="max-w-[11rem] pt-1 text-sm leading-relaxed text-revoza-ink/60">
          {t(fact.labelKey)}
        </p>
      </div>

      <span className="mt-6 block h-px w-full bg-revoza-ink/12" />

      <p className="mt-5 text-sm leading-relaxed text-revoza-ink/60">
        {t(fact.textKey)}
      </p>
    </motion.article>
  );
}

/**
 * Bo'lim foni - sodda va tinch:
 * nozik nuqtali to'r va uning ustida bitta yumshoq yorug'lik dog'i.
 * To'r chetlarga borib so'niydi, shuning uchun chegara sezilmaydi.
 */
function FactsBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Nuqtali to'r */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(60,50,40,0.14) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(75% 60% at 50% 45%, #000 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(75% 60% at 50% 45%, #000 30%, transparent 100%)",
        }}
      />

      {/* Markazdagi yumshoq yorug'lik */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(122,140,100,0.16) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

export function KeyFactsSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-[#fffef6] py-20 text-revoza-ink sm:py-28">
      <FactsBackdrop />

      <div className="container relative">
        {/* --- Sarlavha --- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-revoza-ink/15 bg-white/70 px-4 py-2 text-xs font-semibold tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-revoza-sage" />
            {t("keyFacts.badge")}
          </span>

          <h2 className="mt-6 text-[2rem] font-extrabold leading-[1.12] tracking-tight sm:text-[2.6rem]">
            {t("keyFacts.title")}
          </h2>

          <p className="mt-5 text-[15px] leading-relaxed text-revoza-ink/65">
            {t("keyFacts.description")}
          </p>
        </motion.div>

        {/* --- Kartalar --- */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8"
        >
          {KEY_FACTS.map((fact) => (
            <FactCard key={fact.id} fact={fact} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}