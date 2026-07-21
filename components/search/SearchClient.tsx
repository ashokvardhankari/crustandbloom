"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SearchEntry {
  title: string;
  url: string;
  kind: "Coffee" | "Bread" | "Beans" | "Newsletter";
  /** Cover thumbnail; absent for posts without a cover photo. */
  image?: string;
  tags: string[];
  /** Hidden searchable text (categories, inclusion ingredients, tasting notes). */
  keywords: string[];
  excerpt: string;
  date: string;
}

const kindStyles: Record<SearchEntry["kind"], string> = {
  Coffee: "bg-sand/60 text-espresso",
  Bread: "bg-blush/60 text-espresso",
  Beans: "bg-dune/40 text-terracotta",
  Newsletter: "bg-mist/60 text-espresso",
};

// Stable display order for the result type filter.
const KIND_ORDER: SearchEntry["kind"][] = [
  "Coffee",
  "Bread",
  "Beans",
  "Newsletter",
];

function score(entry: SearchEntry, tokens: string[]): number {
  let total = 0;
  const title = entry.title.toLowerCase();
  const tags = entry.tags.join(" ").toLowerCase();
  const excerpt = entry.excerpt.toLowerCase();
  const keywords = (entry.keywords ?? []).join(" ").toLowerCase();
  for (const token of tokens) {
    let hit = 0;
    if (title.includes(token)) hit += 3;
    if (tags.includes(token)) hit += 2;
    if (excerpt.includes(token)) hit += 1;
    if (keywords.includes(token)) hit += 1;
    if (hit === 0) return 0; // every token must match somewhere
    total += hit;
  }
  return total;
}

