"use client";

import React from "react";

export default function OpsecProtocol() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-[#08030f] border-b border-purple-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-brand-green/10 text-brand-green text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
            Zero Risk Policy
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            How We Eliminate 100% of Your Financial and Technical Risk.
          </h2>
          <p className="mt-4 text-slate-600 dark:text-purple-200/70 max-w-2xl mx-auto">
            You never transfer money to unverified personal accounts. We utilize standardized escrow mechanisms designed to protect mission-critical software investments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="p-6 bg-white dark:bg-[#12081f] rounded-xl border border-purple-900/30 shadow-sm relative">
            <div className="w-8 h-8 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold text-sm mb-4">1</div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Escrow Deposit (Day 1)</h3>
            <p className="text-xs text-slate-500 dark:text-purple-200/60">
              You deposit the fixed sprint amount ($3,500 or $4,900) into Upwork Direct Contracts Escrow. Funds are frozen on neutral ground. We cannot access the deposit until work is verified.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-[#12081f] rounded-xl border border-purple-900/30 shadow-sm relative">
            <div className="w-8 h-8 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold text-sm mb-4">2</div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Conveyor Build (Days 1–13)</h3>
            <p className="text-xs text-slate-500 dark:text-purple-200/60">
              Development runs in an isolated staging environment using pre-built Next.js 15 / Supabase / Trigger.dev modules with daily Git commits to your private repo.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-[#12081f] rounded-xl border border-purple-900/30 shadow-sm relative">
            <div className="w-8 h-8 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold text-sm mb-4">3</div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Live Onboarding (Day 14)</h3>
            <p className="text-xs text-slate-500 dark:text-purple-200/60">
              A 60-minute handover session. You inject your live production API keys. We run a live $1 transaction through your Stripe. You release escrow only after confirming payment receipt.
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

        {/* NACE 62.01 Banner */}
        <div className="p-6 bg-[#120524] text-white rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-purple-800/40">
          <div>
            <span className="text-xs font-mono font-bold text-orange-400 uppercase">LEGAL COMPLIANCE STANDARD</span>
            <h4 className="text-lg font-bold mt-1">NACE 62.01 Standard Code Deliverable</h4>
            <p className="text-xs text-purple-200/70 mt-1">
              Source code, database DDL schemas, and OpenAPI specs are transferred as clean IP assets under EU computer programming classification standards (NACE 62.01). Zero vendor lock-in.
            </p>
          </div>
          <div className="px-4 py-2 bg-purple-900/40 text-brand-green border border-purple-700/40 rounded-lg text-xs font-mono whitespace-nowrap">
            NACE 62.01 CERTIFIED
          </div>
        </div>
      </div>
    </section>
  );
}
