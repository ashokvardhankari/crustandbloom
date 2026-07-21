"use client";

import { useState } from "react";
import type { PostMeta, CoffeeFrontmatter } from "@/lib/types";
import PostCard from "./PostCard";
import { cn } from "@/lib/utils";

type CoffeeCategory = "all" | "latte" | "cappuccino" | "espresso" | "filter";

interface CoffeeFilterBarProps {
  posts: PostMeta<CoffeeFrontmatter>[];
}

const filters: { value: CoffeeCategory; label: string; dot: string }[] = [
  { value: "all", label: "All", dot: "✦" },
  { value: "espresso", label: "Espresso", dot: "☕" },
  { value: "cappuccino", label: "Cappuccino", dot: "🍵" },
  { value: "latte", label: "Latte", dot: "🥛" },
  { value: "filter", label: "Filter", dot: "♨" },
];

export default function CoffeeFilterBar({ posts }: CoffeeFilterBarProps) {
  const [active, setActive] = useState<CoffeeCategory>("all");

  const filtered =
    active === "all"
      ? posts
      : posts.filter((p) => p.frontmatter.category === active);

  return (
    <div>
      <div
        className="flex flex-wrap gap-3 mb-10"
        role="group"
        aria-label="Filter drinks by type"
      >
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            aria-pressed={active === f.value}
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

      {/* Announce the filtered count to screen readers as filters change — the
          visible grid is the sighted counterpart to this live status message. */}
      <p role="status" aria-live="polite" className="sr-only">
        {filtered.length} {filtered.length === 1 ? "drink" : "drinks"} shown
      </p>

      {filtered.length === 0 ? (
        <div className="py-16 text-center text-espresso-muted">
          <p className="text-lg">No drinks in this category yet.</p>
          <p className="text-sm mt-2">Check back soon. More on the way.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
