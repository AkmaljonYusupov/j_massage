"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Baby,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Flame,
  Smile,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import { SERVICES, type ServiceIconId, type ServiceItem } from "./services.data";

/** Pastdagi qatorda ko'rinadigan kichik suratlar */
const BOTTOM_AVATARS = ["/images/team-1.jpg", "/images/team-2.jpg"];

const ICONS: Record<ServiceIconId, LucideIcon> = {
  massage: Sparkles,
  children: Baby,
  hijama: Droplets,
  face: Smile,
  fire: Flame,
};

/** Chap pastdagi dekorativ chizma: toshlar, shamlar va lotus */
function SpaOrnament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 150"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="40" cy="132" rx="34" ry="11" />
      <ellipse cx="40" cy="114" rx="26" ry="9" />
      <ellipse cx="40" cy="98" rx="18" ry="7" />
      <ellipse cx="40" cy="85" rx="11" ry="5" />

      <path d="M100,132 L100,86 A17,8 0 0 1 134,86 L134,132" />
      <ellipse cx="117" cy="132" rx="17" ry="7" />
      <path d="M117,80 C111,72 117,66 117,62 C119,67 125,72 117,80 Z" />

      <path d="M152,132 L152,102 A13,7 0 0 1 178,102 L178,132" />
      <ellipse cx="165" cy="132" rx="13" ry="6" />
      <path d="M165,96 C160,90 165,85 165,82 C167,86 172,90 165,96 Z" />

      <path d="M252,132 c-4-6-4-14 0-20 4 6 4 14 0 20Z" />
      <path d="M252,132 c-7-2-12-9-12-18 7 2 12 9 12 18Z" />
      <path d="M252,132 c7-2 12-9 12-18-7 2-12 9-12 18Z" />
      <path d="M252,132 c-10 1-18-3-22-11 10-2 18 2 22 11Z" />
      <path d="M252,132 c10 1 18-3 22-11-10-2-18 2-22 11Z" />
      <path d="M232,138 c5 5 12 7 20 7s15-2 20-7" />
    </svg>
  );
}

/**
 * Bitta slayd.
 * Rasm topilmasa (fayl nomi mos kelmasa) karta bo'sh qolmaydi -
 * o'rniga brend gradienti va ikonka chiqadi.
 */
