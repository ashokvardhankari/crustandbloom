import Link from "next/link";
import type { AdjacentPosts } from "@/lib/content";

interface PostNavProps {
  /** Where the "back to listing" link points, e.g. "/coffee". */
  backHref: string;
  /** Label for the back link, e.g. "All coffee". */
  backLabel: string;
  /** Base path for adjacent posts, e.g. "/coffee" → "/coffee/<slug>". */
  basePath: string;
  adjacent: AdjacentPosts;
}

export default function PostNav({
  backHref,
  backLabel,
  basePath,
  adjacent,
}: PostNavProps) {
  const { previous, next } = adjacent;

  return (
    <nav
      aria-label="Post navigation"
      className="mt-16 pt-8 border-t border-blush/40"
    >
      <Link
        href={backHref}
        className="text-sm font-semibold text-terracotta hover:text-terracotta-dark transition-colors duration-200"
      >
        ← {backLabel}
      </Link>

      {(previous || next) && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {previous ? (
            <Link
              href={`${basePath}/${previous.slug}`}
              className="group flex flex-col gap-1 p-5 rounded-2xl bg-cream-dark hover:bg-blush/30 transition-colors duration-200"
            >
              <span className="eyebrow text-espresso-muted">← Previous</span>
              <span className="font-semibold text-espresso group-hover:text-terracotta transition-colors duration-200">
                {previous.title}
              </span>
            </Link>
          ) : (
            <span aria-hidden className="hidden sm:block" />
          )}

          {next ? (
            <Link
              href={`${basePath}/${next.slug}`}
              className="group flex flex-col gap-1 p-5 rounded-2xl bg-cream-dark hover:bg-blush/30 transition-colors duration-200 sm:text-right sm:items-end"
            >
              <span className="eyebrow text-espresso-muted">Next →</span>
              <span className="font-semibold text-espresso group-hover:text-terracotta transition-colors duration-200">
                {next.title}
              </span>
            </Link>
          ) : (
            <span aria-hidden className="hidden sm:block" />
          )}
        </div>
      )}
    </nav>
  );
}
