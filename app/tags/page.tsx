import type { Metadata } from "next";
import Link from "next/link";
import { getAllTags } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tags",
  description:
    "Browse every recipe, bean review, and note on Crust & Bloom by tag.",
};

export default async function TagsPage() {
  const tags = await getAllTags();

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
      <div className="mb-10 animate-fade-in-up">
        <p className="eyebrow mb-3">Browse by</p>
        <h1 className="font-display font-semibold text-5xl lg:text-6xl tracking-tight text-espresso leading-tight">
          Tags<span className="text-terracotta italic">.</span>
        </h1>
        <div className="mt-6 h-px w-24 bg-amber" />
      </div>

      {tags.length === 0 ? (
        <p className="text-espresso/60">No tags yet.</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {tags.map(({ slug, tag, count }) => (
            <Link
              key={slug}
              href={`/tags/${slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-blush bg-white px-4 py-2 text-sm text-espresso hover:border-terracotta hover:text-terracotta transition-colors"
            >
              #{tag}
              <span className="text-xs text-espresso-muted">{count}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
