import Script from "next/script";
import "./css/style.css";
import "@underundre/undesign/css";

import { Geist, Geist_Mono } from "next/font/google";
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

export function generateMetadata() {
  const config = getActiveProjectConfig();
  
  return {
    title: config.title,
    description: config.description,
    icons: {
      icon: config.iconUrl,
      shortcut: config.iconUrl,
      apple: config.iconUrl,
    },
    openGraph: {
      title: config.title,
      description: config.description,
      url: `https://${config.domain}`,
      type: "website",
    },
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
    <html lang="en" className="scroll-smooth dark" data-theme="undrlla-dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} font-sans tracking-tight bg-[#080808] text-purple-50 antialiased selection:bg-[#b45500] selection:text-white transition-colors duration-300`}
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
