"use client";

import React from "react";
import { useLang } from "@/context/lang-context";
import { getUnderundreCopy } from "../locales";

export default function OpsecProtocol() {
  const { lang } = useLang();
  const t = getUnderundreCopy(lang).opsec;

  return (
    <section id="opsec" className="py-20 bg-slate-50 dark:bg-[#08030f] border-b border-purple-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-brand-green/10 text-brand-green text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
            {t.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {t.title}
          </h2>
          <p className="mt-4 text-slate-600 dark:text-purple-200/70 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {t.steps.map((s, i) => (
            <div key={i} className="p-6 bg-white dark:bg-[#12081f] rounded-xl border border-purple-900/30 shadow-sm relative">
              <div className="w-8 h-8 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold text-sm mb-4">
                {s.num}
              </div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">{s.title}</h3>
              <p className="text-xs text-slate-500 dark:text-purple-200/60 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Code Handover Banner */}
        <div className="p-6 bg-[#120524] text-white rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-purple-800/40 mb-8">
          <div>
            <span className="text-xs font-mono font-bold text-orange-400 uppercase">{t.legalTitle}</span>
            <h4 className="text-lg font-bold mt-1">{t.legalH4}</h4>
            <p className="text-xs text-purple-200/70 mt-1">
              {t.legalDesc}
            </p>
          </div>
          <div className="px-4 py-2 bg-purple-900/40 text-brand-green border border-purple-700/40 rounded-lg text-xs font-mono whitespace-nowrap">
            {t.legalBadge}
          </div>
        </div>

        {/* ASYNC-FIRST COMM PROTOCOL */}
        <div className="p-6 bg-white dark:bg-[#12081f] text-slate-900 dark:text-white rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-purple-900/30 text-left">
          <div>
            <span className="text-xs font-mono font-bold text-orange-400 uppercase">{t.commTitle}</span>
            <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">{t.commH4}</h4>
            <p className="text-xs text-slate-500 dark:text-purple-200/70 mt-1">
              {t.commDesc}
            </p>
          </div>
          <div className="px-4 py-2 bg-purple-950 text-brand-green border border-purple-800/40 rounded-lg text-xs font-mono whitespace-nowrap">
            {t.commBadge}
          </div>
        </div>
      </div>
    </section>
  );
}
