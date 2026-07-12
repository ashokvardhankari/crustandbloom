import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllNewsletterSlugs, getNewsletterPost } from "@/lib/content";
import NewsletterSignup from "@/components/ui/NewsletterSignup";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { newsletterArticleJsonLd } from "@/lib/seo";
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
    return {
      title: frontmatter.title,
      description: frontmatter.excerpt,
      openGraph: {
        title: frontmatter.title,
        description: frontmatter.excerpt,
        ...(frontmatter.coverImage && {
          images: [{ url: frontmatter.coverImage }],
        }),
      },
    };
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

  return (
    <>
      <JsonLd data={newsletterArticleJsonLd(params.slug, frontmatter)} />

      <Breadcrumbs
        containerClassName="max-w-3xl mx-auto px-6 lg:px-8 pt-10"
        items={[
          { label: "Home", href: "/" },
          { label: "Newsletter", href: "/newsletter" },
          { label: frontmatter.title, href: `/newsletter/${params.slug}` },
        ]}
      />

      <div className="max-w-3xl mx-auto px-6 lg:px-8 pt-8 pb-16">
        <div className="mb-12">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="inline-block eyebrow bg-blush/40 px-3 py-1 rounded-full">
              Issue #{frontmatter.issue}
            </span>
            <time
              dateTime={frontmatter.date}
              className="text-xs text-espresso-muted"
            >
              {formatDate(frontmatter.date)}
            </time>
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

      <NewsletterSignup />
    </>
  );
}
