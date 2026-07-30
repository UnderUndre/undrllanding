/**
 * In-process waitlist state + optional seed from env.
 * Serverless note: memory resets on cold start — set WAITLIST_BASE_CLAIMED
 * to the last known total after each deploy / from your CRM.
 */

export const ALPHA_LIMIT = Number(process.env.WAITLIST_ALPHA_LIMIT || "50") || 50;

/** Already-claimed seats outside this process (CRM, previous deploys). */
export const BASE_CLAIMED = Math.max(
  0,
  Number(process.env.WAITLIST_BASE_CLAIMED || "0") || 0
);

export interface WaitlistEntry {
  email: string;
  telegram: string;
  socials?: Record<string, string>;
  created_at: string;
  ip?: string;
  /** H1 A/B bucket: a = outcome, b = fee framing */
  h1_variant?: "a" | "b";
}

const waitlistStore: WaitlistEntry[] = [];
const submittedEmails = new Set<string>();
const submittedTelegrams = new Set<string>();
let sessionCounter = 0;

export function getClaimed(): number {
  return Math.min(ALPHA_LIMIT, BASE_CLAIMED + sessionCounter);
}

export function getRemaining(): number {
  return Math.max(0, ALPHA_LIMIT - getClaimed());
}

export function getVariantCounts(): { a: number; b: number; unknown: number } {
  let a = 0;
  let b = 0;
  let unknown = 0;
  for (const e of waitlistStore) {
    if (e.h1_variant === "a") a += 1;
    else if (e.h1_variant === "b") b += 1;
    else unknown += 1;
  }
  return { a, b, unknown };
}

export function getStats() {
  const claimed = getClaimed();
  const remaining = Math.max(0, ALPHA_LIMIT - claimed);
  return {
    claimed,
    remaining,
    limit: ALPHA_LIMIT,
    open: remaining > 0,
    sessionSignups: sessionCounter,
    baseClaimed: BASE_CLAIMED,
    h1_variants: getVariantCounts(),
  };
}

export function hasEmail(email: string): boolean {
  return submittedEmails.has(email);
}

export function hasTelegram(tg: string): boolean {
  return submittedTelegrams.has(tg);
}

export function addEntry(entry: WaitlistEntry): { position: number; stats: ReturnType<typeof getStats> } {
  submittedEmails.add(entry.email);
  if (entry.telegram) {
    submittedTelegrams.add(entry.telegram);
  }
  sessionCounter += 1;
  waitlistStore.push(entry);
  // position = absolute seat number in alpha cohort
  const position = BASE_CLAIMED + sessionCounter;
  return { position, stats: getStats() };
}

export function listEntries(): readonly WaitlistEntry[] {
  return waitlistStore;
}
