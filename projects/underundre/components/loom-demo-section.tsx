"use client";

import React from "react";
import { useLang } from "@/context/lang-context";
import { getUnderundreCopy } from "../locales";

export default function LoomDemoSection() {
  const { lang } = useLang();
  const t = getUnderundreCopy(lang).telemetry;

  return (
    <section id="stack" className="py-20 bg-[#08030f] border-b border-purple-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-brand-green/10 text-brand-green text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
            {t.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {t.title}
          </h2>
          <p className="mt-4 text-purple-200/70 max-w-2xl mx-auto">
            {t.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <a
              href="#contact"
              className="px-6 py-3 bg-brand-orange hover:bg-orange-600 active:scale-[0.98] text-white font-bold rounded-lg transition-all text-sm shadow-md flex items-center gap-2"
            >
              <span>{t.ctaPrimary}</span>
              <span>→</span>
            </a>
            <a
              href={process.env.NEXT_PUBLIC_SOCIAL_GITHUB || "https://github.com/UnderUndre"}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-purple-950/60 hover:bg-purple-900/70 active:scale-[0.98] text-purple-200 font-semibold rounded-lg transition-all text-sm border border-purple-800/40 flex items-center gap-2"
            >
              <span>{t.ctaSecondary}</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* 5-Step Pipeline Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {t.cards.map((c, i) => (
            <div key={i} className="p-5 bg-[#12081f] rounded-xl border border-purple-900/30 shadow-sm">
              <span className="text-xs font-mono font-bold text-orange-400">{c.step}</span>
              <h4 className="font-semibold mt-1 mb-2 text-white text-sm">{c.title}</h4>
              <p className="text-xs text-purple-200/60">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
