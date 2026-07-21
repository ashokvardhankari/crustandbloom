"use client";

import { useEffect, useState } from "react";
import type { TocHeading } from "@/lib/content";
import { cn } from "@/lib/utils";

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
 *
 * The full list is server-rendered (works with no JS and is crawlable); on the
 * client it becomes a scroll-spy — a lightweight scroll listener highlights the
 * section currently in view, so on long recipe/review pages the reader always
 * knows where they are. Progressive enhancement: the initial paint has no active
 * item, and it lights up once the reader scrolls.
 */
export default function TableOfContents({
  headings,
  title = "On this page",
}: TableOfContentsProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  useEffect(() => {
    if (headings.length < 3) return;

    const els = headings
      .map((h) => document.getElementById(h.slug))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    // The active section is the last heading whose top has scrolled above a line
    // just below the sticky header (scroll-mt-24 ≈ 96px). Nothing is active while
    // the reader is still above the first heading (in the intro prose).
    const OFFSET = 100;
    const compute = () => {
      let current: string | null = null;
      for (const el of els) {
        if (el.getBoundingClientRect().top - OFFSET <= 0) current = el.id;
        else break;
      }
      // Pin the final section when scrolled to the very bottom, so a short last
      // section that never reaches the offset line still highlights.
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      ) {
        current = els[els.length - 1].id;
      }
      setActiveSlug(current);
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        compute();
        ticking = false;
      });
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [headings]);

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
        {headings.map((h) => {
          const active = h.slug === activeSlug;
          return (
            <li key={`${h.slug}-${h.level}`} className={h.level === 3 ? "ml-4" : ""}>
              <a
                href={`#${h.slug}`}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "text-sm leading-snug transition-colors hover:text-terracotta",
                  active
                    ? "text-terracotta font-semibold"
                    : "text-espresso/70"
                )}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
