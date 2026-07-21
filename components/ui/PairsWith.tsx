import Image from "next/image";
import Link from "next/link";

/**
 * A normalized cross-content link used to pair a bread loaf with a coffee drink
 * (and vice versa). Kept type-agnostic so the same card serves both directions:
 * a loaf page linking to a drink, and a drink page linking to loaves.
 */
export interface PairingLink {
  href: string;
  coverImage: string;
  title: string;
  /** Small uppercase label above the title, e.g. a coffee category or a loaf type. */
  kindLabel: string;
  /** Optional secondary line, e.g. a brew ratio or a hydration %. */
  meta?: string;
}

/**
 * The coffee↔bread edge of the site's cross-link web: shows what a loaf pairs
 * with (a drink) or what a drink pairs with (loaves). Server-renderable (no
 * client boundary). Renders nothing when there's no pairing, so it stays out of
 * the way until a post opts in via `pairsWith`.
 */
export default function PairsWith({ pairings }: { pairings: PairingLink[] }) {
  if (pairings.length === 0) return null;

  return (
    <div className="pt-2">
      <span className="stat-label mb-2 flex items-center gap-1.5">
        <svg
          className="w-3.5 h-3.5 text-terracotta/70"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 21s-7.5-4.35-10-9.5A5 5 0 0112 6a5 5 0 0110 5.5C19.5 16.65 12 21 12 21z" />
        </svg>
        Pairs well with
      </span>
      <div className="space-y-2">
        {pairings.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="group flex items-stretch gap-4 rounded-2xl border border-blush/50 bg-cream-dark/60 overflow-hidden transition-colors hover:border-terracotta/50"
          >
            <div className="relative w-20 shrink-0 overflow-hidden">
              <Image
                src={p.coverImage}
                alt={p.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                sizes="80px"
              />
            </div>
            <div className="min-w-0 flex-1 py-3 pr-4 space-y-1">
              <span className="block text-xs font-semibold uppercase tracking-widest text-espresso-muted capitalize">
                {p.kindLabel}
              </span>
              <h3 className="font-display font-semibold text-espresso leading-snug text-balance group-hover:text-terracotta transition-colors">
                {p.title}
              </h3>
              {p.meta && (
                <span className="block text-[11px] font-medium text-espresso-muted">
                  {p.meta}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