function ServiceSlide({ service }: { service: ServiceItem }) {
  const { t } = useLanguage();
  const [failed, setFailed] = useState(false);
  const Icon = ICONS[service.icon];

  return (
    <div className="group relative aspect-[2/3] w-[80%] shrink-0 snap-center overflow-hidden rounded-[999px] bg-revoza-ink/10 sm:w-[47%] lg:w-[31.5%]">
      {failed ? (
        <span className="absolute inset-0 bg-gradient-to-br from-revoza-sage/40 via-[#d9d2c2] to-revoza-ink/30" />
      ) : (
        <Image
          src={service.image}
          alt=""
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 47vw, 31vw"
          onError={() => setFailed(true)}
          className="select-none object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          draggable={false}
        />
      )}

      {/* Hover ma'lumot qatlami */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span className="absolute inset-0 bg-revoza-ink/70 backdrop-blur-[2px]" />

        <span className="relative translate-y-3 text-white transition-transform duration-500 group-hover:translate-y-0">
          <Icon strokeWidth={1.4} className="h-10 w-10" />
        </span>

        <h3 className="relative mt-4 translate-y-3 text-lg font-bold text-white transition-transform duration-500 delay-75 group-hover:translate-y-0">
          {t(service.titleKey)}
        </h3>

        <p className="relative mt-3 max-w-[16rem] translate-y-3 text-[13.5px] leading-relaxed text-white/85 transition-transform duration-500 delay-100 group-hover:translate-y-0">
          {t(service.textKey)}
        </p>
      </div>
    </div>
  );
}

export function ServicesSection() {
  const { t } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  /**
   * Nechta scroll holati bor. Ekranda bir nechta karta ko'ringani uchun
   * bu son slaydlar sonidan kam bo'ladi (masalan 5 slayd, 3 ta ko'rinsa -
   * 3 ta holat). Shu sababli nuqtalar soni ham shunga qarab hisoblanadi,
   * aks holda oxirgi nuqtalarga surilib bo'lmaydi.
   */
  const [pages, setPages] = useState(1);

  /** Bitta slayd + oraliq kengligi (DOM dan o'lchanadi) */
  const getStep = useCallback(() => {
    const el = trackRef.current;
    if (!el) return 1;
    const first = el.children[0] as HTMLElement | undefined;
    const second = el.children[1] as HTMLElement | undefined;
    if (!first) return 1;
    if (second) return second.offsetLeft - first.offsetLeft;
    return first.offsetWidth;
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const measure = () => {
      const step = getStep();
      const maxScroll = el.scrollWidth - el.clientWidth;
      const count = Math.max(1, Math.round(maxScroll / step) + 1);
      setPages(Math.min(SERVICES.length, count));
    };

    const onScroll = () => {
      const step = getStep();
      const i = Math.round(el.scrollLeft / step);
      setIndex(Math.max(0, i));
    };

    measure();
    onScroll();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(el);
    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      resizeObserver.disconnect();
      el.removeEventListener("scroll", onScroll);
    };
  }, [getStep]);

  const goTo = useCallback(
    (i: number) => {
      const el = trackRef.current;
      if (!el) return;
      const clamped = Math.min(pages - 1, Math.max(0, i));
      el.scrollTo({ left: clamped * getStep(), behavior: "smooth" });
    },
    [getStep, pages]
  );

  return (
    <section className="relative overflow-hidden bg-[#edf0e6] py-20 text-revoza-ink sm:py-28">
      <SpaOrnament className="pointer-events-none absolute bottom-6 left-[2%] hidden h-36 w-[20rem] text-revoza-ink/15 lg:block" />

      <div className="container relative">
        {/* --- Sarlavha --- */}
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
              {t("services.badge")}
            </span>

            <h2 className="mt-6 text-[2rem] font-extrabold leading-[1.12] tracking-tight sm:text-[2.6rem]">
              {t("services.titleLine1")}
              <br className="hidden sm:block" /> {t("services.titleLine2")}
            </h2>
          </div>

          <div className="lg:pt-2">
            <p className="max-w-xl text-[15px] leading-relaxed text-revoza-ink/65">
              {t("services.description")}
            </p>

            <Link
              href="/courses"
              className="group mt-7 inline-flex h-12 items-center gap-2.5 rounded-full bg-revoza-sage-dark pl-2 pr-6 text-[15px] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-revoza-sage"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-revoza-sage-dark transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
              {t("services.cta")}
            </Link>
          </div>
        </motion.div>

        {/* --- Slayder --- */}
        <div className="relative mt-14 lg:mt-16">
          <div
            ref={trackRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain pb-2 lg:gap-8"
            style={{ scrollBehavior: "auto", touchAction: "pan-x pan-y" }}
          >
            {SERVICES.map((service) => (
              <ServiceSlide key={service.id} service={service} />
            ))}
          </div>

          {/* O'q tugmalari (faqat kengroq ekranlarda) */}
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label="prev"
            className="absolute -left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-revoza-ink/10 bg-[#fffef6] text-revoza-ink shadow-[0_8px_20px_-14px_rgba(60,50,40,0.6)] transition-all duration-300 hover:-translate-y-[calc(50%+2px)] disabled:pointer-events-none disabled:opacity-0 xl:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => goTo(index + 1)}
            disabled={index >= pages - 1}
            aria-label="next"
            className="absolute -right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-revoza-ink/10 bg-[#fffef6] text-revoza-ink shadow-[0_8px_20px_-14px_rgba(60,50,40,0.6)] transition-all duration-300 hover:-translate-y-[calc(50%+2px)] disabled:pointer-events-none disabled:opacity-0 xl:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* --- Nuqtalar --- */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={`dot-${i}`}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`${i + 1}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === index
                  ? "w-7 bg-revoza-sage-dark"
                  : "w-2 bg-revoza-ink/20 hover:bg-revoza-ink/40"
              )}
            />
          ))}
        </div>

        {/* --- Pastdagi qator --- */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mt-10 flex flex-col items-center justify-center gap-3 text-center sm:flex-row"
        >
          <div className="flex -space-x-3">
            {BOTTOM_AVATARS.map((src) => (
              <span
                key={src}
                className="relative h-9 w-9 overflow-hidden rounded-full bg-revoza-ink/10 ring-2 ring-[#edf0e6]"
              >
                <Image src={src} alt="" fill sizes="36px" className="object-cover" />
              </span>
            ))}
          </div>

          <p className="text-sm text-revoza-ink/70">
            {t("services.bottomText")}{" "}
            <Link
              href="/contact"
              className="font-bold text-revoza-ink underline decoration-revoza-sage decoration-2 underline-offset-4 transition-colors hover:text-revoza-sage-dark"
            >
              {t("services.bottomLink")}
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}