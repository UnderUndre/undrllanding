import { describe, expect, it } from "vitest";
import { GenericLeadSubmissionSchema } from "@/lib/schemas/content-schema";

const validBase = { email: "a@b.co", message: "hello there" };

describe("GenericLeadSubmissionSchema metadata bounds (S-07)", () => {
  it("accepts exactly 20 keys and 50-char keys", () => {
    const twenty = Object.fromEntries(
      Array.from({ length: 20 }, (_, i) => [`k${String(i).padStart(2, "0")}`, i])
    );
    expect(Object.keys(twenty).length).toBe(20);
    expect(GenericLeadSubmissionSchema.safeParse({ ...validBase, metadata: twenty }).success).toBe(true);

    const long50 = "k".repeat(50);
    expect(
      GenericLeadSubmissionSchema.safeParse({ ...validBase, metadata: { [long50]: 1 } }).success
    ).toBe(true);
  });

  it("rejects 21 keys and 51-char keys", () => {
    const twentyOne = Object.fromEntries(
      Array.from({ length: 21 }, (_, i) => [`k${String(i).padStart(2, "0")}`, i])
    );
    expect(Object.keys(twentyOne).length).toBe(21);
    expect(GenericLeadSubmissionSchema.safeParse({ ...validBase, metadata: twentyOne }).success).toBe(false);

    const long51 = "k".repeat(51);
    expect(
      GenericLeadSubmissionSchema.safeParse({ ...validBase, metadata: { [long51]: 1 } }).success
    ).toBe(false);
  });

  it("rejects non-finite numbers, accepts finite", () => {
    const bad = { ...validBase, metadata: { score: 1e308 * 10 } }; // Infinity
    const ok = { ...validBase, metadata: { score: 1e308 } };
    expect(GenericLeadSubmissionSchema.safeParse(bad).success).toBe(false);
    expect(GenericLeadSubmissionSchema.safeParse(ok).success).toBe(true);
  });

  it("enforces message/email caps", () => {
    expect(
      GenericLeadSubmissionSchema.safeParse({ ...validBase, message: "x".repeat(2001) }).success
    ).toBe(false);
    expect(
      GenericLeadSubmissionSchema.safeParse({ ...validBase, email: `${"a".repeat(252)}@b.co` }).success
    ).toBe(false);
  });
});
