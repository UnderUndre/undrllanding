// Spec 007 FR-002: referral attribution, zero backend.
// `?ref=<nick>` → localStorage("undr.referral") → lead-form metadata.referral.
// Last-touch policy (review F6): a new valid ?ref= overwrites the stored record.
// Browser-only: captureRef runs inside useEffect via window.location.search —
// never useSearchParams() (Next.js 15 prerender de-opt, review F5).

const STORAGE_KEY = "undr.referral";
const NICK_PATTERN = /^[a-z0-9_.-]{1,32}$/;

export function sanitizeNick(raw: string | null | undefined): string | undefined {
  if (!raw) return undefined;
  const trimmed = raw.trim().toLowerCase();
  return NICK_PATTERN.test(trimmed) ? trimmed : undefined;
}

/** Read the referral record (returns the nick or undefined). */
export function getReferral(): string | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw) as { nick?: string; ts?: number };
    return sanitizeNick(parsed.nick);
  } catch {
    return undefined; // corrupted record → treat as absent (silent no-op)
  }
}

/** Capture ?ref= from the current URL. Idempotent-safe; call from useEffect. */
export function captureRef(search: string = window.location.search): void {
  if (typeof window === "undefined") return;
  const nick = sanitizeNick(new URLSearchParams(search).get("ref"));
  if (!nick) return; // no valid ?ref → leave any stored referral untouched
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ nick, ts: Date.now() }));
  } catch {
    // localStorage unavailable (private mode etc.) → silent no-op (NFR-003)
  }
}

/** Metadata entry for lead forms: present only when a referral exists (no empty strings). */
export function referralMetadata(): { referral?: string } {
  const nick = getReferral();
  return nick ? { referral: nick } : {};
}
