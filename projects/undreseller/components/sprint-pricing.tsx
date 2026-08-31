"use client";

import React from "react";

export default function SprintPricing() {
  return (
    <section id="pricing" className="py-20 bg-white dark:bg-[#06020a] border-b border-purple-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-purple-950/40 text-orange-400 text-xs font-semibold rounded-full uppercase tracking-wider mb-3 border border-purple-800/40">
            Two Core SKUs Only — Fixed Price
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Two Fixed-Price Packages. Zero Hidden Surcharges.
          </h2>
          <p className="mt-4 text-slate-600 dark:text-purple-200/70 max-w-2xl mx-auto">
            Pick your sprint. Lock scope. Funds remain in third-party Upwork Direct Contracts Escrow or DocuSeal e-Signed agreement until production deployment is verified.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* SKU 1 Card */}
          <div className="p-8 bg-slate-50 dark:bg-[#110721]/80 rounded-2xl border border-purple-900/30 flex flex-col justify-between hover:border-purple-600/50 transition-colors">
            <div>
              <span className="inline-block px-3 py-1 bg-purple-950/40 text-purple-300 text-xs font-bold rounded-full uppercase tracking-wider mb-4 border border-purple-800/40">
                GRAND SLAM FOSS OFFICE & OPERATIONS SPRINT
              </span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">SKU 1: B2B Operations & FOSS Office Stack</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-purple-200/70">
                Erase $15k–$40k/yr in SaaS seat taxes (Salesforce, Notion, Linear, Intercom, Calendly) with a self-hosted FOSS suite on Hetzner.
              </p>

              <div className="my-6">
                <div className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">$3,500 <span className="text-base font-normal text-slate-500 dark:text-purple-300/60">setup flat fee</span></div>
                <div className="text-sm font-semibold text-orange-400 mt-1">+ $500/month runtime maintenance & monitoring</div>
                <div className="text-xs text-slate-500 dark:text-purple-300/60 mt-2 font-mono">⚡ Delivery: 3 to 5 Business Days</div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-purple-200">Included Scope (Fixed Scope):</div>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-purple-200/80">
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> Open-Source CRM (Twenty CRM / EspoCRM) with 0 monthly seat licenses.</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> Grand Slam FOSS Office: Outline (Docs), Plane (Tasks), Chatwoot (Support), Cal.com.</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> Dedicated n8n workflow deployment or Trigger.dev v3 code tasks.</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> Strict runtime payload validation powered by TypeScript Zod.</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> Supabase PostgreSQL audit log & Dead-Letter Queue (DLQ).</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> Multi-channel notification routing (Telegram / Slack / Email).</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> 7-Day post-deployment Bugfix SLA Knife (P1/P2 incidents).</li>
                </ul>
              </div>

              <div className="p-4 bg-orange-950/20 border border-orange-800/30 rounded-lg text-xs text-orange-300 mb-6">
                <strong>Fixed Scope Knife:</strong> Excludes customer-facing frontend portals & production email server hosting (email stays on Google Workspace / M365). Additional third-party API integrations beyond the 3 agreed services are billed at $100/hr in Phase 2.
              </div>
            </div>

            <a
              href="https://www.upwork.com/direct-contracts"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-6 bg-purple-900 hover:bg-purple-800 text-white font-semibold rounded-lg text-center transition-colors border border-purple-700/40"
            >
              Deploy Workflow & FOSS Office via Escrow →
            </a>
          </div>

          {/* SKU 2 Card */}
          <div className="p-8 bg-purple-950/30 dark:bg-[#180a2e]/90 rounded-2xl border-2 border-brand-orange flex flex-col justify-between relative shadow-xl">
            <div className="absolute -top-3 right-6 px-3 py-1 bg-brand-orange text-white text-xs font-extrabold rounded-full uppercase tracking-wider shadow-md">
              HERO SKU — 14 DAYS
            </div>

            <div>
              <span className="inline-block px-3 py-1 bg-orange-500/10 text-orange-400 text-xs font-bold rounded-full uppercase tracking-wider mb-4 border border-orange-500/20">
                FULL-STACK SAAS LAUNCH
              </span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">SKU 2: 14-Day SaaS MVP Factory</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-purple-200/70">
                A fully functional, production-ready B2B SaaS application deployed directly to your infrastructure, ready to charge users on Day 14.
              </p>

              <div className="my-6">
                <div className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">$4,900 <span className="text-base font-normal text-slate-500 dark:text-purple-300/60">one-time flat fee</span></div>
                <div className="text-sm font-semibold text-brand-green mt-1">Guaranteed Timebox Delivery</div>
                <div className="text-xs text-slate-500 dark:text-purple-300/60 mt-2 font-mono">🚀 Delivery: 14 Calendar Days Flat</div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-purple-200">Included Scope (Fixed Scope):</div>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-purple-200/80">
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> Next.js 15 (App Router, Server Actions, Tailwind CSS, Shadcn UI).</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> Supabase PostgreSQL, RLS policies, Auth (Email, Google OAuth).</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> Stripe Checkout / Lemon Squeezy subscription webhooks & portal.</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> Trigger.dev v3 / Inngest SUL-free background workflows in TS.</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> NACE 62.01 Code Handover: Git repo, OpenAPI 3.0, DDL SQL, Docker.</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> 60-Minute Live Onboarding Protocol on Day 14 with $1 test run.</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> 7-Day Bugfix SLA Knife covering all critical post-launch bugs.</li>
                </ul>
              </div>

              <div className="p-4 bg-orange-950/20 border border-orange-800/30 rounded-lg text-xs text-orange-300 mb-6">
                <strong>Fixed Scope Knife:</strong> Excludes native mobile apps (iOS/Android) and custom AI fine-tuning. Post-MVP feature expansions are scheduled in Phase 2 at $100/hr.
              </div>
            </div>

            <a
              href="https://www.upwork.com/direct-contracts"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-lg text-center transition-colors shadow-lg shadow-orange-950/40 text-base"
            >
              Lock 14-Day MVP Sprint via Escrow →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
