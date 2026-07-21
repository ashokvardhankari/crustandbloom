import type { Metadata } from "next";
import SearchClient from "@/components/search/SearchClient";
import { pageAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Search",
  alternates: pageAlternates("/search"),
  description:
    "Search every Crust & Bloom recipe, bean review, and newsletter issue.",
};

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
    </div>
  );
}
