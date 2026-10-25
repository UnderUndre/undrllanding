"use client";

import React from "react";

export default function OpsecProtocol() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-[#08030f] border-b border-purple-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-brand-green/10 text-brand-green text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
            Zero Risk & Instant Contract Protocol
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            How We Eliminate 100% of Your Financial and Technical Risk.
          </h2>
          <p className="mt-4 text-slate-600 dark:text-purple-200/70 max-w-2xl mx-auto">
            You never transfer money to unverified personal accounts. We utilize standardized escrow mechanisms (Upwork Direct Contracts) or instant e-Signed MSA contracts via self-hosted DocuSeal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="p-6 bg-white dark:bg-[#12081f] rounded-xl border border-purple-900/30 shadow-sm relative">
            <div className="w-8 h-8 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold text-sm mb-4">1</div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Escrow & Architecture Audit (Day 1)</h3>
            <p className="text-xs text-slate-500 dark:text-purple-200/60">
              You fund escrow safely. We audit your business model: if a battle-tested engine (Shopify, FOSS CRM) fits best, we leverage it and engineer the custom Next.js landing/checkout layer. If proprietary architecture is required, we lock custom DDL schemas.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-[#12081f] rounded-xl border border-purple-900/30 shadow-sm relative">
            <div className="w-8 h-8 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold text-sm mb-4">2</div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Conveyor Build & Staging (Days 1–13)</h3>
            <p className="text-xs text-slate-500 dark:text-purple-200/60">
              Development runs in an isolated bureau staging environment. You get private staging preview URLs and walkthroughs to inspect live progress with zero blind spots.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-[#12081f] rounded-xl border border-purple-900/30 shadow-sm relative">
            <div className="w-8 h-8 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold text-sm mb-4">3</div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Live Verification & Handover (Day 14)</h3>
            <p className="text-xs text-slate-500 dark:text-purple-200/60">
              A 60-minute live session. We execute a live $1 Stripe transaction to verify the pipeline. Upon confirming functionality, you authorize escrow release and simultaneously receive 100% Git repo ownership and master infrastructure credentials.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-[#12081f] rounded-xl border border-purple-900/30 shadow-sm relative">
            <div className="w-8 h-8 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold text-sm mb-4">4</div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">7-Day Bugfix SLA</h3>
            <p className="text-xs text-slate-500 dark:text-purple-200/60">
              7 calendar days of post-release warranty. Any P1 (downtime) or P2 (broken flow) issues are resolved within 24 hours at zero additional cost.
            </p>
          </div>
        </div>

        {/* Code Handover & DocuSeal Banner */}
        <div className="p-6 bg-[#120524] text-white rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-purple-800/40 mb-8">
          <div>
            <span className="text-xs font-mono font-bold text-orange-400 uppercase">LEGAL & CODE HANDOVER STANDARD</span>
            <h4 className="text-lg font-bold mt-1">Full IP Code Handover & DocuSeal ESIGN Protocol</h4>
            <p className="text-xs text-purple-200/70 mt-1">
              Source code, DDL SQL schemas, and OpenAPI specs are 100% transferred to your private GitHub & infrastructure. Contracts signed via self-hosted DocuSeal conform to ESIGN Act 2000 & eIDAS 910/2014 standards.
            </p>
          </div>
          <div className="px-4 py-2 bg-purple-900/40 text-brand-green border border-purple-700/40 rounded-lg text-xs font-mono whitespace-nowrap">
            ESIGN & FULL IP CERTIFIED
          </div>
        </div>

        {/* ASYNC-FIRST COMM PROTOCOL */}
        <div className="p-6 bg-white dark:bg-[#12081f] text-slate-900 dark:text-white rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-purple-900/30 text-left">
          <div>
            <span className="text-xs font-mono font-bold text-orange-400 uppercase">COMMUNICATION PROTOCOL</span>
            <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">Async-First Velocity: Zero Meeting Fatigue</h4>
            <p className="text-xs text-slate-500 dark:text-purple-200/70 mt-1">
              We protect your delivery timeline by eliminating daily Zoom overhead. Daily updates and build walkthroughs are delivered asynchronously via Loom and Telegram. Synchronous calls are strictly reserved for <strong>Day 1 Kickoff (30 min)</strong> and <strong>Day 14 Live Verification (60 min)</strong>.
            </p>
          </div>
          <div className="px-4 py-2 bg-purple-950 text-brand-green border border-purple-800/40 rounded-lg text-xs font-mono whitespace-nowrap">
            100% BUILD FOCUS
          </div>
        </div>
      </div>
    </section>
  );
}
