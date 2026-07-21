import type { Metadata } from "next";
import Link from "next/link";
import { getAllTags } from "@/lib/content";
import { cn } from "@/lib/utils";
import { listingMetadata } from "@/lib/seo";

export const metadata: Metadata = listingMetadata({
  title: "Tags",
  description:
    "Browse every recipe, bean review, and note on Crust & Bloom by tag.",
  canonical: "/tags",
});

// Four visual weights for the cloud, lightest → heaviest. A tag's tier is
// picked from how its count compares to the most-used tag, so the busiest
// topics read as the biggest, boldest pills and the long tail stays quiet.
const tierStyles = [
  "px-4 py-2 text-sm",
  "px-4 py-2 text-base",
  "px-5 py-2.5 text-lg font-medium",
  "px-5 py-2.5 text-xl font-semibold border-terracotta/60 text-terracotta",
] as const;

/** Map a count into a tier index 0–3 relative to the busiest tag. */
function tagTier(count: number, maxCount: number): number {
  if (maxCount <= 1) return 0;
  const ratio = (count - 1) / (maxCount - 1);
  return Math.min(tierStyles.length - 1, Math.floor(ratio * tierStyles.length));
}

export default async function TagsPage() {
  const tags = await getAllTags();
  const maxCount = tags.reduce((max, t) => Math.max(max, t.count), 0);

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
      <div className="mb-10 animate-fade-in-up">
        <p className="eyebrow mb-3">Browse by</p>
        <h1 className="font-display font-semibold text-5xl lg:text-6xl tracking-tight text-espresso leading-tight">
          Tags<span className="text-terracotta italic">.</span>
        </h1>
        {tags.length > 0 && (
          <p className="mt-4 text-espresso/60">
            {tags.length} {tags.length === 1 ? "topic" : "topics"} across every
            recipe, bean, and note — bigger means more posts.
          </p>
        )}
        <div className="mt-6 h-px w-24 bg-amber" />
      </div>

      {tags.length === 0 ? (
        <p className="text-espresso/60">No tags yet.</p>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          {tags.map(({ slug, tag, count }) => (
            <Link
              key={slug}
              href={`/tags/${slug}`}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border border-blush bg-white text-espresso hover:border-terracotta hover:text-terracotta transition-colors",
                tierStyles[tagTier(count, maxCount)]
              )}
            >
              #{tag}
              <span className="text-xs font-normal text-espresso-muted">
                {count}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
