import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Amiri } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SupabaseProvider from "@/components/SupabaseProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Qur'an Flow — Belajar Baca Tulis Hijaiyah",
  description:
    "Platform edukasi digital untuk belajar menulis dan membaca Hijaiyah secara terstruktur, interaktif, dan menyenangkan.",
  keywords: "belajar hijaiyah, menulis arab, membaca quran, huruf hijaiyah",
  openGraph: {
    title: "Qur'an Flow",
    description: "Belajar baca tulis Hijaiyah dengan cara yang menyenangkan",
    type: "website",
  },
};

import ThemeProvider from "@/components/ThemeProvider";
import WelcomePopup from "@/components/WelcomePopup";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className={`${plusJakartaSans.variable} ${amiri.variable}`}>
      <body>
        <SupabaseProvider>
          <ThemeProvider>
            <WelcomePopup />
            {children}
          </ThemeProvider>
        </SupabaseProvider>
        <Script
          src={
            process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === 'true'
              ? 'https://app.midtrans.com/snap/snap.js'
              : 'https://app.sandbox.midtrans.com/snap/snap.js'
          }
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