export default function SearchClient() {
  const [entries, setEntries] = useState<SearchEntry[] | null>(null);
  const [query, setQuery] = useState("");
  const [failed, setFailed] = useState(false);
  const [activeKind, setActiveKind] = useState<SearchEntry["kind"] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Seed the query from the URL (?q=…) so a search is shareable and
    // survives a refresh; otherwise focus the empty input to start typing.
    // This also powers the WebSite SearchAction deep-link target.
    const initial = new URLSearchParams(window.location.search).get("q") ?? "";
    if (initial) setQuery(initial);
    else inputRef.current?.focus();

    fetch("/search-index.json")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(setEntries)
      .catch(() => setFailed(true));
  }, []);

  // Keep the URL's ?q= in sync with the live query so the current search can
  // be copied, bookmarked, or reached via the browser's back button. Uses
  // replaceState to avoid a history entry per keystroke.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const trimmed = query.trim();
    if (trimmed) params.set("q", trimmed);
    else params.delete("q");
    const search = params.toString();
    const url = `${window.location.pathname}${search ? `?${search}` : ""}`;
    window.history.replaceState(null, "", url);
  }, [query]);

  const results = useMemo(() => {
    if (!entries) return [];
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return [];
    return entries
      .map((entry) => ({ entry, points: score(entry, tokens) }))
      .filter((r) => r.points > 0)
      .sort((a, b) => b.points - a.points)
      .map((r) => r.entry);
  }, [entries, query]);

  // Per-type result counts, used to build a filter that only offers content
  // types actually present in the current results (no dead filters).
  const kindCounts = useMemo(() => {
    const counts = new Map<SearchEntry["kind"], number>();
    for (const r of results) counts.set(r.kind, (counts.get(r.kind) ?? 0) + 1);
    return counts;
  }, [results]);

  // Fall back to "All" whenever the active type isn't present in the current
  // results (e.g. after editing the query), so the visible set is never empty
  // while results exist.
  const effectiveKind =
    activeKind && kindCounts.has(activeKind) ? activeKind : null;

  const visibleResults = useMemo(
    () =>
      effectiveKind ? results.filter((r) => r.kind === effectiveKind) : results,
    [results, effectiveKind]
  );

  // The most common tags across all content, surfaced as one-tap searches so
  // the empty state is a browse hub rather than a blank prompt. Frequency-first
  // ordering naturally floats tags that match more than one post to the top.
  const suggestedTags = useMemo(() => {
    if (!entries) return [];
    const counts = new Map<string, number>();
    for (const entry of entries) {
      for (const tag of entry.tags) {
        const label = tag.trim();
        if (!label || label.length > 24) continue;
        counts.set(label, (counts.get(label) ?? 0) + 1);
      }
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 10)
      .map(([tag]) => tag);
  }, [entries]);

  const searching = query.trim().length > 0;

  return (
    <div>
      <div className="relative mb-10">
        <svg
          className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-espresso-muted pointer-events-none"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
          />
        </svg>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes, beans, letters…"
          aria-label="Search the site"
          className="w-full pl-14 pr-5 py-4 rounded-full border border-blush bg-white text-espresso text-base focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent placeholder:text-espresso-muted/60"
        />
      </div>

      {failed && (
        <p className="text-espresso/60">
          The search index couldn&apos;t load. Try refreshing the page.
        </p>
      )}

      {!failed && searching && entries === null && (
        <p className="text-espresso/50 text-sm">Loading the index…</p>
      )}

      {!failed && searching && entries !== null && results.length === 0 && (
        <p className="text-espresso/60">
          Nothing found for &ldquo;{query.trim()}&rdquo;. Try a different word,
          like an ingredient or a bean name.
        </p>
      )}

      {!searching && (
        <div>
          <p className="text-espresso/50 text-sm">
            Type to search every recipe, bean review, and newsletter issue.
          </p>
          {suggestedTags.length > 0 && (
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-espresso-muted mb-3">
                Popular searches
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestedTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setQuery(tag)}
                    className="inline-block px-3.5 py-1.5 rounded-full border border-blush bg-white text-sm font-medium text-espresso/80 hover:border-terracotta hover:text-terracotta transition-colors duration-200"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!failed && searching && results.length > 0 && kindCounts.size > 1 && (
        <div
          className="flex flex-wrap gap-2 mb-6"
          role="group"
          aria-label="Filter results by type"
        >
          <button
            type="button"
            onClick={() => setActiveKind(null)}
            aria-pressed={effectiveKind === null}
            className={cn(
              "inline-block px-3.5 py-1.5 rounded-full border text-sm font-medium transition-colors duration-200",
              effectiveKind === null
                ? "border-terracotta bg-terracotta text-white"
                : "border-blush bg-white text-espresso/80 hover:border-terracotta hover:text-terracotta"
            )}
          >
            All {results.length}
          </button>
          {KIND_ORDER.filter((kind) => kindCounts.has(kind)).map((kind) => (
            <button
              key={kind}
              type="button"
              onClick={() => setActiveKind(kind)}
              aria-pressed={effectiveKind === kind}
              className={cn(
                "inline-block px-3.5 py-1.5 rounded-full border text-sm font-medium transition-colors duration-200",
                effectiveKind === kind
                  ? "border-terracotta bg-terracotta text-white"
                  : "border-blush bg-white text-espresso/80 hover:border-terracotta hover:text-terracotta"
              )}
            >
              {kind} {kindCounts.get(kind)}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-4" role="list">
        {visibleResults.map((r) => (
          <Link
            key={r.url}
            href={r.url}
            role="listitem"
            className="card-galatea flex items-center gap-4 p-4 sm:p-5 group"
          >
            {r.image && (
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden bg-cream-dark">
                <Image
                  src={r.image}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-3 mb-1.5">
                <span
                  className={cn(
                    "inline-block text-[11px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full",
                    kindStyles[r.kind]
                  )}
                >
                  {r.kind}
                </span>
              </div>
              <h2 className="font-display text-lg sm:text-xl font-semibold tracking-tight text-espresso mb-1 group-hover:text-terracotta transition-colors duration-200">
                {r.title}
              </h2>
              <p className="text-sm text-espresso/60 leading-relaxed line-clamp-2">
                {r.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
