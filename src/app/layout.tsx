import type { Metadata } from "next";
import "./globals.css";
import SupabaseProvider from "@/components/SupabaseProvider";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Amiri:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SupabaseProvider>{children}</SupabaseProvider>
      </body>
    </html>
  );
}
