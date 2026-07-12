"use client";

import { useState } from "react";
import type { PostMeta, BeanFrontmatter, RoastFilter } from "@/lib/types";
import BeanCard from "./BeanCard";
import { cn, roastBucket } from "@/lib/utils";

interface BeanFilterBarProps {
  posts: PostMeta<BeanFrontmatter>[];
}

const filters: { value: RoastFilter; label: string; dot: string }[] = [
  { value: "all", label: "All", dot: "✦" },
  { value: "light", label: "Light", dot: "🟡" },
  { value: "medium", label: "Medium", dot: "🟤" },
  { value: "dark", label: "Dark", dot: "⚫" },
];

type SortKey = "newest" | "rating";

const sorts: { value: SortKey; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "rating", label: "Top rated" },
];

export default function BeanFilterBar({ posts }: BeanFilterBarProps) {
  const [active, setActive] = useState<RoastFilter>("all");
  const [sort, setSort] = useState<SortKey>("newest");

  const filtered =
    active === "all"
      ? posts
      : posts.filter((p) => roastBucket(p.frontmatter.roastLevel) === active);

  // `posts` already arrives newest-first, so "newest" is the incoming order.
  // "rating" sorts by rating desc, breaking ties by that same recency.
  const visible =
    sort === "rating"
      ? [...filtered].sort(
          (a, b) => (b.frontmatter.rating ?? 0) - (a.frontmatter.rating ?? 0)
        )
      : filtered;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-10">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={cn(
              "inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200",
              active === f.value
                ? "bg-terracotta text-cream shadow-sm"
                : "bg-blush/40 text-espresso hover:bg-blush/70"
            )}
          >
            <span>{f.dot}</span>
            {f.label}
          </button>
        ))}

        {/* Sort — pushed to the far end of the same control row */}
        <div
          className="ml-auto inline-flex items-center gap-1 rounded-full bg-blush/25 p-1"
          role="group"
          aria-label="Sort bean reviews"
        >
          {sorts.map((s) => (
            <button
              key={s.value}
              onClick={() => setSort(s.value)}
              aria-pressed={sort === s.value}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-200",
                sort === s.value
                  ? "bg-terracotta text-cream shadow-sm"
                  : "text-espresso-muted hover:text-espresso"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-16 text-center text-espresso-muted">
          <p className="text-lg">No beans in this roast range yet.</p>
          <p className="text-sm mt-2">Check back soon. More on the shelf.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visible.map((post) => (
            <BeanCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
