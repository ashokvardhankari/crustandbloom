import Image from "next/image";
import Link from "next/link";
import type { PostMeta, PostFrontmatter } from "@/lib/types";
import { formatDate, getCategoryLabel } from "@/lib/utils";

interface FeaturedSpotlightProps {
  post: PostMeta<PostFrontmatter>;
  label?: string;
}

export default function FeaturedSpotlight({
  post,
  label = "Featured this week",
}: FeaturedSpotlightProps) {
  const { slug, frontmatter } = post;
  const type = frontmatter.type;
  const href = `/${type}/${slug}`;
  const categoryLabel = getCategoryLabel(type, frontmatter.category);

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
      <div className="flex items-center gap-4 mb-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
          {label}
        </span>
        <div className="flex-1 h-px bg-blush/50" />
      </div>

      <Link href={href} className="group block">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-3xl overflow-hidden bg-cream-dark">
          {/* Image — 60% on desktop */}
          <div className="lg:col-span-3 relative aspect-[4/3] lg:aspect-auto lg:min-h-[480px]">
            <Image
              src={frontmatter.coverImage}
              alt={frontmatter.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          {/* Text — 40% on desktop */}
          <div className="lg:col-span-2 flex flex-col justify-center p-10 lg:p-14">
            <div className="flex items-center gap-3 mb-4">
              <span
                className={
                  type === "coffee"
                    ? "category-pill-coffee"
                    : frontmatter.category === "classic"
                    ? "category-pill-classic"
                    : "category-pill-inclusion"
                }
              >
                {categoryLabel}
              </span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-espresso leading-tight text-balance group-hover:text-terracotta transition-colors duration-300">
              {frontmatter.title}
            </h2>

            <p className="mt-4 text-espresso/60 text-base leading-relaxed line-clamp-3">
              {frontmatter.excerpt}
            </p>

            <div className="mt-6 flex items-center justify-between">
              <time dateTime={frontmatter.date} className="text-xs text-espresso-muted">
                {formatDate(frontmatter.date)}
              </time>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-terracotta group-hover:gap-3 transition-all duration-200">
                Read the full story
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
