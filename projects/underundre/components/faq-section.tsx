import { loadFaqData } from "@/lib/schemas/content-schema";
import FaqView from "./faq-view";

// Server component (spec 003 T-014): validates faq.json at build/SSG time,
// then hands typed data to the client view.

const DATA_SLUG = "underundre";

export default function FaqSection() {
  const data = loadFaqData(DATA_SLUG);
  return <FaqView data={data} />;
}
