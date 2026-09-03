"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  titleKey: string;
  image: string;
  imageAlt?: string;
  /** Desktop uchun rasm pozitsiyasi: "center", "top", "50% 30%" va h.k. */
  objectPosition?: string;
  /** Mobil uchun alohida pozitsiya. Berilmasa, objectPosition ishlatiladi. */
  mobileObjectPosition?: string;
  /**
   * Pastdagi to'lqin rangi - KEYINGI bo'limning fon rangi bilan bir xil
   * bo'lishi kerak. Masalan kontakt sahifasida: "fill-[#fffef6]".
   */
  waveClassName?: string;
  align?: "left" | "center";
  className?: string;
}

export function PageHero({
  titleKey,
  image,
  imageAlt = "",
  objectPosition = "center 55%",
  mobileObjectPosition,
  waveClassName = "fill-revoza-ink",
  align = "left",
  className,
}: PageHeroProps) {
  const { t } = useLanguage();
  const mobilePos = mobileObjectPosition ?? objectPosition;

  return (
    <section
      className={cn(
        "relative flex min-h-[72vh] items-end pb-36 pt-44 sm:min-h-[84vh] sm:pb-48 sm:pt-52 lg:min-h-[92vh]",
        className
      )}
    >
      {/* --- Parallaks fon --- */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Sekin "ken burns" harakati - rasm jonli ko'rinadi */}
        <motion.div
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 18, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            style={{ objectPosition: mobilePos }}
            className="object-cover sm:hidden"
          />
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="100vw"
            style={{ objectPosition }}
            className="hidden object-cover sm:block"
          />
        </motion.div>

        {/* Matn o'qilishi uchun chapdan qorayish */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />
        {/* Pastdan to'lqinga silliq o'tish */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
        {/* Vinyetka - chetlar biroz to'qroq, markaz ochiq */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 85% at 50% 45%, transparent 40%, rgba(0,0,0,0.45) 100%)",
          }}
        />
      </div>

      {/* --- Mazmun --- */}
      <div
        className={cn(
          "container relative z-10 text-revoza-cream",
          align === "center" && "text-center"
        )}
      >
        <motion.h1
          initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-[2.75rem] font-extrabold leading-[1.02] tracking-[-0.02em] sm:text-6xl lg:text-[4.5rem]"
          style={{ textShadow: "0 2px 30px rgba(0,0,0,0.35)" }}
        >
          {t(titleKey)}
        </motion.h1>

        <motion.nav
          aria-label="breadcrumb"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
          className={cn(
            "mt-7 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-sm shadow-lg shadow-black/20 backdrop-blur-md",
            align === "center" && "mx-auto"
          )}
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-white/70 transition-colors hover:text-white"
          >
            <Home className="h-4 w-4" />
            {t("navbar.home")}
          </Link>
          <span aria-hidden="true" className="text-white/25">
            /
          </span>
          <span className="font-semibold text-white">{t(titleKey)}</span>
        </motion.nav>
      </div>

      {/* --- Pastga scroll ishorasi --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="pointer-events-none absolute bottom-[22%] left-1/2 z-10 hidden -translate-x-1/2 lg:block"
      >
        <span className="flex h-11 w-7 items-start justify-center rounded-full border border-white/30 p-1.5">
          <motion.span
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
            className="h-2 w-1 rounded-full bg-white/80"
          />
        </span>
      </motion.div>

      {/* --- Pastdagi to'lqinli o'tish --- */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 leading-[0]">
        <svg
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block h-[86px] w-full sm:h-[130px] lg:h-[168px]"
          aria-hidden="true"
        >
          {/* eng orqadagi, eng yumshoq qatlam */}
          <path
            d="M0,92 C160,168 300,36 470,64 C650,94 760,190 940,168 C1110,148 1270,44 1440,80 L1440,200 L0,200 Z"
            className={cn(waveClassName, "opacity-25")}
          />
          {/* o'rta qatlam */}
          <path
            d="M0,118 C170,60 310,166 500,142 C700,116 820,32 1030,66 C1200,94 1320,164 1440,128 L1440,200 L0,200 Z"
            className={cn(waveClassName, "opacity-55")}
          />
          {/* asosiy to'lqin */}
          <path
            d="M0,148 C150,96 320,186 540,158 C760,130 880,74 1090,110 C1250,138 1340,178 1440,152 L1440,200 L0,200 Z"
            className={waveClassName}
          />
        </svg>
      </div>

    </section>
  );
}