import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPostsMeta } from "@/lib/content";
import PostCard from "@/components/ui/PostCard";
import NewsletterSignup from "@/components/ui/NewsletterSignup";
import FAQAccordion from "@/components/ui/FAQAccordion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import JsonLd from "@/components/seo/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import type { FAQItem } from "@/components/ui/FAQAccordion";

export const metadata: Metadata = {
  title: "Crust & Bloom: Coffee and Sourdough",
  description:
    "A personal site about specialty coffee and artisan sourdough bread, brewed, baked, and photographed by hand.",
};

const faqs: FAQItem[] = [
  {
    question: "What coffee beans do you use?",
    answer:
      "I rotate through single-origin beans from a few trusted roasters depending on the season. Right now I'm working with a washed Ethiopian for espresso. It has that classic jasmine and stone fruit character that pulls beautifully.",
  },
  {
    question: "What hydration are your sourdoughs?",
    answer:
      "Classic country sourdough runs at 78%. Inclusion loaves vary. Cheese loaves tend to go a bit lower (72%) since fat in the inclusions affects gluten development. Each post documents the exact percentage.",
  },
  {
    question: "How do you store sourdough bread?",
    answer:
      "Cut-side down on a wooden board for the first day. After that, a beeswax wrap or a linen bread bag. Never a plastic bag. It softens the crust completely. Most loaves keep well for 4-5 days.",
  },
  {
    question: "What's the difference between classic and inclusion loaves?",
    answer:
      "Classic loaves are pure sourdough: flour, water, salt, and starter. Inclusion loaves have added ingredients folded in during lamination, like cheese, herbs, fruit, or nuts.",
  },
  {
    question: "Do you share your starter?",
    answer:
      "I've shared dried starter with a handful of people who've reached out. If you're interested, subscribe to the newsletter. When I have a fresh batch ready to dry and mail, subscribers hear first.",
  },
];

const categories = [
  {
    href: "/coffee",
    image: "/images/coffee/cappuccino-closeup-rosette.jpg",
    badge: "Coffee",
    heading: "Espresso Drinks",
    description: "Cappuccinos, lattes, and every milk-based espresso drink worth dialling in.",
    meta: "Brew notes · Ratios · Technique",
  },
  {
    href: "/bread",
    image: "/images/site/category-classic.jpg",
    badge: "Classic",
    heading: "Classic Sourdough",
    description: "Open-crumb country loaves at high hydration. The foundation of everything.",
    meta: "Hydration · Ferment times · Crumb shots",
  },
  {
    href: "/bread#inclusions",
    image: "/images/site/category-inclusions.jpg",
    badge: "Inclusions",
    heading: "Inclusion Loaves",
    description: "Savoury, sweet, and spicy variations. The most experimental part of the bake.",
    meta: "Savory · Sweet · Spicy",
  },
];


