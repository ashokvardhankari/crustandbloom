import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPostsMeta } from "@/lib/content";
import PostCard from "@/components/ui/PostCard";
import FeaturedSpotlight from "@/components/ui/FeaturedSpotlight";
import NewsletterSignup from "@/components/ui/NewsletterSignup";
import Hero from "@/components/ui/Hero";

export const metadata: Metadata = {
  title: "Crust & Bloom — Coffee & Sourdough",
  description:
    "A personal site about specialty coffee and artisan sourdough bread — brewed, baked, and photographed by hand.",
};

export default async function HomePage() {
  const allPosts = await getAllPostsMeta();
  const latestPosts = allPosts.slice(0, 6);
  const featuredPost = allPosts[0];

  return (
    <>
      {/* Hero */}
      <Hero
        image="/images/site/hero.jpg"
        imageAlt="A warm, golden cappuccino beside a slice of sourdough"
        title="Coffee. Bread. Craft."
        subtitle="A personal journal of specialty coffee and artisan sourdough — brewed, baked, and photographed by hand."
        ctaLabel="Start exploring"
        ctaHref="/coffee"
        size="full"
        overlay="dark"
      />

      {/* Latest posts */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-terracotta mb-1">
              Fresh from the kitchen
            </p>
            <h2 className="text-3xl font-bold text-espresso">Latest Posts</h2>
          </div>
          <Link
            href="/gallery"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-terracotta hover:text-terracotta-dark transition-colors"
          >
            View all
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {latestPosts.map((post) => (
            <PostCard
              key={post.slug}
              post={post}
            />
          ))}
        </div>
      </section>

      {/* Explore by category */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        <div className="flex items-center gap-4 mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-espresso-muted">
            Explore by category
          </span>
          <div className="flex-1 h-px bg-blush/50" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Coffee */}
          <Link href="/coffee" className="group relative aspect-[4/3] rounded-2xl overflow-hidden block">
            <Image
              src="/images/site/category-coffee.jpg"
              alt="Espresso drinks"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber mb-1">Coffee</p>
              <h3 className="text-2xl font-bold text-cream">Espresso Drinks</h3>
              <p className="text-sm text-cream/70 mt-1">Lattes, cappuccinos & more</p>
            </div>
          </Link>

          {/* Classic Sourdough */}
          <Link href="/bread" className="group relative aspect-[4/3] rounded-2xl overflow-hidden block">
            <Image
              src="/images/site/category-classic.jpg"
              alt="Classic sourdough"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber mb-1">Bread</p>
              <h3 className="text-2xl font-bold text-cream">Classic Sourdough</h3>
              <p className="text-sm text-cream/70 mt-1">Traditional open-crumb loaves</p>
            </div>
          </Link>

          {/* Inclusion Loaves */}
          <Link href="/bread#inclusions" className="group relative aspect-[4/3] rounded-2xl overflow-hidden block">
            <Image
              src="/images/site/category-inclusions.jpg"
              alt="Inclusion loaves"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber mb-1">Bread</p>
              <h3 className="text-2xl font-bold text-cream">Inclusion Loaves</h3>
              <p className="text-sm text-cream/70 mt-1">Savory, sweet &amp; spicy</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured spotlight */}
      {featuredPost && (
        <FeaturedSpotlight
          post={featuredPost}
        />
      )}

      {/* Newsletter */}
      <NewsletterSignup />
    </>
  );
}
