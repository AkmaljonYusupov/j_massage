"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Phone } from "lucide-react";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { APPROACH_CARDS } from "./approach.data";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function ApproachSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-[#edf0e6] py-20 text-revoza-ink sm:py-28">
      <div className="container relative">
        {/* --- Sarlavha va tavsif --- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-16"
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-revoza-ink/15 bg-white/70 px-4 py-2 text-xs font-semibold tracking-wide">
              <span className="h-1.5 w-1.5 rounded-full bg-revoza-sage" />
              {t("approach.badge")}
            </span>

            <h2 className="mt-6 text-[2rem] font-extrabold leading-[1.12] tracking-tight sm:text-[2.6rem]">
              {t("approach.titleLine1")}
              <br className="hidden sm:block" /> {t("approach.titleLine2")}
            </h2>
          </div>

          <div className="lg:pt-2">
            <p className="max-w-xl text-[15px] leading-relaxed text-revoza-ink/65">
              {t("approach.description")}
            </p>

            <Link
              href="/contact"
              className="group mt-7 inline-flex h-12 items-center gap-2.5 rounded-full bg-revoza-sage-dark pl-2 pr-6 text-[15px] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-revoza-sage"
            >
              {/* Tinimsiz sekin tebranadigan telefon ikonkasi */}
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
              {t("approach.cta")}
            </Link>
          </div>
        </motion.div>

        {/* --- Uchta oval karta --- */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-10"
        >
          {APPROACH_CARDS.map((card) => (
            <motion.article
              key={card.id}
              variants={item}
              className="group mx-auto flex aspect-[4/5] w-full max-w-[340px] flex-col items-center justify-center rounded-[999px] bg-[#fffef6] px-9 py-12 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_38px_-28px_rgba(60,50,40,0.5)] sm:px-10"
            >
              <span className="relative h-14 w-14 shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110">
                <Image
                  src={card.icon}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-contain"
                />
              </span>

              <h3 className="mt-6 text-lg font-bold tracking-tight">
                {t(card.titleKey)}
              </h3>

              <p className="mt-3.5 max-w-[15rem] text-[13.5px] leading-relaxed text-revoza-ink/60">
                {t(card.textKey)}
              </p>

              <span className="mt-7 h-px w-3/4 bg-revoza-ink/12" />

              <p className="mt-5 flex items-start justify-center gap-2 text-[13.5px] text-revoza-ink/75">
                <span className="leading-none text-revoza-sage">*</span>
                {t(card.noteKey)}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}