import type { Metadata } from "next";
import { getAllBeanPostsMeta } from "@/lib/content";
import BeanFilterBar from "@/components/ui/BeanFilterBar";

export const metadata: Metadata = {
  title: "Beans",
  alternates: { canonical: "/beans" },
  description:
    "Honest reviews of the coffee beans I actually brew: roaster, origin, what the bag claims, and what I really taste.",
};

export default async function BeansPage() {
  const beans = await getAllBeanPostsMeta();

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div className="mb-14 max-w-xl animate-fade-in-up">
        <p className="eyebrow mb-3">The shelf</p>
        <h1 className="font-display font-semibold text-5xl lg:text-6xl tracking-tight text-espresso leading-tight">
          Beans<span className="text-terracotta italic">.</span>
        </h1>
        <p className="mt-4 text-espresso/60 text-lg leading-relaxed">
          Honest notes on the beans I actually brew. Where they&apos;re from, what the
          bag claims, and what I really taste in the cup.
        </p>
        <div className="mt-6 h-px w-24 bg-amber" />
      </div>

      {beans.length === 0 ? (
        <div className="py-20 text-center text-espresso-muted">
          <p className="text-lg">No bean reviews yet. First bag is grinding.</p>
        </div>
      ) : (
        <BeanFilterBar posts={beans} />
      )}
    </div>
  );
}
