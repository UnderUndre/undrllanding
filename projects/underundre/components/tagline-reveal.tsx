"use client";

import React, { useEffect, useRef } from "react";
import { useLang } from "@/context/lang-context";
import { getUnderundreCopy } from "../locales";

export default function TaglineRevealSection() {
  const { lang } = useLang();
  const t = getUnderundreCopy(lang).tagline;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const words = entry.target.querySelectorAll(".reveal-word");
            words.forEach((word, index) => {
              setTimeout(() => {
                word.classList.remove("opacity-25", "blur-xs");
                word.classList.add("opacity-100", "blur-0");
              }, index * 40);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lang]);

  return (
    <section className="py-24 bg-[#080808] border-b border-purple-900/30 text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <span className="inline-block px-3 py-1 bg-purple-950/60 text-orange-400 text-xs font-mono font-bold rounded-full uppercase tracking-wider mb-6 border border-purple-800/40">
          {t.directive}
        </span>
        <div ref={containerRef} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-snug sm:leading-snug md:leading-snug text-balance">
          {t.words.map((word, idx) => (
            <span
              key={`${lang}-${idx}`}
              className="reveal-word inline-block mr-[0.25em] opacity-25 blur-xs transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] text-white"
            >
              {word}
            </span>
          ))}
        </div>
        <p className="mt-8 text-xs font-mono text-purple-300/60 uppercase tracking-widest">
          {t.author}
        </p>
      </div>
    </section>
  );
}
