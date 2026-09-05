import type { Locale } from "@/types";

/**
 * Bosh sahifa sarlavhasida almashib turadigan so'zlar.
 * Tilga qarab tanlanadi - JSON tarjima fayllari massivni qo'llab
 * quvvatlamagani uchun shu yerda saqlanadi.
 */
export const HERO_MORPH_WORDS: Record<Locale, string[]> = {
  uz: [
    "kattalar massajini",
    "bolalar massajini",
    "hijomani",
    "olovli massajni",
    "yuz massajini",
  ],
  ru: [
    "массаж для взрослых",
    "детский массаж",
    "хиджаму",
    "огненный массаж",
    "массаж лица",
  ],
};
