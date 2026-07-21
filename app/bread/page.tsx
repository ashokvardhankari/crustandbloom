import type { Metadata } from "next";
import { getAllClassicBreadMeta, getInclusionLoaves } from "@/lib/content";
import PostCard from "@/components/ui/PostCard";
import FilterBar from "@/components/ui/FilterBar";
import JsonLd from "@/components/seo/JsonLd";
import { collectionPageJsonLd } from "@/lib/seo";

const PAGE_DESCRIPTION =
  "Classic sourdough and inclusion loaves, with full bake notes, hydration percentages, and photo galleries.";

export const metadata: Metadata = {
  title: "Bread",
  alternates: { canonical: "/bread" },
  description: PAGE_DESCRIPTION,
};

const flavorLabels: { key: "savory" | "sweet" | "spicy"; label: string }[] = [
  { key: "savory", label: "savory" },
  { key: "sweet", label: "sweet" },
  { key: "spicy", label: "spicy" },
];

export default async function BreadPage() {
  const [classicPosts, inclusionPosts] = await Promise.all([
    getAllClassicBreadMeta(),
    getInclusionLoaves(),
  ]);

  // Bake summary: how many loaves, the typical hydration across the whole
  // archive, and how the inclusion loaves split by flavor profile. Only loaves
  // carrying a hydration value feed the average, so the strip scales safely.
  const allLoaves = [...classicPosts, ...inclusionPosts];
  const hydrated = allLoaves.filter((p) => (p.frontmatter.hydration ?? 0) > 0);
  const avgHydration =
    hydrated.length > 0
      ? Math.round(
          hydrated.reduce((sum, p) => sum + p.frontmatter.hydration, 0) /
            hydrated.length
        )
      : 0;
  const flavorCounts = flavorLabels
    .map(({ key, label }) => ({
      label,
      count: inclusionPosts.filter((p) => p.frontmatter.flavorProfile === key)
        .length,
    }))
    .filter((f) => f.count > 0);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      {/* Loaves listed classic-first, then inclusions — mirrors the on-page order */}
      <JsonLd
        data={collectionPageJsonLd({
          name: "Bread",
          description: PAGE_DESCRIPTION,
          path: "/bread",
          items: allLoaves.map((p) => ({
            title: p.frontmatter.title,
            path: `/bread/${p.slug}`,
          })),
        })}
      />

      {/* Header */}
      <div className="mb-14 max-w-xl animate-fade-in-up">
        <p className="eyebrow mb-3">
          The loaf
        </p>
        <h1 className="font-display font-semibold text-5xl lg:text-6xl tracking-tight text-espresso leading-tight">
          Bread<span className="text-terracotta italic">.</span>
        </h1>
        <p className="mt-4 text-espresso/60 text-lg leading-relaxed">
          Sourdough baked at home, from the classic country loaf to inclusions
          that push into new territory. Every loaf documented with full process
          notes and photos.
        </p>
        <div className="mt-6 h-px w-24 bg-amber" />
      </div>

      {/* Bake summary — a quick read on the archive before the grids */}
      {allLoaves.length > 0 && (
        <div className="mb-16 flex flex-wrap items-center gap-x-10 gap-y-6 border-y border-blush/40 py-6">
          <div>
            <p className="font-display text-3xl font-semibold text-espresso tabular-nums leading-none">
              {allLoaves.length}
            </p>
            <p className="mt-1.5 text-xs font-semibold uppercase tracking-widest text-espresso-muted">
              {allLoaves.length === 1 ? "Loaf baked" : "Loaves baked"}
            </p>
          </div>

          {avgHydration > 0 && (
            <div>
              <p className="font-display text-3xl font-semibold text-espresso tabular-nums leading-none">
                {avgHydration}
                <span className="text-espresso-muted">%</span>
              </p>
              <p className="mt-1.5 text-xs font-semibold uppercase tracking-widest text-espresso-muted">
                Average hydration
              </p>
            </div>
          )}

          {flavorCounts.length > 0 && (
            <div>
              <p className="font-display text-3xl font-semibold text-espresso tabular-nums leading-none">
                {flavorCounts.map((f, i) => (
                  <span key={f.label}>
                    {f.count}
                    <span className="text-base font-medium text-espresso-muted capitalize">
                      {" "}
                      {f.label}
                    </span>
                    {i < flavorCounts.length - 1 && (
                      <span className="text-espresso-muted"> · </span>
                    )}
                  </span>
                ))}
              </p>
              <p className="mt-1.5 text-xs font-semibold uppercase tracking-widest text-espresso-muted">
                Inclusion flavors
              </p>
            </div>
          )}
        </div>
      )}

      {/* Classic Sourdough */}
      <section className="mb-20">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-espresso">Classic sourdough</h2>
          <div className="flex-1 h-px bg-blush/40" />
        </div>

        {classicPosts.length === 0 ? (
          <p className="text-espresso-muted">No classic loaves yet. More coming soon.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {classicPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* Inclusion Loaves */}
      <section id="inclusions">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-espresso">Inclusion loaves</h2>
          <div className="flex-1 h-px bg-blush/40" />
        </div>
        <p className="text-espresso/60 mb-8 max-w-lg">
          Sourdough with something extra: cheese, chocolate, chili, and more.
          Filter by flavor profile to find your next bake.
        </p>

        <FilterBar posts={inclusionPosts} />
      </section>
    </div>
  );
}
