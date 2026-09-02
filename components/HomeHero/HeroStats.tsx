"use client";

import { Star } from "lucide-react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { TRUST_AVATARS } from "./hero.data";

export function HeroStats() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center -space-x-3">
        {TRUST_AVATARS.map((avatar) => (
          <Avatar key={avatar.id}>
            <AvatarImage src={avatar.src} alt={avatar.alt} />
            <AvatarFallback>RV</AvatarFallback>
          </Avatar>
        ))}
        <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-revoza-cream bg-revoza-sage text-sm font-bold text-white">
          +
        </span>
      </div>

      <div className="text-sm text-white/90">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
          ))}
          <span className="ml-1 font-semibold">({t("hero.reviews")})</span>
        </div>
        <p className="mt-0.5 font-medium text-white/70">{t("hero.trustedClients")}</p>
      </div>
    </div>
  );
}
