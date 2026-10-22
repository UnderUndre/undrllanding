"use client";

import React from "react";

export default function SprintPricing() {
  return (
    <section id="pricing" className="py-20 bg-white dark:bg-[#06020a] border-b border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-purple-950/40 text-orange-400 text-xs font-semibold rounded-full uppercase tracking-wider mb-3 border border-purple-800/40">
            Sovereign Product Ladder — Fixed Price & SLA
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Three Fixed-Price Packages. Zero Hidden Surcharges.
          </h2>
          <p className="mt-4 text-slate-600 dark:text-purple-200/70 max-w-3xl mx-auto">
            Pick your entry point. From a rapid 24h architectural audit to a turnkey 14-day production SaaS MVP. Funds remain protected in Upwork Direct Contracts Escrow (5% fee) or DocuSeal e-Signed agreements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {/* Product 0: Tripwire Specification */}
          <div className="p-8 bg-slate-50 dark:bg-[#0e051b]/80 rounded-2xl border border-purple-900/40 flex flex-col justify-between hover:border-emerald-500/50 transition-colors">
            <div>
              <span className="inline-block px-3 py-1 bg-emerald-950/40 text-emerald-400 text-xs font-bold rounded-full uppercase tracking-wider mb-4 border border-emerald-800/40">
                PRODUCT 0 — 24H–48H TRIPWIRE
              </span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Architecture & Codebase Audit</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-purple-200/70">
                Low-risk entry tier under corporate card limits ($500). De-risk your technical architecture and receive verified production blueprints.
              </p>

              <div className="my-6">
                <div className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">$350 <span className="text-base font-normal text-slate-500 dark:text-purple-300/60">flat fee</span></div>
                <div className="text-sm font-semibold text-emerald-400 mt-1">or 17,500 Telegram Stars (XTR)</div>
                <div className="text-xs text-slate-500 dark:text-purple-300/60 mt-2 font-mono">⚡ Turnaround: 24–48 Hours SLA</div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-purple-200">Included Deliverables (EU NACE 62.01):</div>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-purple-200/80">
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> 1-on-1 Deep-Dive Technical Audit with 3x Certified Salesforce & Full-Stack Architect.</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> Complete OpenAPI 3.0 specification for core business flows.</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> Supabase PostgreSQL DDL SQL schema with RLS and constraints.</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> Docker Compose Mock Server committed to client Git repository.</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> 100% credited toward Sprint A or B upon project expansion.</li>
                </ul>
              </div>

              <div className="p-3 bg-emerald-950/20 border border-emerald-800/30 rounded-lg text-xs text-emerald-300 mb-6">
                <strong>Instant Booking:</strong> Select your live audit window directly in our sovereign booking engine.
              </div>
            </div>

            <div className="space-y-3">
              <a
                href="https://demo.undreseller.com/book"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-center transition-colors shadow-lg shadow-emerald-950/40 text-sm"
              >
                Book 1-on-1 Audit Slot ($350) →
              </a>
              <a
                href="https://www.upwork.com/direct-contracts"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block py-2 px-4 bg-purple-950/50 hover:bg-purple-900/60 text-purple-200 text-xs font-medium rounded-lg text-center border border-purple-800/30"
              >
                Order via Upwork Escrow (5%)
              </a>
            </div>
          </div>

          {/* SKU 1: Sprint A FOSS Office */}
          <div className="p-8 bg-slate-50 dark:bg-[#110721]/80 rounded-2xl border border-purple-900/30 flex flex-col justify-between hover:border-purple-600/50 transition-colors">
            <div>
              <span className="inline-block px-3 py-1 bg-purple-950/40 text-purple-300 text-xs font-bold rounded-full uppercase tracking-wider mb-4 border border-purple-800/40">
                SPRINT A — FOSS OFFICE STACK
              </span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">B2B Operations & Office Stack</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-purple-200/70">
                Erase $15k–$40k/yr in SaaS seat taxes (Salesforce, Notion, Linear, Intercom) with private cloud FOSS on Hetzner.
              </p>

              <div className="my-6">
                <div className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">$3,500 <span className="text-base font-normal text-slate-500 dark:text-purple-300/60">setup flat fee</span></div>
                <div className="text-sm font-semibold text-orange-400 mt-1">+ $500/month monitoring & Restic backup retainer</div>
                <div className="text-xs text-slate-500 dark:text-purple-300/60 mt-2 font-mono">⚡ Delivery: 3 to 5 Business Days</div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-purple-200">Included Scope (Fixed Scope):</div>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-purple-200/80">
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> Twenty CRM / EspoCRM: 0 seat licenses, full data ownership.</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> FOSS Suite: Outline (Docs), Plane (Tasks), Chatwoot (Inbox), Cal.com.</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> Docker Compose Memory Fencing: 16GB NVMe Swap against OOM.</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> Dedicated n8n workflow instance or Trigger.dev v3 tasks.</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> Traefik v3 reverse proxy with automated Let's Encrypt SSL.</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> 7-Day post-deployment Bugfix SLA Knife (P1/P2 resolution &lt; 24h).</li>
                </ul>
              </div>

              <div className="p-3 bg-purple-950/20 border border-purple-800/30 rounded-lg text-xs text-purple-300 mb-6">
                <strong>Deployment:</strong> Single Hetzner CPX42 (€82.69/mo). Email stays on Google Workspace / M365 (production blacklist on mail servers).
              </div>
            </div>

            <a
              href="https://www.upwork.com/direct-contracts"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 bg-purple-900 hover:bg-purple-800 text-white font-semibold rounded-lg text-center transition-colors border border-purple-700/40 text-sm"
            >
              Deploy FOSS Office via Escrow (5%) →
            </a>
          </div>

          {/* SKU 2: Sprint B 14-Day SaaS MVP (HERO) */}
          <div className="p-8 bg-purple-950/30 dark:bg-[#180a2e]/90 rounded-2xl border-2 border-brand-orange flex flex-col justify-between relative shadow-2xl">
            <div className="absolute -top-3 right-6 px-3 py-1 bg-brand-orange text-white text-xs font-extrabold rounded-full uppercase tracking-wider shadow-md">
              HERO SKU — 14 DAYS
            </div>

            <div>
              <span className="inline-block px-3 py-1 bg-orange-500/10 text-orange-400 text-xs font-bold rounded-full uppercase tracking-wider mb-4 border border-orange-500/20">
                FULL-STACK SAAS LAUNCH
              </span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">14-Day SaaS MVP Factory</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-purple-200/70">
                Turnkey production-ready B2B SaaS application deployed directly to your private cloud, verified to charge customers on Day 14.
              </p>

              <div className="my-6">
                <div className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">$4,900 <span className="text-base font-normal text-slate-500 dark:text-purple-300/60">one-time flat fee</span></div>
                <div className="text-sm font-semibold text-brand-green mt-1">Guaranteed Timebox Delivery</div>
                <div className="text-xs text-slate-500 dark:text-purple-300/60 mt-2 font-mono">🚀 Delivery: 14 Calendar Days Flat</div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-purple-200">Included Scope (Fixed Scope Knife):</div>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-purple-200/80">
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> Next.js 15 App Router, TypeScript, Tailwind CSS, Shadcn UI.</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> Supabase PostgreSQL, Prisma ORM, RLS policies, Auth.</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> Prepayment & Commerce: Telegram Stars, Crypto (NOWPayments), Stripe/Paddle.</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> Code-First TS Workflows: Inngest / Trigger.dev v3 (n8n strictly excluded from SaaS).</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> Telegram Mini App (TMA) & WhatsApp Cloud API autoresponder.</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> Day-14 Live Onboarding Protocol: 60-min handover with $1 verification charge.</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> 7-Day Bugfix SLA Knife covering all P1/P2 issues.</li>
                </ul>
              </div>

              <div className="p-3 bg-orange-950/20 border border-orange-800/30 rounded-lg text-xs text-orange-300 mb-6">
                <strong>Scope Knife:</strong> Max 2 roles (Admin + User), 1 core process. Excludes native mobile apps and custom AI fine-tuning. Phase 2 features billed at $100/hr.
              </div>
            </div>

            <a
              href="https://www.upwork.com/direct-contracts"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-lg text-center transition-colors shadow-lg shadow-orange-950/40 text-sm"
            >
              Lock 14-Day MVP Sprint via Escrow (5%) →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