export default async function HomePage() {
  const allPosts = await getAllPostsMeta();
  const latestPosts = allPosts.slice(0, 3);

  return (
    <>
      <JsonLd data={faqPageJsonLd(faqs)} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-cream overflow-hidden">
        {/* Ambient background wash */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-32 -right-24 w-[520px] h-[520px] bg-blush/40 rounded-full blur-3xl animate-drift" />
          <div className="absolute -bottom-40 -left-32 w-[460px] h-[460px] bg-sand/50 rounded-full blur-3xl animate-drift" style={{ animationDelay: "-7s" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* Left — staggered fade-in on page load */}
            <div>
              {/* Badge */}
              <div className="animate-fade-in-up" style={{ animationDelay: "0ms" }}>
                <span className="inline-block eyebrow bg-blush/40 px-4 py-1.5 rounded-full mb-6">
                  Coffee &amp; Artisan Bread
                </span>
              </div>

              {/* Headline */}
              <div className="animate-fade-in-up" style={{ animationDelay: "120ms" }}>
                <h1 className="font-display font-semibold text-6xl sm:text-7xl lg:text-[84px] text-espresso leading-[1.02] tracking-tight text-balance">
                  Small batches,<br />
                  <span className="text-terracotta italic">real coffee,</span><br />
                  better bread.
                </h1>
              </div>

              {/* Subtitle */}
              <div className="animate-fade-in-up" style={{ animationDelay: "240ms" }}>
                <p className="mt-6 text-lg text-espresso/60 leading-relaxed max-w-md">
                  A personal journal of specialty espresso and artisan sourdough,
                  brewed, baked, and photographed by hand.
                </p>
              </div>

              {/* CTAs */}
              <div className="animate-fade-in-up" style={{ animationDelay: "360ms" }}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/coffee" className="btn-primary">
                    Explore Coffee
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link href="/bread" className="btn-secondary">
                    Explore Bread
                  </Link>
                </div>
              </div>

              {/* Stats */}
              <div className="animate-fade-in-up" style={{ animationDelay: "480ms" }}>
                <div className="mt-12 grid grid-cols-3 gap-6 border-t border-blush pt-10">
                  {[
                    { value: "10", label: "Recipes" },
                    { value: "3", label: "Categories" },
                    { value: "100%", label: "From scratch" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="font-display text-3xl font-semibold text-espresso tabular-nums">{stat.value}</p>
                      <p className="text-xs text-espresso-muted uppercase tracking-widest mt-0.5">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — editorial collage of 3 floating, tilted images (tablet+) */}
            <div className="relative h-[500px] lg:h-[560px] hidden sm:block">
              {/* Decorative green blob */}
              <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
                <div className="w-96 h-96 bg-blush/35 rounded-full blur-3xl" />
              </div>

              {/* Image 1 — top-left, slow float, tilted */}
              <div className="absolute top-2 left-2 w-44 h-60 rounded-2xl overflow-hidden shadow-lift ring-1 ring-blush/40 animate-float-slow -rotate-6">
                <Image
                  src="/images/coffee/cappuccino-evening.jpg"
                  alt="Cappuccino with latte art"
                  fill
                  className="object-cover"
                  sizes="180px"
                  priority
                />
              </div>

              {/* Image 2 — center, tallest. Outer div handles centering; inner div floats */}
              <div className="absolute top-14 left-1/2 -translate-x-1/2 z-10">
                <div className="relative w-56 h-[340px] rounded-2xl overflow-hidden shadow-lift ring-4 ring-white animate-float">
                  <Image
                    src="/images/bread/country-sourdough.jpg"
                    alt="Sourdough loaf"
                    fill
                    className="object-cover"
                    sizes="230px"
                    priority
                  />
                </div>
              </div>

              {/* Image 3 — bottom-right, delayed float, tilted */}
              <div className="absolute bottom-2 right-2 w-44 h-60 rounded-2xl overflow-hidden shadow-lift ring-1 ring-blush/40 animate-float-delayed rotate-6">
                <Image
                  src="/images/bread/parmesan-scored-top-2.jpg"
                  alt="Parmesan rosemary sourdough"
                  fill
                  className="object-cover"
                  sizes="180px"
                />
              </div>

              {/* Decorative asterisk */}
              <svg
                viewBox="0 0 48 48"
                className="absolute top-6 right-10 w-10 h-10 text-terracotta/60 animate-spin-slow"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M24 2l3 15 12-9-9 12 15 3-15 3 9 12-12-9-3 15-3-15-12 9 9-12-15-3 15-3-9-12 12 9z" />
              </svg>
            </div>

          </div>
        </div>

        {/* Mobile image strip — below the hero text on phones */}
        <div className="sm:hidden flex gap-3 overflow-x-auto px-6 pb-8 snap-x snap-mandatory">
          <div className="flex-shrink-0 w-36 h-48 rounded-2xl overflow-hidden shadow-md relative snap-start ring-1 ring-blush/40 animate-float-slow">
            <Image
              src="/images/coffee/cappuccino-evening.jpg"
              alt="Cappuccino with latte art"
              fill
              className="object-cover"
              sizes="144px"
              priority
            />
          </div>
          <div className="flex-shrink-0 w-40 h-48 rounded-2xl overflow-hidden shadow-xl ring-2 ring-white relative snap-start z-10 animate-float">
            <Image
              src="/images/bread/country-sourdough.jpg"
              alt="Sourdough loaf"
              fill
              className="object-cover"
              sizes="160px"
              priority
            />
          </div>
          <div className="flex-shrink-0 w-36 h-48 rounded-2xl overflow-hidden shadow-md relative snap-start ring-1 ring-blush/40 animate-float-delayed">
            <Image
              src="/images/bread/parmesan-scored-top-2.jpg"
              alt="Parmesan rosemary sourdough"
              fill
              className="object-cover"
              sizes="144px"
            />
          </div>
        </div>
      </section>

      {/* ── Process — How it comes together ──────────────────────────────── */}
      <section className="bg-white border-y border-blush/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">

          <ScrollReveal className="mb-14 max-w-2xl">
            <p className="eyebrow mb-3">
              The process
            </p>
            <h2 className="font-display font-semibold text-4xl lg:text-5xl tracking-tight text-espresso text-balance">
              How every post <span className="italic text-terracotta">comes together</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            {(
              [
                {
                  number: "01",
                  title: "Good ingredients first",
                  body: "Single-origin beans from trusted roasters, heritage wheat flours, and whatever's in season for the inclusions.",
                  icon: (
                    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
                      <circle cx="24" cy="24" r="9" />
                      <path d="M24 4v4M24 40v4M4 24h4M40 24h4M10.1 10.1l2.8 2.8M35.1 35.1l2.8 2.8M37.9 10.1l-2.8 2.8M12.9 35.1l-2.8 2.8" strokeLinecap="round" />
                    </svg>
                  ),
                },
                {
                  number: "02",
                  title: "Ferment & brew slowly",
                  body: "48-hour cold-retard sourdoughs. Dialled-in espresso with documented ratios and timings.",
                  icon: (
                    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
                      <circle cx="24" cy="28" r="14" />
                      <path d="M24 14V8M20 8h8" strokeLinecap="round" />
                      <path d="M24 28V20M24 28l6 4" strokeLinecap="round" />
                    </svg>
                  ),
                },
                {
                  number: "03",
                  title: "Photograph & document",
                  body: "Every loaf and drink is shot in natural light: crumb close-ups, honest tasting notes, and recipes you can repeat.",
                  icon: (
                    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
                      <rect x="6" y="14" width="36" height="26" rx="4" />
                      <circle cx="24" cy="27" r="7" />
                      <circle cx="24" cy="27" r="3" />
                      <path d="M14 14l3-6h14l3 6" strokeLinejoin="round" />
                      <circle cx="37" cy="19" r="1.5" fill="currentColor" />
                    </svg>
                  ),
                },
              ] as const
            ).map((step, i) => (
              <ScrollReveal
                key={step.number}
                delay={i * 150}
                className={i === 1 ? "md:mt-10" : i === 2 ? "md:mt-20" : ""}
              >
                <div className="flex flex-col gap-5 border-t-2 border-blush/60 pt-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-display italic text-6xl font-medium text-blush leading-none">{step.number}</span>
                    <div className="w-12 h-12 rounded-xl bg-blush/30 flex items-center justify-center text-terracotta">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-espresso tracking-tight">{step.title}</h3>
                  <p className="text-sm text-espresso/60 leading-relaxed">{step.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest Posts ──────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <ScrollReveal className="flex items-end justify-between mb-10">
          <div>
            <p className="eyebrow mb-2">
              Fresh from the kitchen
            </p>
            <h2 className="font-display font-semibold text-4xl tracking-tight text-espresso">
              Latest <span className="italic text-terracotta">posts</span>
            </h2>
          </div>
          <Link
            href="/gallery"
            className="link-underline hidden sm:inline-flex items-center gap-2 text-sm font-medium text-terracotta hover:text-terracotta-dark transition-colors"
          >
            View all
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </ScrollReveal>

        {/* Asymmetric grid — one featured post, two compact beside it */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-7">
          {latestPosts[0] && (
            <ScrollReveal className="lg:col-span-3">
              <PostCard post={latestPosts[0]} size="large" />
            </ScrollReveal>
          )}
          <div className="lg:col-span-2 flex flex-col gap-7">
            {latestPosts.slice(1).map((post, i) => (
              <ScrollReveal key={post.slug} delay={(i + 1) * 120} className="flex-1">
                <PostCard post={post} size="compact" />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category Spotlight ────────────────────────────────────────────── */}
      <section className="bg-cream-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <ScrollReveal className="mb-14 max-w-2xl">
            <p className="eyebrow mb-3">
              Browse by type
            </p>
            <h2 className="font-display font-semibold text-4xl lg:text-5xl tracking-tight text-espresso text-balance">
              Find what you&apos;re <span className="italic text-terracotta">looking for</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <ScrollReveal key={cat.href} delay={i * 120}>
                <Link href={cat.href} className="card-galatea group block">
                  {/* Photo */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.heading}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 gradient-overlay" />
                    <span className="absolute top-4 left-4 text-xs font-semibold uppercase tracking-widest text-white bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      {cat.badge}
                    </span>
                  </div>
                  {/* Text */}
                  <div className="p-6">
                    <h3 className="font-display text-2xl font-semibold tracking-tight text-espresso mb-2 group-hover:text-terracotta transition-colors duration-200">
                      {cat.heading}
                    </h3>
                    <p className="text-sm text-espresso/60 leading-relaxed mb-4">
                      {cat.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-terracotta uppercase tracking-widest">
                      {cat.meta}
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Photo Marquee ─────────────────────────────────────────────────── */}
      <section className="bg-espresso overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-4">
          <ScrollReveal className="text-center mb-10">
            <p className="eyebrow !text-blush mb-3">
              From the kitchen
            </p>
            <h2 className="font-display font-semibold text-4xl lg:text-5xl tracking-tight text-cream">
              Every batch, <span className="italic text-blush">documented</span>
            </h2>
          </ScrollReveal>
        </div>
        {/* Continuously scrolling strip; pauses on hover, scrollable when motion is reduced */}
        <div className="pb-14 overflow-hidden marquee-mask motion-reduce:overflow-x-auto">
          <div className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none px-6">
            {[...Array(2)].flatMap((_, dup) =>
              [
                { src: "/images/coffee/latte-art-tulip-marble.jpg", alt: "Tulip latte art on marble" },
                { src: "/images/bread/everything-bagel-sourdough-closeup.jpg", alt: "Everything bagel sourdough crust" },
                { src: "/images/bread/fig-walnut-closeup.jpg", alt: "Fig and walnut sourdough" },
                { src: "/images/bread/dark-chocolate-sliced.jpg", alt: "Dark chocolate cherry sourdough sliced" },
                { src: "/images/bread/parmesan-scored-top.jpg", alt: "Parmesan rosemary sourdough scored top" },
                { src: "/images/coffee/latte-lifestyle-morning.jpg", alt: "Morning latte with flowers" },
                { src: "/images/bread/cheddar-chili-loaf.jpg", alt: "Calabrian cheddar sourdough" },
              ].map((img, i) => (
                <div
                  key={`${dup}-${i}`}
                  className={`flex-shrink-0 w-64 h-80 rounded-2xl overflow-hidden relative ${i % 2 === 0 ? "mt-4" : ""}`}
                  aria-hidden={dup === 1}
                >
                  <Image
                    src={img.src}
                    alt={dup === 0 ? img.alt : ""}
                    fill
                    className="object-cover"
                    sizes="256px"
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 py-20">
          <ScrollReveal className="text-center mb-12">
            <p className="eyebrow mb-3">
              Got questions?
            </p>
            <h2 className="font-display font-semibold text-4xl lg:text-5xl tracking-tight text-espresso">
              Frequently <span className="italic text-terracotta">asked</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <FAQAccordion items={faqs} />
          </ScrollReveal>
        </div>
      </section>

      {/* ── Newsletter ────────────────────────────────────────────────────── */}
      <NewsletterSignup />
    </>
  );
}
