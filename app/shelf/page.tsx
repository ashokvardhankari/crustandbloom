import type { Metadata } from "next";
import { getAllBeanPostsMeta } from "@/lib/content";
import { GEAR } from "@/lib/shelf";
import BeanCard from "@/components/ui/BeanCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "My Shelf",
  description:
    "The beans I rate highest and the gear I actually use, ranked from my own reviews. Start here if you want a shortcut past the trial and error.",
};

export default async function ShelfPage() {
  const beans = (await getAllBeanPostsMeta()).sort(
    (a, b) =>
      b.frontmatter.rating - a.frontmatter.rating ||
      new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
  );

  const breadGear = GEAR.filter((g) => g.category === "bread");
  const coffeeGear = GEAR.filter((g) => g.category === "coffee");

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div className="mb-14 animate-fade-in-up max-w-3xl">
        <p className="eyebrow mb-3">The shortlist</p>
        <h1 className="font-display font-semibold text-5xl lg:text-6xl tracking-tight text-espresso leading-tight">
          My Shelf<span className="text-terracotta italic">.</span>
        </h1>
        <p className="mt-4 text-espresso/60 text-lg leading-relaxed max-w-xl">
          The beans I rate highest and the gear that earns its counter space,
          pulled straight from my own reviews. Start here if you want a
          shortcut past the trial and error.
        </p>
        <div className="mt-6 h-px w-24 bg-amber" />
      </div>

      {/* Top-rated beans */}
      <section className="mb-20">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-espresso mb-2">
          Beans, ranked
        </h2>
        <p className="text-sm text-espresso/55 mb-8 max-w-xl">
          Every bag I&apos;ve reviewed, best first. The rating is mine alone,
          from brewing the whole bag.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {beans.map((bean, i) => (
            <ScrollReveal key={bean.slug} delay={i * 100}>
              <BeanCard post={bean} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Gear */}
      <section>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-espresso mb-2">
          Gear that earns its keep
        </h2>
        <p className="text-sm text-espresso/55 mb-8 max-w-xl">
          No drawer of gadgets. This is the short list of things that get used
          every single bake and every single brew.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "For the bread", items: breadGear },
            { label: "For the coffee", items: coffeeGear },
          ].map((group) => (
            <div key={group.label} className="card-galatea p-8">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-espresso-muted mb-6">
                {group.label}
              </h3>
              <div className="space-y-6">
                {group.items.map((item) => (
                  <div key={item.name}>
                    <h4 className="font-display text-lg font-semibold text-espresso mb-1">
                      {item.name}
                    </h4>
                    <p className="text-sm text-espresso/60 leading-relaxed">
                      {item.blurb}
                    </p>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="sponsored noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-2 text-sm font-medium text-terracotta hover:text-terracotta-dark transition-colors duration-200"
                      >
                        Where I&apos;d buy it
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {GEAR.some((g) => g.url) && (
          <p className="mt-6 text-[11px] text-espresso-muted leading-relaxed max-w-xl">
            Some links above are affiliate links. If you buy through one, I may
            earn a small commission at no extra cost to you.
          </p>
        )}
      </section>
    </div>
  );
}
