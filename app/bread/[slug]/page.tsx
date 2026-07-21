import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllBreadSlugs,
  getAllBreadPostsMeta,
  getBreadPost,
  getNewslettersFeaturing,
  adjacentPosts,
  getRelatedPosts,
  extractHeadings,
  extractFormula,
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
import RecipeScaler from "@/components/ui/RecipeScaler";
import RelatedPosts from "@/components/ui/RelatedPosts";
import HydrationMeter, { hydrationDescriptor } from "@/components/ui/HydrationMeter";
import DoughYield from "@/components/ui/DoughYield";
import FeaturedInNewsletter from "@/components/ui/FeaturedInNewsletter";
import JsonLd from "@/components/seo/JsonLd";
import { articleMetadata, breadRecipeJsonLd } from "@/lib/seo";
import { formatDate, formatDuration, getCategoryLabel, slugify } from "@/lib/utils";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllBreadSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { frontmatter } = await getBreadPost(params.slug);
    return articleMetadata({
      title: frontmatter.title,
      description: frontmatter.excerpt,
      image: frontmatter.coverImage,
      publishedTime: frontmatter.date,
      canonical: `/bread/${params.slug}`,
    });
  } catch {
    return { title: "Post not found" };
  }
}

const flavorColors: Record<string, string> = {
  savory: "bg-sage text-espresso-light",       // sage green — herby, earthy
  sweet:  "bg-lemon text-espresso-light",      // lemon yellow — bright, sweet
  spicy:  "bg-rose text-terracotta",           // rose/red — warm, fiery
};

