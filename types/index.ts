export type Locale = "uz" | "ru";

export interface NavSubItem {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  submenu?: NavSubItem[];
}
