import Link from "next/link";
import PostCard from "@/components/ui/PostCard";
import type { PostMeta, PostFrontmatter } from "@/lib/types";

interface ToolRecipeLinksProps {
  /** Section heading, e.g. "Recipes to bake". */
  heading: string;
  /** One-line lead-in tying the tool's output to the recipes below. */
  intro: string;
  /** The recipes to surface as compact cards (already trimmed to a display set). */
  posts: PostMeta<PostFrontmatter>[];
  /** Optional "see the full archive" link, shown when more recipes exist than are surfaced here. */
  browse?: { href: string; label: string } | null;
}

/**
 * A launchpad that turns a calculator page from a navigational dead-end into a
 * jumping-off point: recipes deep-link *into* the baking/coffee calculators
 * (via ?schedule= / ?drink=), but the calculators never linked back to a recipe
 * to actually make. This closes that one-directional gap by surfacing a few
 * recipe cards below the tool, plus an optional link to the full archive.
 *
 * Server-rendered plain links, so it works with and without JS — complementing
 * (not duplicating) each calculator's no-JS reference fallback.
 */
export default function ToolRecipeLinks({
  heading,
  intro,
  posts,
  browse,
}: ToolRecipeLinksProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-14 border-t border-blush/40 pt-10">
      <h2 className="font-display text-2xl font-semibold text-espresso">
        {heading}
      </h2>
      <p className="mt-2 text-espresso/60 leading-relaxed max-w-xl">{intro}</p>

      <div className="mt-6 grid gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} size="compact" />
        ))}
      </div>

      {browse && (
        <Link
          href={browse.href}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-terracotta hover:gap-2.5 transition-all duration-200"
        >
          {browse.label}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      )}
    </section>
  );
}
