"use client";

import { useLang } from "@/context/lang-context";
import { getUnderundreCopy } from "@/projects/underundre/locales";
import VisualContractInspector from "@/components/architecture/visual-contract-inspector";
import type { TeardownCase } from "@/lib/schemas/teardown-schema";

// Spec 008 FR-005: full forensic autopsy. Zero gated download walls.

export default function TeardownAutopsyContent({ c }: { c: TeardownCase }) {
  const { lang } = useLang();
  const t = getUnderundreCopy(lang).inspector;
  const pick = (x: { ru: string; en: string }) => (lang === "ru" ? x.ru : x.en);

  return (
    <main className="bg-brand-bg text-purple-50 min-h-screen">
      <article className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <nav className="text-xs font-mono text-purple-300/60 mb-6" aria-label="Breadcrumb">
            <a href="/" className="hover:text-orange-400">Home</a>
            <span className="mx-2">/</span>
            <a href="/teardowns" className="hover:text-orange-400">Teardowns</a>
            <span className="mx-2">/</span>
            <span className="text-purple-200">{c.slug}</span>
          </nav>

          <p className="text-xs font-mono uppercase tracking-widest text-orange-400/80">
            {pick(c.industry)} · {c.teamScale}
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-white text-balance">
            {pick(c.title)}
          </h1>
          <p className="mt-4 text-purple-200/80 leading-relaxed">{pick(c.summary)}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {c.metrics.map((m, i) => (
              <span
                key={i}
                className={`rounded-full px-3 py-1 text-xs font-bold border ${
                  m.impact === "loss"
                    ? "border-red-500/40 bg-red-950/30 text-red-300"
                    : "border-green-500/40 bg-green-950/30 text-green-300"
                }`}
              >
                {pick(m.label)}: {m.value}
              </span>
            ))}
          </div>

          <Section title={lang === "ru" ? "Симптом" : "Symptom"}>
            {pick(c.symptom)}
          </Section>

          <Section
            title={lang === "ru" ? "Замеренная утечка" : "Measured leak"}
          >
            {lang === "ru"
              ? `$${c.measuredLeakAnnualUsd.toLocaleString("en-US")}/год · ${c.measuredLaborHoursPerWeek} ч/нед ручного труда`
              : `$${c.measuredLeakAnnualUsd.toLocaleString("en-US")}/yr · ${c.measuredLaborHoursPerWeek} hrs/wk of manual labor`}
          </Section>

          <Section title={lang === "ru" ? "Диагноз" : "Diagnosis"}>
            {pick(c.diagnosis)}
          </Section>

          <h2 className="mt-12 text-xl font-bold text-white">{t.title}</h2>
          <p className="mt-2 text-sm text-purple-200/70">{t.subtitle}</p>
          <div className="mt-4">
            <VisualContractInspector comparison={c.architectureComparison} />
          </div>

          <Section title={lang === "ru" ? "Суверенное решение" : "Sovereign solution"}>
            {pick(c.sovereignSolution)}
          </Section>

          <Section title={lang === "ru" ? "Контракт схемы (DDL)" : "Schema contract (DDL)"}>
            <pre className="overflow-x-auto rounded-xl border border-brand-border bg-black/40 p-4 text-xs leading-relaxed text-green-200/90 font-mono">
              <code>{c.ddlSnippet}</code>
            </pre>
          </Section>

          <Section title={lang === "ru" ? "Итог" : "Outcome"}>
            {pick(c.outcome)}
          </Section>

          <div className="mt-12 rounded-2xl border border-orange-500/40 bg-orange-950/20 p-6 text-center">
            <p className="text-white font-bold">
              {lang === "ru"
                ? "Похожий засор в твоём контуре?"
                : "A similar clog in your pipeline?"}
            </p>
            <a
              href="/#contact"
              className="mt-3 inline-block rounded-xl bg-orange-600 hover:bg-orange-500 px-6 py-3 text-sm font-bold text-white transition-colors"
            >
              {lang === "ru"
                ? "Заказать разбор своего процесса ($350) →"
                : "Book the same autopsy for your workflow ($350) →"}
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <div className="mt-3 text-purple-100/80 leading-relaxed">{children}</div>
    </section>
  );
}
