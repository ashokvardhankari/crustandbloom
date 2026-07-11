import Link from "next/link";

interface NavItem {
  href: string;
  title: string;
}

/**
 * Chronological previous/next navigation shown at the foot of a post. `newer`
 * links to the more recent neighbour, `older` to the previous one. Renders
 * nothing when a post has no neighbours in either direction.
 */
export default function PostNav({
  newer,
  older,
  label = "post",
  maxWidth = "max-w-7xl",
}: {
  newer: NavItem | null;
  older: NavItem | null;
  label?: string;
  maxWidth?: string;
}) {
  if (!newer && !older) return null;

  return (
    <nav
      aria-label={`Adjacent ${label} navigation`}
      className={`${maxWidth} mx-auto px-6 lg:px-8 pb-16`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-10 border-t border-blush/40">
        {newer ? (
          <Link
            href={newer.href}
            className="card-galatea group flex flex-col p-6 text-left"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-espresso-muted mb-2">
              ← Newer {label}
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-espresso group-hover:text-terracotta transition-colors duration-200">
              {newer.title}
            </span>
          </Link>
        ) : (
          <span aria-hidden="true" className="hidden sm:block" />
        )}

        {older ? (
          <Link
            href={older.href}
            className="card-galatea group flex flex-col p-6 text-right"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-espresso-muted mb-2">
              Older {label} →
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-espresso group-hover:text-terracotta transition-colors duration-200">
              {older.title}
            </span>
          </Link>
        ) : (
          <span aria-hidden="true" className="hidden sm:block" />
        )}
      </div>
    </nav>
  );
}
