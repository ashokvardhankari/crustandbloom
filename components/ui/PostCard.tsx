import Image from "next/image";
import Link from "next/link";
import type { PostMeta, PostFrontmatter } from "@/lib/types";
import { formatDate, getCategoryLabel } from "@/lib/utils";
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
