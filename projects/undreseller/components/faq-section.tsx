"use client";

import React from "react";

export default function FaqSection() {
  return (
    <section id="faq" className="py-20 bg-[#06020a] border-b border-purple-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-purple-950/60 text-orange-400 text-xs font-semibold rounded-full uppercase tracking-wider mb-3 border border-purple-800/40">
            Clarity & Ground Rules
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-purple-200/70 text-sm max-w-xl mx-auto">
            Everything you need to know about our conveyor, escrow terms, code ownership, and technical deliverables.
          </p>
        </div>

        <div className="space-y-4">
          {/* FAQ 1 */}
          <details className="group p-6 bg-[#110721]/70 rounded-xl border border-purple-900/40 open:border-orange-500/50 transition-colors">
            <summary className="flex items-center justify-between cursor-pointer font-semibold text-white text-sm sm:text-base list-none">
              <span>What do I need to prepare before our sprint begins?</span>
              <span className="text-orange-400 group-open:rotate-180 transition-transform duration-200 ml-4 font-mono">▼</span>
            </summary>
            <div className="mt-4 text-xs sm:text-sm text-purple-200/70 leading-relaxed border-t border-purple-900/30 pt-4 space-y-2">
              <p>You need a clear <strong>business flow description</strong> and your target user journey (endpoints, roles, integrations). We do not accept vague prompts like <em>&quot;Build Uber for Dogs&quot;</em>.</p>
              <p>During Day 1 kickoff, we formalize your inputs into strict OpenAPI specifications and PostgreSQL schema models. Having an upfront technical plan is what guarantees delivery in 14 days flat without architectural rot.</p>
            </div>
          </details>

          {/* FAQ 2 */}
          <details className="group p-6 bg-[#110721]/70 rounded-xl border border-purple-900/40 open:border-orange-500/50 transition-colors">
            <summary className="flex items-center justify-between cursor-pointer font-semibold text-white text-sm sm:text-base list-none">
              <span>Why not just vibe-code our app with Cursor or Claude Code?</span>
              <span className="text-orange-400 group-open:rotate-180 transition-transform duration-200 ml-4 font-mono">▼</span>
            </summary>
            <div className="mt-4 text-xs sm:text-sm text-purple-200/70 leading-relaxed border-t border-purple-900/30 pt-4 space-y-2">
              <p>AI coding assistants are brilliant at generating single functions, but disastrous at state management, database schema normalization, and security boundaries. Studies show 45% of unreviewed AI code contains critical security flaws.</p>
              <p>Without senior architectural oversight, vibe-coded projects quickly accumulate massive technical debt — leading founders to pay rescue teams up to $10k/week just to refactor and trim AI bloat. We provide clean, tested, production-grade foundations that your future in-house engineers can easily scale.</p>
            </div>
          </details>

          {/* FAQ 3 */}
          <details className="group p-6 bg-[#110721]/70 rounded-xl border border-purple-900/40 open:border-orange-500/50 transition-colors">
            <summary className="flex items-center justify-between cursor-pointer font-semibold text-white text-sm sm:text-base list-none">
              <span>How does the Upwork Direct Contracts Escrow protect me?</span>
              <span className="text-orange-400 group-open:rotate-180 transition-transform duration-200 ml-4 font-mono">▼</span>
            </summary>
            <div className="mt-4 text-xs sm:text-sm text-purple-200/70 leading-relaxed border-t border-purple-900/30 pt-4 space-y-2">
              <p>You deposit the flat fee directly into Upwork Direct Contracts. Upwork holds 100% of the funds in third-party escrow at 0% client fee. We never touch your capital upfront.</p>
              <p>On Day 14, we conduct a live 60-minute onboarding call and execute a live $1 payment verification in your production Stripe account. You authorize escrow release only after confirming that the system is fully operational and code is transferred.</p>
            </div>
          </details>

          {/* FAQ 4 */}
          <details className="group p-6 bg-[#110721]/70 rounded-xl border border-purple-900/40 open:border-orange-500/50 transition-colors">
            <summary className="flex items-center justify-between cursor-pointer font-semibold text-white text-sm sm:text-base list-none">
              <span>What is the &quot;Fixed Scope Knife&quot; and what if I need changes?</span>
              <span className="text-orange-400 group-open:rotate-180 transition-transform duration-200 ml-4 font-mono">▼</span>
            </summary>
            <div className="mt-4 text-xs sm:text-sm text-purple-200/70 leading-relaxed border-t border-purple-900/30 pt-4 space-y-2">
              <p>To enforce a strict 14-day delivery timeline, we lock scope on Day 1. Unplanned feature additions during the sprint are strictly redirected to <strong>Phase 2</strong>.</p>
              <p>Once Phase 1 is verified and released from escrow, any secondary integrations, custom scrapers, or UI tweaks can be scheduled immediately at our fixed rate of $100/hr.</p>
            </div>
          </details>

          {/* FAQ 5 */}
          <details className="group p-6 bg-[#110721]/70 rounded-xl border border-purple-900/40 open:border-orange-500/50 transition-colors">
            <summary className="flex items-center justify-between cursor-pointer font-semibold text-white text-sm sm:text-base list-none">
              <span>Who owns the code, intellectual property, and hosting?</span>
              <span className="text-orange-400 group-open:rotate-180 transition-transform duration-200 ml-4 font-mono">▼</span>
            </summary>
            <div className="mt-4 text-xs sm:text-sm text-purple-200/70 leading-relaxed border-t border-purple-900/30 pt-4 space-y-2">
              <p>You own 100% of everything. All code is committed daily to your private GitHub repository under European NACE 62.01 legal code classification.</p>
              <p>We deploy directly to your infrastructure (Hetzner, Supabase, Vercel, or AWS). There are zero proprietary runtime dependencies or vendor lock-in mechanisms.</p>
            </div>
          </details>

          {/* FAQ 6 */}
          <details className="group p-6 bg-[#110721]/70 rounded-xl border border-purple-900/40 open:border-orange-500/50 transition-colors">
            <summary className="flex items-center justify-between cursor-pointer font-semibold text-white text-sm sm:text-base list-none">
              <span>What is covered under the 7-Day Bugfix SLA Knife?</span>
              <span className="text-orange-400 group-open:rotate-180 transition-transform duration-200 ml-4 font-mono">▼</span>
            </summary>
            <div className="mt-4 text-xs sm:text-sm text-purple-200/70 leading-relaxed border-t border-purple-900/30 pt-4 space-y-2">
              <p>For 7 calendar days post-deployment, we provide priority incident resolution. Any P1 (system outage / payment block) or P2 (broken user workflow) defect is resolved within 24 hours at zero charge.</p>
              <p>For SKU 1 (Operations Stack), we offer an ongoing $500/mo retainer covering proactive monitoring, backup validation, and server patching.</p>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
