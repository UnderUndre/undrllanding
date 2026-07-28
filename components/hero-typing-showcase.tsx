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

  useEffect(() => {
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
        }, 500);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [currentLineIndex]);

  return (
    <div className="w-full rounded-3xl border border-slate-800 dark:border-slate-800/80 bg-slate-950 p-4 md:p-6 font-mono text-xs shadow-2xl overflow-hidden relative group">
      {/* Свечение шапки консоли */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 text-slate-400">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-[11px] text-slate-500">undevops-cli v2.0</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          Live PaaS Stream
        </div>
      </div>

      {/* Консольный вывод */}
      <div className="space-y-2 min-h-[140px] text-left">
        {completedLines.map((line, idx) => (
          <div key={idx} className={idx === 0 ? "text-orange-400 font-bold" : "text-slate-300"}>
            {line}
          </div>
        ))}

        {currentLineIndex < TYPING_STEPS.length && (
          <div className="text-slate-200 flex items-center">
            <span>{displayedText}</span>
            <span className="ml-1 inline-block h-4 w-2 bg-orange-500 animate-pulse" />
          </div>
        )}

        {currentLineIndex >= TYPING_STEPS.length && (
          <div className="pt-2 text-emerald-400 font-bold animate-fadeIn flex items-center gap-2">
            <span>🎉 Marketplace active! Access granted:</span>
            <span className="underline">https://cybergear.undrlla.shop</span>
          </div>
        )}
      </div>
    </div>
  );
}
