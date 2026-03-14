import type { Metadata } from "next";
import { getAllCoffeePostsMeta } from "@/lib/content";
import PostCard from "@/components/ui/PostCard";

export const metadata: Metadata = {
  title: "Coffee",
  description:
    "Espresso-based drinks: cappuccinos, lattes, and more. Each entry includes brew notes, ratios, and technique.",
};

export default async function CoffeePage() {
  const posts = await getAllCoffeePostsMeta();

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-14 max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-terracotta mb-3">
          The cup
        </p>
        <h1 className="text-4xl lg:text-5xl font-bold text-espresso leading-tight">
          Coffee
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
