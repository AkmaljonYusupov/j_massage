"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Phone } from "lucide-react";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  FOOTER_COURSES,
  FOOTER_INSTAGRAM_URL,
  FOOTER_LINKS,
  FOOTER_PHONES,
  FOOTER_TELEGRAM_URL,
} from "./footer.data";

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M23.91 3.79 20.3 20.84c-.25 1.21-.98 1.5-2 .94l-5.5-4.07-2.66 2.57c-.3.3-.55.56-1.1.56-.72 0-.6-.28-.84-.95L6.3 13.7.85 12c-1.18-.35-1.19-1.16.26-1.75l21.26-8.2c.97-.43 1.9.24 1.54 1.74z" />
    </svg>
  );
}

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-revoza-sage text-white">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-black/25" />

      <div className="container relative">
        {/* --- Yuqori qism: sarlavha va harakatga chaqiruv --- */}
        <div className="flex flex-col gap-10 py-12 sm:py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:py-20">
          <h2 className="max-w-xl text-[1.6rem] font-extrabold leading-[1.2] tracking-tight sm:text-[2.1rem] lg:text-[2.5rem]">
            {t("footer.headlineLine1")}
            <br className="hidden sm:block" /> {t("footer.headlineLine2")}
          </h2>

          {/* Harakatga chaqiruv kartasi */}
          <div className="relative w-full max-w-md shrink-0 overflow-hidden rounded-[26px] border border-white/20 bg-white/[0.07] p-6 backdrop-blur-sm sm:max-w-[30rem] sm:p-7">
            {/* burchakdagi nozik halqalar */}
            <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full border border-white/15" />
            <span className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full border border-white/10" />

            <span className="relative inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white/75">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              {t("footer.ctaEyebrow")}
            </span>

            <p className="relative mt-4 text-sm leading-relaxed text-white/75">
              {t("footer.ctaNote")}
            </p>

            {/*
              Ikkala harakat doim BITTA qatorda turadi.
              Asosiysi ("Qabulga yozilish") qolgan kenglikni oladi,
              Telegram esa yordamchi: mobilda kvadrat ikonka-tugma,
              sm dan boshlab matni ham chiqadi. Shu sababli ular hech qanday
              kenglikda siqilmaydi va ustma-ust tushmaydi.
            */}
            <div className="relative mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-nowrap sm:gap-3">
              <Link
                href="/contact"
                className="hover-fill fill-sage-dark group inline-flex h-[54px] w-full items-center justify-center gap-2.5 rounded-full bg-white pl-2 pr-5 text-[15px] font-bold text-revoza-sage-dark transition-all duration-300 hover:-translate-y-0.5 hover:text-white sm:h-[50px] sm:w-auto sm:shrink-0 sm:pr-4 sm:text-[14.5px]"
              >
                <motion.span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-revoza-sage-dark text-white transition-transform duration-300 group-hover:scale-105"
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
                <span className="whitespace-nowrap">{t("navbar.bookAppointment")}</span>
              </Link>

              <a
                href={FOOTER_TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("footer.telegramCta")}
                title={t("footer.telegramCta")}
                className="hover-fill fill-telegram inline-flex h-[54px] w-full items-center justify-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-5 text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent sm:h-[50px] sm:w-auto sm:shrink-0 sm:px-4"
              >
                <TelegramIcon className="h-[18px] w-[18px] shrink-0" />
                <span className="whitespace-nowrap text-[15px] font-bold sm:text-[14.5px]">
                  {t("footer.telegramCta")}
                </span>
              </a>
            </div>

          </div>
        </div>

        <div className="h-px w-full bg-white/20" />

        {/* --- Ustunlar --- */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:py-14">
          {/* Logo va tavsif */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" aria-label="J Massage School" className="inline-flex">
              <Image
                src="/logo-white.png"
                alt="J Massage School"
                width={1756}
                height={652}
                quality={100}
                unoptimized
                className="h-11 w-auto sm:h-12"
              />
            </Link>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/75">
              {t("footer.description")}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={FOOTER_TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white/85 transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-revoza-sage-dark"
              >
                <TelegramIcon className="h-[17px] w-[17px]" />
              </a>
              <a
                href={FOOTER_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white/85 transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-revoza-sage-dark"
              >
                <Instagram className="h-[17px] w-[17px]" />
              </a>
            </div>
          </div>

          {/* Tezkor havolalar */}
          <div>
            <h3 className="text-base font-bold sm:text-lg">
              {t("footer.quickLinks")}
            </h3>
            <ul className="mt-5 space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2.5 text-sm text-white/80 transition-colors hover:text-white"
                  >
                    <span className="text-white/60 transition-transform duration-300 group-hover:rotate-90">
                      *
                    </span>
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kurslar */}
          <div>
            <h3 className="text-base font-bold sm:text-lg">
              {t("footer.ourCourses")}
            </h3>
            <ul className="mt-5 space-y-3">
              {FOOTER_COURSES.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2.5 text-sm text-white/80 transition-colors hover:text-white"
                  >
                    <span className="text-white/60 transition-transform duration-300 group-hover:rotate-90">
                      *
                    </span>
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Aloqa */}
          <div>
            <h3 className="text-base font-bold sm:text-lg">
              {t("footer.contactInfo")}
            </h3>

            <p className="mt-5 text-sm text-white/60">
              {t("footer.addressLabel")}
            </p>
            <p className="mt-1.5 max-w-[15rem] text-[15px] font-bold leading-snug">
              {t("footer.address")}
            </p>

            <p className="mt-6 text-sm text-white/60">
              {t("footer.phoneLabel")}
            </p>
            <div className="mt-1.5 flex flex-col gap-1.5">
              {FOOTER_PHONES.map((phone) => (
                <a
                  key={phone.href}
                  href={phone.href}
                  className="text-[15px] font-bold tabular-nums transition-opacity hover:opacity-80"
                >
                  {phone.display}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-white/20" />

        <p className="py-6 text-center text-xs text-white/75 sm:py-7 sm:text-sm">
          {t("footer.copyright").replace("{year}", String(year))}
        </p>
      </div>
    </footer>
  );
}