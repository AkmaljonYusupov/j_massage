"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "./navbar.data";

export function MobileNav() {
  const { t } = useLanguage();
  const [openSubmenu, setOpenSubmenu] = useState(false);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label={t("navbar.openMenu")}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-revoza-cream lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="px-6 py-8">
        <div className="flex items-center gap-2 pr-10">
          <span className="text-xl font-extrabold tracking-tight">Revoza.</span>
        </div>

        <nav className="no-scrollbar mt-6 flex flex-1 flex-col gap-1 overflow-y-auto">
          {NAV_LINKS.map((link) =>
            link.submenu ? (
              <div key={link.key} className="border-b border-white/10">
                <button
                  type="button"
                  onClick={() => setOpenSubmenu((prev) => !prev)}
                  className="flex w-full items-center justify-between py-4 text-base font-semibold"
                >
                  {t(link.key)}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      openSubmenu && "rotate-180"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid overflow-hidden transition-all duration-300",
                    openSubmenu ? "grid-rows-[1fr] pb-4 opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="flex flex-col gap-3 overflow-hidden pl-3">
                    {link.submenu.map((sub) => (
                      <SheetClose asChild key={sub.key}>
                        <Link
                          href={sub.href}
                          className="text-sm text-white/70 transition-colors hover:text-white"
                        >
                          {t(sub.key)}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <SheetClose asChild key={link.key}>
                <Link
                  href={link.href}
                  className="border-b border-white/10 py-4 text-base font-semibold"
                >
                  {t(link.key)}
                </Link>
              </SheetClose>
            )
          )}
        </nav>

        <div className="mt-6 flex flex-col gap-4">
          <LanguageSwitcher variant="dark" className="self-start" />
          <Button variant="light" size="default" className="w-full">
            {t("navbar.bookAppointment")}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
