"use client";

import React, { useState } from "react";

interface BentoGlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // e.g. "rgba(249, 115, 22, 0.4)" for orange or "rgba(16, 185, 129, 0.4)" for emerald
}

export default function BentoGlowCard({
  children,
  className = "",
  glowColor = "rgba(249, 115, 22, 0.35)",
}: BentoGlowCardProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

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
      className={`group relative rounded-3xl border border-slate-800 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 md:p-8 backdrop-blur-xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] ${className}`}
    >
      {/* Динамическая свечение под курсором мыши в стиле Linear/Raycast */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 40%)`,
        }}
      />

      {/* Отрезанная тонкая внутренняя подложка */}
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
}
