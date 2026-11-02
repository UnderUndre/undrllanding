"use client";

import { useLang } from "@/context/lang-context";
import { pick } from "@/lib/i18n";
import type { PricingData } from "@/lib/schemas/content-schema";

// Neutral client pricing view for scaffolded brands (spec 003 FR-010).
export default function GenericPricingView({ data }: { data: PricingData }) {
  const { lang } = useLang();
  const pickText = (field: any) => pick(field, lang);

  return (
    <section id="pricing" className="py-20 bg-brand-surface border-b border-brand-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14 space-y-3">
          <span className="inline-block px-3 py-1 bg-slate-900 text-brand-accent text-xs font-semibold rounded-full uppercase tracking-wider border border-slate-700">
            {pickText(data.sectionBadge)}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {pickText(data.sectionTitle)}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm">{pickText(data.sectionSubtitle)}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {data.plans.map((plan) => (
            <div
              key={plan.id}
              className={`p-8 rounded-2xl flex flex-col justify-between relative bg-brand-surface-subtle ${
                plan.isHero ? "border-2 border-brand-primary shadow-xl" : "border border-brand-border"
              }`}
            >
              {plan.isHero && plan.heroTag && (
                <div className="absolute -top-3 right-6 px-3 py-1 bg-brand-primary text-white text-xs font-extrabold rounded-full uppercase tracking-wider">
                  {pickText(plan.heroTag)}
                </div>
              )}
              <div>
                <span className="inline-block px-3 py-1 bg-slate-900 text-brand-accent text-xs font-bold rounded-full uppercase tracking-wider mb-4 border border-slate-700">
                  {pickText(plan.tierName)}
                </span>
                <h3 className="text-2xl font-bold text-white">{pickText(plan.title)}</h3>
                <p className="mt-2 text-sm text-slate-400">{pickText(plan.description)}</p>

                <div className="my-6">
                  <div className="flex items-baseline gap-3">
                    <div className="text-4xl font-extrabold text-white">{plan.price}</div>
                    {plan.originalPrice && (
                      <div className="text-base font-normal text-slate-500 line-through">
                        {plan.originalPrice}
                      </div>
                    )}
                  </div>
                  {plan.priceNote && (
                    <div className="text-xs text-slate-400 mt-1">{pickText(plan.priceNote)}</div>
                  )}
                  {plan.creditNote && (
                    <div className="text-sm font-semibold text-brand-accent mt-2">
                      {pickText(plan.creditNote)}
                    </div>
                  )}
                  <div className="text-xs text-slate-500 mt-2 font-mono">{pickText(plan.turnaround)}</div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    {pickText(plan.deliverablesTitle)}
                  </div>
                  <ul className="space-y-2 text-sm text-slate-400">
                    {plan.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-brand-accent font-bold">✓</span> {pickText(item)}
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.demandGateNote && (
                  <div className="p-3 bg-slate-900/60 border border-brand-border rounded-lg text-xs text-slate-300 mb-6">
                    {pickText(plan.demandGateNote)}
                  </div>
                )}
              </div>

              <a
                href={plan.ctaHref}
                className={`w-full block py-3.5 px-4 font-bold rounded-lg text-center transition-all text-sm ${
                  plan.isHero
                    ? "bg-brand-primary hover:bg-brand-primary-hover text-white"
                    : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                }`}
              >
                {pickText(plan.ctaText)}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
