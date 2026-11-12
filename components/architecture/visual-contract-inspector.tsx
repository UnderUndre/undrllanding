"use client";

import { useState } from "react";
import { useLang } from "@/context/lang-context";
import { getUnderundreCopy } from "@/projects/underundre/locales";
import type { TeardownArchitectureComparison } from "@/lib/schemas/teardown-schema";

// Spec 008 FR-007 (plan DD-5): zero-dependency interactive comparison widget.
// Pure React 19 + Tailwind v4 — no chart libs, no WASM (NFR-003).

export default function VisualContractInspector({
  comparison,
}: {
  comparison: TeardownArchitectureComparison;
}) {
  const { lang } = useLang();
  const t = getUnderundreCopy(lang).inspector;
  const pick = (x: { ru: string; en: string }) => (lang === "ru" ? x.ru : x.en);
  const [tab, setTab] = useState<"fragile" | "sovereign">("fragile");
  const stack = tab === "fragile" ? comparison.fragileStack : comparison.sovereignStack;
  const isFragile = tab === "fragile";

  return (
    <div data-testid="visual-contract-inspector" className="rounded-2xl border border-brand-border bg-brand-surface-subtle overflow-hidden">
      <div className="flex border-b border-brand-border">
        <button
          type="button"
          onClick={() => setTab("fragile")}
          className={`flex-1 px-4 py-3 text-sm font-bold transition-colors ${
            isFragile ? "bg-red-950/40 text-red-300 border-b-2 border-red-500" : "text-purple-300/60 hover:text-purple-200"
          }`}
        >
          {t.fragileTabLabel}
        </button>
        <button
          type="button"
          onClick={() => setTab("sovereign")}
          className={`flex-1 px-4 py-3 text-sm font-bold transition-colors ${
            !isFragile ? "bg-green-950/40 text-green-300 border-b-2 border-green-500" : "text-purple-300/60 hover:text-purple-200"
          }`}
        >
          {t.sovereignTabLabel}
        </button>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap items-center gap-4 pb-4 border-b border-brand-border/60">
          <span className={`text-xs font-bold uppercase tracking-wider ${isFragile ? "text-red-400" : "text-green-400"}`}>
            {pick(stack.title)}
          </span>
          <span className="text-xs text-purple-200/70">
            {t.monthlyCostLabel}: <strong className="text-white">${stack.totalMonthlyCostUsd.toLocaleString("en-US")}/mo</strong>
          </span>
          <span className="text-xs text-purple-200/70">
            {t.failureRiskLabel}: <strong className={isFragile ? "text-red-300" : "text-green-300"}>{pick({ ru: stack.failureProbability, en: stack.failureProbability })}</strong>
          </span>
        </div>

        <ol className="mt-4 space-y-3">
          {stack.steps.map((step) => (
            <li
              key={step.stepNumber}
              className="rounded-xl border border-brand-border/60 bg-brand-bg/60 p-4"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${
                    isFragile ? "bg-red-950/60 text-red-300" : "bg-green-950/60 text-green-300"
                  }`}
                >
                  {step.stepNumber}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white">
                    {pick(step.title)} <span className="ml-2 text-xs font-mono text-purple-300/60">{step.tool}</span>
                  </p>
                  <p className="mt-1 text-xs text-purple-100/70 leading-relaxed">{pick(step.description)}</p>
                  <div className="mt-2 flex flex-wrap gap-3 text-xs">
                    {step.latency && (
                      <span className="text-purple-300/80">
                        {t.latencyLabel}: <strong className="text-purple-100">{step.latency}</strong>
                      </span>
                    )}
                    {step.costPerMo !== undefined && (
                      <span className="text-purple-300/80">
                        {t.monthlyCostLabel}: <strong className="text-purple-100">${step.costPerMo}/mo</strong>
                      </span>
                    )}
                    {step.failureMode && (
                      <span className="text-red-300/90">
                        {t.failureRiskLabel}: <strong>{pick(step.failureMode)}</strong>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
