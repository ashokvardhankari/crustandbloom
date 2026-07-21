import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllBeanSlugs,
  getAllBeanPostsMeta,
  getAllCoffeePostsMeta,
  getBeanPost,
  adjacentPosts,
  getRelatedPosts,
  tagSlug,
} from "@/lib/content";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import BrewedInLinks from "@/components/ui/BrewedInLinks";
import CostPerCup from "@/components/ui/CostPerCup";
import MoreFromRoaster from "@/components/ui/MoreFromRoaster";
import MoreFromOrigin from "@/components/ui/MoreFromOrigin";
import FullWidthGallery from "@/components/ui/FullWidthGallery";
import Hero from "@/components/ui/Hero";
import PostNav from "@/components/ui/PostNav";
import RelatedPosts from "@/components/ui/RelatedPosts";
import Rating from "@/components/ui/Rating";
import RoastMeter from "@/components/ui/RoastMeter";
import ShareButton from "@/components/ui/ShareButton";
import JsonLd from "@/components/seo/JsonLd";
import { articleMetadata, beanReviewJsonLd } from "@/lib/seo";
import { formatDate, roastLabel, beanCover } from "@/lib/utils";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllBeanSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { frontmatter } = await getBeanPost(params.slug);
    return articleMetadata({
      title: `${frontmatter.title} from ${frontmatter.roaster}`,
      description: frontmatter.excerpt,
      image: beanCover(frontmatter.coverImage),
      publishedTime: frontmatter.date,
      canonical: `/beans/${params.slug}`,
    });
  } catch {
    return { title: "Review not found" };
  }
}

export default async function BeanReviewPage({ params }: PageProps) {
  let frontmatter, content;
  try {
    ({ frontmatter, content } = await getBeanPost(params.slug));
  } catch {
    notFound();
  }

  const f = frontmatter;
  const specs: { label: string; value: string }[] = [
    { label: "Roaster", value: f.roaster },
    { label: "Origin", value: f.origin },
    ...(f.region ? [{ label: "Region", value: f.region }] : []),
    ...(f.process ? [{ label: "Process", value: f.process }] : []),
    ...(f.varietal ? [{ label: "Varietal", value: f.varietal }] : []),
    ...(f.altitude ? [{ label: "Altitude", value: f.altitude }] : []),
    ...(f.price ? [{ label: "Price", value: f.price }] : []),
    ...(f.brewMethod ? [{ label: "Brewed as", value: f.brewMethod }] : []),
  ];

  const allBeans = await getAllBeanPostsMeta();
  const { newer, older } = adjacentPosts(allBeans, params.slug);
  const related = await getRelatedPosts(`/beans/${params.slug}`, f.tags);
  const brewedIn = (await getAllCoffeePostsMeta()).filter(
    (c) => c.frontmatter.beans === params.slug
  );
  // Other bags reviewed from the same roaster, newest-first (allBeans arrives
  // in that order), excluding the one being viewed.
  const moreFromRoaster = allBeans.filter(
    (b) => b.slug !== params.slug && b.frontmatter.roaster === f.roaster
  );
  // Other bags from the same origin — crosses roaster lines, so two Ethiopian
  // bags from different roasters connect here. Exclude the current bean and any
  // already shown in the roaster block above so nothing lists twice.
  const roasterSlugs = new Set(moreFromRoaster.map((b) => b.slug));
  const moreFromOrigin = allBeans.filter(
    (b) =>
      b.slug !== params.slug &&
      b.frontmatter.origin === f.origin &&
      !roasterSlugs.has(b.slug)
  );

  return (
    <>
      <JsonLd data={beanReviewJsonLd(params.slug, f)} />

      <Hero
        image={beanCover(f.coverImage)}
        imageAlt={f.title}
        title={f.title}
        size="medium"
        overlay="dark"
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Beans", href: "/beans" },
          { label: f.title },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
          {/* Body */}
          <article className="lg:col-span-2">
            <div className="flex justify-end items-center gap-3 mb-6">
              <ShareButton title={f.title} tooltip="Share this review" />
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-8 pb-8 border-b border-blush/40">
              <span className="category-pill-bean">{roastLabel(f.roastLevel)} roast</span>
              <Rating value={f.rating} />
              <time dateTime={f.date} className="text-sm text-espresso-muted ml-auto">
                {formatDate(f.date)}
              </time>
            </div>

            {/* Notes comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {f.officialNotes && f.officialNotes.length > 0 && (
                <div className="p-6 bg-cream-dark rounded-2xl">
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-espresso-muted mb-4">
                    On the bag
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {f.officialNotes.map((note) => (
                      <span
                        key={note}
                        className="inline-block px-3 py-1 bg-dune/30 text-terracotta text-sm font-medium rounded-full"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="p-6 bg-cream-dark rounded-2xl">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-espresso-muted mb-4">
                  In my cup
                </h2>
                <p className="text-espresso/80 leading-relaxed">{f.tastingNotes}</p>
              </div>
            </div>

            {/* MDX content */}
            <div className="prose-cb">{content}</div>

            {/* Photo gallery */}
            {f.images && f.images.length > 1 && (
              <div className="mt-14">
                <h2 className="text-xl font-semibold text-espresso mb-6">Photos</h2>
                <FullWidthGallery images={f.images} alt={f.title} />
              </div>
            )}
          </article>

          {/* Spec sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {f.buyUrl && (
                <div className="space-y-2 mb-6">
                  <a
                    href={f.buyUrl}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="btn-primary w-full justify-center"
                  >
                    Buy this bag
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  <p className="text-[11px] text-espresso-muted leading-relaxed">
                    Affiliate link. If you buy through it, I may earn a small commission at
                    no extra cost to you.
                  </p>
                </div>
              )}

              <h2 className="text-xs font-semibold uppercase tracking-widest text-espresso-muted mb-6">
                The bean
              </h2>

              <div className="stat-card">
                <span className="stat-label">Rating</span>
                <span className="stat-value">
                  <Rating value={f.rating} />
                </span>
              </div>

              <div className="stat-card">
                <span className="stat-label">Roast</span>
                <span className="stat-value flex flex-col gap-1.5">
                  <span className="text-base">{roastLabel(f.roastLevel)}</span>
                  <RoastMeter level={f.roastLevel} />
                </span>
              </div>

              {specs.map((s) => (
                <div key={s.label} className="stat-card">
                  <span className="stat-label">{s.label}</span>
                  <span className="stat-value text-base">{s.value}</span>
                </div>
              ))}

              <CostPerCup price={f.price} />

              {f.wouldRebuy !== undefined && (
                <div className="stat-card">
                  <span className="stat-label">Would rebuy</span>
                  <span className="stat-value">{f.wouldRebuy ? "Yes" : "No"}</span>
                </div>
              )}

              <BrewedInLinks recipes={brewedIn} />

              <MoreFromRoaster roaster={f.roaster} beans={moreFromRoaster} />

              <MoreFromOrigin origin={f.origin} beans={moreFromOrigin} />

              {f.tags.length > 0 && (
                <div className="pt-4 border-t border-blush/30 flex flex-wrap gap-2">
                  {f.tags.map((tag) => (
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
          </aside>
        </div>
      </div>

      <RelatedPosts entries={related} />

      <PostNav
        label="review"
        newer={newer ? { href: `/beans/${newer.slug}`, title: newer.title } : null}
        older={older ? { href: `/beans/${older.slug}`, title: older.title } : null}
      />
    </>
  );
}
