import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TableOfContents from "@/components/ui/TableOfContents";
import JsonLd from "@/components/seo/JsonLd";
import { faqPageJsonLd, listingMetadata } from "@/lib/seo";
import {
  BREAD_SYMPTOMS,
  COFFEE_SYMPTOMS,
  type TroubleshootingSymptom,
} from "@/lib/troubleshooting-data";
import type { TocHeading } from "@/lib/content";

const TROUBLESHOOTING_DESCRIPTION =
  "Diagnose what went wrong with your sourdough or espresso. Flat loaves, gummy crumb, sour shots, flat milk foam — the likely causes and how to fix them.";

export const metadata: Metadata = listingMetadata({
  title: "Troubleshooting",
  description: TROUBLESHOOTING_DESCRIPTION,
  canonical: "/troubleshooting",
});

/**
 * Flatten a symptom's causes into the plain-text answer the FAQPage schema
 * carries. Mirrors the visible on-page content, as the schema requires.
 */
function faqAnswer(s: TroubleshootingSymptom): string {
  return `${s.detail} Likely causes: ${s.causes
    .map((c) => `${c.cause} — ${c.fix}`)
    .join(" ")}`;
}

const tocHeadings: TocHeading[] = [
  { text: "Sourdough", slug: "sourdough", level: 2 },
  ...BREAD_SYMPTOMS.map(
    (s): TocHeading => ({ text: s.symptom, slug: s.slug, level: 3 })
  ),
  { text: "Espresso & milk", slug: "espresso-milk", level: 2 },
  ...COFFEE_SYMPTOMS.map(
    (s): TocHeading => ({ text: s.symptom, slug: s.slug, level: 3 })
  ),
];

function SymptomSection({ s, delay }: { s: TroubleshootingSymptom; delay: number }) {
  return (
    <ScrollReveal delay={delay}>
      <section aria-labelledby={s.slug} className="mt-10">
        <h3
          id={s.slug}
          className="scroll-mt-24 font-display text-2xl font-semibold tracking-tight text-espresso"
        >
          {s.symptom}
        </h3>
        <p className="mt-2 text-espresso/60 leading-relaxed">{s.detail}</p>
        <ul className="mt-5 space-y-4">
          {s.causes.map((c) => (
            <li
              key={c.cause}
              className="rounded-2xl border border-blush/40 bg-cream-dark/40 p-5"
            >
              <p className="text-espresso/80 leading-relaxed">
                <strong className="font-semibold text-espresso">
                  {c.cause}.
                </strong>{" "}
                {c.fix}
              </p>
              {c.link && (
                <p className="mt-2">
                  <Link
                    href={c.link.href}
                    className="text-sm font-semibold text-terracotta hover:text-terracotta-dark transition-colors duration-200"
                  >
                    {c.link.label} →
                  </Link>
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>
    </ScrollReveal>
  );
}

export default function TroubleshootingPage() {
  const allSymptoms = [...BREAD_SYMPTOMS, ...COFFEE_SYMPTOMS];

  return (
    <>
      <JsonLd
        data={faqPageJsonLd(
          allSymptoms.map((s) => ({ question: s.symptom, answer: faqAnswer(s) }))
        )}
      />

      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
        <div className="mb-14 animate-fade-in-up">
          <p className="eyebrow mb-3">When it goes wrong</p>
          <h1 className="font-display font-semibold text-5xl lg:text-6xl tracking-tight text-espresso leading-tight">
            Troubleshooting<span className="text-terracotta italic">.</span>
          </h1>
          <p className="mt-4 text-espresso/60 text-lg leading-relaxed max-w-xl">
            Every one of these has happened in my kitchen. Find the symptom,
            work through the likely causes in order, and change one thing per
            bake or per shot so you know what actually fixed it.
          </p>
          <div className="mt-6 h-px w-24 bg-amber" />
        </div>

        <TableOfContents headings={tocHeadings} title="Find your symptom" />

        <section aria-labelledby="sourdough">
          <h2
            id="sourdough"
            className="scroll-mt-24 font-display text-3xl font-semibold tracking-tight text-espresso border-b border-blush/40 pb-3"
          >
            Sourdough
          </h2>
          {BREAD_SYMPTOMS.map((s, i) => (
            <SymptomSection key={s.slug} s={s} delay={Math.min(i, 2) * 100} />
          ))}
        </section>

        <section aria-labelledby="espresso-milk" className="mt-16">
          <h2
            id="espresso-milk"
            className="scroll-mt-24 font-display text-3xl font-semibold tracking-tight text-espresso border-b border-blush/40 pb-3"
          >
            Espresso &amp; milk
          </h2>
          {COFFEE_SYMPTOMS.map((s, i) => (
            <SymptomSection key={s.slug} s={s} delay={Math.min(i, 2) * 100} />
          ))}
        </section>

        <div className="mt-16 p-8 bg-blush/20 rounded-2xl border-l-4 border-amber">
          <p className="text-espresso/80 leading-relaxed">
            Half of all bread problems trace back to the starter — the{" "}
            <Link
              href="/starter"
              className="font-semibold text-terracotta hover:text-terracotta-dark transition-colors duration-200"
            >
              starter guide
            </Link>{" "}
            covers feeding, readiness, and revival. For dialling in numbers
            rather than technique, the{" "}
            <Link
              href="/tools"
              className="font-semibold text-terracotta hover:text-terracotta-dark transition-colors duration-200"
            >
              calculators
            </Link>{" "}
            do the arithmetic.
          </p>
        </div>
      </div>
    </>
  );
}
