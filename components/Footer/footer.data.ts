export interface FooterLink {
  key: string;
  href: string;
}

/** "Tezkor havolalar" ustuni - navbar bilan bir xil */
export const FOOTER_LINKS: FooterLink[] = [
  { key: "navbar.home", href: "/" },
  { key: "navbar.about", href: "/about" },
  { key: "navbar.courses", href: "/courses" },
  { key: "navbar.contact", href: "/contact" },
];

/** "Kurslarimiz" ustuni - o'quv markazining asosiy yo'nalishlari */
export const FOOTER_COURSES: FooterLink[] = [
  { key: "footer.courses.children", href: "/courses" },
  { key: "footer.courses.adults", href: "/courses" },
  { key: "footer.courses.hijama", href: "/courses" },
  { key: "footer.courses.hirudo", href: "/courses" },
  { key: "footer.courses.fire", href: "/courses" },
  { key: "footer.courses.speech", href: "/courses" },
];

export interface FooterPhone {
  display: string;
  href: string;
}

export const FOOTER_PHONES: FooterPhone[] = [
  { display: "+998 97 715 51 82", href: "tel:+998977155182" },
  { display: "+998 95 021 99 90", href: "tel:+998950219990" },
];

export const FOOTER_INSTAGRAM_URL = "https://www.instagram.com/janna_massagee";
export const FOOTER_TELEGRAM_URL = "https://t.me/janna_masagee";