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
        {f.wouldRebuy && (
          <span className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-white/85 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold text-terracotta shadow-sm">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            Would rebuy
          </span>
        )}
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

        <div className="flex items-center justify-between gap-3">
          <p className="inline-flex items-center gap-1.5 text-xs font-medium text-espresso/70 min-w-0">
            <svg className="w-3.5 h-3.5 text-terracotta/70 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="sr-only">Origin: </span><span className="truncate">{f.origin}</span>
          </p>
          {f.price && (
            <span className="shrink-0 text-xs font-semibold text-terracotta tabular-nums">
              <span className="sr-only">Price: </span>{f.price}
            </span>
          )}
        </div>

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
