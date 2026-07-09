import Image from "next/image";
import Link from "next/link";
import type { PostMeta, BeanFrontmatter } from "@/lib/types";
import { roastLabel, beanCover } from "@/lib/utils";
import Rating from "./Rating";

export default function BeanCard({ post }: { post: PostMeta<BeanFrontmatter> }) {
  const { slug, frontmatter: f } = post;
  return (
    <Link href={`/beans/${slug}`} className="card-galatea group block h-full">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={beanCover(f.coverImage)}
          alt={f.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span className="absolute top-4 left-4 category-pill-bean">{roastLabel(f.roastLevel)} roast</span>
      </div>

      <div className="p-6 space-y-2.5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-espresso-muted truncate">
            {f.roaster}
          </span>
          <Rating value={f.rating} />
        </div>

        <h3 className="font-display font-semibold text-espresso group-hover:text-terracotta transition-colors duration-200 text-xl leading-snug text-balance">
          {f.title}
        </h3>

        <p className="text-sm text-espresso/55 leading-relaxed line-clamp-2">{f.excerpt}</p>

        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-terracotta group-hover:gap-2.5 transition-all duration-200">
          Read review
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
