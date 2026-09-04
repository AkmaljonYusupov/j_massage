export interface InstagramPost {
  id: string;
  /** Instagram post yoki reel havolasi */
  url: string;
  /**
   * Ixtiyoriy: "public/instagram/" papkasidagi oldindan ko'rish rasmi.
   * Berilsa, karta o'sha rasmni ko'rsatadi; berilmasa - brend fon chiqadi.
   */
  poster?: string;
}

/**
 * 4x2 = 8 ta video. Hozircha faqat bitta haqiqiy havola bor,
 * qolganlarini o'z postlaringiz havolasi bilan almashtiring.
 */
export const INSTAGRAM_POSTS: InstagramPost[] = [
  { id: "post-1", url: "https://www.instagram.com/p/DbNLUPQtbdY/" },
  { id: "post-2", url: "https://www.instagram.com/p/DctkRkgNfMu/" },
  { id: "post-3", url: "https://www.instagram.com/p/DcLaNNsNHPg/" },
  { id: "post-4", url: "https://www.instagram.com/p/DcgBS0iNa8g/" },
  { id: "post-5", url: "https://www.instagram.com/p/DbYcpO7KQwR/" },
  { id: "post-6", url: "https://www.instagram.com/p/DbVtyfit4mG/" },
  { id: "post-7", url: "https://www.instagram.com/p/DbSSWwMtCZS/" },
  { id: "post-8", url: "https://www.instagram.com/p/DWqnJwVDcIa/" },
];

export const INSTAGRAM_PROFILE_URL =
  "https://www.instagram.com/janna_massagee";

/** Post havolasidan Instagram embed manzilini yasaydi */
export function toEmbedUrl(url: string) {
  const clean = url.split("?")[0].replace(/\/$/, "");
  return `${clean}/embed`;
}