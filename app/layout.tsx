import "./css/style.css";
import "@underundre/undesign/css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Undrlla — 1-Click Autonomous Marketplace Platform",
    template: "%s | Undrlla",
  },
  description:
    "Launch your autonomous marketplace powered by Medusa 2.0 with custom branding, custom Next.js 15 storefront, custom domain, card (Paddle/Stripe) and crypto (SHKeeper) payments.",
  icons: {
    icon: "/images/undrlla-icon.png",
    shortcut: "/images/undrlla-icon.png",
    apple: "/images/undrlla-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth dark" data-theme="undrlla-dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} font-inter tracking-tight bg-slate-50 text-slate-900 dark:bg-[#0b0114] dark:text-purple-50 antialiased selection:bg-orange-500 selection:text-purple-950 transition-colors duration-300`}
      >
        <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          {children}
        </div>
      </body>
    </html>
  );
}
