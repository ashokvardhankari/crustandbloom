import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllBreadSlugs, getBreadPost } from "@/lib/content";
import FullWidthGallery from "@/components/ui/FullWidthGallery";
import Hero from "@/components/ui/Hero";
import { formatDate, getCategoryLabel } from "@/lib/utils";

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
    return {
      title: frontmatter.title,
      description: frontmatter.excerpt,
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

const flavorColors: Record<string, string> = {
  savory: "bg-sage text-espresso-light",       // sage green — herby, earthy
  sweet:  "bg-lemon text-espresso-light",      // lemon yellow — bright, sweet
  spicy:  "bg-rose text-terracotta",           // rose/red — warm, fiery
};

export default async function BreadPostPage({ params }: PageProps) {
  let frontmatter, content;
  try {
    ({ frontmatter, content } = await getBreadPost(params.slug));
  } catch {
    notFound();
  }

  const categoryLabel = getCategoryLabel("bread", frontmatter.category);

  return (
    <>
      {/* Hero */}
      <Hero
        image={frontmatter.coverImage}
        imageAlt={frontmatter.title}
        title={frontmatter.title}
        size="medium"
        overlay="dark"
      />

      {/* Bake stats bar */}
      <div className="bg-cream-dark border-b border-blush/30">
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

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
          {/* Body */}
          <article className="lg:col-span-2">
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
            </div>

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
              <div className="mt-14">
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

              <div className="stat-card">
                <span className="stat-label">Hydration</span>
                <span className="stat-value">{frontmatter.hydration}%</span>
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

              {frontmatter.flavorProfile && (
                <div className="stat-card">
                  <span className="stat-label">Flavor Profile</span>
                  <span className="stat-value capitalize">{frontmatter.flavorProfile}</span>
                </div>
              )}

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
    </>
  );
}
