import type { Metadata } from "next";
import { getAllCoffeePostsMeta } from "@/lib/content";
import CoffeeFilterBar from "@/components/ui/CoffeeFilterBar";
import JsonLd from "@/components/seo/JsonLd";
import { collectionPageJsonLd, pageAlternates } from "@/lib/seo";

const PAGE_DESCRIPTION =
  "Espresso-based drinks: cappuccinos, lattes, and more. Each entry includes brew notes, ratios, and technique.";

export const metadata: Metadata = {
  title: "Coffee",
  alternates: pageAlternates("/coffee"),
  description: PAGE_DESCRIPTION,
};

const categoryLabels: {
  key: "espresso" | "cappuccino" | "latte" | "filter";
  singular: string;
  plural: string;
}[] = [
  { key: "espresso", singular: "espresso", plural: "espresso" },
  { key: "cappuccino", singular: "cappuccino", plural: "cappuccinos" },
  { key: "latte", singular: "latte", plural: "lattes" },
  { key: "filter", singular: "filter", plural: "filter" },
];

export default async function CoffeePage() {
  const posts = await getAllCoffeePostsMeta();

  // Cup summary: how many drinks, the typical espresso pull time across the
  // archive, and how they split by category. Only drinks with a parseable
  // extraction time feed the average, so the strip scales safely.
  const pullSeconds = posts
    .map((p) => parseInt(p.frontmatter.extractionTime, 10))
    .filter((n) => Number.isFinite(n) && n > 0);
  const avgPull =
    pullSeconds.length > 0
      ? Math.round(
          pullSeconds.reduce((sum, n) => sum + n, 0) / pullSeconds.length
        )
      : 0;
  const categoryCounts = categoryLabels
    .map(({ key, singular, plural }) => {
      const count = posts.filter((p) => p.frontmatter.category === key).length;
      return { label: count === 1 ? singular : plural, count };
    })
    .filter((c) => c.count > 0);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <JsonLd
        data={collectionPageJsonLd({
          name: "Coffee",
          description: PAGE_DESCRIPTION,
          path: "/coffee",
          items: posts.map((p) => ({
            title: p.frontmatter.title,
            path: `/coffee/${p.slug}`,
          })),
        })}
      />

      {/* Header */}
      <div className="mb-14 max-w-xl animate-fade-in-up">
        <p className="eyebrow mb-3">
          The cup
        </p>
        <h1 className="font-display font-semibold text-5xl lg:text-6xl tracking-tight text-espresso leading-tight">
          Coffee<span className="text-terracotta italic">.</span>
        </h1>
        <p className="mt-4 text-espresso/60 text-lg leading-relaxed">
          Espresso pulled at home. Mostly cappuccinos and lattes, each one with
          its own story, ratio, and notes from the session.
        </p>
        <div className="mt-6 h-px w-24 bg-amber" />
      </div>

      {/* Cup summary — a quick read on the archive before the grid */}
      {posts.length > 0 && (
        <div className="mb-16 flex flex-wrap items-center gap-x-10 gap-y-6 border-y border-blush/40 py-6">
          <div>
            <p className="font-display text-3xl font-semibold text-espresso tabular-nums leading-none">
              {posts.length}
            </p>
            <p className="mt-1.5 text-xs font-semibold uppercase tracking-widest text-espresso-muted">
              {posts.length === 1 ? "Drink pulled" : "Drinks pulled"}
            </p>
          </div>

          {avgPull > 0 && (
            <div>
              <p className="font-display text-3xl font-semibold text-espresso tabular-nums leading-none">
                {avgPull}
                <span className="text-espresso-muted">s</span>
              </p>
              <p className="mt-1.5 text-xs font-semibold uppercase tracking-widest text-espresso-muted">
                Average pull
              </p>
            </div>
          )}

          {categoryCounts.length > 0 && (
            <div>
              <p className="font-display text-3xl font-semibold text-espresso tabular-nums leading-none">
                {categoryCounts.map((c, i) => (
                  <span key={c.label}>
                    {c.count}
                    <span className="text-base font-medium text-espresso-muted capitalize">
                      {" "}
                      {c.label}
                    </span>
                    {i < categoryCounts.length - 1 && (
                      <span className="text-espresso-muted"> · </span>
                    )}
                  </span>
                ))}
              </p>
              <p className="mt-1.5 text-xs font-semibold uppercase tracking-widest text-espresso-muted">
                By category
              </p>
            </div>
          )}
        </div>
      )}

      {posts.length === 0 ? (
        <div className="py-20 text-center text-espresso-muted">
          <p className="text-lg">No posts yet. Check back soon.</p>
        </div>
      ) : (
        <CoffeeFilterBar posts={posts} />
      )}
    </div>
  );
}
