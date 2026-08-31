"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "@/context/lang-context";
import WaitlistForm from "./waitlist-form";
import HeroTypingShowcase from "./hero-typing-showcase";
import AlphaSpotsCounter from "./alpha-spots-counter";
import {
  assignH1Variant,
  h1Keys,
  trackH1Event,
  type H1Variant,
} from "@/lib/h1-ab";
import type { translations } from "@/lib/i18n";

type I18nKey = keyof typeof translations.ru;

export default function HeroUndrlla() {
  const { t } = useLang();
  const [variant, setVariant] = useState<H1Variant | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const force = params.get("h1");
    const v = assignH1Variant(force);
    setVariant(v);
    trackH1Event("h1_view", v);
  }, []);

  const keys = h1Keys(variant ?? "a");
  const title1 = t(keys.title_1 as I18nKey);
  const titleAccent = t(keys.title_accent as I18nKey);
  const title2 = t(keys.title_2 as I18nKey);
  const subtitle = t(keys.subtitle as I18nKey);

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-50 transition-colors duration-300">
      {/* Subtle grid — no purple mesh blob (P1) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35] dark:opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 70% 55% at 50% 0%, #000 55%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 55% at 50% 0%, #000 55%, transparent 100%)",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(900px,100%)] h-[280px] bg-orange-500/10 dark:bg-orange-500/[0.07] blur-[100px] rounded-full pointer-events-none hero-glow" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 mb-6 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse motion-safe-pulse" />
            <span>{t("hero_badge_alpha")}</span>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <span className="text-orange-600 dark:text-orange-400 font-bold">
              {t("hero_badge_offer")}
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-[3.35rem] font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.08] mb-5 min-h-[2.4em] sm:min-h-[2.2em]"
            data-h1-variant={variant ?? "pending"}
            suppressHydrationWarning
          >
            {title1}{" "}
            <span className="text-orange-500 dark:text-orange-400">{titleAccent}</span>
            {title2.trim() ? ` ${title2.trim()}` : null}
          </h1>

          <p
            className="text-base md:text-lg text-slate-600 dark:text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed mb-6 min-h-[3rem]"
            suppressHydrationWarning
          >
            {subtitle}
          </p>

          {/* Trust strip under value prop */}
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs md:text-sm text-slate-600 dark:text-slate-400 mb-6">
            <li className="flex items-center gap-1.5">
              <span className="text-emerald-500 font-bold">✓</span>
              {t("hero_trust_1")}
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-emerald-500 font-bold">✓</span>
              {t("hero_trust_2")}
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-emerald-500 font-bold">✓</span>
              {t("hero_trust_3")}
            </li>
          </ul>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <a
              href="#waitlist"
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-400 active:scale-[0.98] px-5 py-2.5 text-sm font-bold text-slate-950 shadow-md shadow-orange-500/25 transition-all"
            >
              {t("nav_reserve")}
              <span aria-hidden>→</span>
            </a>
            <Link
              href="/economics"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-transparent hover:bg-slate-200/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all border border-slate-300 dark:border-slate-700"
            >
              {t("hero_btn_manifest")}
            </Link>
          </div>

          <div className="flex flex-wrap items-end justify-center gap-6 sm:gap-10 text-xs text-slate-600 dark:text-slate-400">
            <AlphaSpotsCounter variant="hero" />
            <div className="hidden sm:block h-12 w-px bg-slate-300 dark:bg-slate-700 self-center" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-orange-600 dark:text-orange-400 text-2xl font-extrabold tabular-nums leading-none">
                0%
              </span>
              <span>{t("hero_stat_cost")}</span>
            </div>
            <div className="hidden sm:block h-12 w-px bg-slate-300 dark:bg-slate-700 self-center" />
            <div className="flex flex-col items-center gap-1 max-w-[8rem] text-center">
              <span className="text-slate-900 dark:text-white text-sm font-bold leading-snug">
                {t("hero_stat_engine")}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div id="waitlist" className="lg:col-span-6 scroll-mt-28">
            <WaitlistForm />
          </div>
          <div className="lg:col-span-6 lg:pt-2">
            <HeroTypingShowcase />
          </div>
        </div>
      </div>
    </section>
  );
}
