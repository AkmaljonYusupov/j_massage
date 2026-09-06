"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

import { useLanguage } from "@/lib/i18n/LanguageContext";

const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d5992.5949808609985!2d69.228845!3d41.324144!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDE5JzI2LjkiTiA2OcKwMTMnNDMuOCJF!5e0!3m2!1sen!2s!4v1788462261955!5m2!1sen!2s";

const MAP_DIRECTIONS_URL = "https://www.google.com/maps?q=41.324144,69.228845";

export function MapSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-[#fffef6] pb-20 pt-4 text-revoza-ink sm:pb-28">
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-revoza-ink/15 bg-white/70 px-4 py-2 text-xs font-semibold tracking-wide backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-revoza-sage" />
              {t("map.badge")}
            </span>
            <h2 className="mt-5 text-[1.9rem] font-extrabold leading-[1.15] tracking-tight sm:text-[2.4rem]">
              {t("map.title")}
            </h2>
          </div>

          <a
            href={MAP_DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover-fill fill-sage-dark group inline-flex h-12 shrink-0 items-center gap-2.5 self-start rounded-full bg-revoza-sage pl-2 pr-6 text-[15px] font-bold text-white transition-transform duration-300 hover:-translate-y-0.5 sm:self-auto"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-revoza-sage-dark transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" />
            </span>
            {t("map.openButton")}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[28px] border border-revoza-ink/10 bg-white shadow-[0_6px_20px_-14px_rgba(60,50,40,0.4)]"
        >
          <iframe
            src={MAP_EMBED_SRC}
            title={t("map.title")}
            loading="lazy"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            style={{ border: 0 }}
            className="block h-[340px] w-full sm:h-[420px] lg:h-[480px]"
          />

          <div className="pointer-events-none absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-xs">
            <div className="pointer-events-auto flex items-center gap-3.5 rounded-2xl border border-revoza-ink/10 bg-[#fffef6]/95 p-4 shadow-[0_6px_20px_-14px_rgba(60,50,40,0.5)] backdrop-blur-sm">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-revoza-sage text-white">
                <MapPin className="h-[18px] w-[18px]" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-revoza-ink/50">
                  {t("map.addressLabel")}
                </span>
                <span className="block text-[15px] font-bold leading-snug">
                  {t("map.address")}
                </span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}