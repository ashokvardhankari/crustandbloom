"use client";

import { useState } from "react";
import type { PostMeta, BreadFrontmatter } from "@/lib/types";
import type { FlavorFilter } from "@/lib/types";
import PostCard from "./PostCard";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  posts: PostMeta<BreadFrontmatter>[];
}

const filters: { value: FlavorFilter; label: string; emoji: string }[] = [
  { value: "all", label: "All", emoji: "✦" },
  { value: "savory", label: "Savory", emoji: "🧀" },
  { value: "sweet", label: "Sweet", emoji: "🍫" },
  { value: "spicy", label: "Spicy", emoji: "🌶" },
];

export default function FilterBar({ posts }: FilterBarProps) {
  const [activeFilter, setActiveFilter] = useState<FlavorFilter>("all");

  const filtered =
    activeFilter === "all"
      ? posts
      : posts.filter((p) => p.frontmatter.flavorProfile === activeFilter);

  return (
    <div>
      {/* Filter pills */}
      <div className="flex flex-wrap gap-3 mb-10">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={cn(
              "inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200",
              activeFilter === f.value
                ? "bg-terracotta text-cream shadow-sm"
                : "bg-blush/40 text-espresso hover:bg-blush/70"
            )}
          >
            <span>{f.emoji}</span>
            {f.label}
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center text-espresso-muted">
          <p className="text-lg">No loaves found for this filter yet.</p>
          <p className="text-sm mt-2">Check back soon. More are on the way.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
