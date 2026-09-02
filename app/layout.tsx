import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Navbar } from "@/components/Navbar/Navbar";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

import "./globals.css";
import { Footer } from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

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
    <html lang="uz">
      <body className={inter.className}>
        <LanguageProvider>
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}