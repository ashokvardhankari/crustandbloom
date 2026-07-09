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

export default function BeanFilterBar({ posts }: BeanFilterBarProps) {
  const [active, setActive] = useState<RoastFilter>("all");

  const filtered =
    active === "all"
      ? posts
      : posts.filter((p) => roastBucket(p.frontmatter.roastLevel) === active);

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-10">
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
      </div>

      {filtered.length === 0 ? (
        <div className="py-16 text-center text-espresso-muted">
          <p className="text-lg">No beans in this roast range yet.</p>
          <p className="text-sm mt-2">Check back soon. More on the shelf.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post) => (
            <BeanCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
