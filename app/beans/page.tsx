import type { Metadata } from "next";
import { getAllBeanPostsMeta } from "@/lib/content";
import BeanFilterBar from "@/components/ui/BeanFilterBar";
import Rating from "@/components/ui/Rating";
import JsonLd from "@/components/seo/JsonLd";
import { collectionPageJsonLd, pageAlternates } from "@/lib/seo";

const PAGE_DESCRIPTION =
  "Honest reviews of the coffee beans I actually brew: roaster, origin, what the bag claims, and what I really taste.";

export const metadata: Metadata = {
  title: "Beans",
  alternates: pageAlternates("/beans"),
  description: PAGE_DESCRIPTION,
};

export default async function BeansPage() {
  const beans = await getAllBeanPostsMeta();

  // Shelf summary: how many bags, how they score on average, and how often I'd
  // buy again. Only beans that actually carry a rating count toward the average.
  const rated = beans.filter((b) => (b.frontmatter.rating ?? 0) > 0);
  const avgRating =
    rated.length > 0
      ? rated.reduce((sum, b) => sum + b.frontmatter.rating, 0) / rated.length
      : 0;
  const rebuyVotes = beans.filter(
    (b) => b.frontmatter.wouldRebuy !== undefined
  );
  const rebuyYes = rebuyVotes.filter((b) => b.frontmatter.wouldRebuy).length;

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <JsonLd
        data={collectionPageJsonLd({
          name: "Beans",
          description: PAGE_DESCRIPTION,
          path: "/beans",
          items: beans.map((b) => ({
            title: `${b.frontmatter.title} from ${b.frontmatter.roaster}`,
            path: `/beans/${b.slug}`,
          })),
        })}
      />

      <div className="mb-14 max-w-xl animate-fade-in-up">
        <p className="eyebrow mb-3">The shelf</p>
        <h1 className="font-display font-semibold text-5xl lg:text-6xl tracking-tight text-espresso leading-tight">
          Beans<span className="text-terracotta italic">.</span>
        </h1>
        <p className="mt-4 text-espresso/60 text-lg leading-relaxed">
          Honest notes on the beans I actually brew. Where they&apos;re from, what the
          bag claims, and what I really taste in the cup.
        </p>
        <div className="mt-6 h-px w-24 bg-amber" />
      </div>

      {beans.length === 0 ? (
        <div className="py-20 text-center text-espresso-muted">
          <p className="text-lg">No bean reviews yet. First bag is grinding.</p>
        </div>
      ) : (
        <>
          {/* Shelf summary — a quick read on the archive before the grid */}
          <div className="mb-12 flex flex-wrap items-center gap-x-10 gap-y-6 border-y border-blush/40 py-6">
            <div>
              <p className="font-display text-3xl font-semibold text-espresso tabular-nums leading-none">
                {beans.length}
              </p>
              <p className="mt-1.5 text-xs font-semibold uppercase tracking-widest text-espresso-muted">
                {beans.length === 1 ? "Bag reviewed" : "Bags reviewed"}
              </p>
            </div>

            {rated.length > 0 && (
              <div>
                <Rating value={Math.round(avgRating * 10) / 10} />
                <p className="mt-1.5 text-xs font-semibold uppercase tracking-widest text-espresso-muted">
                  Average rating
                </p>
              </div>
            )}

            {rebuyVotes.length > 0 && (
              <div>
                <p className="font-display text-3xl font-semibold text-espresso tabular-nums leading-none">
                  {rebuyYes}
                  <span className="text-espresso-muted">/{rebuyVotes.length}</span>
                </p>
                <p className="mt-1.5 text-xs font-semibold uppercase tracking-widest text-espresso-muted">
                  Would rebuy
                </p>
              </div>
            )}
          </div>

          <BeanFilterBar posts={beans} />
        </>
      )}
    </div>
  );
}
