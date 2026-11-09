import Script from "next/script";
import "./css/style.css";
import "@underundre/undesign/css";

import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import { getActiveProjectConfig } from "@/lib/project-config";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export function generateMetadata(): Metadata {
  const config = getActiveProjectConfig();
  const domainUrl = `https://${config.domain}`;

  // Spec 006 FR-010: optional env-driven webmaster verification (empty → absent).
  const gsc = process.env.NEXT_PUBLIC_GSC_VERIFICATION;
  const yandex = process.env.NEXT_PUBLIC_YANDEX_VERIFICATION;

  return {
    metadataBase: new URL(domainUrl),
    title: config.title,
    description: config.description,
    alternates: {
      canonical: "/",
    },
    icons: {
      icon: config.faviconUrl ?? config.iconUrl,
      shortcut: config.faviconUrl ?? config.iconUrl,
      apple: config.appleIconUrl ?? config.faviconUrl ?? config.iconUrl,
    },
    openGraph: {
      title: config.title,
      description: config.description,
      url: domainUrl,
      siteName: config.name,
      type: "website",
      locale: "en",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${config.name} — ${config.domain}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
    },
    ...(gsc || yandex
      ? {
          verification: {
            ...(gsc ? { google: gsc } : {}),
            ...(yandex ? { yandex: yandex } : {}),
          },
        }
      : {}),
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SRC || "https://analytics.underundre.com/script.js";

  return (
    <html lang="en" className="scroll-smooth dark" data-theme={`${getActiveProjectConfig().slug}-dark`} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} font-sans tracking-tight bg-brand-bg text-slate-900 dark:text-purple-50 antialiased selection:bg-[#b45500] selection:text-white transition-colors duration-300`}
      >
        <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          {children}
        </div>
        {umamiWebsiteId && (
          <Script
            strategy="afterInteractive"
            src={umamiSrc}
            data-website-id={umamiWebsiteId}
          />
        )}
      </body>
    </html>
  );
}
