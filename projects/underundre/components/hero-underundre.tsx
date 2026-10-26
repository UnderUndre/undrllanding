"use client";

import React from "react";

export default function HeroUnderundre() {
  return (
    <section id="audit" className="relative pt-24 pb-16 bg-white dark:bg-[#06020a] text-slate-900 dark:text-slate-100 transition-colors border-b border-purple-900/30">
      {/* Background Subtle Brand Purple Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-950/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Top Trust Badge with Undesign Green Status */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/40 border border-purple-800/40 text-orange-400 text-xs font-semibold tracking-wide uppercase mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
          3X SALESFORCE CERTIFIED ARCHITECT | ZERO SAAS TAXES | UPWORK ESCROW VERIFIED
        </div>

        {/* H1 Main Headline with Brand Colors */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
          Stop Burning $15k–$40k/Yr on{" "}
          <span className="text-brand-orange bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-amber-500 to-orange-600">
            SaaS Seat Taxes
          </span>{" "}
          and Manual Workarounds.
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-600 dark:text-purple-100/80 max-w-3xl mx-auto mb-10 leading-relaxed">
          We perform a 48-Hour Workaround TCO Audit ($490) using Time-Driven Activity-Based Costing (TDABC). We pinpoint exact manual labor payroll leaks, eliminate redundant subscriptions, and deliver an OpenAPI 3.0 specification with a Docker mock. 100% credited toward implementation.
        </p>

        {/* CTA Buttons with Brand Colors & Smooth Scroll to Stack */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <a
            href="https://www.upwork.com/direct-contracts"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-lg shadow-lg shadow-orange-950/30 transition-all text-base text-center btn-primary-cta"
          >
            Book 48-Hour TCO Audit ($490) via Escrow →
          </a>
          <a
            href="#stack"
            className="w-full sm:w-auto px-8 py-4 bg-purple-950/40 hover:bg-purple-900/50 text-purple-200 font-semibold rounded-lg transition-all text-base border border-purple-800/40 text-center flex items-center justify-center gap-2 group"
          >
            <span>Explore Grand Slam FOSS Stack</span>
            <span className="text-orange-400 group-hover:translate-y-0.5 transition-transform">↓</span>
          </a>
        </div>

        {/* Microcopy Under Buttons */}
        <p className="text-xs text-slate-500 dark:text-purple-300/60 mb-12">
          ⚡ Forensic engineering protocol: TDABC cost analysis, Via Negativa assessment, and OpenAPI 3.0 specifications. Escrow via Upwork Direct Contracts (5%). NACE 62.01 Compliant.
        </p>

        {/* Trust Badges Grid using Undesign Theme Tokens */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto text-left pt-6 border-t border-purple-900/20">
          <div className="p-3 bg-purple-950/20 rounded-lg border border-purple-900/30">
            <div className="text-xs text-purple-300/70 uppercase font-semibold">Escrow Protection</div>
            <div className="text-sm font-bold text-slate-800 dark:text-purple-100">Upwork 5% Escrow</div>
          </div>
          <div className="p-3 bg-purple-950/20 rounded-lg border border-purple-900/30">
            <div className="text-xs text-purple-300/70 uppercase font-semibold">Turnaround SLA</div>
            <div className="text-sm font-bold text-slate-800 dark:text-purple-100">48-Hour Forensics</div>
          </div>
          <div className="p-3 bg-purple-950/20 rounded-lg border border-purple-900/30">
            <div className="text-xs text-purple-300/70 uppercase font-semibold">Via Negativa</div>
            <div className="text-sm font-bold text-slate-800 dark:text-purple-100">Anti-Waste Guarantee</div>
          </div>
          <div className="p-3 bg-purple-950/20 rounded-lg border border-purple-900/30">
            <div className="text-xs text-purple-300/70 uppercase font-semibold">IP Ownership</div>
            <div className="text-sm font-bold text-slate-800 dark:text-purple-100">100% Code Transfer</div>
          </div>
          <div className="p-3 bg-purple-950/20 rounded-lg border border-purple-900/30 col-span-2 md:col-span-1">
            <div className="text-xs text-purple-300/70 uppercase font-semibold">Tax Compliance</div>
            <div className="text-sm font-bold text-brand-green">NACE 62.01 Code</div>
          </div>
        </div>
      </div>
    </section>
  );
}
