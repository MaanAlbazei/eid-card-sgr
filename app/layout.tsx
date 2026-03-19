import type { Metadata } from "next";
import { Cairo, DM_Sans } from "next/font/google";
import "./globals.css";
import { brandConfig } from "@/config/brand.config";

const arabicFont = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-ar",
  display: "swap",
});

const englishFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-en",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eid Greeting Card Generator",
  description: "Generate personalized Eid cards for Saudi Gold Refinery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={brandConfig.defaultLanguage === "ar" ? "ar" : "en"}
      dir={brandConfig.defaultLanguage === "ar" ? "rtl" : "ltr"}
      className={`${arabicFont.variable} ${englishFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