export default async function BreadPostPage({ params }: PageProps) {
  let frontmatter, content, raw;
  try {
    ({ frontmatter, content, raw } = await getBreadPost(params.slug));
  } catch {
    notFound();
  }

  const categoryLabel = getCategoryLabel("bread", frontmatter.category);
  const prepTime = formatDuration(frontmatter.prepTime);
  const cookTime = formatDuration(frontmatter.cookTime);
  const totalTime = formatDuration(frontmatter.totalTime);
  const { newer, older } = adjacentPosts(await getAllBreadPostsMeta(), params.slug);
  const related = await getRelatedPosts(`/bread/${params.slug}`, frontmatter.tags);

  // Newsletter issues that link to this recipe, for a reverse cross-link.
  const featuredIn = await getNewslettersFeaturing(`/bread/${params.slug}`);

  // Every loaf's body leads with a narrative intro before its "Formula" table.
  // Link straight to that heading (matching the anchor id the MDX renderer emits)
  // so readers can skip to the recipe, the way every recipe site lets them.
  const recipeHeading = raw.match(/^#{2,3}\s+(.*\bformula\b.*)$/im);
  const recipeAnchor = recipeHeading ? slugify(recipeHeading[1]) : null;
  const headings = extractHeadings(raw);
  const formula = extractFormula(raw);

  return (
    <>
      <JsonLd data={breadRecipeJsonLd(params.slug, frontmatter, raw)} />

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

      {/* Bake stats bar */}
      <div className="bg-cream-dark border-b border-blush/30 print:hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-4 lg:gap-0 lg:divide-x lg:divide-blush/30">
            <div className="stat-card flex-1 min-w-[120px] bg-transparent px-0 lg:px-8">
              <span className="stat-label">Hydration</span>
              <span className="stat-value">{frontmatter.hydration}%</span>
            </div>
            <div className="stat-card flex-1 min-w-[120px] bg-transparent px-0 lg:px-8">
              <span className="stat-label">Starter</span>
              <span className="stat-value">{frontmatter.starterPercentage}%</span>
            </div>
            <div className="stat-card flex-1 min-w-[160px] bg-transparent px-0 lg:px-8">
              <span className="stat-label">Bulk Fermentation</span>
              <span className="stat-value text-base">{frontmatter.bulkFermentation}</span>
            </div>
            <div className="stat-card flex-1 min-w-[120px] bg-transparent px-0 lg:px-8">
              <span className="stat-label">Bake Temp</span>
              <span className="stat-value">{frontmatter.bakeTemp}</span>
            </div>
          </div>
        </div>
      </div>

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Bread", href: "/bread" },
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

            <div className="flex items-center justify-between gap-3 mb-6 print:hidden">
              {recipeAnchor ? (
                <a
                  href={`#${recipeAnchor}`}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cream bg-terracotta rounded-full px-4 py-2 transition-colors hover:bg-terracotta-dark"
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
                <CookModeButton />
                <PrintButton />
              </div>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-8 pb-8 border-b border-blush/40">
              <span
                className={
                  frontmatter.category === "classic"
                    ? "category-pill-classic"
                    : "category-pill-inclusion"
                }
              >
                {categoryLabel}
              </span>

              {frontmatter.flavorProfile && (
                <span
                  className={`category-pill ${flavorColors[frontmatter.flavorProfile] ?? ""}`}
                >
                  {frontmatter.flavorProfile}
                </span>
              )}

              <time dateTime={frontmatter.date} className="text-sm text-espresso-muted ml-auto">
                {formatDate(frontmatter.date)}
              </time>

              {frontmatter.tags.length > 0 && (
                <div className="basis-full flex flex-wrap gap-2">
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

            {/* Interactive batch scaler (static table still renders in the body below) */}
            {formula && <RecipeScaler rows={formula} />}

            {/* MDX content */}
            <div className="prose-cb">{content}</div>

            {/* Inclusions */}
            {frontmatter.inclusions && frontmatter.inclusions.length > 0 && (
              <div className="mt-12 p-8 bg-cream-dark rounded-2xl">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-espresso-muted mb-4">
                  What&apos;s inside
                </h2>
                <div className="flex flex-wrap gap-2">
                  {frontmatter.inclusions.map((item) => (
                    <span
                      key={item}
                      className="inline-block px-4 py-1.5 bg-dune/30 text-terracotta text-sm font-medium rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Photo gallery */}
            {frontmatter.images.length > 1 && (
              <div className="mt-14 print:hidden">
                <h2 className="text-xl font-semibold text-espresso mb-6">Photos</h2>
                <FullWidthGallery images={frontmatter.images} alt={frontmatter.title} />
              </div>
            )}

            {/* Tasting notes */}
            <div className="mt-14 p-8 bg-blush/20 rounded-2xl border-l-4 border-amber">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-espresso-muted mb-3">
                Tasting Notes
              </h2>
              <p className="text-espresso/80 text-base leading-relaxed italic">
                {frontmatter.tastingNotes}
              </p>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-espresso-muted mb-6">
                Bake Details
              </h2>

              <div className="stat-card flex-col items-stretch gap-2">
                <div className="flex items-baseline justify-between">
                  <span className="stat-label">Hydration</span>
                  <span className="stat-value">{frontmatter.hydration}%</span>
                </div>
                <HydrationMeter hydration={frontmatter.hydration} />
                <span className="text-xs text-espresso-muted leading-snug">
                  {hydrationDescriptor(frontmatter.hydration)}
                </span>
              </div>

              <div className="stat-card">
                <span className="stat-label">Starter %</span>
                <span className="stat-value">{frontmatter.starterPercentage}%</span>
              </div>

              <div className="stat-card">
                <span className="stat-label">Bulk Fermentation</span>
                <span className="stat-value text-base">{frontmatter.bulkFermentation}</span>
              </div>

              <div className="stat-card">
                <span className="stat-label">Bake Temperature</span>
                <span className="stat-value">{frontmatter.bakeTemp}</span>
              </div>

              {/* Total dough weight + loaf estimate, derived from the formula */}
              <DoughYield rows={formula} />

              {prepTime && (
                <div className="stat-card">
                  <span className="stat-label">Active Prep</span>
                  <span className="stat-value">{prepTime}</span>
                </div>
              )}

              {cookTime && (
                <div className="stat-card">
                  <span className="stat-label">Bake Time</span>
                  <span className="stat-value">{cookTime}</span>
                </div>
              )}

              {totalTime && (
                <div className="stat-card">
                  <span className="stat-label">Total Time</span>
                  <span className="stat-value">{totalTime}</span>
                </div>
              )}

              {frontmatter.flavorProfile && (
                <div className="stat-card">
                  <span className="stat-label">Flavor Profile</span>
                  <span className="stat-value capitalize">{frontmatter.flavorProfile}</span>
                </div>
              )}

              {/* Newsletter issues that featured this loaf */}
              <FeaturedInNewsletter issues={featuredIn} />

              <div className="pt-4 border-t border-blush/30">
                <p className="text-xs text-espresso-muted leading-relaxed">
                  Timing and hydration are guidelines. Your environment, flour, and starter will
                  require adjustment.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <RelatedPosts entries={related} />

      <PostNav
        label="loaf"
        newer={newer ? { href: `/bread/${newer.slug}`, title: newer.title } : null}
        older={older ? { href: `/bread/${older.slug}`, title: older.title } : null}
      />
    </>
  );
}
