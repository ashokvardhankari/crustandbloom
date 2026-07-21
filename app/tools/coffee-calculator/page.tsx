import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CoffeeCalculator from "@/components/tools/CoffeeCalculator";
import JsonLd from "@/components/seo/JsonLd";
import { listingMetadata, toolApplicationJsonLd } from "@/lib/seo";

const COFFEE_CALCULATOR_DESCRIPTION =
  "Brew ratio calculator, drink builder, and extraction yield calculator for espresso and coffee.";

export const metadata: Metadata = listingMetadata({
  title: "Coffee Calculator",
  description: COFFEE_CALCULATOR_DESCRIPTION,
  canonical: "/tools/coffee-calculator",
});

export default function CoffeeCalculatorPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
      <JsonLd
        data={toolApplicationJsonLd({
          name: "Coffee & Espresso Calculator",
          description: COFFEE_CALCULATOR_DESCRIPTION,
          path: "/tools/coffee-calculator",
        })}
      />
      <div className="mb-14">
        <p className="text-xs font-semibold uppercase tracking-widest text-terracotta mb-3">
          Tools
        </p>
        <h1 className="text-4xl lg:text-5xl font-bold text-espresso leading-tight">
          Coffee Calculator
        </h1>
        <p className="mt-4 text-espresso/60 text-lg leading-relaxed max-w-xl">
          Dial in your espresso. Calculate brew ratios, build drinks with the
          right proportions, and check your extraction yield.
        </p>
        <div className="mt-6 h-px w-24 bg-amber" />
      </div>

      <ScrollReveal>
        <CoffeeCalculator />
      </ScrollReveal>
    </div>
  );
}
