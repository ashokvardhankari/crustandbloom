import type { Metadata } from "next";
import Link from "next/link";
import SearchClient from "@/components/search/SearchClient";
import { listingMetadata } from "@/lib/seo";

// Browsable archives offered to visitors without JavaScript, since the search
// UI (a client-side fetch + filter of /search-index.json) can't run for them.
const BROWSE_LINKS = [
  { href: "/coffee", label: "Coffee" },
  { href: "/bread", label: "Bread" },
  { href: "/beans", label: "Beans" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/tags", label: "Tags" },
] as const;

export const metadata: Metadata = listingMetadata({
  title: "Search",
  description:
    "Search every Crust & Bloom recipe, bean review, and newsletter issue.",
  canonical: "/search",
});

export default function SearchPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
      <div className="mb-10 animate-fade-in-up">
        <p className="eyebrow mb-3">Find anything</p>
        <h1 className="font-display font-semibold text-5xl lg:text-6xl tracking-tight text-espresso leading-tight">
          Search<span className="text-terracotta italic">.</span>
        </h1>
        <div className="mt-6 h-px w-24 bg-amber" />
      </div>

      <SearchClient />

      {/* No-JS fallback: the search UI is a client-side fetch+filter of the
          static index, so it can't run without JavaScript — and the 404 page's
          plain GET form routes here, so a no-JS visitor would otherwise hit a
          dead end. Offer the browsable archives instead. */}
      <noscript>
        <p className="text-espresso/70 leading-relaxed">
          Search needs JavaScript to run. You can still browse everything by
          section:
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {BROWSE_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-block px-3.5 py-1.5 rounded-full border border-blush bg-white text-sm font-medium text-espresso/80 hover:border-terracotta hover:text-terracotta transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </noscript>
    </div>
  );
}
