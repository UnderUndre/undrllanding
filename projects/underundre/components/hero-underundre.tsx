"use client";

import React from "react";
import { useLang } from "@/context/lang-context";
import { getUnderundreCopy } from "../locales";

export default function HeroUnderundre() {
  const { lang } = useLang();
  const t = getUnderundreCopy(lang).hero;

  return (
    <section id="audit" className="relative pt-28 pb-20 bg-[#080808] text-purple-50 transition-colors border-b border-purple-900/30 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Top Trust Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/60 border border-purple-800/40 text-orange-400 text-xs font-semibold tracking-wide uppercase mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse inline-block mr-1" />
          {t.badge}
        </div>

        {/* H1 Main Headline with text-balance */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-[680px] mx-auto leading-tight text-white text-balance">
          {t.title1}{" "}
          <span className="text-brand-orange bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-amber-500 to-orange-600">
            {t.titleAccent}
          </span>{" "}
          {t.title2}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-purple-200/80 max-w-[680px] mx-auto mb-10 leading-relaxed text-pretty">
          {t.subtitle}
        </p>

        {/* CTA Buttons with active state physical feedback & focus rings */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <a
            href="https://www.upwork.com/direct-contracts"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 bg-brand-orange hover:bg-orange-600 active:scale-[0.98] text-white font-bold rounded-lg shadow-lg shadow-orange-950/30 transition-all text-sm text-center focus-visible:outline-2 focus-visible:outline-orange-400"
          >
            {t.ctaPrimary}
          </a>
          <a
            href="#stack"
            className="w-full sm:w-auto px-6 py-3 bg-purple-950/60 hover:bg-purple-900/70 active:scale-[0.98] text-purple-200 font-semibold rounded-lg transition-all text-sm border border-purple-800/40 text-center flex items-center justify-center gap-2 group focus-visible:outline-2 focus-visible:outline-purple-400"
          >
            <span>{t.ctaSecondary}</span>
            <span className="text-orange-400 group-hover:translate-y-0.5 transition-transform">↓</span>
          </a>
        </div>

        {/* Microcopy Under Buttons */}
        <p className="text-xs text-purple-300/60 mb-12">
          {t.microcopy}
        </p>

        {/* 5 Trust Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto text-left pt-6 border-t border-purple-900/30">
          <div className="p-3 bg-purple-950/30 rounded-lg border border-purple-900/40">
            <div className="text-xs text-purple-300/70 uppercase font-semibold">{t.badges.escrow.label}</div>
            <div className="text-sm font-bold text-purple-100">{t.badges.escrow.value}</div>
          </div>
          <div className="p-3 bg-purple-950/30 rounded-lg border border-purple-900/40">
            <div className="text-xs text-purple-300/70 uppercase font-semibold">{t.badges.sla.label}</div>
            <div className="text-sm font-bold text-purple-100">{t.badges.sla.value}</div>
          </div>
          <div className="p-3 bg-purple-950/30 rounded-lg border border-purple-900/40">
            <div className="text-xs text-purple-300/70 uppercase font-semibold">{t.badges.viaNegativa.label}</div>
            <div className="text-sm font-bold text-purple-100">{t.badges.viaNegativa.value}</div>
          </div>
          <div className="p-3 bg-purple-950/30 rounded-lg border border-purple-900/40">
            <div className="text-xs text-purple-300/70 uppercase font-semibold">{t.badges.ip.label}</div>
            <div className="text-sm font-bold text-purple-100">{t.badges.ip.value}</div>
          </div>
          <div className="p-3 bg-purple-950/30 rounded-lg border border-purple-900/40 col-span-2 md:col-span-1">
            <div className="text-xs text-purple-300/70 uppercase font-semibold">{t.badges.tax.label}</div>
            <div className="text-sm font-bold text-brand-green">{t.badges.tax.value}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
