"use client";

import React from "react";
import { useLang } from "@/context/lang-context";
import { getUnderundreCopy } from "../locales";

export default function VibeCodingWarning() {
  const { lang } = useLang();
  const t = getUnderundreCopy(lang).vibeWarning;

  return (
    <section className="py-20 bg-[#0a0414] border-b border-purple-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="p-8 md:p-12 bg-gradient-to-br from-[#160829] to-[#0d031a] rounded-2xl border border-orange-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl relative z-10">
            <span className="inline-block px-3 py-1 bg-orange-950/60 text-orange-400 text-xs font-mono font-bold rounded-full uppercase tracking-wider mb-4 border border-orange-800/40">
              {t.badge}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-4">
              {t.title}
            </h3>
            <p className="text-sm sm:text-base text-purple-200/80 leading-relaxed mb-6">
              {t.desc}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-[#090212]/80 rounded-xl border border-red-900/40">
                <div className="text-red-400 font-bold text-xs uppercase font-mono mb-1">{t.fateTitle}</div>
                <div className="text-xs text-purple-200/70">
                  {t.fateDesc}
                </div>
              </div>
              <div className="p-4 bg-[#090212]/80 rounded-xl border border-[#69a700]/40">
                <div className="text-brand-green font-bold text-xs uppercase font-mono mb-1">{t.standardTitle}</div>
                <div className="text-xs text-purple-200/70">
                  {t.standardDesc}
                </div>
              </div>
            </div>
            <p className="text-xs font-mono text-orange-300/80">
              {t.ruleOfThumb}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
