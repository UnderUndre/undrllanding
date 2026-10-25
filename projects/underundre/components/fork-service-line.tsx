"use client";

import React from "react";

/**
 * Product 3 (post-Sprint-B): Template Fork & Custom Development Service Line.
 * Source of truth: undreseller-business-plan.md v18.6 §2 Продукт 3.
 * Ladder Protection Law: a fork is NEVER sold below Sprint B ($4,900).
 */
export default function ForkServiceLine() {
  return (
    <section id="fork-care" className="py-20 bg-[#08030f] border-b border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 bg-purple-950/40 text-orange-400 text-xs font-semibold rounded-full uppercase tracking-wider mb-3 border border-purple-800/40">
            For Sprint B Clients Who Outgrow the Template
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Fork &amp; Care: Custom Development on Your Sprint B Base
          </h2>
          <p className="mt-4 text-slate-600 dark:text-purple-200/70 max-w-3xl mx-auto">
            Niche workflows, non-standard payment gateways, extra languages, integrations. Your custom code lives in isolated adapters — the core template stays untouched, so template upgrades never turn into a 450-file merge conflict.
          </p>
        </div>

        {/* A. Fork Deployment Packages */}
        <h3 className="text-sm font-bold uppercase tracking-wider text-orange-400 mb-6 text-center">
          Step 1 — Fork Deployment (one-time)
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch mb-14">
          <div className="p-8 bg-slate-50 dark:bg-[#0e051b]/80 rounded-2xl border border-purple-900/40 flex flex-col justify-between">
            <div>
              <span className="inline-block px-3 py-1 bg-purple-950/40 text-purple-300 text-xs font-bold rounded-full uppercase tracking-wider mb-4 border border-purple-800/40">
                FORK FOUNDATION
              </span>
              <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">Clean Sprint B Deploy</h4>
              <div className="my-5">
                <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">$4,900</div>
                <div className="text-xs text-slate-500 dark:text-purple-300/60 mt-1 font-mono">Hetzner VPS · Docker · Traefik · Postgres · branding · bots · crypto/Stars — zero custom code</div>
              </div>
              <div className="p-3 bg-purple-950/20 border border-purple-800/30 rounded-lg text-xs text-purple-300">
                <strong>Care required:</strong> from $149/mo (Essential).
              </div>
            </div>
            <a
              href="#contact"
              className="mt-6 w-full py-3 px-4 bg-purple-900 hover:bg-purple-800 text-white font-semibold rounded-lg text-center transition-colors text-sm"
            >
              Start Fork Foundation →
            </a>
          </div>

          <div className="p-8 bg-purple-950/30 dark:bg-[#180a2e]/90 rounded-2xl border-2 border-brand-orange flex flex-col justify-between relative shadow-2xl">
            <div className="absolute -top-3 right-6 px-3 py-1 bg-brand-orange text-white text-xs font-extrabold rounded-full uppercase tracking-wider shadow-md">
              HERO — LAUNCH MENU
            </div>
            <div>
              <span className="inline-block px-3 py-1 bg-orange-500/10 text-orange-400 text-xs font-bold rounded-full uppercase tracking-wider mb-4 border border-orange-500/20">
                FORK TAILORED
              </span>
              <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">Template + 25h Deep Customization</h4>
              <div className="my-5">
                <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">$6,800</div>
                <div className="text-sm font-semibold text-orange-400 mt-1">+ Care Standard $349/mo</div>
                <div className="text-xs text-slate-500 dark:text-purple-300/60 mt-2 font-mono">
                  Booking field adaptation, niche workflow tuning, +1 integration. First-year anchor ≈ $10,988 — an enterprise-grade production system for under 15% of one mid-level developer&apos;s salary.
                </div>
              </div>
              <div className="p-3 bg-orange-950/20 border border-orange-800/30 rounded-lg text-xs text-orange-300">
                <strong>Day-1 launch menu:</strong> Fork Tailored + Care Standard + Feature Pack $990.
              </div>
            </div>
            <a
              href="#contact"
              className="mt-6 w-full py-3 px-4 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-lg text-center transition-colors shadow-lg shadow-orange-950/40 text-sm"
            >
              Start Fork Tailored →
            </a>
          </div>

          <div className="p-8 bg-slate-50 dark:bg-[#0e051b]/80 rounded-2xl border border-purple-900/40 flex flex-col justify-between">
            <div>
              <span className="inline-block px-3 py-1 bg-purple-950/40 text-purple-300 text-xs font-bold rounded-full uppercase tracking-wider mb-4 border border-purple-800/40">
                FORK ENTERPRISE-LITE
              </span>
              <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">Complex Scenarios</h4>
              <div className="my-5">
                <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">$8,900<span className="text-base font-normal text-slate-500 dark:text-purple-300/60">+</span></div>
                <div className="text-xs text-slate-500 dark:text-purple-300/60 mt-1 font-mono">
                  Specific payment gateways, inventory CRM integration, custom reporting.
                </div>
              </div>
              <div className="p-3 bg-purple-950/20 border border-purple-800/30 rounded-lg text-xs text-purple-300">
                <strong>Scoped after a paid audit</strong> — fixed price before start, never open-ended.
              </div>
            </div>
            <a
              href="#contact"
              className="mt-6 w-full py-3 px-4 bg-purple-900 hover:bg-purple-800 text-white font-semibold rounded-lg text-center transition-colors text-sm"
            >
              Scope Fork Enterprise-Lite →
            </a>
          </div>
        </div>

        {/* B. Care Retainers */}
        <h3 className="text-sm font-bold uppercase tracking-wider text-orange-400 mb-6 text-center">
          Step 2 — Monthly Care (required 3–6 months with any fork)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          <div className="p-6 bg-slate-50 dark:bg-[#0e051b]/80 rounded-xl border border-purple-900/40">
            <div className="text-xs font-bold uppercase tracking-wider text-purple-300">Care Essential</div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-2">$149<span className="text-sm font-normal text-slate-500 dark:text-purple-300/60">/mo</span></div>
            <ul className="mt-4 space-y-2 text-xs text-slate-600 dark:text-purple-200/80">
              <li>✓ VPS hosting, daily Restic S3 backups, uptime monitoring</li>
              <li>✓ Security patches · SLA 24h</li>
              <li className="text-slate-500">✗ Change hours billed via Change Packs</li>
            </ul>
          </div>
          <div className="p-6 bg-purple-950/30 dark:bg-[#180a2e]/90 rounded-xl border border-brand-orange">
            <div className="text-xs font-bold uppercase tracking-wider text-orange-400">Care Standard ★</div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-2">$349<span className="text-sm font-normal text-slate-500 dark:text-purple-300/60">/mo</span></div>
            <ul className="mt-4 space-y-2 text-xs text-slate-600 dark:text-purple-200/80">
              <li>✓ Everything in Essential · SLA 8h</li>
              <li>✓ 2 change/consultancy hours monthly (use-it-or-lose-it)</li>
              <li>✓ Free minor template upgrades (security & core fixes)</li>
            </ul>
          </div>
          <div className="p-6 bg-slate-50 dark:bg-[#0e051b]/80 rounded-xl border border-purple-900/30 opacity-75">
            <div className="text-xs font-bold uppercase tracking-wider text-purple-300">Care Priority</div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-2">$690<span className="text-sm font-normal text-slate-500 dark:text-purple-300/60">/mo</span></div>
            <ul className="mt-4 space-y-2 text-xs text-slate-600 dark:text-purple-200/80">
              <li>✓ Everything in Standard · SLA 4h · priority queue</li>
              <li>✓ 5 change hours monthly</li>
              <li className="text-slate-500">⏳ Deferred — opens after the Care Standard batch</li>
            </ul>
          </div>
        </div>

        {/* C. Change Request Packages */}
        <h3 className="text-sm font-bold uppercase tracking-wider text-orange-400 mb-6 text-center">
          Step 3 — Change Packs (results, not hours)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-10">
          {[
            { name: "Micro-Change", price: "$490", what: "1–2 fields, notification logic, analytics pixel" },
            { name: "Feature Pack ★", price: "$990", what: "Custom report, webhook gateway, promo codes" },
            { name: "Mini-Sprint", price: "$1,990", what: "New module, DB schema rework" },
            { name: "Overage", price: "$100/h", what: "30-min steps, prepaid in 5h blocks" },
          ].map((c) => (
            <div key={c.name} className="p-5 bg-slate-50 dark:bg-[#0e051b]/80 rounded-xl border border-purple-900/40">
              <div className="text-xs font-bold uppercase tracking-wider text-purple-300">{c.name}</div>
              <div className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">{c.price}</div>
              <div className="text-[11px] text-slate-600 dark:text-purple-200/70 mt-2">{c.what}</div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-emerald-950/20 border border-emerald-800/30 rounded-lg text-emerald-300">
            <strong>Ladder Protection:</strong> a fork is never sold below Sprint B ($4,900) and never without a Sprint B base license. No &quot;Lite&quot; forks, no revenue-share.
          </div>
          <div className="p-4 bg-purple-950/20 border border-purple-800/30 rounded-lg text-purple-300">
            <strong>Upgrade Policy:</strong> custom code lives only in <span className="font-mono">extensions/</span> adapters — core modifications are off-limits, so minor upgrades stay free for Care Standard/Priority.
          </div>
          <div className="p-4 bg-purple-950/20 border border-purple-800/30 rounded-lg text-purple-300">
            <strong>Split IP:</strong> the template core stays ours (perpetual license to you); your custom modules are yours. Exit anytime: PostgreSQL dump + compose archive, migration support $500.
          </div>
        </div>
      </div>
    </section>
  );
}
