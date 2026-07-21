import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import BakingCalculator from "@/components/tools/BakingCalculator";
import JsonLd from "@/components/seo/JsonLd";
import { listingMetadata, toolApplicationJsonLd } from "@/lib/seo";

const BAKING_CALCULATOR_DESCRIPTION =
  "Plan your sourdough bake day. Pick a schedule, set your start time or deadline, and get a complete step-by-step timeline.";

export const metadata: Metadata = listingMetadata({
  title: "Baking Calculator",
  description: BAKING_CALCULATOR_DESCRIPTION,
  canonical: "/tools/baking-calculator",
});

export default function BakingCalculatorPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
      <JsonLd
        data={toolApplicationJsonLd({
          name: "Sourdough Baking Calculator",
          description: BAKING_CALCULATOR_DESCRIPTION,
          path: "/tools/baking-calculator",
        })}
      />
      {/* Header */}
      <div className="mb-14">
        <p className="text-xs font-semibold uppercase tracking-widest text-terracotta mb-3">
          Tools
        </p>
        <h1 className="text-4xl lg:text-5xl font-bold text-espresso leading-tight">
          Baking Calculator
        </h1>
        <p className="mt-4 text-espresso/60 text-lg leading-relaxed max-w-xl">
          Plan your sourdough bake day. Pick a schedule, set your start time or
          deadline, and get a complete step-by-step timeline.
        </p>
        <div className="mt-6 h-px w-24 bg-amber" />
      </div>

      <ScrollReveal>
        <BakingCalculator />
      </ScrollReveal>
    </div>
  );
}
