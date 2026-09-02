import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Revoza — Premium Spa Experience",
  description:
    "Revitalize your body, mind and spirit today with Revoza's premium spa treatments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className={manrope.variable}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
