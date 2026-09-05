"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Phone, Sparkle } from "lucide-react";

import { AnimatedWords } from "@/components/AnimatedWords/AnimatedWords";
import { TextMorph } from "@/components/TextMorph/TextMorph";
import { ContactModal } from "@/components/ContactModal/ContactModal";
import { RippleCircle, useRipple } from "@/components/ui/ripple";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { HERO_IMAGE } from "./hero.data";
import { HERO_MORPH_WORDS } from "./heroMorph.data";

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
  const { t, locale } = useLanguage();
  const primaryRipple = useRipple<HTMLAnchorElement>();
  const secondaryRipple = useRipple<HTMLButtonElement>();

  return (
    <section className="relative flex min-h-[860px] w-full items-center overflow-hidden lg:min-h-[920px]">
      {/*
        Fon rasm "fixed" - scroll qilinganda joyidan qimirlamaydi, shu tufayli
        parallaks effekti hosil bo'ladi. Keyingi bo'limlar o'z fon rangi bilan
        uni ustidan yopib ketadi.
      */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
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

        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50" />
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
        className="container relative z-10 flex flex-col gap-10 pb-8 pt-28 text-revoza-cream sm:pt-32 lg:pb-10 lg:pt-40"
      >
        <div className="max-w-3xl">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-xs font-semibold tracking-wide backdrop-blur-sm"
          >
            <Sparkle className="h-3.5 w-3.5" />
            {t("hero.badge")}
          </motion.span>

          <h1
            className="mt-6 text-[2.1rem] font-extrabold leading-[1.08] tracking-[-0.02em] sm:text-[3.1rem] lg:text-[3.6rem]"
            style={{ textShadow: "0 2px 30px rgba(0,0,0,0.35)" }}
          >
            <AnimatedWords text={t("hero.titleLine1")} delay={0.35} />
            <br />
            {/* Ikkinchi qatorda yo'nalish nomlari almashib turadi */}
            <span className="text-revoza-sage">
              <TextMorph words={HERO_MORPH_WORDS[locale] ?? HERO_MORPH_WORDS.uz} />
            </span>
            <br className="hidden sm:block" />
            <AnimatedWords text={t("hero.titleLine2")} delay={0.6} />
          </h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <Link
              ref={primaryRipple.ref}
              onMouseEnter={primaryRipple.onMouseEnter}
              href="/courses"
              className="group relative inline-flex h-12 items-center gap-2.5 overflow-hidden rounded-full bg-revoza-sage pl-2 pr-6 text-[15px] font-bold text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              <RippleCircle
                pos={primaryRipple.pos}
                className="bg-revoza-sage-dark"
              />

              <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-revoza-sage-dark transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>

              <span className="relative z-10">{t("hero.ctaPrimary")}</span>
            </Link>

            <ContactModal>
              <button
                ref={secondaryRipple.ref}
                onMouseEnter={secondaryRipple.onMouseEnter}
                type="button"
                className="group relative inline-flex h-12 items-center gap-2.5 overflow-hidden rounded-full border border-white/25 bg-white/10 pl-2 pr-6 text-[15px] font-bold text-white backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5"
              >
                <RippleCircle pos={secondaryRipple.pos} className="bg-white" />
                {/* Tinimsiz sekin tebranadigan telefon ikonkasi */}
                <motion.span
                  className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-revoza-sage-dark transition-colors duration-500 group-hover:bg-revoza-sage-dark group-hover:text-white"
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
                <span className="relative z-10 transition-colors duration-500 group-hover:text-revoza-ink">
                  {t("hero.ctaSecondary")}
                </span>
              </button>
            </ContactModal>
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