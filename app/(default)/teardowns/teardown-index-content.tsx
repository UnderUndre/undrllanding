"use client";

import { useLang } from "@/context/lang-context";
import TeardownCard from "@/components/teardowns/teardown-card";
import type { TeardownCase } from "@/lib/schemas/teardown-schema";

export default function TeardownIndexContent({ cases }: { cases: TeardownCase[] }) {
  const { lang } = useLang();
  return (
    <main className="bg-brand-bg text-purple-50 min-h-screen">
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-3 py-1 bg-purple-950/60 text-orange-400 text-xs font-mono font-bold rounded-full uppercase tracking-wider mb-6 border border-purple-800/40">
            Forensic Teardowns
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {lang === "ru"
              ? "Анатомический театр: разборы реальных операционных засоров"
              : "Forensic teardowns: real operational clogs, dissected"}
          </h1>
          <p className="mt-4 text-purple-200/80 max-w-2xl">
            {lang === "ru"
              ? "Полные отчёты без гейт-форм: симптом → замеренная утечка → вскрытие архитектуры → итог. Всё, что мы находим за $350, показано здесь на обезличенных боевых примерах."
              : "Full reports, no gated forms: symptom → measured leak → architecture autopsy → outcome. Everything we find in a $350 audit, shown on sanitized field cases."}
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {cases.map((c) => (
              <TeardownCard key={c.slug} c={c} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
