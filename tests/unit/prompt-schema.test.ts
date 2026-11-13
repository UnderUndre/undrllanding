import { describe, it, expect } from "vitest";
import { PromptPackItemSchema } from "@/lib/schemas/prompt-schema";

// Spec 009 T002: prompt schema contract tests.

function validPrompt(overrides: Record<string, unknown> = {}) {
  return {
    slug: "symptom-inventory",
    order: 1,
    category: "discovery",
    relatesTo: "Step 1 of 5 — Symptom Inventory",
    title: { ru: "Инвентаризация симптомов", en: "Symptom inventory" },
    description: { ru: "Описание", en: "Description" },
    body: "You are a forensic operations auditor. Walk me through every manual data transfer in my workflow, one by one...",
    ...overrides,
  };
}

describe("PromptPackItemSchema", () => {
  it("accepts a valid prompt", () => {
    expect(PromptPackItemSchema.safeParse(validPrompt()).success).toBe(true);
  });

  it("rejects invalid slug", () => {
    expect(PromptPackItemSchema.safeParse(validPrompt({ slug: "Bad Slug" })).success).toBe(false);
  });

  it("rejects unknown category", () => {
    expect(PromptPackItemSchema.safeParse(validPrompt({ category: "magic" })).success).toBe(false);
  });

  it("rejects short body (< 40 chars)", () => {
    expect(PromptPackItemSchema.safeParse(validPrompt({ body: "too short" })).success).toBe(false);
  });

  it("rejects missing bilingual description", () => {
    const p = validPrompt();
    delete (p as Record<string, unknown>).description;
    expect(PromptPackItemSchema.safeParse(p).success).toBe(false);
  });
});
