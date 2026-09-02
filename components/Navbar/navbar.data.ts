export interface NavLinkConfig {
  key: string;
  href: string;
}

export const NAV_LINKS: NavLinkConfig[] = [
  { key: "navbar.home", href: "/" },
  { key: "navbar.about", href: "/about" },
  { key: "navbar.courses", href: "/courses" },
  { key: "navbar.contact", href: "/contact" },
];