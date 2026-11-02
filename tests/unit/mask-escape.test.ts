import { describe, expect, it } from "vitest";
import { escapeHtml, maskEmail } from "@/lib/lead/sanitize";

describe("maskEmail", () => {
  it("masks the local part, keeps the domain", () => {
    expect(maskEmail("user@example.com")).toBe("us***@example.com");
  });

  it("handles malformed input", () => {
    expect(maskEmail("not-an-email")).toBe("***");
  });
});

describe("escapeHtml", () => {
  it("escapes all HTML-special characters", () => {
    expect(escapeHtml(`<script>&"'</script>`)).toBe(
      "&lt;script&gt;&amp;&quot;&#039;&lt;/script&gt;"
    );
  });
});
