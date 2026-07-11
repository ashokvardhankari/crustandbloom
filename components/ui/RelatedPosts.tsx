import Link from "next/link";
import type { TaggedEntry } from "@/lib/content";
import { cn, formatDate } from "@/lib/utils";

const kindStyles = {
  Coffee: "bg-sand/60 text-espresso",
  Bread: "bg-blush/60 text-espresso",
  Beans: "bg-dune/40 text-terracotta",
} as const;

/**
 * "You might also like" — cross-content posts sharing tags with the current
 * one. Renders nothing when there are no related entries, so detail pages can
 * drop it in unconditionally.
 */
export default function RelatedPosts({
  entries,
  maxWidth = "max-w-7xl",
}: {
  entries: TaggedEntry[];
  maxWidth?: string;
}) {
  if (entries.length === 0) return null;

  return (
    <section
      aria-label="Related posts"
      className={`${maxWidth} mx-auto px-6 lg:px-8 pb-16`}
    >
      <div className="pt-10 border-t border-blush/40">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-espresso-muted mb-6">
          You might also like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
          {entries.map((entry) => (
            <Link
              key={entry.url}
              href={entry.url}
              role="listitem"
              className="card-galatea group flex flex-col p-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={cn(
                    "inline-block text-[11px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full",
                    kindStyles[entry.kind]
                  )}
                >
                  {entry.kind}
                </span>
                <time dateTime={entry.date} className="text-xs text-espresso-muted">
                  {formatDate(entry.date)}
                </time>
              </div>
              <h3 className="font-display text-lg font-semibold tracking-tight text-espresso mb-1 group-hover:text-terracotta transition-colors duration-200 text-balance">
                {entry.title}
              </h3>
              <p className="text-sm text-espresso/60 leading-relaxed line-clamp-2">
                {entry.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
