import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";

import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { SiteLoader } from "@/components/SiteLoader/SiteLoader";
import { RippleProvider } from "@/components/RippleProvider/RippleProvider";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-bricolage",
});

// Bricolage Grotesque kirill alifbosini qo'llab-quvvatlamaydi, shuning uchun
// ruscha matnlar uchun zaxira shrift sifatida Inter yuklanadi.
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "J Massage School",
  description: "Massaj san'ati bo'yicha professional o'quv markazi",
  icons: {
    icon: "/logo_title.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className={`${bricolage.variable} ${inter.variable}`}>
      <body>
        <SiteLoader />
        <RippleProvider />
        <LanguageProvider>
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}