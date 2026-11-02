"use client";

import React from "react";
import { useLang } from "@/context/lang-context";
import { pick } from "@/lib/i18n";
import type { PricingData, PricingPlanItem } from "@/lib/schemas/content-schema";

// Client view for the schema-driven pricing section (spec 003 FR-004, T-013).
// Data is loaded server-side (sprint-pricing.tsx) and passed as typed props.
// Sprint B SKU (card2) intentionally hidden in v1 — see spec/comment history.

export default function SprintPricingView({ data }: { data: PricingData }) {
  const { lang } = useLang();
  const pickText = (field: any) => pick(field, lang);

  return (
    <section id="pricing" className="py-20 bg-white dark:bg-[#06020a] border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-purple-950/40 text-orange-400 text-xs font-semibold rounded-full uppercase tracking-wider mb-3 border border-purple-800/40">
            {pickText(data.sectionBadge)}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {pickText(data.sectionTitle)}
          </h2>
          <p className="mt-4 text-slate-600 dark:text-purple-200/70 max-w-3xl mx-auto">
            {pickText(data.sectionSubtitle)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {data.plans.map((plan) =>
            plan.isHero ? (
              <HeroPlan key={plan.id} plan={plan} pick={pickText} />
            ) : (
              <StandardPlan key={plan.id} plan={plan} pick={pickText} />
            )
          )}

          {/* Sprint B SKU hidden in v1: undreseller engine not release-ready yet.
              Re-enable in v2 by adding its plan to pricing.json. */}
        </div>
      </div>
    </section>
  );
}

type PickFn = (field: any) => string;

function HeroPlan({ plan, pick }: { plan: PricingPlanItem; pick: PickFn }) {
  return (
    <div className="p-8 bg-brand-surface-subtle/90 rounded-2xl border-2 border-brand-orange flex flex-col justify-between relative shadow-xl">
      {plan.heroTag && (
        <div className="absolute -top-3 right-6 px-3 py-1 bg-brand-orange text-white text-xs font-extrabold rounded-full uppercase tracking-wider shadow-md">
          {pick(plan.heroTag)}
        </div>
      )}
      <div>
        <span className="inline-block px-3 py-1 bg-emerald-950/40 text-emerald-400 text-xs font-bold rounded-full uppercase tracking-wider mb-4 border border-emerald-800/40">
          {pick(plan.tierName)}
        </span>
        <h3 className="text-2xl font-bold text-white">{pick(plan.title)}</h3>
        <p className="mt-2 text-sm text-purple-200/70">{pick(plan.description)}</p>

        <div className="my-6">
          <div className="flex items-baseline gap-3">
            <div className="text-4xl font-extrabold text-white">{plan.price}</div>
            {plan.originalPrice && (
              <div className="text-base font-normal text-purple-300/50 line-through">{plan.originalPrice}</div>
            )}
          </div>
          {plan.priceNote && <div className="text-xs text-purple-300/60 mt-1">{pick(plan.priceNote)}</div>}
          {plan.creditNote && (
            <div className="text-sm font-semibold text-emerald-400 mt-2">{pick(plan.creditNote)}</div>
          )}
          <div className="text-xs text-purple-300/60 mt-2 font-mono">{pick(plan.turnaround)}</div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-purple-200">
            {pick(plan.deliverablesTitle)}
          </div>
          <ul className="space-y-2 text-sm text-purple-200/80">
            {plan.deliverables.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-brand-green font-bold">✓</span> {pick(item)}
              </li>
            ))}
          </ul>
        </div>

        {plan.demandGateNote && (
          <div className="p-3 bg-emerald-950/20 border border-emerald-800/30 rounded-lg text-xs text-emerald-300 mb-6">
            <strong>{pick(plan.demandGateNote)}</strong>
          </div>
        )}
      </div>

      <a
        href={plan.ctaHref}
        className="w-full block py-3.5 px-4 bg-brand-orange hover:bg-orange-600 active:scale-[0.98] text-white font-bold rounded-lg text-center transition-all shadow-lg shadow-orange-950/40 text-sm"
      >
        {pick(plan.ctaText)}
      </a>
    </div>
  );
}

function StandardPlan({ plan, pick }: { plan: PricingPlanItem; pick: PickFn }) {
  return (
    <div className="p-8 bg-[#110721]/80 rounded-2xl border border-brand-border flex flex-col justify-between hover:border-purple-600/50 transition-colors">
      <div>
        <span className="inline-block px-3 py-1 bg-purple-950/60 text-purple-300 text-xs font-bold rounded-full uppercase tracking-wider mb-4 border border-purple-800/40">
          {pick(plan.tierName)}
        </span>
        <h3 className="text-2xl font-bold text-white">{pick(plan.title)}</h3>
        <p className="mt-2 text-sm text-purple-200/70">{pick(plan.description)}</p>

        <div className="my-6">
          <div className="text-4xl font-extrabold text-white">{plan.price}</div>
          {plan.priceNote && (
            <div className="text-sm font-semibold text-orange-400 mt-1">{pick(plan.priceNote)}</div>
          )}
          <div className="text-xs text-purple-300/60 mt-2 font-mono">{pick(plan.turnaround)}</div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-purple-200">
            {pick(plan.deliverablesTitle)}
          </div>
          <ul className="space-y-2 text-sm text-purple-200/80">
            {plan.deliverables.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-brand-green font-bold">✓</span> {pick(item)}
              </li>
            ))}
          </ul>
        </div>

        {plan.demandGateNote && (
          <div className="p-3 bg-purple-950/20 border border-purple-800/30 rounded-lg text-xs text-purple-300 mb-6">
            {pick(plan.demandGateNote)}
          </div>
        )}
      </div>

      <a
        href={plan.ctaHref}
        className="w-full py-3.5 px-6 bg-purple-900 hover:bg-purple-800 active:scale-[0.98] text-white font-semibold rounded-lg text-center transition-all border border-purple-700/40 text-sm"
      >
        {pick(plan.ctaText)}
      </a>
    </div>
  );
}
