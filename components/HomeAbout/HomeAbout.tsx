"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Phone } from "lucide-react";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import {
  ABOUT_FOUNDER_PHOTO,
  ABOUT_IMAGE_MAIN,
  ABOUT_IMAGE_SECONDARY,
  ABOUT_PHONE_DISPLAY,
  ABOUT_PHONE_HREF,
} from "./homeAbout.data";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

interface ShineImageProps {
  src: string;
  sizes: string;
  /** Tashqi o'ram uchun klasslar (aspect, radius, ring va h.k.) */
  className?: string;
}

/**
 * Hover qilinganda oq yorug'lik ikkita qarama-qarshi burchakdan -
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
      className={cn("relative overflow-hidden", className)}
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

export function HomeAbout() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-[#fffef6] py-20 text-revoza-ink sm:py-28">
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-revoza-sage/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#7D6BA9]/10 blur-3xl" />

      <div className="container relative">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* --- Rasmlar --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[520px] lg:mx-0"
          >
            <ShineImage
              src={ABOUT_IMAGE_MAIN}
              sizes="(max-width: 1024px) 90vw, 520px"
              className="aspect-[4/5] rounded-b-3xl rounded-t-[999px] ring-1 ring-revoza-ink/5"
            />

            {/* Kichik karta - asosiy rasm ichida, o'ng pastki burchakda */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
              className="absolute bottom-4 right-4 z-30 w-[54%] max-w-[240px] rounded-2xl bg-[#fffef6] p-2 shadow-[0_18px_50px_-12px_rgba(60,50,40,0.45)] sm:bottom-6 sm:right-6"
            >
              <ShineImage
                src={ABOUT_IMAGE_SECONDARY}
                sizes="240px"
                className="aspect-[5/4] rounded-xl"
              />
              <p className="py-2.5 text-center text-[13px] font-bold leading-tight tracking-tight">
                {t("homeAbout.experience")}
              </p>
            </motion.div>
          </motion.div>

          {/* --- Matn --- */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.span
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-revoza-ink/15 bg-white/60 px-4 py-2 text-xs font-semibold tracking-wide"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-revoza-sage" />
              {t("homeAbout.badge")}
            </motion.span>

            <motion.h2
              variants={item}
              className="mt-6 text-[2.1rem] font-extrabold leading-[1.1] tracking-tight sm:text-5xl"
            >
              {t("homeAbout.titleLine1")}
              <br />
              {t("homeAbout.titleLine2")}
            </motion.h2>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-base leading-relaxed text-revoza-ink/65"
            >
              {t("homeAbout.description")}
            </motion.p>

            <motion.ul variants={item} className="mt-8 space-y-3.5">
              <FeatureLine text={t("homeAbout.featureOne")} />
              <FeatureLine text={t("homeAbout.featureTwo")} />
            </motion.ul>

            <motion.div
              variants={item}
              className="mt-10 flex flex-col gap-8 border-t border-revoza-ink/10 pt-8 sm:flex-row sm:items-center sm:gap-10"
            >
              <Link
                href="/about"
                className="inline-flex h-12 shrink-0 items-center gap-2.5 self-start rounded-full bg-revoza-sage pl-2 pr-6 text-[15px] font-bold text-white transition-colors hover:bg-revoza-sage-dark"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-revoza-sage-dark">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
                {t("homeAbout.cta")}
              </Link>

              <div className="flex flex-col gap-5 sm:border-l sm:border-revoza-ink/10 sm:pl-10">
                <a
                  href={ABOUT_PHONE_HREF}
                  className="group flex items-center gap-3.5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-revoza-sage/15 text-revoza-sage-dark transition-colors group-hover:bg-revoza-sage/30">
                    <Phone className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs text-revoza-ink/50">
                      {t("homeAbout.helpLabel")}
                    </span>
                    <span className="block text-[15px] font-bold">
                      {ABOUT_PHONE_DISPLAY}
                    </span>
                  </span>
                </a>

                <div className="flex items-center gap-3.5">
                  <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-revoza-ink/10">
                    <Image
                      src={ABOUT_FOUNDER_PHOTO}
                      alt={t("homeAbout.founderName")}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </span>
                  <span>
                    <span className="block text-[15px] font-bold">
                      {t("homeAbout.founderName")}
                    </span>
                    <span className="block text-xs text-revoza-ink/50">
                      {t("homeAbout.founderRole")}
                    </span>
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeatureLine({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 text-lg leading-none text-revoza-sage">*</span>
      <span className="text-[15px] font-semibold leading-snug sm:text-base">
        {text}
      </span>
    </li>
  );
}