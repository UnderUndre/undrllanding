"use client";

import React from "react";

export default function HeroUndreseller() {
  return (
    <section className="relative pt-24 pb-16 bg-white dark:bg-[#080808] text-slate-900 dark:text-slate-100 transition-colors border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Top Trust Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wide uppercase mb-8">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          UPWORK ESCROW VERIFIED | 100% FIXED SCOPE | ZERO HOURLY BILLING
        </div>

        {/* H1 Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
          Production-Grade B2B MVPs & Workflows Shipped in{" "}
          <span className="text-blue-600 dark:text-blue-500">3–14 Days</span>. Zero Budget Drag.
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          We replace slow $40k agencies and unpredictable freelancers with a fixed-price productized engineering conveyor. Built on Next.js 15, Supabase, and n8n. Protected by Upwork Direct Contracts Escrow.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="https://www.upwork.com/direct-contracts"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/25 transition-all text-base text-center"
          >
            Book 14-Day Sprint via Escrow →
          </a>
          <a
            href="#loom-demo"
            className="w-full sm:w-auto px-8 py-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-semibold rounded-lg transition-all text-base border border-slate-200 dark:border-slate-700 text-center"
          >
            Watch 90s Live Architecture Demo |►
          </a>
        </div>

        {/* Microcopy Under Buttons */}
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-12">
          🔒 100% protected funds. Escrow released only after your live $1 checkout verification.
        </p>

        {/* Trust Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto text-left pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200/60 dark:border-slate-800">
            <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Escrow Protection</div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-200">Upwork Direct</div>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200/60 dark:border-slate-800">
            <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Modern Stack</div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-200">Next.js 15 + Supabase</div>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200/60 dark:border-slate-800">
            <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">AI Automation</div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-200">Claude 3.7 + n8n</div>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200/60 dark:border-slate-800">
            <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Legal Code</div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-200">NACE 62.01 Standard</div>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200/60 dark:border-slate-800 col-span-2 md:col-span-1">
            <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Warranty</div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-200">7-Day Bugfix SLA</div>
          </div>
        </div>
      </div>
    </section>
  );
}
