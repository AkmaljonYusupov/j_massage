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

/** "Kurslarimiz" ustuni */
export const FOOTER_COURSES: FooterLink[] = [
  { key: "footer.courses.classic", href: "/courses" },
  { key: "footer.courses.sport", href: "/courses" },
  { key: "footer.courses.antiCellulite", href: "/courses" },
  { key: "footer.courses.relax", href: "/courses" },
  { key: "footer.courses.children", href: "/courses" },
];

export const FOOTER_PHONE_DISPLAY = "+998 97 715 51 82";
export const FOOTER_PHONE_HREF = "tel:+998977155182";
export const FOOTER_INSTAGRAM_URL = "https://www.instagram.com/janna_massagee";
export const FOOTER_TELEGRAM_URL = "https://t.me/janna_masagee";