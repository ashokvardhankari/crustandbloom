import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Crust & Bloom — a personal site about specialty coffee and artisan sourdough bread.",
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-14">
        <p className="text-xs font-semibold uppercase tracking-widest text-terracotta mb-3">
          The person behind it
        </p>
        <h1 className="text-4xl lg:text-5xl font-bold text-espresso leading-tight">
          About
        </h1>
        <div className="mt-6 h-px w-24 bg-amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Portrait */}
        <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-blush/20">
          <Image
            src="/images/site/about-portrait.jpg"
            alt="The person behind Crust & Bloom"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Bio */}
        <div className="space-y-6 text-espresso/80 text-lg leading-relaxed">
          <p>
            Hi — I&apos;m the person behind Crust &amp; Bloom. This site is where I document the
            two things I make almost every day: espresso-based drinks and sourdough bread.
          </p>

          <p>
            I started pulling shots a few years ago after one too many disappointing café lattes.
            The rabbit hole of espresso — the grind size adjustments, the temperature variables, the
            pursuit of that one perfect shot — turned into a hobby that now anchors my mornings.
          </p>

          <p>
            The bread came later, during a long stretch of time at home. A lot of people discovered
            sourdough in 2020; I was one of them. I&apos;ve been baking regularly since, and the loaves
            have gotten slowly, incrementally better. The country sourdough was my first success.
            The inclusion loaves came after I started asking &quot;what if&quot; questions about
            what could go inside the dough.
          </p>

          <p>
            I photograph everything myself. The photos here are real — taken in natural light,
            in the same kitchen where the bread bakes and the coffee brews. No staging, no
            professional lighting. Just the thing, as it actually looks.
          </p>

          <div className="pt-4 border-t border-blush/40">
            <p className="text-base text-espresso-muted">
              Want to follow along? Subscribe to the newsletter — I only send something when
              there&apos;s a new post worth reading.
            </p>

            <div className="flex flex-wrap gap-4 mt-6">
              <Link
                href="/coffee"
                className="inline-flex items-center gap-2 bg-espresso text-cream font-semibold px-6 py-3 rounded-full text-sm hover:bg-espresso-light transition-colors"
              >
                Browse coffee
              </Link>
              <Link
                href="/bread"
                className="inline-flex items-center gap-2 border border-espresso/20 text-espresso font-semibold px-6 py-3 rounded-full text-sm hover:bg-blush/30 transition-colors"
              >
                Browse bread
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Values section */}
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Personal photos",
            body: "Every image on this site was taken by me, in my kitchen, of the actual thing I made that day. No stock photos, no professional shoots.",
          },
          {
            title: "Real process notes",
            body: "Brew ratios, hydration percentages, bulk fermentation times — everything shared is what I actually used, not a theoretical ideal.",
          },
          {
            title: "Growing over time",
            body: "This site is a log, not a finished product. Every new loaf and every new drink adds to an archive that gets more useful the longer it runs.",
          },
        ].map((item) => (
          <div key={item.title} className="p-8 bg-cream-dark rounded-2xl">
            <h3 className="font-semibold text-espresso text-lg mb-3">{item.title}</h3>
            <p className="text-espresso/60 text-sm leading-relaxed">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
