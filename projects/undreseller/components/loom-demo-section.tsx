"use client";

import React from "react";

export default function LoomDemoSection() {
  return (
    <section id="loom-demo" className="py-20 bg-slate-50 dark:bg-[#0c0c0c] border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
            Live Telemetry & Proof
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            We Run on Our Own Code. Inspect Our Live Telemetry.
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Every lead, payload, and payment at Undreseller is processed by the exact same architecture we deploy for you. No mockups. Real production infrastructure.
          </p>
        </div>

        {/* 5-Step Pipeline Card */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
          <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">01 / INGEST</span>
            <h4 className="font-semibold mt-1 mb-2 text-slate-900 dark:text-slate-100 text-sm">Webhook Ingest</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Raw JSON payload received from customer intake endpoints.</p>
          </div>
          <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">02 / ZOD GUARD</span>
            <h4 className="font-semibold mt-1 mb-2 text-slate-900 dark:text-slate-100 text-sm">Zod Schema Node</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Runtime validation via TypeScript Zod. Corrupted packets trapped immediately.</p>
          </div>
          <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">03 / AI TRIAGE</span>
            <h4 className="font-semibold mt-1 mb-2 text-slate-900 dark:text-slate-100 text-sm">Claude 3.7 AI</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Intent classification and task priority scoring in &lt;1.2 seconds.</p>
          </div>
          <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">04 / DB STORAGE</span>
            <h4 className="font-semibold mt-1 mb-2 text-slate-900 dark:text-slate-100 text-sm">Supabase RLS DB</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Encrypted write to PostgreSQL with strict Row Level Security (RLS) policies.</p>
          </div>
          <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">05 / INCIDENT DLQ</span>
            <h4 className="font-semibold mt-1 mb-2 text-slate-900 dark:text-slate-100 text-sm">Telegram DLQ</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Instant dispatch to engineering channel with one-click replay for quarantined packets.</p>
          </div>
        </div>

        {/* Video Container Box */}
        <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-2xl max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded-full uppercase tracking-wider">
              90-SECOND LIVE ARCHITECTURE BREAKDOWN
            </span>
            <span className="text-xs font-mono text-slate-400">STATUS: 100% OPERATIONAL</span>
          </div>

          <div className="aspect-video bg-slate-950 rounded-lg flex items-center justify-center border border-slate-800 relative overflow-hidden group cursor-pointer">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110 shadow-lg shadow-blue-500/30">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-1">Click to Watch 90s Loom Teardown</h3>
              <p className="text-xs text-slate-400">See Next.js 15 + Supabase + n8n conveyor ship production code in 14 days flat.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
