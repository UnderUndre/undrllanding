# Data Model: 009-static-conversion-layer

**Date**: 2026-11-14 · Additive; no DB; localStorage + static JSON + private ledgers.

## 1. Entity: PromptPackItem (`lib/schemas/prompt-schema.ts`)

```ts
export const PromptPackItemSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  order: z.number().int().positive(),
  category: z.enum(["discovery", "quantification", "architecture", "brief"]),
  /** Which step of the SpecKit Discovery workflow this prompt runs (FR-003 provenance). */
  relatesTo: z.string().min(1),
  title: LocalizedTextSchema,
  description: LocalizedTextSchema,
  /** Prompt body — authored in EN (LLM working language), human-written. */
  body: z.string().min(40),
});
export type PromptPackItem = z.infer<typeof PromptPackItemSchema>;
```

Loader: `loadAllPrompts(slug)` reads `projects/<slug>/data/prompts/*.json`, validates, asserts slug uniqueness, sorts by `order`. Missing dir → `[]`.

## 2. Entity: PersonaVariant (`lib/project-config.ts` + `lib/persona.ts`)

```ts
export interface PersonaVariant {
  id: "owner" | "ops" | "cto";
  badge: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
  ctaLabel: LocalizedText;
}
// ProjectConfig.personas?: PersonaVariant[]
```

`lib/persona.ts` (pure, client-safe):

```ts
const PERSONA_STORAGE_KEY = "undr.persona";
export const VALID_PERSONA_IDS = ["owner", "ops", "cto"] as const;
export type PersonaId = (typeof VALID_PERSONA_IDS)[number];

export function resolvePersona(param: string | null | undefined): PersonaId | undefined;
// trim → lowercase → must be in VALID_PERSONA_IDS, else undefined
export function capturePersona(search?: string): void;
// last-touch: valid ?persona= overwrites localStorage; invalid/absent → untouched
export function getPersona(): PersonaId | undefined;
export function personaMetadata(): { persona?: string }; // key omitted when absent
```

Lead-form contract: `metadata.persona?: string` — composes with `referral` and calculator telemetry (≤20-key bound: ~11 keys worst case).

## 3. Entity: WaitlistEntry (`projects/undreading/data/waitlist.json` + private ledger)

Public copy file:

```json
{
  "title": { "ru": "…", "en": "…", "uk": "…" },
  "subtitle": { "ru": "…", "en": "…", "uk": "…" },
  "emailLabel": { "ru": "…", "en": "…", "uk": "…" },
  "consentLabel": { "ru": "…", "en": "…", "uk": "…" },
  "submitLabel": { "ru": "…", "en": "…", "uk": "…" },
  "successMessage": { "ru": "…", "en": "…", "uk": "…" }
}
```

Lead payload (validated by `GenericLeadSubmissionSchema`):

```ts
{
  email, contact: email,
  topic: "undreading-waitlist",
  message: "Waitlist request — «Сантехника бытия» launch notification",
  metadata: { sourceComponent: "waitlist", referral?: string, persona?: string }
}
```

Private ledger (`undreplans/docs/projects/undreading/waitlist-ledger.md`): append-only table `{ date, email, lang, source, dedup }`, manual dedup on review.

## 4. ProjectConfig extension

```ts
hasPrompts?: boolean;   // /prompts bureau program (underundre)
personas?: PersonaVariant[]; // hero variants
// /waitlist routing: implicit — gated to slug === "undreading" (FR-007), no flag needed
```

## 5. Routes

| Route | Brand | Prerender | JSON-LD |
|---|---|---|---|
| `/prompts` | underundre only | ○ Static | `CollectionPage` |
| `/prompt-pack.md` | underundre only | force-static route handler | — |
| `/waitlist` | undreading only | ○ Static | `WebPage` |
