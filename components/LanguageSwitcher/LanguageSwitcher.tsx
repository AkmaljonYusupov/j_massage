"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

const LOCALES: { code: Locale; label: string }[] = [
  { code: "uz", label: "UZ" },
  { code: "ru", label: "RU" },
];

interface LanguageSwitcherProps {
  variant?: "dark" | "light";
  className?: string;
}

export function LanguageSwitcher({
  variant = "dark",
  className,
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={cn(
        "flex items-center rounded-full border p-1 text-xs font-semibold",
        variant === "dark"
          ? "border-white/15 bg-white/5"
          : "border-black/10 bg-black/5",
        className
      )}
    >
      {LOCALES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          aria-pressed={locale === code}
          className={cn(
            "rounded-full px-3 py-1.5 transition-colors",
            locale === code
              ? variant === "dark"
                ? "bg-revoza-cream text-revoza-ink"
                : "bg-revoza-ink text-revoza-cream"
              : variant === "dark"
              ? "text-white/60 hover:text-white"
              : "text-black/50 hover:text-black"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
