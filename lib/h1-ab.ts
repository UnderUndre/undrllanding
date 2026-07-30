/**
 * Lightweight H1 A/B for landing CRO.
 *
 * A — outcome / speed (default narrative)
 * B — fee / risk removal
 *
 * Sticky assignment: localStorage + cookie (30d).
 * Force: ?h1=a | ?h1=b for QA.
 */

export type H1Variant = "a" | "b";

export const H1_STORAGE_KEY = "undrlla_h1_variant";
export const H1_COOKIE = "undrlla_h1";

export type H1CopyKeys = {
  title_1: string;
  title_accent: string;
  title_2: string;
  subtitle: string;
};

/** Map variant → i18n key suffixes (prefixed hero_a_ / hero_b_ or base for A). */
export function h1Keys(variant: H1Variant): H1CopyKeys {
  if (variant === "b") {
    return {
      title_1: "hero_b_title_1",
      title_accent: "hero_b_title_accent",
      title_2: "hero_b_title_2",
      subtitle: "hero_b_subtitle",
    };
  }
  return {
    title_1: "hero_title_1",
    title_accent: "hero_title_accent",
    title_2: "hero_title_2",
    subtitle: "hero_subtitle",
  };
}

export function isH1Variant(v: unknown): v is H1Variant {
  return v === "a" || v === "b";
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

function writeCookie(name: string, value: string, days = 30) {
  if (typeof document === "undefined") return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

/** Pick sticky variant; optional force from query. */
export function assignH1Variant(force?: string | null): H1Variant {
  if (isH1Variant(force)) {
    persistH1Variant(force);
    return force;
  }

  try {
    const fromLs = localStorage.getItem(H1_STORAGE_KEY);
    if (isH1Variant(fromLs)) {
      writeCookie(H1_COOKIE, fromLs);
      return fromLs;
    }
  } catch {
    /* private mode */
  }

  const fromCookie = readCookie(H1_COOKIE);
  if (isH1Variant(fromCookie)) {
    try {
      localStorage.setItem(H1_STORAGE_KEY, fromCookie);
    } catch {
      /* */
    }
    return fromCookie;
  }

  const picked: H1Variant = Math.random() < 0.5 ? "a" : "b";
  persistH1Variant(picked);
  return picked;
}

export function persistH1Variant(v: H1Variant) {
  try {
    localStorage.setItem(H1_STORAGE_KEY, v);
  } catch {
    /* */
  }
  writeCookie(H1_COOKIE, v);
}

export function getStoredH1Variant(): H1Variant | null {
  try {
    const fromLs = localStorage.getItem(H1_STORAGE_KEY);
    if (isH1Variant(fromLs)) return fromLs;
  } catch {
    /* */
  }
  const fromCookie = readCookie(H1_COOKIE);
  return isH1Variant(fromCookie) ? fromCookie : null;
}

/** Client analytics hook (no vendor lock). Extend to PostHog later. */
export function trackH1Event(
  event: "h1_view" | "waitlist_submit",
  variant: H1Variant,
  extra?: Record<string, unknown>
) {
  if (typeof window === "undefined") return;
  const payload = { event, h1_variant: variant, ...extra, ts: Date.now() };

  // dataLayer (GTM / GA4 if present)
  const w = window as Window & { dataLayer?: unknown[]; undrllaEvents?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(payload);

  // local ring buffer for debug
  w.undrllaEvents = w.undrllaEvents || [];
  w.undrllaEvents.push(payload);
  if (w.undrllaEvents.length > 50) w.undrllaEvents.shift();

  if (process.env.NODE_ENV === "development") {
    console.info("[h1-ab]", payload);
  }
}
