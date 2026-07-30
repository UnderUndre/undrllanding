"use client";

import { useCallback, useEffect, useState } from "react";

export type AlphaStats = {
  claimed: number;
  remaining: number;
  limit: number;
  open: boolean;
};

const DEFAULT: AlphaStats = {
  claimed: 0,
  remaining: 50,
  limit: 50,
  open: true,
};

export const WAITLIST_STATS_EVENT = "undrlla-waitlist-stats";

export function publishAlphaStats(stats: AlphaStats) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(WAITLIST_STATS_EVENT, { detail: stats }));
}

export function useAlphaStats(pollMs = 20000) {
  const [stats, setStats] = useState<AlphaStats>(DEFAULT);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/waitlist", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      if (data.success === false) return;
      const next: AlphaStats = {
        claimed: Number(data.claimed) || 0,
        remaining: Number(data.remaining) ?? 50,
        limit: Number(data.limit) || 50,
        open: data.open !== false,
      };
      setStats(next);
    } catch {
      /* keep last known */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const onCustom = (e: Event) => {
      const detail = (e as CustomEvent<AlphaStats>).detail;
      if (detail && typeof detail.claimed === "number") {
        setStats(detail);
      }
    };
    window.addEventListener(WAITLIST_STATS_EVENT, onCustom);
    const id =
      pollMs > 0 ? window.setInterval(() => void refresh(), pollMs) : undefined;
    return () => {
      window.removeEventListener(WAITLIST_STATS_EVENT, onCustom);
      if (id) window.clearInterval(id);
    };
  }, [refresh, pollMs]);

  return { stats, loading, refresh };
}
