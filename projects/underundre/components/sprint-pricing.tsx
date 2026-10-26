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
            Fixed-Price Product Ladder. Zero Hourly Billing.
          </h2>
          <p className="mt-4 text-slate-600 dark:text-purple-200/70 max-w-3xl mx-auto">
            Pick your entry point: a 48-hour Workaround TCO Audit, a turnkey FOSS office stack, or a 14-day sovereign booking sprint. Funds stay protected in Upwork Direct Contracts Escrow (5% fee).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {/* Product 0: Workaround TCO Audit & Architecture Spec (HERO TRIPWIRE) */}
          <div className="p-8 bg-purple-950/30 dark:bg-[#180a2e]/90 rounded-2xl border-2 border-brand-orange flex flex-col justify-between relative shadow-2xl">
            <div className="absolute -top-3 right-6 px-3 py-1 bg-brand-orange text-white text-xs font-extrabold rounded-full uppercase tracking-wider shadow-md">
              HERO ENTRY (100% CREDITED)
            </div>
            <div>
              <span className="inline-block px-3 py-1 bg-emerald-950/40 text-emerald-400 text-xs font-bold rounded-full uppercase tracking-wider mb-4 border border-emerald-800/40">
                PRODUCT 0 — 48H WORKAROUND AUDIT
              </span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Workaround TCO Audit & Architecture Spec</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-purple-200/70">
                Low-risk entry under corporate card limits ($500). Odometer for manual labor payroll leaks & SaaS waste using TDABC.
              </p>

              <div className="my-6">
                <div className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">$490 <span className="text-base font-normal text-slate-500 dark:text-purple-300/60">flat fee</span></div>
                <div className="text-sm font-semibold text-emerald-400 mt-1">100% credited toward Sprint A or B implementation</div>
                <div className="text-xs text-slate-500 dark:text-purple-300/60 mt-2 font-mono">⚡ Turnaround: 24–48 Hours SLA</div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-purple-200">Included Deliverables (EU NACE 62.01):</div>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-purple-200/80">
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> TDABC Cost Forensics: uncovers WhatsApp copy-paste, billing reconciliation & DSO leaks.</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> Official Via Negativa Verdict: stops wasteful automation when switching costs exceed savings.</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> OpenAPI 3.0 specification for automated bypass.</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> PostgreSQL DDL schema & Docker Compose mock container.</li>
                </ul>
              </div>

              <div className="p-3 bg-emerald-950/20 border border-emerald-800/30 rounded-lg text-xs text-emerald-300 mb-6">
                <strong>Demand Gate:</strong> Required first step before executing large custom engineering sprints.
              </div>
            </div>

            <div className="space-y-3">
              <a
                href="https://www.upwork.com/direct-contracts"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block py-3.5 px-4 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-lg text-center transition-colors shadow-lg shadow-orange-950/40 text-sm"
              >
                Book 48-Hour TCO Audit ($490) via Escrow →
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
                </ul>
              </div>

              <div className="p-3 bg-purple-950/20 border border-purple-800/30 rounded-lg text-xs text-purple-300 mb-6">
                <strong>Deployment:</strong> Single Hetzner CPX42 (€82.69/mo). Emergency cash-flow valve.
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

          {/* SKU 2: Sprint B — Service Booking & Professional Portfolio Template (GATED) */}
          <div className="p-8 bg-slate-50 dark:bg-[#0e051b]/80 rounded-2xl border border-purple-900/40 flex flex-col justify-between opacity-90 hover:opacity-100 transition-opacity">
            <div>
              <span className="inline-block px-3 py-1 bg-purple-950/40 text-purple-300 text-xs font-bold rounded-full uppercase tracking-wider mb-4 border border-purple-800/40">
                SPRINT B — POST-AUDIT SPRINT
              </span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Sovereign Booking & Custom Systems</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-purple-200/70">
                Turnkey booking platform for multi-staff service businesses (3–25 employees). Available upon successful TCO audit completion.
              </p>

              <div className="my-6">
                <div className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">$4,900 <span className="text-base font-normal text-slate-500 dark:text-purple-300/60">flat fee</span></div>
                <div className="text-sm font-semibold text-purple-300 mt-1">Available Upon TCO Audit Completion</div>
                <div className="text-xs text-slate-500 dark:text-purple-300/60 mt-2 font-mono">🚀 Delivery: 14 Calendar Days Flat</div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-purple-200">Included Scope (Fixed Scope Knife):</div>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-purple-200/80">
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> Branded business page + public per-master pages with portfolio & services.</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> Online booking: catalog, schedule, free slots, confirm/cancel, double-booking protection.</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> Three roles: OWNER / OPERATOR / PERFORMER, individual accounts, access revocation.</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green font-bold">✓</span> ru/en out of the box; currency, timezone & branding via configuration.</li>
                </ul>
              </div>

              <div className="p-3 bg-purple-950/30 border border-purple-800/40 rounded-lg text-xs text-purple-200 mb-6">
                <strong>Gated SKU:</strong> Book the $490 TCO Audit first to qualify for this 14-day production sprint.
              </div>
            </div>

            <a
              href="#contact"
              className="w-full py-3.5 px-6 bg-purple-950 hover:bg-purple-900 text-purple-200 font-semibold rounded-lg text-center transition-colors border border-purple-800/50 text-sm"
            >
              Request via TCO Audit First →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
