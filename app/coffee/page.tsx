import type { Metadata } from "next";
import { getAllCoffeePostsMeta } from "@/lib/content";
import CoffeeFilterBar from "@/components/ui/CoffeeFilterBar";

export const metadata: Metadata = {
  title: "Coffee",
  alternates: { canonical: "/coffee" },
  description:
    "Espresso-based drinks: cappuccinos, lattes, and more. Each entry includes brew notes, ratios, and technique.",
};

export default async function CoffeePage() {
  const posts = await getAllCoffeePostsMeta();

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-14 max-w-xl animate-fade-in-up">
        <p className="eyebrow mb-3">
          The cup
        </p>
        <h1 className="font-display font-semibold text-5xl lg:text-6xl tracking-tight text-espresso leading-tight">
          Coffee<span className="text-terracotta italic">.</span>
        </h1>
        <p className="mt-4 text-espresso/60 text-lg leading-relaxed">
          Espresso pulled at home. Mostly cappuccinos and lattes, each one with
          its own story, ratio, and notes from the session.
        </p>
        <div className="mt-6 h-px w-24 bg-amber" />
      </div>

      {posts.length === 0 ? (
        <div className="py-20 text-center text-espresso-muted">
          <p className="text-lg">No posts yet. Check back soon.</p>
        </div>
      ) : (
        <CoffeeFilterBar posts={posts} />
      )}
    </div>
  );
}
