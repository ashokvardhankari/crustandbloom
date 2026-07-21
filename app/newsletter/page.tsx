import type { Metadata } from "next";
import Link from "next/link";
import { getAllNewslettersMeta } from "@/lib/content";
import NewsletterSignup from "@/components/ui/NewsletterSignup";
import ScrollReveal from "@/components/ui/ScrollReveal";
import JsonLd from "@/components/seo/JsonLd";
import { collectionPageJsonLd, listingMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

const PAGE_DESCRIPTION =
  "The Crust & Bloom newsletter archive. Every letter from the kitchen: new bakes, coffee pairings, and what's working on the counter.";

export const metadata: Metadata = listingMetadata({
  title: "Newsletter",
  description: PAGE_DESCRIPTION,
  canonical: "/newsletter",
});

export default async function NewsletterArchivePage() {
  const issues = await getAllNewslettersMeta();

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: "Newsletter",
          description: PAGE_DESCRIPTION,
          path: "/newsletter",
          items: issues.map((issue) => ({
            title: issue.frontmatter.title,
            path: `/newsletter/${issue.slug}`,
          })),
        })}
      />

      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
        <div className="mb-14 animate-fade-in-up">
          <p className="eyebrow mb-3">From the kitchen</p>
          <h1 className="font-display font-semibold text-5xl lg:text-6xl tracking-tight text-espresso leading-tight">
            Newsletter<span className="text-terracotta italic">.</span>
          </h1>
          <p className="mt-4 text-espresso/60 text-lg leading-relaxed max-w-xl">
            Every letter I&apos;ve sent, kept here for the record. New bakes,
            coffee pairings, and what&apos;s working on the counter.
          </p>
          <div className="mt-6 h-px w-24 bg-amber" />
        </div>

        {issues.length === 0 ? (
          <p className="text-espresso/60">
            No letters yet. Subscribe below to get the first one.
          </p>
        ) : (
          <div className="grid gap-6">
            {issues.map((issue, i) => (
              <ScrollReveal key={issue.slug} delay={i * 100}>
                <Link
                  href={`/newsletter/${issue.slug}`}
                  className="card-galatea block p-8 group"
                >
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="inline-block eyebrow bg-blush/40 px-3 py-1 rounded-full">
                      Issue #{issue.frontmatter.issue}
                    </span>
                    <time
                      dateTime={issue.frontmatter.date}
                      className="text-xs text-espresso-muted"
                    >
                      {formatDate(issue.frontmatter.date)}
                    </time>
                  </div>
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-espresso mb-2 group-hover:text-terracotta transition-colors duration-200">
                    {issue.frontmatter.title}
                  </h2>
                  <p className="text-sm text-espresso/60 leading-relaxed">
                    {issue.frontmatter.excerpt}
                  </p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>

      <NewsletterSignup />
    </>
  );
}
