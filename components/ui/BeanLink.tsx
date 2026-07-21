import Image from "next/image";
import Link from "next/link";
import type { PostMeta, BeanFrontmatter } from "@/lib/types";
import { roastLabel, beanCover } from "@/lib/utils";
import Rating from "./Rating";

/**
 * Compact sidebar card that links a coffee recipe to the bean review it was
 * brewed with. Server-renderable (no client boundary) so it drops straight into
 * the coffee detail sidebar. Renders nothing when there's no matching bean.
 */
export default function BeanLink({ bean }: { bean: PostMeta<BeanFrontmatter> | null }) {
  if (!bean) return null;
  const { slug, frontmatter: f } = bean;

  return (
    <Link
      href={`/beans/${slug}`}
      className="group block rounded-2xl border border-blush/50 bg-cream-dark/60 overflow-hidden transition-colors hover:border-terracotta/50"
    >
      <div className="flex items-stretch gap-4">
        <div className="relative w-20 shrink-0 overflow-hidden">
          <Image
            src={beanCover(f.coverImage)}
            alt={f.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            sizes="80px"
          />
        </div>
        <div className="min-w-0 flex-1 py-3 pr-4 space-y-1">
          <span className="block text-xs font-semibold uppercase tracking-widest text-espresso-muted truncate">
            {f.roaster}
          </span>
          <h3 className="font-display font-semibold text-espresso leading-snug text-balance group-hover:text-terracotta transition-colors">
            {f.title}
          </h3>
          <div className="flex items-center gap-2">
            <Rating value={f.rating} />
            <span className="text-[11px] font-medium text-espresso-muted">
              {roastLabel(f.roastLevel)} roast
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
