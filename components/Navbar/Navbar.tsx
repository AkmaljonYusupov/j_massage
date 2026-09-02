"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "./navbar.data";
import { MobileNav } from "./MobileNav";

export function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-40"
    >
      <div className="container">
        <div
          className={cn(
            "mt-4 flex items-center justify-between rounded-full border border-white/10 px-4 py-2.5 text-revoza-cream backdrop-blur-md transition-colors duration-300 lg:px-5",
            scrolled ? "bg-revoza-ink/90 shadow-lg shadow-black/20" : "bg-black/30"
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white/10">
              <svg viewBox="0 0 40 40" className="h-6 w-6 text-revoza-cream" fill="none">
                <path
                  d="M20 4c6 4 9 9 9 15s-4 11-9 17c-5-6-9-11-9-17s3-11 9-15Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path d="M20 12v20" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </span>
            <span className="text-xl font-extrabold tracking-tight">Revoza.</span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) =>
              link.submenu ? (
                <div
                  key={link.key}
                  className="relative"
                  onMouseEnter={() => setOpenKey(link.key)}
                  onMouseLeave={() => setOpenKey(null)}
                >
                  <button
                    type="button"
                    className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {t(link.key)}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  <AnimatePresence>
                    {openKey === link.key && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-0 top-full mt-2 min-w-[190px] rounded-2xl border border-white/10 bg-revoza-ink/95 p-2 shadow-xl backdrop-blur-md"
                      >
                        {link.submenu.map((sub) => (
                          <Link
                            key={sub.key}
                            href={sub.href}
                            className="block rounded-xl px-4 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                          >
                            {t(sub.key)}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.key}
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {t(link.key)}
                </Link>
              )
            )}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher variant="dark" className="hidden md:flex" />
            <Button
              variant="light"
              className="hidden items-center gap-2 pl-2 pr-5 lg:inline-flex"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-revoza-ink text-revoza-cream">
                <ArrowUpRight className="h-4 w-4" />
              </span>
              {t("navbar.bookAppointment")}
            </Button>
            <MobileNav />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
