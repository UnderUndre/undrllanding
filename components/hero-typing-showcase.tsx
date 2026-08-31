"use client";

import { useState, useEffect } from "react";

const TYPING_STEPS = [
  "$ undevops deploy --template medusa-2.0 --fiat paddle --crypto shkeeper",
  "⚙️  [1/4] Provisioning isolated PostgreSQL DB...",
  "⚡ [2/4] Initializing Redis cache worker...",
  "🔒 [3/4] Issuing Wildcard SSL Certificate via Traefik...",
  "🚀 [4/4] Storefront deployed: https://cybergear.undrlla.shop [READY]",
];

export default function HeroTypingShowcase() {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (reduceMotion) {
      setCompletedLines(TYPING_STEPS);
      setCurrentLineIndex(TYPING_STEPS.length);
      return;
    }
    if (currentLineIndex >= TYPING_STEPS.length) return;

    const targetLine = TYPING_STEPS[currentLineIndex];
    let charIdx = 0;

    const interval = setInterval(() => {
      if (charIdx <= targetLine.length) {
        setDisplayedText(targetLine.slice(0, charIdx));
        charIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setCompletedLines((prev) => [...prev, targetLine]);
          setDisplayedText("");
          setCurrentLineIndex((prev) => prev + 1);
        }, 400);
      }
    }, 22);

    return () => clearInterval(interval);
  }, [currentLineIndex, mounted, reduceMotion]);

  if (!mounted) {
    return (
      <div
        suppressHydrationWarning
        className="w-full rounded-3xl border border-slate-800 bg-slate-950 p-4 md:p-6 font-mono text-xs shadow-2xl min-h-[220px]"
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 text-slate-400">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-[11px] text-slate-500">undevops-cli v2.0</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-3xl border border-slate-800 bg-slate-950 p-4 md:p-6 font-mono text-xs shadow-2xl shadow-orange-500/10 overflow-hidden relative ring-1 ring-orange-500/10">
      <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 text-slate-400 relative">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-[11px] text-slate-500">undevops-cli v2.0</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 motion-safe-ping" />
          Live PaaS Stream
        </div>
      </div>

      <div className="space-y-2 min-h-[140px] text-left relative">
        {completedLines.map((line, idx) => (
          <div key={idx} className={idx === 0 ? "text-orange-400 font-bold" : "text-slate-300"}>
            {line}
          </div>
        ))}

        {currentLineIndex < TYPING_STEPS.length && (
          <div className="text-slate-200 flex items-center">
            <span>{displayedText}</span>
            <span className="ml-1 inline-block h-4 w-2 bg-orange-500 motion-safe-pulse" />
          </div>
        )}

        {currentLineIndex >= TYPING_STEPS.length && (
          <div className="pt-2 text-emerald-400 font-bold flex items-center gap-2 animate-fade-up">
            <span>Marketplace active · Access granted:</span>
            <span className="underline decoration-orange-500/50">https://cybergear.undrlla.shop</span>
          </div>
        )}
      </div>
    </div>
  );
}
