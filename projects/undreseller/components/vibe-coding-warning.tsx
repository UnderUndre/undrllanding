"use client";

import React from "react";

export default function VibeCodingWarning() {
  return (
    <section className="py-20 bg-[#0a0414] border-b border-purple-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="p-8 md:p-12 bg-gradient-to-br from-[#160829] to-[#0d031a] rounded-2xl border border-orange-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl relative z-10">
            <span className="inline-block px-3 py-1 bg-orange-950/60 text-orange-400 text-xs font-mono font-bold rounded-full uppercase tracking-wider mb-4 border border-orange-800/40">
              ⚠️ The $10,000/Week Vibe-Coding Trap
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Plan Architecture First — Or Pay Rescue Teams $10,000/Wk to Delete AI Slop.
            </h3>
            <p className="text-sm sm:text-base text-purple-200/80 leading-relaxed mb-6">
              Unstructured &quot;vibe-coding&quot; in AI editors creates a dangerous illusion of speed. Without upfront technical specifications, strict schema modeling (DDL), and security guardrails (Zod + Supabase RLS), LLMs generate bloated, duplicate codebases filled with silent API leaks.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-[#090212]/80 rounded-xl border border-red-900/40">
                <div className="text-red-400 font-bold text-xs uppercase font-mono mb-1">❌ The Vibe-Coded Fate</div>
                <div className="text-xs text-purple-200/70">
                  100,000 lines of unmaintainable prompt spaghetti. You end up hiring $10k/week cleanup agencies (like Slopfix) just to delete 65% of the bloat and patch data leaks.
                </div>
              </div>
              <div className="p-4 bg-[#090212]/80 rounded-xl border border-[#69a700]/40">
                <div className="text-brand-green font-bold text-xs uppercase font-mono mb-1">✓ The Undreseller Standard</div>
                <div className="text-xs text-purple-200/70">
                  Zero premature over-engineering. We deploy Shopify/FOSS cores when standard solutions suffice + custom Next.js 15 landing funnels, or full-stack Supabase DDL architectures when proprietary scale demands it.
                </div>
              </div>
            </div>
            <p className="text-xs font-mono text-orange-300/80">
              💡 <strong>Rule of Thumb:</strong> Bring a clear business flow and technical boundaries. We engineer durable infrastructure, not disposable prototype slop.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
