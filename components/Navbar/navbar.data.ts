export interface NavLinkConfig {
  key: string;
  href: string;
  submenu?: { key: string; href: string }[];
}

export const NAV_LINKS: NavLinkConfig[] = [
  { key: "navbar.home", href: "/" },
  { key: "navbar.about", href: "/about" },
  { key: "navbar.services", href: "/services" },
  { key: "navbar.blog", href: "/blog" },
  {
    key: "navbar.pages",
    href: "#",
    submenu: [
      { key: "navbar.pagesSubmenu.team", href: "/team" },
      { key: "navbar.pagesSubmenu.pricing", href: "/pricing" },
      { key: "navbar.pagesSubmenu.faq", href: "/faq" },
      { key: "navbar.pagesSubmenu.testimonials", href: "/testimonials" },
    ],
  },
  { key: "navbar.contact", href: "/contact" },
];
