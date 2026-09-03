"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { HeroStats } from "./HeroStats";
import { HERO_IMAGE } from "./hero.data";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function HomeHero() {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-[860px] w-full items-center overflow-hidden lg:min-h-[920px]">
      {/*
        Fon rasm "fixed" - scroll qilinganda joyidan qimirlamaydi, shu tufayli
        parallaks effekti hosil bo'ladi. Keyingi bo'limlar o'z fon rangi bilan
        uni ustidan yopib ketadi.
      */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* PageHero dagi kabi sekin "ken burns" harakati */}
        <motion.div
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 18, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={HERO_IMAGE}
            alt="J Massage School"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[75%_40%]"
          />
        </motion.div>

        {/* Matn o'qilishi uchun chapdan qorayish */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/10" />
        {/* Yuqori va pastdan qorayish */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50" />
        {/* Vinyetka - chetlar to'qroq, markaz ochiq */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 85% at 50% 45%, transparent 40%, rgba(0,0,0,0.45) 100%)",
          }}
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container relative z-10 flex flex-col gap-10 pb-8 pt-8 text-revoza-cream lg:pb-10 lg:pt-10"
      >
        <div className="max-w-3xl">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-xs font-semibold tracking-wide backdrop-blur-sm"
          >
            <Sparkle className="h-3.5 w-3.5" />
            {t("hero.badge")}
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 text-[2.6rem] font-extrabold leading-[1.05] tracking-[-0.02em] sm:text-6xl lg:text-[4.5rem]"
            style={{ textShadow: "0 2px 30px rgba(0,0,0,0.35)" }}
          >
            {t("hero.titleLine1")}
            <br />
            {t("hero.titleLine2")}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-6"
          >
            <Button variant="sage" className="gap-2 pl-2 pr-5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-revoza-sage-dark">
                <ArrowUpRight className="h-4 w-4" />
              </span>
              {t("hero.ctaPrimary")}
            </Button>

            <HeroStats />
          </motion.div>
        </div>

        <motion.div
          variants={item}
          className="grid max-w-3xl grid-cols-1 gap-4 border-t border-white/15 pt-8 sm:grid-cols-2"
        >
          <FeatureLine text={t("hero.featureOne")} />
          <FeatureLine text={t("hero.featureTwo")} />
        </motion.div>
      </motion.div>
    </section>
  );
}

function FeatureLine({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-1 text-lg leading-none text-revoza-sage">*</span>
      <p className="text-sm font-semibold leading-snug sm:text-base">{text}</p>
    </div>
  );
}