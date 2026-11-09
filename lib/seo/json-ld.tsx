import { buildFaqJsonLd, buildHomeJsonLd } from "@/lib/seo/build-json-ld";

// Spec 006 FR-006/FR-007: server-rendered JSON-LD. Serialization escapes `<`
// to `\u003c` — blocks `</script>` breakouts from any field value (S-02).

function serialize(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function JsonLdBlock({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialize(data) }}
    />
  );
}

/** Homepage blocks: WebSite + brand entity (FR-006). */
export function HomeJsonLd() {
  return (
    <>
      {buildHomeJsonLd().map((block, i) => (
        <JsonLdBlock key={`home-${i}`} data={block} />
      ))}
    </>
  );
}

/** FAQPage block from data/faq.json (FR-007) — render alongside the FAQ section. */
export function FaqJsonLd({ slug }: { slug: string }) {
  return <JsonLdBlock data={buildFaqJsonLd(slug)} />;
}
