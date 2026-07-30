"use client";

import React, { useState, useEffect } from "react";

interface BentoGlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // e.g. "rgba(249, 115, 22, 0.4)" for orange
}

export default function BentoGlowCard({
  children,
  className = "",
  glowColor = "rgba(249, 115, 22, 0.35)",
}: BentoGlowCardProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/90 p-6 md:p-8 backdrop-blur-xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] motion-safe-hover ${className}`}
    >
      {/* Cursor glow — desktop only; off under reduced motion */}
      {mounted && (
        <div
          suppressHydrationWarning
          className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300 z-10 max-md:hidden motion-safe-glow"
          style={{
            opacity,
            background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 42%)`,
          }}
        />
      )}

      {/* Контент карточки */}
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
}
