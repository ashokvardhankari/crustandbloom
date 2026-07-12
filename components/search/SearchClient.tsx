"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SearchEntry {
  title: string;
  url: string;
  kind: "Coffee" | "Bread" | "Beans" | "Newsletter";
  tags: string[];
  excerpt: string;
  date: string;
}

const kindStyles: Record<SearchEntry["kind"], string> = {
  Coffee: "bg-sand/60 text-espresso",
  Bread: "bg-blush/60 text-espresso",
  Beans: "bg-dune/40 text-terracotta",
  Newsletter: "bg-mist/60 text-espresso",
};

function score(entry: SearchEntry, tokens: string[]): number {
  let total = 0;
  const title = entry.title.toLowerCase();
  const tags = entry.tags.join(" ").toLowerCase();
  const excerpt = entry.excerpt.toLowerCase();
  for (const token of tokens) {
    let hit = 0;
    if (title.includes(token)) hit += 3;
    if (tags.includes(token)) hit += 2;
    if (excerpt.includes(token)) hit += 1;
    if (hit === 0) return 0; // every token must match somewhere
    total += hit;
  }
  return total;
}

export default function SearchClient() {
  const [entries, setEntries] = useState<SearchEntry[] | null>(null);
  const [query, setQuery] = useState("");
  const [failed, setFailed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Seed from a shared/deep link (?q=…) before focusing so the caret lands
    // after any pre-filled text. Also powers the WebSite SearchAction target.
    const initial = new URLSearchParams(window.location.search).get("q") ?? "";
    if (initial) setQuery(initial);
    inputRef.current?.focus();
    fetch("/search-index.json")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(setEntries)
      .catch(() => setFailed(true));
  }, []);

  // Keep the URL's ?q= in sync with the query so results are shareable and the
  // back button restores prior searches. Uses replaceState to avoid a history
  // entry per keystroke.
  useEffect(() => {
    const url = new URL(window.location.href);
    const trimmed = query.trim();
    if (trimmed) url.searchParams.set("q", trimmed);
    else url.searchParams.delete("q");
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
        <p className="text-espresso/50 text-sm">
          Type to search every recipe, bean review, and newsletter issue.
        </p>
      )}

      <div className="grid gap-4" role="list">
        {results.map((r) => (
          <Link
            key={r.url}
            href={r.url}
            role="listitem"
            className="card-galatea block p-6 group"
          >
            <div className="flex items-center gap-3 mb-2">
              <span
                className={cn(
                  "inline-block text-[11px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full",
                  kindStyles[r.kind]
                )}
              >
                {r.kind}
              </span>
            </div>
            <h2 className="font-display text-xl font-semibold tracking-tight text-espresso mb-1 group-hover:text-terracotta transition-colors duration-200">
              {r.title}
            </h2>
            <p className="text-sm text-espresso/60 leading-relaxed">
              {r.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
