"use client";

import { useEffect, useRef } from "react";

/**
 * giscus configuration. Comments live in GitHub Discussions on the site's
 * repo (Announcements-type category, so only giscus/maintainers can open
 * threads — readers comment, they don't create). These IDs are public by
 * design: giscus reads them client-side on every page load.
 */
const GISCUS_ATTRS: Record<string, string> = {
  "data-repo": "ashokvardhankari/crustandbloom",
  "data-repo-id": "R_kgDORltk-Q",
  "data-category": "Announcements",
  "data-category-id": "DIC_kwDORltk-c4DDAdT",
  // One discussion per page, keyed on pathname (e.g. /bread/country-sourdough).
  "data-mapping": "pathname",
  "data-strict": "1",
  "data-reactions-enabled": "1",
  "data-emit-metadata": "0",
  "data-input-position": "top",
  "data-theme": "light",
  "data-lang": "en",
  // Defer loading the widget until the reader scrolls it into view.
  "data-loading": "lazy",
};

/**
 * Reader comments, backed by GitHub Discussions via giscus. Rendered at the
 * very bottom of every content detail page (coffee, bread, bean, newsletter)
 * — after the newsletter CTA, whose deliberate end-of-read placement stays
 * untouched. The section heading server-renders; the widget itself is
 * client-injected (and lazy), so no-JS readers and crawlers just see the
 * heading-free page they always did — comments are enhancement, not content.
 *
 * Hidden in print like the other interactive/navigation surfaces: a comment
 * box is dead weight on paper.
 */
export default function Comments() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || container.hasChildNodes()) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    for (const [key, value] of Object.entries(GISCUS_ATTRS)) {
      script.setAttribute(key, value);
    }
    container.appendChild(script);

    return () => {
      container.replaceChildren();
    };
  }, []);

  return (
    <section
      aria-label="Comments"
      className="print:hidden max-w-3xl mx-auto px-6 lg:px-8 py-16"
    >
      <h2 className="font-display text-3xl font-semibold tracking-tight text-espresso mb-2">
        Comments
      </h2>
      <p className="text-sm text-espresso/60 leading-relaxed mb-8">
        Baked it? Brewed it? Tell me how it went — comments are powered by
        GitHub Discussions.
      </p>
      <div ref={containerRef} />
    </section>
  );
}
