import "./css/style.css";
import "@underundre/undesign/css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Undrlla — Запуск автономных маркетплейсов в 1 клик",
  description: "Платформа разворачивания маркетплейсов на Medusa 2.0 с уникальным брендингом и лендингом.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="scroll-smooth dark" data-theme="undrlla-dark">
      <body
        className={`${inter.variable} font-inter tracking-tight bg-slate-50 text-slate-900 dark:bg-[#080808] dark:text-slate-100 antialiased selection:bg-orange-500 selection:text-slate-950 transition-colors duration-300`}
      >
        <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          {children}
        </div>
      </body>
    </html>
  );
}
