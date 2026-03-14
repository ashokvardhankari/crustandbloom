import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPostsMeta } from "@/lib/content";
import PostCard from "@/components/ui/PostCard";
import NewsletterSignup from "@/components/ui/NewsletterSignup";
import FAQAccordion from "@/components/ui/FAQAccordion";
import ScrollReveal from "@/components/ui/ScrollReveal";
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
    image: "/images/site/category-coffee.jpg",
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

const testimonials = [
  {
    name: "Sarah M.",
    handle: "@sarahbakes",
    avatar: "/images/site/category-coffee.jpg",
    quote: "The sourdough hydration guides completely changed how I approach my bakes. Those crumb shots are just stunning.",
    rating: 5,
  },
  {
    name: "James K.",
    handle: "@jamesbrew",
    avatar: "/images/site/category-classic.jpg",
    quote: "I've tried the honey lavender latte recipe three times now. The brew ratio breakdown is exactly what I needed.",
    rating: 5,
  },
  {
    name: "Priya N.",
    handle: "@priyacooks",
    avatar: "/images/site/category-inclusions.jpg",
    quote: "The Parmesan & Rosemary loaf is my family's absolute favourite. I make it every Sunday now.",
    rating: 5,
  },
];

export default async function HomePage() {
  const allPosts = await getAllPostsMeta();
  const latestPosts = allPosts.slice(0, 3);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* Left — staggered fade-in on page load */}
            <div>
              {/* Badge */}
              <div className="animate-fade-in-up" style={{ animationDelay: "0ms" }}>
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-terracotta bg-blush/40 px-4 py-1.5 rounded-full mb-6">
                  Coffee &amp; Artisan Bread
                </span>
              </div>

              {/* Headline */}
              <div className="animate-fade-in-up" style={{ animationDelay: "120ms" }}>
                <h1 className="text-5xl sm:text-6xl lg:text-[68px] font-bold text-espresso leading-[1.04] text-balance">
                  Crafted with<br />
                  <span className="text-terracotta">care &amp;</span><br />
                  intention.
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
                  <Link
                    href="/coffee"
                    className="inline-flex items-center gap-2 bg-terracotta text-white font-semibold px-7 py-3.5 rounded-full text-sm tracking-wide hover:bg-terracotta-dark transition-colors duration-200"
                  >
                    Explore Coffee
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/bread"
                    className="inline-flex items-center gap-2 border border-espresso/20 text-espresso font-semibold px-7 py-3.5 rounded-full text-sm tracking-wide hover:bg-espresso hover:text-cream transition-colors duration-200"
                  >
                    Explore Bread
                  </Link>
                </div>
              </div>

              {/* Stats */}
              <div className="animate-fade-in-up" style={{ animationDelay: "480ms" }}>
                <div className="mt-12 grid grid-cols-3 gap-6 border-t border-blush pt-10">
                  {[
                    { value: "12+", label: "Recipes" },
                    { value: "3", label: "Categories" },
                    { value: "100%", label: "From scratch" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="text-2xl font-bold text-espresso">{stat.value}</p>
                      <p className="text-xs text-espresso-muted uppercase tracking-widest mt-0.5">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — 3 independently floating images */}
            <div className="relative h-[500px] lg:h-[560px] hidden sm:block">
              {/* Decorative green blob */}
              <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
                <div className="w-96 h-96 bg-blush/35 rounded-full blur-3xl" />
              </div>

              {/* Image 1 — top-left, slow float */}
              <div className="absolute top-0 left-2 w-44 h-60 rounded-2xl overflow-hidden shadow-lg ring-1 ring-blush/40 animate-float-slow">
                <Image
                  src="/images/coffee/honey-lavender-latte.jpg"
                  alt="Espresso close-up"
                  fill
                  className="object-cover"
                  sizes="180px"
                  priority
                />
              </div>

              {/* Image 2 — center, tallest. Outer div handles centering; inner div floats */}
              <div className="absolute top-14 left-1/2 -translate-x-1/2 z-10">
                <div className="w-56 h-[340px] rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white animate-float">
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

              {/* Image 3 — bottom-right, delayed float */}
              <div className="absolute bottom-0 right-2 w-44 h-60 rounded-2xl overflow-hidden shadow-lg ring-1 ring-blush/40 animate-float-delayed">
                <Image
                  src="/images/bread/parmesan-rosemary.jpg"
                  alt="Inclusion bread"
                  fill
                  className="object-cover"
                  sizes="180px"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Process — How it comes together ──────────────────────────────── */}
      <section className="bg-white border-y border-blush/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">

          <ScrollReveal className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-terracotta mb-3">
              The process
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-espresso">
              How every post comes together
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            {(
              [
                {
                  number: "01",
                  title: "Source with intention",
                  body: "Single-origin beans from trusted roasters, heritage wheat flours, and seasonal inclusions. Everything starts with quality ingredients chosen deliberately.",
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
                  body: "48-hour cold-retard sourdoughs. Dialled-in espresso with documented ratios and timings. Patience makes the difference.",
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
                  body: "Every loaf and drink gets the full editorial treatment: natural light, crumb structure close-ups, honest tasting notes, and repeatable recipes.",
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
              <ScrollReveal key={step.number} delay={i * 150}>
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl font-bold text-blush leading-none">{step.number}</span>
                    <div className="w-12 h-12 rounded-xl bg-blush/30 flex items-center justify-center text-terracotta">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-espresso">{step.title}</h3>
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
            <p className="text-xs font-semibold uppercase tracking-widest text-terracotta mb-2">
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
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {latestPosts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 100}>
              <PostCard post={post} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Category Spotlight ────────────────────────────────────────────── */}
      <section className="bg-cream-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <ScrollReveal className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-terracotta mb-3">
              Browse by type
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-espresso">
              Find what you&apos;re looking for
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
                    <h3 className="text-xl font-bold text-espresso mb-2 group-hover:text-terracotta transition-colors duration-200">
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

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <section className="bg-espresso">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <ScrollReveal className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-blush mb-3">
              Readers say
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-cream">
              From the community
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 100} direction="up">
                <div className="bg-espresso-light rounded-2xl p-7 flex flex-col gap-5 h-full">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-amber" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-cream/75 text-sm leading-relaxed italic flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                    <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-blush/30 flex-shrink-0">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-cream">{t.name}</p>
                      <p className="text-xs text-cream/40">{t.handle}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 py-20">
          <ScrollReveal className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-terracotta mb-3">
              Got questions?
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-espresso">
              Frequently asked
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
