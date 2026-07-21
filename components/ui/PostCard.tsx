import Image from "next/image";
import Link from "next/link";
import type { PostMeta, PostFrontmatter } from "@/lib/types";
import { formatDate, formatDuration, getCategoryLabel } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: PostMeta<PostFrontmatter>;
  size?: "default" | "large" | "compact";
}

export default function PostCard({ post, size = "default" }: PostCardProps) {
  const { slug, frontmatter } = post;
  const type = frontmatter.type;
  const href = `/${type}/${slug}`;
  const categoryLabel = getCategoryLabel(type, frontmatter.category);

  const pillClass =
    type === "coffee"
      ? "category-pill-coffee"
      : frontmatter.category === "classic"
      ? "category-pill-classic"
      : "category-pill-inclusion";

  // At-a-glance signature spec surfaced from the detail page onto the card:
  // bread bakes span same-day (8 hr) to overnight (20+ hr), so show total time;
  // coffee's defining number is its brew ratio (strength), so show that.
  const totalTime =
    frontmatter.type === "bread" ? formatDuration(frontmatter.totalTime) : null;
  const brewRatio =
    frontmatter.type === "coffee" ? frontmatter.brewRatio?.trim() || null : null;

  const timeMeta = totalTime ? (
    <span className="inline-flex items-center gap-1 text-xs text-espresso-muted">
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{totalTime} total</span>
    </span>
  ) : brewRatio ? (
    <span className="inline-flex items-center gap-1 text-xs text-espresso-muted">
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 3h6m-5 0v5.586a1 1 0 01-.293.707l-4.414 4.414A2 2 0 006.707 17H17.293a2 2 0 001.414-3.293l-4.414-4.414A1 1 0 0114 8.586V3"
        />
      </svg>
      <span>{brewRatio} ratio</span>
    </span>
  ) : null;

  if (size === "compact") {
    return (
      <Link href={href} className="card-galatea group flex h-full">
        <div className="relative w-36 sm:w-44 flex-shrink-0 overflow-hidden">
          <Image
            src={frontmatter.coverImage}
            alt={frontmatter.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            sizes="176px"
          />
        </div>
        <div className="p-5 flex flex-col justify-center gap-2 min-w-0">
          <div className="flex items-center gap-3">
            <span className={pillClass}>{categoryLabel}</span>
            {timeMeta}
          </div>
          <h3 className="font-display font-semibold text-espresso group-hover:text-terracotta transition-colors duration-200 text-lg leading-snug text-balance">
            {frontmatter.title}
          </h3>
          <p className="text-sm text-espresso/55 leading-relaxed line-clamp-2">
            {frontmatter.excerpt}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={href} className="card-galatea group block h-full">
      {/* Image */}
      <div
        className={cn(
          "relative overflow-hidden",
          size === "large" ? "aspect-[3/2]" : "aspect-[4/3]"
        )}
      >
        <Image
          src={frontmatter.coverImage}
          alt={frontmatter.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Text content */}
      <div className={cn("space-y-3", size === "large" ? "p-7" : "p-6")}>
        <div className="flex items-center gap-3">
          <span className={pillClass}>{categoryLabel}</span>
          <time
            dateTime={frontmatter.date}
            className="text-xs text-espresso-muted"
          >
            {formatDate(frontmatter.date)}
          </time>
          {timeMeta && <span className="text-espresso-muted/40">·</span>}
          {timeMeta}
        </div>

        <h3
          className={cn(
            "font-display font-semibold text-espresso group-hover:text-terracotta transition-colors duration-200 text-balance leading-snug",
            size === "large" ? "text-3xl" : "text-xl"
          )}
        >
          {frontmatter.title}
        </h3>

        <p className="text-sm text-espresso/55 leading-relaxed line-clamp-2">
          {frontmatter.excerpt}
        </p>

        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-terracotta group-hover:gap-2.5 transition-all duration-200">
          Read more
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
