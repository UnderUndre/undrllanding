import { describe, it, expect, vi, beforeEach } from "vitest";
import { GenericLeadSubmissionSchema } from "@/lib/schemas/content-schema";
import { referralMetadata } from "@/lib/referral";
import { personaMetadata } from "@/lib/persona";
import { buildTelemetry } from "@/components/calculator/tdabc-calculator";

// Spec 009 T006: composition test — persona (009) + referral (007) + calculator
// telemetry (008) must compose into ONE valid payload within the ≤20-key bound
// (review F4 canonical key set).

function makeWindowStub() {
  const store = new Map<string, string>();
  return {
    localStorage: {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => void store.set(k, v),
      clear: () => store.clear(),
    },
    sessionStorage: {
      getItem: () => null,
      setItem: () => {},
      clear: () => {},
    },
  };
}
const w = makeWindowStub();

beforeEach(() => {
  vi.stubGlobal("window", w);
  w.localStorage.clear();
});

describe("lead metadata composition (persona + referral + calculator)", () => {
  it("all three sources compose into one valid payload (7+2+form keys ≤ 20)", () => {
    // simulate stored attribution
    captureAndSeed();

    const telemetry = buildTelemetry({
      teamSize: 15,
      weeklyHoursPerPerson: 20,
      hourlyRate: 35,
      selectedToolIds: ["salesforce", "zapier", "airtable"],
    });

    const payload = {
      email: "ops@corporation.example",
      contact: "ops@corporation.example",
      topic: "tco-audit-v20.2b",
      message: "x".repeat(50),
      metadata: {
        ...referralMetadata(),
        ...personaMetadata(),
        ...telemetry,
        role: "ops_lead",
        channelType: "email_only",
        protocolVersion: "v20.2b-duplex",
      },
    };

    const parsed = GenericLeadSubmissionSchema.safeParse(payload);
    expect(parsed.success).toBe(true);
    expect(parsed.data?.metadata?.referral).toBe("alice");
    expect(parsed.data?.metadata?.persona).toBe("ops");
    expect(parsed.data?.metadata?.totalHoursPerYear).toBe("15600");
    // key budget
    expect(Object.keys(parsed.data?.metadata ?? {}).length).toBeLessThanOrEqual(20);
  });

  it("no stored attribution → keys omitted entirely (no empty strings)", () => {
    const payload = {
      email: "ops@corporation.example",
      contact: "ops@corporation.example",
      topic: "tco-audit-v20.2b",
      message: "x".repeat(50),
      metadata: {
        ...referralMetadata(),
        ...personaMetadata(),
        role: "ops_lead",
      },
    };
    const parsed = GenericLeadSubmissionSchema.safeParse(payload);
    expect(parsed.success).toBe(true);
    expect(parsed.data?.metadata?.referral).toBeUndefined();
    expect(parsed.data?.metadata?.persona).toBeUndefined();
  });

  it("invalid persona param never reaches metadata", async () => {
    const { capturePersona } = await import("@/lib/persona");
    capturePersona("?persona=hacker");
    expect(personaMetadata()).toEqual({});
  });
});

/** Seed localStorage directly (capture helpers need URL — not available in node env). */
function captureAndSeed(): void {
  w.localStorage.setItem("undr.referral", JSON.stringify({ nick: "alice", ts: 1 }));
  w.localStorage.setItem("undr.persona", "ops");
}
