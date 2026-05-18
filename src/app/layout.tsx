import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WhatsApp Yapay Zeka Satış Asistanı",
  description: "WhatsApp ve Instagram için 7/24 yapay zeka destekli müşteri hizmetleri ve satış otomasyonu çözümü.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
