import Image from "next/image";
import Link from "next/link";
import type { LinkedPost } from "@/lib/content";

/**
 * An "In this issue" strip of cross-link cards for the newsletter page, listing
 * the coffee / bread / bean posts the letter's body links to. Server-renderable
 * (no client boundary). Gives a text-heavy issue a scannable summary of what it
 * covers, and is the forward complement of the "Featured in the newsletter"
 * block on recipe pages. Renders nothing when the issue links to no posts.
 */
export default function InThisIssue({ posts }: { posts: LinkedPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mb-12 rounded-2xl border border-blush/40 bg-cream-dark/50 p-6">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-espresso-muted mb-4">
        In this issue
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {posts.map((post) => (
          <Link
            key={post.url}
            href={post.url}
            className="group flex items-stretch gap-4 rounded-2xl border border-blush/50 bg-cream overflow-hidden transition-colors hover:border-terracotta/50"
          >
            <div className="relative w-20 shrink-0 overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                sizes="80px"
              />
            </div>
            <div className="min-w-0 flex-1 py-3 pr-4 space-y-1">
              <span className="block text-xs font-semibold uppercase tracking-widest text-espresso-muted">
                {post.kind}
              </span>
              <h3 className="font-display font-semibold text-espresso leading-snug text-balance group-hover:text-terracotta transition-colors">
                {post.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
