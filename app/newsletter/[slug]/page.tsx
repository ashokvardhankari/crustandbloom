import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllNewsletterSlugs,
  getAllNewslettersMeta,
  getNewsletterPost,
  adjacentPosts,
} from "@/lib/content";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import NewsletterSignup from "@/components/ui/NewsletterSignup";
import PostNav from "@/components/ui/PostNav";
import ShareButton from "@/components/ui/ShareButton";
import JsonLd from "@/components/seo/JsonLd";
import { articleMetadata, newsletterArticleJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllNewsletterSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { frontmatter } = await getNewsletterPost(params.slug);
    return articleMetadata({
      title: frontmatter.title,
      description: frontmatter.excerpt,
      image: frontmatter.coverImage,
      publishedTime: frontmatter.date,
      canonical: `/newsletter/${params.slug}`,
    });
  } catch {
    return { title: "Issue not found" };
  }
}

export default async function NewsletterIssuePage({ params }: PageProps) {
  let frontmatter, content;
  try {
    ({ frontmatter, content } = await getNewsletterPost(params.slug));
  } catch {
    notFound();
  }

  const { newer, older } = adjacentPosts(await getAllNewslettersMeta(), params.slug);

  return (
    <>
      <JsonLd data={newsletterArticleJsonLd(params.slug, frontmatter)} />

      <Breadcrumbs
        maxWidth="max-w-3xl"
        items={[
          { label: "Home", href: "/" },
          { label: "Newsletter", href: "/newsletter" },
          { label: `Issue #${frontmatter.issue}` },
        ]}
      />

      <div className="max-w-3xl mx-auto px-6 lg:px-8 pt-8 pb-16">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block eyebrow bg-blush/40 px-3 py-1 rounded-full">
              Issue #{frontmatter.issue}
            </span>
            <time
              dateTime={frontmatter.date}
              className="text-xs text-espresso-muted"
            >
              {formatDate(frontmatter.date)}
            </time>
            <div className="ml-auto">
              <ShareButton title={frontmatter.title} label="Share" tooltip="Share this issue" />
            </div>
          </div>
          <h1 className="font-display font-semibold text-4xl lg:text-5xl tracking-tight text-espresso leading-tight">
            {frontmatter.title}
          </h1>
          <div className="mt-6 h-px w-24 bg-amber" />
        </div>

        <div className="prose-cb">{content}</div>

        <div className="mt-14 pt-8 border-t border-blush/40">
          <Link
            href="/newsletter"
            className="text-sm font-semibold text-terracotta hover:text-terracotta-dark transition-colors duration-200"
          >
            ← All letters
          </Link>
        </div>
      </div>

      <PostNav
        label="letter"
        maxWidth="max-w-3xl"
        newer={newer ? { href: `/newsletter/${newer.slug}`, title: newer.title } : null}
        older={older ? { href: `/newsletter/${older.slug}`, title: older.title } : null}
      />

      <NewsletterSignup />
    </>
  );
}
