"use client";

import React from "react";
import { useLang } from "@/context/lang-context";
import { getUnderundreCopy } from "../locales";

export default function SprintPricing() {
  const { lang } = useLang();
  const t = getUnderundreCopy(lang).pricing;

  return (
    <section id="pricing" className="py-20 bg-white dark:bg-[#06020a] border-b border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-purple-950/40 text-orange-400 text-xs font-semibold rounded-full uppercase tracking-wider mb-3 border border-purple-800/40">
            {t.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {t.title}
          </h2>
          <p className="mt-4 text-slate-600 dark:text-purple-200/70 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {/* Product 0: Workaround TCO Audit */}
          <div className="p-8 bg-[#180a2e]/90 rounded-2xl border-2 border-brand-orange flex flex-col justify-between relative shadow-xl">
            <div className="absolute -top-3 right-6 px-3 py-1 bg-brand-orange text-white text-xs font-extrabold rounded-full uppercase tracking-wider shadow-md">
              {t.card0.heroTag}
            </div>
            <div>
              <span className="inline-block px-3 py-1 bg-emerald-950/40 text-emerald-400 text-xs font-bold rounded-full uppercase tracking-wider mb-4 border border-emerald-800/40">
                {t.card0.tier}
              </span>
              <h3 className="text-2xl font-bold text-white">{t.card0.title}</h3>
              <p className="mt-2 text-sm text-purple-200/70">{t.card0.desc}</p>

              <div className="my-6">
                <div className="flex items-baseline gap-3">
                  <div className="text-4xl font-extrabold text-white">{t.card0.price}</div>
                  <div className="text-base font-normal text-purple-300/50 line-through">$490</div>
                </div>
                <div className="text-xs text-purple-300/60 mt-1">{t.card0.priceAnchor}</div>
                <div className="text-sm font-semibold text-emerald-400 mt-2">{t.card0.creditNote}</div>
                <div className="text-xs text-purple-300/60 mt-2 font-mono">{t.card0.turnaround}</div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-purple-200">
                  {t.card0.deliverablesTitle}
                </div>
                <ul className="space-y-2 text-sm text-purple-200/80">
                  {t.card0.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#69a700] font-bold">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-emerald-950/20 border border-emerald-800/30 rounded-lg text-xs text-emerald-300 mb-6">
                <strong>{t.card0.demandGate}</strong>
              </div>
            </div>

            <a
              href="#contact"
              className="w-full block py-3.5 px-4 bg-brand-orange hover:bg-orange-600 active:scale-[0.98] text-white font-bold rounded-lg text-center transition-all shadow-lg shadow-orange-950/40 text-sm"
            >
              {t.card0.cta}
            </a>
          </div>

          {/* SKU 1: Sprint A FOSS Office */}
          <div className="p-8 bg-[#110721]/80 rounded-2xl border border-purple-900/30 flex flex-col justify-between hover:border-purple-600/50 transition-colors">
            <div>
              <span className="inline-block px-3 py-1 bg-purple-950/60 text-purple-300 text-xs font-bold rounded-full uppercase tracking-wider mb-4 border border-purple-800/40">
                {t.card1.tier}
              </span>
              <h3 className="text-2xl font-bold text-white">{t.card1.title}</h3>
              <p className="mt-2 text-sm text-purple-200/70">{t.card1.desc}</p>

              <div className="my-6">
                <div className="text-4xl font-extrabold text-white">
                  {t.card1.price} <span className="text-base font-normal text-purple-300/60">{t.card1.flatFee}</span>
                </div>
                <div className="text-sm font-semibold text-orange-400 mt-1">{t.card1.retainer}</div>
                <div className="text-xs text-purple-300/60 mt-2 font-mono">{t.card1.delivery}</div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-purple-200">
                  {t.card1.scopeTitle}
                </div>
                <ul className="space-y-2 text-sm text-purple-200/80">
                  {t.card1.scope.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#69a700] font-bold">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-purple-950/20 border border-purple-800/30 rounded-lg text-xs text-purple-300 mb-6">
                {t.card1.deployment}
              </div>
            </div>

            <a
              href="#contact"
              className="w-full py-3.5 px-6 bg-purple-900 hover:bg-purple-800 active:scale-[0.98] text-white font-semibold rounded-lg text-center transition-all border border-purple-700/40 text-sm"
            >
              {t.card1.cta}
            </a>
          </div>

          {/* Sprint B SKU hidden in v1: undreseller engine not release-ready yet.
              Re-enable in v2 together with ForkServiceLine (locales key card2 preserved). */}
        </div>
      </div>
    </section>
  );
}
