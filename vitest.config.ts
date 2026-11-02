import path from "node:path";
import { defineConfig } from "vitest/config";

// Spec 005 FR-006: unit contour config — maps the tsconfig `@/*` alias.
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  test: {
    include: ["tests/unit/**/*.test.ts"],
    environment: "node",
  },
});
