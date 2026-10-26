"use client";

import React from "react";

export default function HeroUnderundre() {
  return (
    <section id="audit" className="relative pt-28 pb-20 bg-[#080808] text-purple-50 transition-colors border-b border-purple-900/30 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Top Trust Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/60 border border-purple-800/40 text-orange-400 text-xs font-semibold tracking-wide uppercase mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse inline-block mr-1" />
          3X SALESFORCE CERTIFIED ARCHITECT | ZERO SAAS TAXES | UPWORK ESCROW VERIFIED
        </div>

        {/* H1 Main Headline with text-balance */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-[680px] mx-auto leading-tight text-white text-balance">
          Stop Burning $15k–$40k/Yr on{" "}
          <span className="text-brand-orange bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-amber-500 to-orange-600">
            SaaS Seat Taxes
          </span>{" "}
          & Manual Workarounds.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-purple-200/80 max-w-[680px] mx-auto mb-10 leading-relaxed text-pretty">
          We perform a 48-Hour Workaround TCO Audit ($490) using Time-Driven Activity-Based Costing (TDABC). We pinpoint exact manual labor payroll leaks, eliminate redundant subscriptions, and deliver an OpenAPI 3.0 specification with a Docker mock. 100% credited toward implementation.
        </p>

        {/* CTA Buttons with active state physical feedback & focus rings */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <a
            href="https://www.upwork.com/direct-contracts"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 bg-brand-orange hover:bg-orange-600 active:scale-[0.98] text-white font-bold rounded-lg shadow-lg shadow-orange-950/30 transition-all text-sm text-center focus-visible:outline-2 focus-visible:outline-orange-400"
          >
            Book 48-Hour TCO Audit ($490) via Escrow →
          </a>
          <a
            href="#stack"
            className="w-full sm:w-auto px-6 py-3 bg-purple-950/60 hover:bg-purple-900/70 active:scale-[0.98] text-purple-200 font-semibold rounded-lg transition-all text-sm border border-purple-800/40 text-center flex items-center justify-center gap-2 group focus-visible:outline-2 focus-visible:outline-purple-400"
          >
            <span>Explore Grand Slam FOSS Stack</span>
            <span className="text-orange-400 group-hover:translate-y-0.5 transition-transform">↓</span>
          </a>
        </div>

        {/* Microcopy Under Buttons */}
        <p className="text-xs text-purple-300/60 mb-12">
          ⚡ Forensic engineering protocol: TDABC cost analysis, Via Negativa assessment, and OpenAPI 3.0 specifications. Escrow via Upwork Direct Contracts (5%). NACE 62.01 Compliant.
        </p>

        {/* 5 Trust Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto text-left pt-6 border-t border-purple-900/30">
          <div className="p-3 bg-purple-950/30 rounded-lg border border-purple-900/40">
            <div className="text-xs text-purple-300/70 uppercase font-semibold">Escrow Protection</div>
            <div className="text-sm font-bold text-purple-100">Upwork 5% Escrow</div>
          </div>
          <div className="p-3 bg-purple-950/30 rounded-lg border border-purple-900/40">
            <div className="text-xs text-purple-300/70 uppercase font-semibold">Turnaround SLA</div>
            <div className="text-sm font-bold text-purple-100">48-Hour Forensics</div>
          </div>
          <div className="p-3 bg-purple-950/30 rounded-lg border border-purple-900/40">
            <div className="text-xs text-purple-300/70 uppercase font-semibold">Via Negativa</div>
            <div className="text-sm font-bold text-purple-100">Anti-Waste Guarantee</div>
          </div>
          <div className="p-3 bg-purple-950/30 rounded-lg border border-purple-900/40">
            <div className="text-xs text-purple-300/70 uppercase font-semibold">IP Ownership</div>
            <div className="text-sm font-bold text-purple-100">100% Code Transfer</div>
          </div>
          <div className="p-3 bg-purple-950/30 rounded-lg border border-purple-900/40 col-span-2 md:col-span-1">
            <div className="text-xs text-purple-300/70 uppercase font-semibold">Tax Compliance</div>
            <div className="text-sm font-bold text-brand-green">NACE 62.01 Code</div>
          </div>
        </div>
      </div>
    </section>
  );
}
