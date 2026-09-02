"use client";

import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

function FlagUz({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 overflow-hidden rounded-full ring-1 ring-white/25",
        className
      )}
    >
      <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden="true">
        <rect width="24" height="24" fill="#FFFFFF" />
        <rect width="24" height="7.6" fill="#0099B5" />
        <rect y="7.6" width="24" height="1" fill="#CE1126" />
        <rect y="15.4" width="24" height="1" fill="#CE1126" />
        <rect y="16.4" width="24" height="7.6" fill="#1EB53A" />
        <circle cx="6.4" cy="4" r="2.2" fill="#FFFFFF" />
        <circle cx="7.4" cy="3.6" r="2.1" fill="#0099B5" />
      </svg>
    </span>
  );
}

function FlagRu({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 overflow-hidden rounded-full ring-1 ring-white/25",
        className
      )}
    >
      <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden="true">
        <rect width="24" height="8" fill="#FFFFFF" />
        <rect y="8" width="24" height="8" fill="#0039A6" />
        <rect y="16" width="24" height="8" fill="#D52B1E" />
      </svg>
    </span>
  );
}

type LocaleItem = {
  code: Locale;
  label: string;
  native: string;
  Flag: (props: { className?: string }) => JSX.Element;
};

export const LOCALES: LocaleItem[] = [
  { code: "uz", label: "UZ", native: "O'zbekcha", Flag: FlagUz },
  { code: "ru", label: "RU", native: "Russkiy", Flag: FlagRu },
];

interface LanguageSwitcherProps {
  className?: string;
  align?: "start" | "center" | "end";
}

export function LanguageSwitcher({
  className,
  align = "end",
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();
  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];
  const CurrentFlag = current.Flag;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "group inline-flex h-11 items-center gap-2 rounded-full border border-white/15 bg-white/5 pl-2 pr-3.5 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-white",
            "data-[state=open]:bg-white/10 data-[state=open]:text-white",
            className
          )}
        >
          <CurrentFlag className="h-7 w-7" />
          {current.native}
          <ChevronDown className="h-3.5 w-3.5 opacity-70 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={align}
        sideOffset={10}
        collisionPadding={16}
        className="min-w-[12rem]"
      >
        {LOCALES.map((item) => {
          const ItemFlag = item.Flag;
          return (
            <DropdownMenuItem
              key={item.code}
              active={item.code === locale}
              onSelect={() => setLocale(item.code)}
            >
              <span className="flex items-center gap-2.5">
                <ItemFlag className="h-6 w-6" />
                {item.native}
              </span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface LanguageToggleProps {
  className?: string;
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1",
        className
      )}
    >
      {LOCALES.map((item) => {
        const active = item.code === locale;
        const ItemFlag = item.Flag;
        return (
          <button
            key={item.code}
            type="button"
            onClick={() => setLocale(item.code)}
            aria-pressed={active}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2.5 text-sm font-semibold transition-colors",
              active
                ? "bg-white text-revoza-ink"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            )}
          >
            <ItemFlag className="h-6 w-6" />
            {item.native}
          </button>
        );
      })}
    </div>
  );
}