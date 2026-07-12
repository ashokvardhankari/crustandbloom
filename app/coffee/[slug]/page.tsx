import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCoffeeSlugs, getCoffeePost, getCoffeeAdjacent } from "@/lib/content";
import FullWidthGallery from "@/components/ui/FullWidthGallery";
import Hero from "@/components/ui/Hero";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PostNav from "@/components/ui/PostNav";
import PrintButton from "@/components/ui/PrintButton";
import TagList from "@/components/ui/TagList";
import BrewScaler from "@/components/tools/BrewScaler";
import JsonLd from "@/components/seo/JsonLd";
import { coffeeRecipeJsonLd } from "@/lib/seo";
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
    return {
      title: frontmatter.title,
      description: frontmatter.excerpt,
      alternates: { canonical: `/coffee/${params.slug}` },
      openGraph: {
        title: frontmatter.title,
        description: frontmatter.excerpt,
        images: [{ url: frontmatter.coverImage }],
      },
    };
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

  const adjacent = await getCoffeeAdjacent(params.slug);

  return (
    <>
      <JsonLd data={coffeeRecipeJsonLd(params.slug, frontmatter, raw)} />

      {/* Hero */}
      <Hero
        image={frontmatter.coverImage}
        imageAlt={frontmatter.title}
        title={frontmatter.title}
        size="medium"
        overlay="dark"
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Coffee", href: "/coffee" },
          { label: frontmatter.title, href: `/coffee/${params.slug}` },
        ]}
      />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
          {/* Body */}
          <article className="lg:col-span-2">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-8 pb-8 border-b border-blush/40">
              <span className="category-pill-coffee">{frontmatter.category}</span>
              <time dateTime={frontmatter.date} className="text-sm text-espresso-muted">
                {formatDate(frontmatter.date)}
              </time>
              {frontmatter.tags.length > 0 && (
                <TagList tags={frontmatter.tags} className="ml-auto" />
              )}
              <div
                className={frontmatter.tags.length > 0 ? "w-full sm:w-auto" : "ml-auto"}
              >
                <PrintButton label="Print brew guide" />
              </div>
            </div>

            {/* MDX content */}
            <div className="prose-cb">{content}</div>

            {/* Photo gallery */}
            {frontmatter.images.length > 1 && (
              <div className="mt-14 no-print">
                <h2 className="text-xl font-semibold text-espresso mb-6">Photos</h2>
                <FullWidthGallery images={frontmatter.images} alt={frontmatter.title} />
              </div>
            )}

            <PostNav
              backHref="/coffee"
              backLabel="All coffee"
              basePath="/coffee"
              adjacent={adjacent}
            />
          </article>

          {/* Brew specs sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-espresso-muted mb-6">
                Brew Details
              </h2>

              <div className="stat-card">
                <span className="stat-label">Brew Ratio</span>
                <span className="stat-value">{frontmatter.brewRatio}</span>
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

              <BrewScaler brewRatio={frontmatter.brewRatio} />

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
    </>
  );
}
