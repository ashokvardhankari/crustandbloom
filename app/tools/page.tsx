import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Calculators and tools for baking and coffee. Plan your sourdough schedule or dial in your espresso.",
};

const tools = [
  {
    href: "/tools/baking-calculator",
    title: "Baking Calculator",
    description:
      "Plan your sourdough bake day with a step-by-step timeline for three different schedules.",
    badge: "Bread",
  },
  {
    href: "/tools/coffee-calculator",
    title: "Coffee Calculator",
    description:
      "Brew ratio calculator, drink builder with espresso-to-milk ratios, and extraction yield.",
    badge: "Coffee",
  },
];

export default function ToolsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
      <div className="mb-14 animate-fade-in-up">
        <p className="eyebrow mb-3">
          Resources
        </p>
        <h1 className="font-display font-semibold text-5xl lg:text-6xl tracking-tight text-espresso leading-tight">
          Tools<span className="text-terracotta italic">.</span>
        </h1>
        <p className="mt-4 text-espresso/60 text-lg leading-relaxed max-w-xl">
          Calculators for baking and coffee. Built for the way I actually work.
        </p>
        <div className="mt-6 h-px w-24 bg-amber" />
      </div>

      <div className="grid gap-6">
        {tools.map((tool, i) => (
          <ScrollReveal key={tool.href} delay={i * 100}>
            <Link
              href={tool.href}
              className="card-galatea block p-8 group"
            >
              <span className="inline-block eyebrow bg-blush/40 px-3 py-1 rounded-full mb-4">
                {tool.badge}
              </span>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-espresso mb-2 group-hover:text-terracotta transition-colors duration-200">
                {tool.title}
              </h2>
              <p className="text-sm text-espresso/60 leading-relaxed">
                {tool.description}
              </p>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
