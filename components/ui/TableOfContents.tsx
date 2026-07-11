import type { TocHeading } from "@/lib/content";

interface TableOfContentsProps {
  headings: TocHeading[];
  /** Heading over the list — defaults to "On this page". */
  title?: string;
}

/**
 * An "On this page" contents box that links to each section of a recipe/article
 * body via the deep-link anchors the MDX renderer assigns. Renders nothing for
 * short posts (fewer than three headings, where a contents list adds no value)
 * and is hidden from the printout, which already prints the full body.
 */
export default function TableOfContents({
  headings,
  title = "On this page",
}: TableOfContentsProps) {
  if (headings.length < 3) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="mb-10 rounded-2xl border border-blush/40 bg-cream-dark/60 p-6 print:hidden"
    >
      <h2 className="text-xs font-semibold uppercase tracking-widest text-espresso-muted mb-4">
        {title}
      </h2>
      <ol className="space-y-2">
        {headings.map((h) => (
          <li key={`${h.slug}-${h.level}`} className={h.level === 3 ? "ml-4" : ""}>
            <a
              href={`#${h.slug}`}
              className="text-sm text-espresso/70 leading-snug hover:text-terracotta transition-colors"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
