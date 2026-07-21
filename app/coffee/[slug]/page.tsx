import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllCoffeeSlugs,
  getAllCoffeePostsMeta,
  getCoffeePost,
  getAllBeanPostsMeta,
  adjacentPosts,
  getRelatedPosts,
  extractHeadings,
  tagSlug,
} from "@/lib/content";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import FullWidthGallery from "@/components/ui/FullWidthGallery";
import Hero from "@/components/ui/Hero";
import PostNav from "@/components/ui/PostNav";
import PrintButton from "@/components/ui/PrintButton";
import CookModeButton from "@/components/ui/CookModeButton";
import ShareButton from "@/components/ui/ShareButton";
import TableOfContents from "@/components/ui/TableOfContents";
import BrewCalculator from "@/components/ui/BrewCalculator";
import BrewRatioMeter, { brewRatioDescriptor } from "@/components/ui/BrewRatioMeter";
import BeanLink from "@/components/ui/BeanLink";
import RelatedPosts from "@/components/ui/RelatedPosts";
import JsonLd from "@/components/seo/JsonLd";
import { articleMetadata, coffeeRecipeJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllCoffeeSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { frontmatter } = await getCoffeePost(params.slug);
    return articleMetadata({
      title: frontmatter.title,
      description: frontmatter.excerpt,
      image: frontmatter.coverImage,
      publishedTime: frontmatter.date,
      canonical: `/coffee/${params.slug}`,
    });
  } catch {
    return { title: "Post not found" };
  }
}

export default async function CoffeePostPage({ params }: PageProps) {
  let frontmatter, content, raw;
  try {
    ({ frontmatter, content, raw } = await getCoffeePost(params.slug));
  } catch {
    notFound();
  }

  const { newer, older } = adjacentPosts(await getAllCoffeePostsMeta(), params.slug);
  const related = await getRelatedPosts(
    `/coffee/${params.slug}`,
    frontmatter.tags
  );
  const headings = extractHeadings(raw);

  // Cross-link to the bean review this drink is brewed with, if one is named
  // in frontmatter and the review actually exists on disk.
  const bean = frontmatter.beans
    ? (await getAllBeanPostsMeta()).find((b) => b.slug === frontmatter.beans) ?? null
    : null;

  return (
    <>
      <JsonLd data={coffeeRecipeJsonLd(params.slug, frontmatter, raw)} />

      {/* Hero — dropped from the printout in favour of a plain heading */}
      <div className="print:hidden">
        <Hero
          image={frontmatter.coverImage}
          imageAlt={frontmatter.title}
          title={frontmatter.title}
          size="medium"
          overlay="dark"
        />
      </div>

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Coffee", href: "/coffee" },
          { label: frontmatter.title },
        ]}
      />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="print-recipe-grid grid grid-cols-1 lg:grid-cols-3 gap-14">
          {/* Body */}
          <article className="lg:col-span-2">
            {/* Print-only masthead (the on-screen title lives in the hero) */}
            <div className="hidden print:block mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-espresso-muted">
                Crust &amp; Bloom
              </p>
              <h1 className="font-display text-3xl font-semibold text-espresso mt-1">
                {frontmatter.title}
              </h1>
            </div>

            <div className="flex justify-end items-center gap-3 mb-6">
              <ShareButton title={frontmatter.title} />
              <CookModeButton label="Keep screen on" />
              <PrintButton />
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-8 pb-8 border-b border-blush/40">
              <span className="category-pill-coffee">{frontmatter.category}</span>
              <time dateTime={frontmatter.date} className="text-sm text-espresso-muted">
                {formatDate(frontmatter.date)}
              </time>
              {frontmatter.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 ml-auto">
                  {frontmatter.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${tagSlug(tag)}`}
                      className="text-xs px-2 py-0.5 bg-blush/30 text-espresso-muted rounded-full hover:bg-blush/60 hover:text-espresso transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* On-page contents */}
            <TableOfContents headings={headings} />

            {/* Interactive brew calculator */}
            {frontmatter.dose && (
              <BrewCalculator brewRatio={frontmatter.brewRatio} dose={frontmatter.dose} />
            )}

            {/* MDX content */}
            <div className="prose-cb">{content}</div>

            {/* Photo gallery */}
            {frontmatter.images.length > 1 && (
              <div className="mt-14 print:hidden">
                <h2 className="text-xl font-semibold text-espresso mb-6">Photos</h2>
                <FullWidthGallery images={frontmatter.images} alt={frontmatter.title} />
              </div>
            )}
          </article>

          {/* Brew specs sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-espresso-muted mb-6">
                Brew Details
              </h2>

              <div className="stat-card flex-col items-stretch gap-2">
                <div className="flex items-baseline justify-between">
                  <span className="stat-label">Brew Ratio</span>
                  <span className="stat-value">{frontmatter.brewRatio}</span>
                </div>
                <BrewRatioMeter ratio={frontmatter.brewRatio} />
                {brewRatioDescriptor(frontmatter.brewRatio) && (
                  <span className="text-xs text-espresso-muted leading-snug">
                    {brewRatioDescriptor(frontmatter.brewRatio)}
                  </span>
                )}
              </div>

              <div className="stat-card">
                <span className="stat-label">Extraction Time</span>
                <span className="stat-value">{frontmatter.extractionTime}</span>
              </div>

              {frontmatter.milkTemp && (
                <div className="stat-card">
                  <span className="stat-label">Milk Temperature</span>
                  <span className="stat-value">{frontmatter.milkTemp}</span>
                </div>
              )}

              <div className="stat-card">
                <span className="stat-label">Category</span>
                <span className="stat-value capitalize">{frontmatter.category}</span>
              </div>

              {/* Beans used — cross-link to the bag's review */}
              {bean && (
                <div className="pt-2">
                  <span className="stat-label mb-2 block">Brewed with</span>
                  <BeanLink bean={bean} />
                </div>
              )}

              {/* Divider */}
              <div className="pt-4 border-t border-blush/30">
                <p className="text-xs text-espresso-muted leading-relaxed">
                  All brew notes reflect what worked on this particular session. Adjust to your
                  equipment, beans, and palate.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <RelatedPosts entries={related} />

      <PostNav
        label="brew"
        newer={newer ? { href: `/coffee/${newer.slug}`, title: newer.title } : null}
        older={older ? { href: `/coffee/${older.slug}`, title: older.title } : null}
      />
    </>
  );
}
