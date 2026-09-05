"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight, Instagram, Menu, Phone, X } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageToggle } from "@/components/LanguageSwitcher/LanguageSwitcher";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "./navbar.data";

const PHONE_DISPLAY = "+998 97 715 51 82";
const PHONE_HREF = "tel:+998977155182";
const INSTAGRAM_URL = "https://www.instagram.com/janna_massagee";
const TELEGRAM_URL = "https://t.me/janna_masagee";

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

export function MobileNav() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label={t("navbar.openMenu")}
          // Diqqat: to'liq desktop menyu "lg" (1024px) dan boshlab ko'rinadi
          // (Navbar.tsx bilan mos), shuning uchun bu tugma ham "lg:hidden".
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-revoza-cream transition-colors hover:bg-white/10 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>

      <SheetContent side="right" hideClose className="w-[88vw] max-w-sm p-0">
        <SheetTitle className="sr-only">{t("navbar.menu")}</SheetTitle>

        <div className="relative flex h-full flex-col overflow-hidden">
          <div className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full bg-revoza-sage/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -left-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

          <div className="relative flex items-center justify-between gap-4 border-b border-white/10 px-6 py-5">
            <SheetClose asChild>
              <Link
                href="/"
                aria-label="J Massage School"
                className="flex items-center"
              >
                <Image
                  src="/logo-white.png"
                  alt="J Massage School"
                  width={1756}
                  height={652}
                  quality={100}
                  unoptimized
                  className="h-12 w-auto sm:h-14"
                />
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <button
                type="button"
                aria-label={t("navbar.closeMenu")}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-revoza-cream transition-colors hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>
            </SheetClose>
          </div>

          <nav className="no-scrollbar relative flex-1 overflow-y-auto px-6 py-2">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <SheetClose asChild key={link.key}>
                  <Link
                    href={link.href}
                    className={cn(
                      "group flex items-center justify-between gap-3 border-b border-white/10 py-4 transition-colors",
                      active ? "text-white" : "text-white/80 hover:text-white"
                    )}
                  >
                    <span className="flex items-center gap-3 text-lg font-semibold">
                      <span
                        className={cn(
                          "h-5 w-0.5 rounded-full transition-colors",
                          active ? "bg-revoza-sage" : "bg-transparent"
                        )}
                      />
                      {t(link.key)}
                    </span>
                    <ArrowUpRight
                      className={cn(
                        "h-4 w-4 transition-all duration-200",
                        active
                          ? "text-revoza-sage opacity-100"
                          : "opacity-0 group-hover:translate-x-0.5 group-hover:opacity-70"
                      )}
                    />
                  </Link>
                </SheetClose>
              );
            })}
          </nav>

          <div className="relative space-y-5 border-t border-white/10 px-6 py-6">
            <LanguageToggle className="w-full" />

            <SheetClose asChild>
              <Link
                href="/contact"
                data-ripple
                className="ripple-btn ripple-ink flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-revoza-cream pl-2 pr-5 text-[15px] font-bold text-revoza-ink transition-colors hover:text-revoza-cream"
              >
                <motion.span
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-revoza-ink text-revoza-cream"
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
                {t("navbar.bookAppointment")}
              </Link>
            </SheetClose>

            <div className="flex items-center justify-between gap-3">
              <a
                href={PHONE_HREF}
                className="flex min-w-0 items-center gap-2.5 text-[15px] font-semibold text-white/75 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 shrink-0 text-revoza-sage" />
                <span className="truncate">{PHONE_DISPLAY}</span>
              </a>

              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors hover:border-transparent hover:bg-[#E1306C] hover:text-white"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors hover:border-transparent hover:bg-[#229ED9] hover:text-white"
                >
                  <TelegramIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}