import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CoffeeCalculator from "@/components/tools/CoffeeCalculator";
import { pageAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Coffee Calculator",
  alternates: pageAlternates("/tools/coffee-calculator"),
  description:
    "Brew ratio calculator, drink builder, and extraction yield calculator for espresso and coffee.",
};

export default function CoffeeCalculatorPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
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
