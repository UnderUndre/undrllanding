"use client";

import { useState } from "react";
import { useLang } from "@/context/lang-context";
import type { PromptPackItem } from "@/lib/schemas/prompt-schema";

// Spec 009 FR-001: prompt cards with client-side copy — zero network requests.
// FR-003: each card ties back to the audit offer (step N of 5).

export default function PromptsContent({ prompts }: { prompts: PromptPackItem[] }) {
  const { lang } = useLang();
  const pick = (x: { ru: string; en: string }) => (lang === "ru" ? x.ru : x.en);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const copy = async (p: PromptPackItem) => {
    await navigator.clipboard.writeText(p.body);
    setCopiedSlug(p.slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const intro =
    lang === "ru"
      ? "Это те самые промпты, по которым я гоняю SpecKit Discovery за $350. Прогоните их на своём контуре сами — и приходите с готовым брифом: с ним аудит быстрее и дешевле. Без форм, без регистрации — копируйте и пользуйтесь."
      : "These are the exact prompts I run in a $350 SpecKit Discovery. Point them at your own pipeline first — then arrive with the finished brief: the audit gets faster and cheaper. No forms, no sign-up — copy and go.";

  const ctaLine =
    lang === "ru"
      ? "Этот промпт — шаг {n} из 5. Все пять на ваших живых данных я гоняю лично за $350."
      : "This prompt is step {n} of 5. I run all five on your live data myself for $350.";

  return (
    <main className="bg-brand-bg text-purple-50 min-h-screen">
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 bg-purple-950/60 text-orange-400 text-xs font-mono font-bold rounded-full uppercase tracking-wider mb-6 border border-purple-800/40">
            {lang === "ru" ? "Библиотека промптов" : "Prompt library"}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {lang === "ru"
              ? "Прогони мини-Discovery на своём бизнесе сам"
              : "Run a mini-Discovery on your own business"}
          </h1>
          <p className="mt-4 text-purple-200/80 leading-relaxed">{intro}</p>

          <a
            href="/prompt-pack.md"
            download
            className="mt-6 inline-block rounded-xl border border-orange-500/60 bg-orange-950/20 px-5 py-3 text-sm font-bold text-orange-300 hover:bg-orange-950/40 transition-colors"
          >
            {lang === "ru"
              ? "Скачать весь пак одним файлом (.md) ↓"
              : "Download the full pack (.md) ↓"}
          </a>

          <div className="mt-12 space-y-8">
            {prompts.map((p) => (
              <article
                key={p.slug}
                data-testid="prompt-card"
                className="rounded-2xl border border-brand-border bg-brand-surface-subtle p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-purple-300/60">
                    {p.relatesTo}
                  </span>
                  <span className="rounded-full border border-purple-800/40 px-3 py-1 text-xs font-bold text-purple-300">
                    {p.category}
                  </span>
                </div>
                <h2 className="mt-2 text-xl font-bold text-white">{pick(p.title)}</h2>
                <p className="mt-2 text-sm text-purple-100/70 leading-relaxed">{pick(p.description)}</p>
                <pre className="mt-4 overflow-x-auto rounded-xl border border-brand-border bg-black/40 p-4 text-xs leading-relaxed text-purple-100/90">
                  <code>{p.body}</code>
                </pre>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => copy(p)}
                    className="rounded-lg bg-orange-600 hover:bg-orange-500 px-4 py-2 text-xs font-bold text-white transition-colors"
                  >
                    {copiedSlug === p.slug
                      ? lang === "ru" ? "Скопировано ✓" : "Copied ✓"
                      : lang === "ru" ? "Скопировать промпт" : "Copy prompt"}
                  </button>
                  <p className="text-xs text-purple-300/50">
                    {ctaLine.replace("{n}", String(p.order))}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
