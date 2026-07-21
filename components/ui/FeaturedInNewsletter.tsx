import Link from "next/link";
import type { PostMeta, NewsletterFrontmatter } from "@/lib/types";
import { formatDate } from "@/lib/utils";

/**
 * Sidebar cross-link block listing the newsletter issue(s) that feature this
 * recipe, the reverse of the links the letters already carry into the site.
 * Server-renderable (no client boundary). Renders nothing when no issue
 * references the recipe.
 */
export default function FeaturedInNewsletter({
  issues,
}: {
  issues: PostMeta<NewsletterFrontmatter>[];
}) {
  if (issues.length === 0) return null;

  return (
    <div className="pt-2 print:hidden">
      <span className="stat-label mb-2 block">Featured in the newsletter</span>
      <div className="space-y-2">
        {issues.map(({ slug, frontmatter: f }) => (
          <Link
            key={slug}
            href={`/newsletter/${slug}`}
            className="group block rounded-2xl border border-blush/50 bg-cream-dark/60 p-4 transition-colors hover:border-terracotta/50"
          >
            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="inline-block eyebrow bg-blush/40 px-2 py-0.5 rounded-full">
                Issue #{f.issue}
              </span>
              <time
                dateTime={f.date}
                className="text-[11px] text-espresso-muted"
              >
                {formatDate(f.date)}
              </time>
            </div>
            <h3 className="font-display font-semibold text-espresso leading-snug text-balance group-hover:text-terracotta transition-colors">
              {f.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
