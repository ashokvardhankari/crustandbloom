import Image from "next/image";
import Link from "next/link";
import type { PostMeta, CoffeeFrontmatter } from "@/lib/types";
import { getCategoryLabel } from "@/lib/utils";

/**
 * The reverse of BeanLink: a compact list of coffee recipes brewed with this
 * bean, shown in the bean-review sidebar. Server-renderable (no client
 * boundary). Renders nothing when no recipe references the bean.
 */
export default function BrewedInLinks({
  recipes,
}: {
  recipes: PostMeta<CoffeeFrontmatter>[];
}) {
  if (recipes.length === 0) return null;

  return (
    <div className="pt-2">
      <span className="stat-label mb-2 block">
        Brewed in {recipes.length === 1 ? "this recipe" : "these recipes"}
      </span>
      <div className="space-y-2">
        {recipes.map(({ slug, frontmatter: f }) => (
          <Link
            key={slug}
            href={`/coffee/${slug}`}
            className="group flex items-stretch gap-4 rounded-2xl border border-blush/50 bg-cream-dark/60 overflow-hidden transition-colors hover:border-terracotta/50"
          >
            <div className="relative w-20 shrink-0 overflow-hidden">
              <Image
                src={f.coverImage}
                alt={f.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                sizes="80px"
              />
            </div>
            <div className="min-w-0 flex-1 py-3 pr-4 space-y-1">
              <span className="block text-xs font-semibold uppercase tracking-widest text-espresso-muted capitalize">
                {getCategoryLabel("coffee", f.category)}
              </span>
              <h3 className="font-display font-semibold text-espresso leading-snug text-balance group-hover:text-terracotta transition-colors">
                {f.title}
              </h3>
              <span className="block text-[11px] font-medium text-espresso-muted">
                {f.brewRatio}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
