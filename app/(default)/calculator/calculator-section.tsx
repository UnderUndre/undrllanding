"use client";

import { useLang } from "@/context/lang-context";
import { getUnderundreCopy } from "@/projects/underundre/locales";
import TdabcCalculator from "@/components/calculator/tdabc-calculator";

/** Shared calculator section: homepage embed (in-page scroll) and standalone /calculator (cross-route). */
export default function CalculatorSection({ mode }: { mode: "homepage" | "standalone" }) {
  const { lang } = useLang();
  const t = getUnderundreCopy(lang).calculator;
  return (
    <section id="calculator" className="py-24 bg-brand-bg border-b border-brand-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <span className="inline-block px-3 py-1 bg-purple-950/60 text-orange-400 text-xs font-mono font-bold rounded-full uppercase tracking-wider mb-6 border border-purple-800/40">
          {t.badge}
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white text-balance">
          {t.title}
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-purple-200/80">{t.subtitle}</p>
        <div className="mt-12">
          <TdabcCalculator copy={t} mode={mode} />
        </div>
      </div>
    </section>
  );
}
