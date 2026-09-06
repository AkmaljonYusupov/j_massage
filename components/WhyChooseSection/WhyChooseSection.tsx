"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Brain, HeartHandshake, Phone, Quote, type LucideIcon } from "lucide-react";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import { WHY_FEATURES, WHY_IMAGE, type WhyIconId } from "./whyChoose.data";

const ICONS: Record<WhyIconId, LucideIcon> = {
  care: HeartHandshake,
  holistic: Brain,
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function WhyChooseSection() {
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
              {t("whyChoose.badge")}
            </motion.span>

            <motion.h2
              variants={item}
              className="mt-6 text-[2rem] font-extrabold leading-[1.12] tracking-tight sm:text-[2.6rem]"
            >
              {t("whyChoose.titleLine1")}
              <br className="hidden sm:block" /> {t("whyChoose.titleLine2")}
            </motion.h2>

            <motion.p
              variants={item}
              className="mt-5 max-w-xl text-[15px] leading-relaxed text-revoza-ink/65"
            >
              {t("whyChoose.description")}
            </motion.p>

            {/* Afzalliklar */}
            <div className="mt-10">
              {WHY_FEATURES.map((feature, i) => {
                const Icon = ICONS[feature.id];
                return (
                  <motion.div
                    key={feature.id}
                    variants={item}
                    className={cn(
                      "group flex items-start gap-5 py-7",
                      i > 0 && "border-t border-revoza-ink/10"
                    )}
                  >
                    <Icon
                      strokeWidth={1.3}
                      className="mt-0.5 h-9 w-9 shrink-0 text-revoza-ink transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110"
                    />

                    <div>
                      <h3 className="text-lg font-bold tracking-tight">
                        {t(feature.titleKey)}
                      </h3>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-revoza-ink/60">
                        {t(feature.textKey)}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div variants={item}>
              <Link
                href="/contact"
                className="hover-fill fill-sage inline-flex h-14 items-center gap-3 rounded-full bg-revoza-sage-dark pl-2 pr-7 text-[15px] font-bold text-white transition-transform duration-300 hover:-translate-y-0.5"
              >
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
                {t("whyChoose.cta")}
              </Link>
            </motion.div>
          </motion.div>

          {/* --- O'ng ustun: rasm va iqtibos kartasi --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[560px] lg:mx-0"
          >
            <div className="relative aspect-[10/9] w-full overflow-hidden rounded-[28px]">
              <Image
                src={WHY_IMAGE}
                alt=""
                fill
                sizes="(max-width: 1024px) 90vw, 520px"
                className="object-cover"
              />
            </div>

            {/* Iqtibos kartasi */}
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
              className="absolute bottom-6 left-6 right-10 max-w-[19rem] rounded-2xl bg-[#fffef6] p-5 pl-7 shadow-[0_18px_45px_-24px_rgba(60,50,40,0.6)] sm:bottom-8 sm:left-8"
            >
              <span className="absolute -left-5 -top-5 flex h-11 w-11 items-center justify-center rounded-full bg-revoza-sage-dark text-white">
                <Quote className="h-4 w-4 fill-current" />
              </span>

              <p className="text-[15px] font-bold leading-snug">
                {t("whyChoose.quote")}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}