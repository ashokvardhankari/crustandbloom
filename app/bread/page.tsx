import type { Metadata } from "next";
import { getAllClassicBreadMeta, getInclusionLoaves } from "@/lib/content";
import PostCard from "@/components/ui/PostCard";
import FilterBar from "@/components/ui/FilterBar";

export const metadata: Metadata = {
  title: "Bread",
  description:
    "Classic sourdough and inclusion loaves — with full bake notes, hydration percentages, and photo galleries.",
};

export default async function BreadPage() {
  const [classicPosts, inclusionPosts] = await Promise.all([
    getAllClassicBreadMeta(),
    getInclusionLoaves(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-14 max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-terracotta mb-3">
          The loaf
        </p>
        <h1 className="text-4xl lg:text-5xl font-bold text-espresso leading-tight">
          Bread
        </h1>
        <p className="mt-4 text-espresso/60 text-lg leading-relaxed">
          Sourdough baked at home — from the classic country loaf to inclusions
          that push into new territory. Every loaf documented with full process
          notes and photos.
        </p>
        <div className="mt-6 h-px w-24 bg-amber" />
      </div>

      {/* Classic Sourdough */}
      <section className="mb-20">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold text-espresso">Classic Sourdough</h2>
          <div className="flex-1 h-px bg-blush/40" />
        </div>

        {classicPosts.length === 0 ? (
          <p className="text-espresso-muted">No classic loaves yet — more coming soon.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {classicPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* Inclusion Loaves */}
      <section id="inclusions">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-2xl font-bold text-espresso">Inclusion Loaves</h2>
          <div className="flex-1 h-px bg-blush/40" />
        </div>
        <p className="text-espresso/60 mb-8 max-w-lg">
          Sourdough with something extra — cheese, chocolate, chili, and more.
          Filter by flavor profile to find your next bake.
        </p>

        <FilterBar posts={inclusionPosts} />
      </section>
    </div>
  );
}
