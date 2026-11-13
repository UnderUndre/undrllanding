// Spec 009 FR-005/FR-006: persona resolution — pure, client-safe module.
// A persona is a UX segment (message-market fit), NOT an economic reward key:
// zero fraud surface, zero payouts depend on it. Last-touch policy mirrors
// the 007 referral contour (review-tested pattern).

export const PERSONA_STORAGE_KEY = "undr.persona";
export const VALID_PERSONA_IDS = ["owner", "ops", "cto"] as const;
export type PersonaId = (typeof VALID_PERSONA_IDS)[number];

const VALID = new Set<string>(VALID_PERSONA_IDS);

export function resolvePersona(
  param: string | null | undefined
): PersonaId | undefined {
  if (!param) return undefined;
  const normalized = param.trim().toLowerCase();
  return VALID.has(normalized) ? (normalized as PersonaId) : undefined;
}

/** Capture ?persona= from the current URL. Last-touch: valid overwrites, invalid/absent untouched. */
export function capturePersona(search: string = window.location.search): void {
  if (typeof window === "undefined") return;
  const persona = resolvePersona(new URLSearchParams(search).get("persona"));
  if (!persona) return;
  try {
    window.localStorage.setItem(PERSONA_STORAGE_KEY, persona);
  } catch {
    // localStorage unavailable → silent no-op (NFR-003)
  }
}

export function getPersona(): PersonaId | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = window.localStorage.getItem(PERSONA_STORAGE_KEY);
    return resolvePersona(raw);
  } catch {
    return undefined;
  }
}

/** Metadata entry for lead forms: key omitted when no persona (no empty strings). */
export function personaMetadata(): { persona?: string } {
  const persona = getPersona();
  return persona ? { persona } : {};
}
