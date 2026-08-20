"use client";

import React from "react";

export default function LoomDemoSection() {
  return (
    <section id="loom-demo" className="py-20 bg-slate-50 dark:bg-[#08030f] border-b border-purple-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-brand-green/10 text-brand-green text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
            Live Telemetry & Sandbox Proof
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            We Run on Our Own Code. Test Our Live Sandbox App.
          </h2>
          <p className="mt-4 text-slate-600 dark:text-purple-200/70 max-w-2xl mx-auto">
            Every lead, payload, and payment at Undreseller is processed by the exact same architecture we deploy for you. Don't take our word for it — test the live production stand.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <a
              href="https://demo.undreseller.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-lg transition-colors text-sm shadow-md flex items-center gap-2"
            >
              <span>Open Live Sandbox App (demo.undreseller.com)</span>
              <span>↗</span>
            </a>
            <a
              href="https://demo.undreseller.com/api/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-purple-950/60 hover:bg-purple-900/70 text-purple-200 font-semibold rounded-lg transition-colors text-sm border border-purple-800/40 flex items-center gap-2"
            >
              <span>Inspect Live Swagger Spec (OpenAPI 3.0)</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* 5-Step Pipeline Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="p-5 bg-white dark:bg-[#12081f] rounded-xl border border-purple-900/30 shadow-sm">
            <span className="text-xs font-mono font-bold text-orange-400">01 / INGEST</span>
            <h4 className="font-semibold mt-1 mb-2 text-slate-900 dark:text-slate-100 text-sm">Webhook Ingest</h4>
            <p className="text-xs text-slate-500 dark:text-purple-200/60">Raw JSON payload received from intake endpoints.</p>
          </div>
          <div className="p-5 bg-white dark:bg-[#12081f] rounded-xl border border-purple-900/30 shadow-sm">
            <span className="text-xs font-mono font-bold text-orange-400">02 / ZOD GUARD</span>
            <h4 className="font-semibold mt-1 mb-2 text-slate-900 dark:text-slate-100 text-sm">Zod Schema Node</h4>
            <p className="text-xs text-slate-500 dark:text-purple-200/60">Runtime validation via TypeScript Zod. Corrupted packets trapped immediately.</p>
          </div>
          <div className="p-5 bg-white dark:bg-[#12081f] rounded-xl border border-purple-900/30 shadow-sm">
            <span className="text-xs font-mono font-bold text-orange-400">03 / AI TRIAGE</span>
            <h4 className="font-semibold mt-1 mb-2 text-slate-900 dark:text-slate-100 text-sm">AI AI</h4>
            <p className="text-xs text-slate-500 dark:text-purple-200/60">Intent classification and task priority scoring in &lt;1.2 seconds.</p>
          </div>
          <div className="p-5 bg-white dark:bg-[#12081f] rounded-xl border border-purple-900/30 shadow-sm">
            <span className="text-xs font-mono font-bold text-orange-400">04 / DB STORAGE</span>
            <h4 className="font-semibold mt-1 mb-2 text-slate-900 dark:text-slate-100 text-sm">Supabase RLS DB</h4>
            <p className="text-xs text-slate-500 dark:text-purple-200/60">Encrypted write to PostgreSQL with strict Row Level Security (RLS) policies.</p>
          </div>
          <div className="p-5 bg-white dark:bg-[#12081f] rounded-xl border border-purple-900/30 shadow-sm">
            <span className="text-xs font-mono font-bold text-orange-400">05 / INCIDENT DLQ</span>
            <h4 className="font-semibold mt-1 mb-2 text-slate-900 dark:text-slate-100 text-sm">Telegram DLQ</h4>
            <p className="text-xs text-slate-500 dark:text-purple-200/60">Instant dispatch to engineering channel with one-click replay for quarantined packets.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
