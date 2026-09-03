"use client";

import React from "react";

export default function HeroUndreseller() {
  return (
    <section className="relative pt-24 pb-16 bg-white dark:bg-[#06020a] text-slate-900 dark:text-slate-100 transition-colors border-b border-purple-900/30">
      {/* Background Subtle Brand Purple Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-950/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Top Trust Badge with Undesign Green Status */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/40 border border-purple-800/40 text-orange-400 text-xs font-semibold tracking-wide uppercase mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
          3X SALESFORCE CERTIFIED DEVELOPER | ERASE $15K–$40K/YR SAAS TAXES | UPWORK ESCROW VERIFIED
        </div>

        {/* H1 Main Headline with Brand Colors */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
          Production-Grade B2B MVPs & Self-Hosted Systems Shipped in{" "}
          <span className="text-brand-orange bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-amber-500 to-orange-600">
            3–14 Days
          </span>
          . Zero Seat Fees.
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-600 dark:text-purple-100/80 max-w-3xl mx-auto mb-10 leading-relaxed">
          We replace slow $40k agencies, unpredictable freelancers, and bloated SaaS seat taxes (Salesforce, Notion, Linear, Intercom) with a fixed-price productized engineering conveyor. Built on Next.js 15, Supabase, Twenty CRM, Trigger.dev v3 & n8n.
        </p>

        {/* CTA Buttons with Brand Colors & Live Sandbox Link */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <a
            href="https://www.upwork.com/direct-contracts"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-lg shadow-lg shadow-orange-950/30 transition-all text-base text-center btn-primary-cta"
          >
            Book 14-Day Sprint via Escrow →
          </a>
          <a
            href="https://demo.undreseller.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-purple-950/40 hover:bg-purple-900/50 text-purple-200 font-semibold rounded-lg transition-all text-base border border-purple-800/40 text-center flex items-center justify-center gap-2 group"
          >
            <span>Explore Live Sandbox App</span>
            <span className="text-orange-400 group-hover:translate-x-0.5 transition-transform">↗</span>
          </a>
        </div>

        {/* Microcopy Under Buttons */}
        <p className="text-xs text-slate-500 dark:text-purple-300/60 mb-12">
          ⚡ Instant test: Log in as Demo Admin on <span className="font-mono text-orange-400">demo.undreseller.com</span> in 1 click. Escrow released during live Day 14 onboarding upon successful $1 checkout verification.
        </p>

        {/* Trust Badges Grid using Undesign Theme Tokens */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto text-left pt-6 border-t border-purple-900/20">
          <div className="p-3 bg-purple-950/20 rounded-lg border border-purple-900/30">
            <div className="text-xs text-purple-300/70 uppercase font-semibold">Escrow Protection</div>
            <div className="text-sm font-bold text-slate-800 dark:text-purple-100">Upwork / DocuSeal</div>
          </div>
          <div className="p-3 bg-purple-950/20 rounded-lg border border-purple-900/30">
            <div className="text-xs text-purple-300/70 uppercase font-semibold">Modern Stack</div>
            <div className="text-sm font-bold text-slate-800 dark:text-purple-100">Next.js 15 + Supabase</div>
          </div>
          <div className="p-3 bg-purple-950/20 rounded-lg border border-purple-900/30">
            <div className="text-xs text-purple-300/70 uppercase font-semibold">FOSS Office Stack</div>
            <div className="text-sm font-bold text-slate-800 dark:text-purple-100">Twenty CRM + Outline</div>
          </div>
          <div className="p-3 bg-purple-950/20 rounded-lg border border-purple-900/30">
            <div className="text-xs text-purple-300/70 uppercase font-semibold">IP Ownership</div>
            <div className="text-sm font-bold text-slate-800 dark:text-purple-100">100% Code Transfer</div>
          </div>
          <div className="p-3 bg-purple-950/20 rounded-lg border border-purple-900/30 col-span-2 md:col-span-1">
            <div className="text-xs text-purple-300/70 uppercase font-semibold">Warranty</div>
            <div className="text-sm font-bold text-brand-green">7-Day Bugfix SLA</div>
          </div>
        </div>
      </div>
    </section>
  );
}
