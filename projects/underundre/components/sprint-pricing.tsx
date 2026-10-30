import { loadPricingData } from "@/lib/schemas/content-schema";
import SprintPricingView from "./sprint-pricing-view";

// Server component (spec 003 T-013): validates pricing.json at build/SSG time
// (malformed data halts the build — FM-02), then hands typed data to the client view.

const DATA_SLUG = "underundre";

export default function SprintPricing() {
  const data = loadPricingData(DATA_SLUG);
  return <SprintPricingView data={data} />;
}
