import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllCoffeeSlugs,
  getAllCoffeePostsMeta,
  getAllBreadPostsMeta,
  getCoffeePost,
  getAllBeanPostsMeta,
  getNewslettersFeaturing,
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
import IngredientList from "@/components/ui/IngredientList";
import BrewRatioMeter, { brewRatioDescriptor } from "@/components/ui/BrewRatioMeter";
import ShotYield from "@/components/ui/ShotYield";
import BeanLink from "@/components/ui/BeanLink";
import PairsWith from "@/components/ui/PairsWith";
import FeaturedInNewsletter from "@/components/ui/FeaturedInNewsletter";
import RelatedPosts from "@/components/ui/RelatedPosts";
import JsonLd from "@/components/seo/JsonLd";
import { articleMetadata, coffeeRecipeJsonLd } from "@/lib/seo";
import { formatDate, getCategoryLabel, slugify, withTempConversion } from "@/lib/utils";

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

  // Every drink's body leads with a narrative intro (and often a bean/comparison
  // aside) before the actual brewing steps begin. Link straight to the first
  // instructional heading — pulling the shot, or the syrup you make first — so
  // readers can skip to the method, matching the bread pages' "Jump to Recipe".
  const recipeHeading = raw.match(
    /^#{2,3}\s+(.*\b(?:shot|espresso|syrup|steam(?:ing)?|pull(?:ing)?|brew(?:ing)?|pour|assembly|method)\b.*)$/im
  );
  const recipeAnchor = recipeHeading ? slugify(recipeHeading[1].trim()) : null;

  // Cross-link to the bean review this drink is brewed with, if one is named
  // in frontmatter and the review actually exists on disk.
  const bean = frontmatter.beans
    ? (await getAllBeanPostsMeta()).find((b) => b.slug === frontmatter.beans) ?? null
    : null;

  // Newsletter issues that link to this recipe, for a reverse cross-link.
  const featuredIn = await getNewslettersFeaturing(`/coffee/${params.slug}`);

  // Reverse of the loaf's `pairsWith`: bread loaves meant to be eaten alongside
  // this drink. The pointer lives on the bread post, so this drives the pairing
  // from the coffee side without a second frontmatter field.
  const pairedBreads = (await getAllBreadPostsMeta()).filter(
    (b) => b.frontmatter.pairsWith === params.slug
  );
  const pairings = pairedBreads.map((b) => ({
    href: `/bread/${b.slug}`,
    coverImage: b.frontmatter.coverImage,
    title: b.frontmatter.title,
    kindLabel: getCategoryLabel("bread", b.frontmatter.category),
    meta: `${b.frontmatter.hydration}% hydration`,
  }));

  // At-a-glance brew specs shown in a stats bar under the hero, mirroring the
  // bread page's bake-stats bar so a drink's key numbers are visible without
  // scrolling to the sidebar. Milk temp only applies to milk drinks, so it's
  // included only when present (an espresso/filter recipe omits the cell).
  const glanceStats: { label: string; value: string; wide?: boolean }[] = [
    { label: "Brew Ratio", value: frontmatter.brewRatio },
    { label: "Extraction Time", value: frontmatter.extractionTime },
    ...(frontmatter.milkTemp
      ? [
          {
            label: "Milk Temp",
            value: withTempConversion(frontmatter.milkTemp) ?? frontmatter.milkTemp,
            wide: true,
          },
        ]
      : []),
    {
      label: "Category",
      value: getCategoryLabel("coffee", frontmatter.category),
      wide: true,
    },
  ];

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

      {/* Brew stats bar */}
      <div className="bg-cream-dark border-b border-blush/30 print:hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-4 lg:gap-0 lg:divide-x lg:divide-blush/30">
            {glanceStats.map((stat) => (
              <div
                key={stat.label}
                className="stat-card flex-1 min-w-[120px] bg-transparent px-0 lg:px-8"
              >
                <span className="stat-label">{stat.label}</span>
                <span className={`stat-value${stat.wide ? " text-base" : ""}`}>
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
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

            <div className="flex items-center justify-between gap-3 mb-6">
              {recipeAnchor ? (
                <a
                  href={`#${recipeAnchor}`}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cream bg-terracotta rounded-full px-4 py-2 transition-colors hover:bg-terracotta-dark print:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                    aria-hidden="true"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                  </svg>
                  Jump to Recipe
                </a>
              ) : (
                <span />
              )}
              <div className="flex items-center gap-3">
                <ShareButton title={frontmatter.title} />
                <CookModeButton label="Keep screen on" />
                <PrintButton />
              </div>
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

            {/* Scannable ingredient list — coffee recipes have no formula table */}
            <IngredientList items={frontmatter.ingredients} />

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

              {/* Derived grams-in → grams-out from dose × brew ratio */}
              <ShotYield dose={frontmatter.dose} brewRatio={frontmatter.brewRatio} />

              {frontmatter.milkTemp && (
                <div className="stat-card">
                  <span className="stat-label">Milk Temperature</span>
                  <span className="stat-value text-base">
                    {withTempConversion(frontmatter.milkTemp) ?? frontmatter.milkTemp}
                  </span>
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

              {/* Bread loaves this drink pairs with */}
              <PairsWith pairings={pairings} />

              {/* Newsletter issues that featured this drink */}
              <FeaturedInNewsletter issues={featuredIn} />

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
        newer={newer ? { href: `/coffee/${newer.slug}`, title: newer.title, date: newer.date } : null}
        older={older ? { href: `/coffee/${older.slug}`, title: older.title, date: older.date } : null}
      />
    </>
  );
}
