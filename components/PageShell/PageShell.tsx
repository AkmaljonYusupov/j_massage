"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { useLanguage } from "@/lib/i18n/LanguageContext";

interface PageShellProps {
  titleKey: string;
  descriptionKey?: string;
  children?: React.ReactNode;
}

export function PageShell({
  titleKey,
  descriptionKey,
  children,
}: PageShellProps) {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-revoza-ink text-revoza-cream">
      <section className="relative overflow-hidden border-b border-white/10 pb-16 pt-36 sm:pt-44">
        <div className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full bg-revoza-sage/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-white/5 blur-3xl" />

        <div className="container relative">
          <nav
            aria-label="breadcrumb"
            className="mb-5 flex items-center gap-2 text-sm text-white/50"
          >
            <Link href="/" className="transition-colors hover:text-white">
              {t("navbar.home")}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/80">{t(titleKey)}</span>
          </nav>

          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            {t(titleKey)}
          </h1>

          {descriptionKey && (
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/65">
              {t(descriptionKey)}
            </p>
          )}
        </div>
      </section>

      <section className="container py-16 sm:py-20">
        {children ?? (
          <div className="flex flex-col items-start gap-5 rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10">
            <p className="max-w-md text-base text-white/60">
              {t("common.comingSoon")}
            </p>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center gap-2.5 rounded-full bg-revoza-cream pl-2 pr-6 text-[15px] font-bold text-revoza-ink transition-colors hover:bg-white"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-revoza-ink text-revoza-cream">
                <ArrowUpRight className="h-4 w-4" />
              </span>
              {t("navbar.bookAppointment")}
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}