"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "./navbar.data";
import { MobileNav } from "./MobileNav";

export function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
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
      className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-5"
    >
      <div className="container">
        <div
          className={cn(
            "flex items-center justify-between gap-4 rounded-full border py-2.5 pl-4 pr-2 text-revoza-cream transition-all duration-300 sm:pl-6",
            scrolled
              ? "border-white/15 bg-revoza-ink/85 shadow-lg shadow-black/30 backdrop-blur-xl"
              : "border-white/15 bg-white/[0.06] backdrop-blur-md"
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
              className="h-10 w-auto sm:h-12"
            />
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-4 py-2.5 text-[15px] font-semibold transition-colors",
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

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <LanguageSwitcher className="hidden md:inline-flex" />

            <Link
              href="/contact"
              className="hidden h-12 items-center gap-2.5 rounded-full bg-revoza-cream pl-2 pr-6 text-[15px] font-bold text-revoza-ink transition-colors hover:bg-white lg:inline-flex"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-revoza-ink text-revoza-cream">
                <ArrowUpRight className="h-4 w-4" />
              </span>
              {t("navbar.bookAppointment")}
            </Link>

            <MobileNav />
          </div>
        </div>
      </div>
    </motion.header>
  );
}