"use client";

import Image from "next/image";
import Link from "next/link";
import { Home } from "lucide-react";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  titleKey: string;
  image: string;
  imageAlt?: string;
  /** Rasmning qaysi qismi ko'rinsin: "center", "top", "50% 30%" va h.k. */
  objectPosition?: string;
  align?: "left" | "center";
  className?: string;
}

export function PageHero({
  titleKey,
  image,
  imageAlt = "",
  objectPosition = "center 35%",
  align = "left",
  className,
}: PageHeroProps) {
  const { t } = useLanguage();

  return (
    <section
      className={cn(
        "relative isolate flex min-h-[52vh] items-end overflow-hidden pb-14 pt-40 sm:min-h-[60vh] sm:pb-20 sm:pt-48",
        className
      )}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        style={{ objectPosition }}
        className="-z-10 object-cover"
      />

      <div className="absolute inset-0 -z-10 bg-revoza-ink/50" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-revoza-ink via-revoza-ink/35 to-revoza-ink/65" />

      <div
        className={cn(
          "container relative text-revoza-cream",
          align === "center" && "text-center"
        )}
      >
        <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
          {t(titleKey)}
        </h1>

        <nav
          aria-label="breadcrumb"
          className={cn(
            "mt-5 flex items-center gap-2 text-sm text-white/60",
            align === "center" && "justify-center"
          )}
        >
          <Link
            href="/"
            className="flex items-center gap-2 transition-colors hover:text-white"
          >
            <Home className="h-4 w-4" />
            {t("navbar.home")}
          </Link>
          <span aria-hidden="true" className="text-white/30">
            /
          </span>
          <span className="text-white">{t(titleKey)}</span>
        </nav>
      </div>
    </section>
  );
}