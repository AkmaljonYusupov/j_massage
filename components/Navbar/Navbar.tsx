"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";

import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "./navbar.data";
import { MobileNav } from "./MobileNav";

export function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // Bosh sahifadagi About bo'limi och rangda (#fffef6). Navbar matni oq
  // bo'lgani uchun u yerda ko'rinmay qolmasligi kerak: tepada shaffof shisha
  // effekti, pastga tushganda to'q fonli qattiq holatga o'tadi.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  }

  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 lg:pt-5"
    >
      <div className="lg:container">
        <div
          className={cn(
            "flex items-center justify-between gap-2 py-3 pl-4 pr-3 text-revoza-cream transition-all duration-300 sm:pl-6 lg:gap-2 xl:gap-4",
            "border-b border-white/10",
            "lg:rounded-full lg:border lg:border-white/15 lg:py-2 lg:pl-5 lg:pr-2 xl:py-2.5 xl:pl-6",
            scrolled
              ? "border-transparent bg-revoza-ink/95 shadow-lg shadow-black/25 backdrop-blur-xl lg:border-white/10"
              : "bg-white/[0.08] backdrop-blur-md"
          )}
        >
          <Link
            href="/"
            aria-label="J Massage School"
            className="flex shrink-0 items-center transition-opacity hover:opacity-85"
          >
            <Image
              src="/logo-white.png"
              alt="J Massage School"
              width={1756}
              height={652}
              priority
              quality={100}
              unoptimized
              className="h-10 w-auto sm:h-12 lg:h-9 xl:h-12"
            />
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-0 lg:flex xl:gap-1">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  className={cn(
                    "relative whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-semibold transition-colors xl:px-4 xl:py-2.5 xl:text-[15px]",
                    active ? "text-white" : "text-white/80 hover:text-white"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 rounded-full bg-white/10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                  <span className="relative z-10">{t(link.key)}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:gap-2 xl:gap-3">
            <LanguageSwitcher className="hidden md:inline-flex" />

            <Link
              href="/contact"
              className="hidden h-11 items-center gap-2 whitespace-nowrap rounded-full bg-revoza-cream pl-2 pr-4 text-[13px] font-bold text-revoza-ink transition-colors hover:bg-white lg:inline-flex xl:h-12 xl:gap-2.5 xl:pr-6 xl:text-[15px]"
            >
              {/* Tinimsiz sekin tebranadigan telefon ikonkasi */}
              <motion.span
                className="flex h-8 w-8 items-center justify-center rounded-full bg-revoza-ink text-revoza-cream xl:h-9 xl:w-9"
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

            <MobileNav />
          </div>
        </div>
      </div>
    </motion.header>
  );
}