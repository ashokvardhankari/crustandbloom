import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CoffeeCalculator from "@/components/tools/CoffeeCalculator";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ToolRecipeLinks from "@/components/ui/ToolRecipeLinks";
import { getAllCoffeePostsMeta } from "@/lib/content";
import { listingMetadata, toolApplicationJsonLd } from "@/lib/seo";
import { DRINK_PRESETS } from "@/lib/coffee-presets";

const COFFEE_CALCULATOR_DESCRIPTION =
  "Brew ratio calculator, drink builder, and extraction yield calculator for espresso and coffee.";

export const metadata: Metadata = listingMetadata({
  title: "Coffee Calculator",
  description: COFFEE_CALCULATOR_DESCRIPTION,
  canonical: "/tools/coffee-calculator",
});

export default async function CoffeeCalculatorPage() {
  // Once a drink's ratios are dialled in, the natural next step is an actual
  // recipe to pull — coffee recipes deep-link into this calculator (?drink=)
  // but it never linked back. Surface the espresso drinks (newest-first).
  const drinks = await getAllCoffeePostsMeta();
  const featuredDrinks = drinks.slice(0, 3);

  return (
    <>
      {/* A calculator page is two levels deep (Home › Tools › Coffee Calculator),
          like the tag detail pages — give it the same breadcrumb trail +
          BreadcrumbList JSON-LD they emit, which these sub-pages previously
          lacked (no "up to Tools" nav despite the Tools eyebrow). */}
      <Breadcrumbs
        maxWidth="max-w-3xl"
        items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Coffee Calculator" },
        ]}
      />

      <div className="max-w-3xl mx-auto px-6 lg:px-8 pt-10 pb-16">
        <JsonLd
          data={toolApplicationJsonLd({
            name: "Coffee & Espresso Calculator",
            description: COFFEE_CALCULATOR_DESCRIPTION,
            path: "/tools/coffee-calculator",
          })}
        />
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-terracotta mb-3">
            Tools
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold text-espresso leading-tight">
            Coffee Calculator
          </h1>
          <p className="mt-4 text-espresso/60 text-lg leading-relaxed max-w-xl">
            Dial in your espresso. Calculate brew ratios, build drinks with the
            right proportions, and check your extraction yield.
          </p>
          <div className="mt-6 h-px w-24 bg-amber" />
        </div>

        <ScrollReveal>
          <CoffeeCalculator />
        </ScrollReveal>

        {/* No-JS fallback. The calculator's controls and drink builder are all
            client-rendered, so with JavaScript disabled the tool above renders
            nothing usable. Ship the standard espresso-drink specs — dose,
            espresso yield, milk/water, and milk temp — as a static reference
            table so a no-JS reader (and crawlers) still get the core drink
            proportions, mirroring the /tools/baking-calculator no-JS fallback.
            Hidden by the browser whenever JS runs. */}
        <noscript>
          <div className="mt-12 border-t border-blush/40 pt-10">
            <p className="text-sm text-espresso/60 leading-relaxed">
              The interactive builder needs JavaScript. Here are the standard
              espresso-drink proportions for reference (espresso yield is the
              dose multiplied by the brew ratio):
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-blush/50 text-left text-espresso-muted">
                    <th className="py-2 pr-4 font-semibold">Drink</th>
                    <th className="py-2 pr-4 font-semibold">Dose</th>
                    <th className="py-2 pr-4 font-semibold">Espresso out</th>
                    <th className="py-2 pr-4 font-semibold">Milk / Water</th>
                    <th className="py-2 font-semibold">Milk temp</th>
                  </tr>
                </thead>
                <tbody>
                  {DRINK_PRESETS.filter((d) => !d.isCustom).map((d) => {
                    const yieldG = Math.round(d.dose * d.ratioMultiplier * 10) / 10;
                    const liquid =
                      d.waterMl !== null
                        ? `${d.waterMl} ml water`
                        : d.milkMl !== null
                        ? `${d.milkMl} ml milk`
                        : "—";
                    return (
                      <tr key={d.slug} className="border-b border-blush/30 align-top">
                        <td className="py-2 pr-4 font-semibold text-espresso">
                          {d.name}
                          {d.note && (
                            <span className="block text-xs font-normal text-espresso/50">
                              {d.note}
                            </span>
                          )}
                        </td>
                        <td className="py-2 pr-4 text-espresso/70">{d.dose} g</td>
                        <td className="py-2 pr-4 text-espresso/70">
                          {yieldG} g (1:{d.ratioMultiplier})
                        </td>
                        <td className="py-2 pr-4 text-espresso/70">{liquid}</td>
                        <td className="py-2 text-espresso/70">
                          {d.milkTempC !== null ? `${d.milkTempC}°C` : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </noscript>

        <ToolRecipeLinks
          heading="Drinks to dial in"
          intro="Ratios ready? Pull one of these espresso drinks next, step by step."
          posts={featuredDrinks}
          browse={
            drinks.length > featuredDrinks.length
              ? { href: "/coffee", label: `See all ${drinks.length} espresso drinks` }
              : null
          }
        />
      </div>
    </>
  );
}
