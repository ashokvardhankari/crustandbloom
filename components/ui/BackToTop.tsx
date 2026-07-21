"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * A floating "back to top" button that fades in once the reader has scrolled
 * well past the first viewport and jumps them back to the top of the page.
 *
 * The site's "On this page" contents box (TableOfContents) sits at the very top
 * of an article and is not sticky, so on a long recipe/review page there is no
 * persistent way back to the top nav once you scroll down — this closes that
 * gap. Rendered once site-wide from the root layout so every long page (recipes,
 * reviews, letters, archives, gallery) gets it. Hidden from the printout.
 *
 * Honours `prefers-reduced-motion`: readers who ask for reduced motion get an
 * instant jump instead of a smooth scroll.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show once the reader is a comfortable distance down the page (roughly a
    // viewport and a half), so the button never appears on short pages.
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 1.5);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      className={cn(
        "print:hidden fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-terracotta text-cream shadow-lg transition-all duration-300 hover:bg-terracotta-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      )}
      // Keep the button out of the tab order while it's hidden.
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>
    </button>
  );
}
