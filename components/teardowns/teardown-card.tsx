"use client";

import { useLang } from "@/context/lang-context";
import type { TeardownCase } from "@/lib/schemas/teardown-schema";

// Spec 008 FR-004: teardown card for the vault index.

export default function TeardownCard({ c }: { c: TeardownCase }) {
  const { lang } = useLang();
  const pick = (t: { ru: string; en: string }) => (lang === "ru" ? t.ru : t.en);
  return (
    <a
      href={`/teardowns/${c.slug}`}
      data-testid="teardown-card"
      className="group block rounded-2xl border border-brand-border bg-brand-surface-subtle p-6 transition-colors hover:border-orange-500/60"
    >
      <p className="text-xs font-mono uppercase tracking-widest text-orange-400/80">
        {pick(c.industry)} · {c.teamScale}
      </p>
      <h3 className="mt-2 text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
        {pick(c.title)}
      </h3>
      <p className="mt-2 text-sm text-purple-100/70 leading-relaxed line-clamp-3">
        {pick(c.summary)}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {c.metrics.map((m, i) => (
          <span
            key={i}
            className={`rounded-full px-3 py-1 text-xs font-bold border ${
              m.impact === "loss"
                ? "border-red-500/40 bg-red-950/30 text-red-300"
                : "border-green-500/40 bg-green-950/30 text-green-300"
            }`}
          >
            {m.value}
          </span>
        ))}
      </div>
    </a>
  );
}
