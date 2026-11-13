import { describe, it, expect } from "vitest";
import { GenericLeadSubmissionSchema } from "@/lib/schemas/content-schema";

// Spec 009 T008: waitlist payload contract (FR-007/FR-008).

function waitlistPayload(overrides: Record<string, unknown> = {}) {
  return {
    email: "reader@bookfans.example",
    contact: "reader@bookfans.example",
    topic: "undreading-waitlist",
    message: "Waitlist request — «Сантехника бытия» launch notification",
    metadata: {
      sourceComponent: "waitlist",
      lang: "uk",
      referral: "alice",
    },
    ...overrides,
  };
}

describe("waitlist payload", () => {
  it("validates against GenericLeadSubmissionSchema with uk lang metadata", () => {
    const parsed = GenericLeadSubmissionSchema.safeParse(waitlistPayload());
    expect(parsed.success).toBe(true);
    expect(parsed.data?.metadata?.sourceComponent).toBe("waitlist");
    expect(parsed.data?.metadata?.lang).toBe("uk");
  });

  it("composes referral attribution from 007", () => {
    const parsed = GenericLeadSubmissionSchema.safeParse(waitlistPayload());
    expect(parsed.data?.metadata?.referral).toBe("alice");
  });

  it("rejects payload with unbounded metadata (defense against key spray)", () => {
    const metadata: Record<string, string> = {};
    for (let i = 0; i < 25; i++) metadata[`key${i}`] = "v";
    const parsed = GenericLeadSubmissionSchema.safeParse(waitlistPayload({ metadata }));
    expect(parsed.success).toBe(false);
  });

  it("rejects missing email", () => {
    const p = waitlistPayload();
    delete (p as Record<string, unknown>).email;
    expect(GenericLeadSubmissionSchema.safeParse(p).success).toBe(false);
  });
});
