"use client";

import { useLang } from "@/context/lang-context";
import { pick } from "@/lib/i18n";
import type { ManifestData } from "@/lib/schemas/content-schema";

export default function ManifestContent({ manifest }: { manifest: ManifestData }) {
  const { lang } = useLang();
  const pickText = (field: any) => pick(field, lang);

  return (
    <main className="bg-[#080808] text-purple-50 min-h-screen">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-sm leading-relaxed space-y-10">
        <header className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {pickText(manifest.title)}
          </h1>
          <p className="text-purple-200/70">{pickText(manifest.subtitle)}</p>
          <p className="text-purple-300/50 text-xs">{manifest.version}</p>
        </header>

        {manifest.principles.map((principle) => (
          <section
            key={principle.number}
            id={`p-${principle.number}`}
            className="space-y-2 border-t border-purple-900/30 pt-6 scroll-mt-24"
          >
            <p className="text-orange-400 font-bold text-xs tracking-widest">
              §{principle.number}
            </p>
            <h2 className="text-xl font-bold text-white">{pickText(principle.title)}</h2>
            {principle.quote && (
              <blockquote className="border-l-2 border-orange-500/60 pl-4 italic text-purple-100/90">
                «{pickText(principle.quote)}»
              </blockquote>
            )}
            <p className="text-purple-200/80 font-medium">{pickText(principle.summary)}</p>
            <p className="text-purple-100/70">{pickText(principle.body)}</p>
          </section>
        ))}
      </article>
    </main>
  );
}
