import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag, getRelatedTags } from "@/lib/content";
import { cn, formatDate } from "@/lib/utils";

interface PageProps {
  params: { tag: string };
}

const kindStyles = {
  Coffee: "bg-sand/60 text-espresso",
  Bread: "bg-blush/60 text-espresso",
  Beans: "bg-dune/40 text-terracotta",
} as const;

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map(({ slug }) => ({ tag: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await getPostsByTag(params.tag);
  if (!tag) return { title: "Tag not found" };
  return {
    title: `#${tag}`,
    description: `Every recipe, bean review, and note tagged “${tag}” on Crust & Bloom.`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag, entries } = await getPostsByTag(params.tag);
  if (!tag) notFound();

  const relatedTags = await getRelatedTags(params.tag);

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
      <div className="mb-10 animate-fade-in-up">
        <Link
          href="/tags"
          className="eyebrow mb-3 inline-block text-espresso-muted hover:text-terracotta transition-colors"
        >
          ← All tags
        </Link>
        <h1 className="font-display font-semibold text-5xl lg:text-6xl tracking-tight text-espresso leading-tight">
          #{tag}
          <span className="text-terracotta italic">.</span>
        </h1>
        <p className="mt-4 text-espresso/60">
          {entries.length} {entries.length === 1 ? "post" : "posts"} tagged with
          this.
        </p>
        <div className="mt-6 h-px w-24 bg-amber" />
      </div>

      <div className="grid gap-4" role="list">
        {entries.map((entry) => (
          <Link
            key={entry.url}
            href={entry.url}
            role="listitem"
            className="card-galatea block p-6 group"
          >
            <div className="flex items-center gap-3 mb-2">
              <span
                className={cn(
                  "inline-block text-[11px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full",
                  kindStyles[entry.kind]
                )}
              >
                {entry.kind}
              </span>
              <time
                dateTime={entry.date}
                className="text-xs text-espresso-muted"
              >
                {formatDate(entry.date)}
              </time>
            </div>
            <h2 className="font-display text-xl font-semibold tracking-tight text-espresso mb-1 group-hover:text-terracotta transition-colors duration-200">
              {entry.title}
            </h2>
            <p className="text-sm text-espresso/60 leading-relaxed">
              {entry.excerpt}
            </p>
          </Link>
        ))}
      </div>

      {relatedTags.length > 0 && (
        <div className="mt-14 pt-8 border-t border-blush/50">
          <h2 className="eyebrow text-espresso-muted mb-4">Related tags</h2>
          <div className="flex flex-wrap gap-2.5" role="list">
            {relatedTags.map((related) => (
              <Link
                key={related.slug}
                href={`/tags/${related.slug}`}
                role="listitem"
                className="inline-flex items-center gap-1.5 rounded-full border border-blush bg-cream px-3.5 py-1.5 text-sm text-espresso hover:border-terracotta hover:text-terracotta transition-colors"
              >
                #{related.tag}
                <span className="text-xs text-espresso-muted">
                  {related.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
