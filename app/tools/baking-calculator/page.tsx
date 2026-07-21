import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import BakingCalculator from "@/components/tools/BakingCalculator";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ToolRecipeLinks from "@/components/ui/ToolRecipeLinks";
import { getAllBreadPostsMeta } from "@/lib/content";
import { listingMetadata, toolApplicationJsonLd } from "@/lib/seo";
import { BAKING_PRESETS } from "@/lib/baking-presets";

const BAKING_CALCULATOR_DESCRIPTION =
  "Plan your sourdough bake day. Pick a schedule, set your start time or deadline, and get a complete step-by-step timeline.";

/** Minutes → a compact human duration ("12 hours", "1 hr 15 min", "45 min"). */
function formatMinutes(minutes: number): string {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs === 0) return `${mins} min`;
  if (mins === 0) return hrs === 1 ? "1 hour" : `${hrs} hours`;
  return `${hrs} hr ${mins} min`;
}

export const metadata: Metadata = listingMetadata({
  title: "Baking Calculator",
  description: BAKING_CALCULATOR_DESCRIPTION,
  canonical: "/tools/baking-calculator",
});

export default async function BakingCalculatorPage() {
  // A baker who's just planned their day needs a loaf to bake it on — recipes
  // deep-link into this calculator (?schedule=) but it never linked back. Surface
  // the newest few loaves (newest-first), with a link to the full archive.
  const loaves = await getAllBreadPostsMeta();
  const featuredLoaves = loaves.slice(0, 3);

  return (
    <>
      {/* A calculator page is two levels deep (Home › Tools › Baking Calculator),
          like the tag detail pages — give it the same breadcrumb trail +
          BreadcrumbList JSON-LD they emit, which these sub-pages previously
          lacked (no "up to Tools" nav despite the Tools eyebrow). */}
      <Breadcrumbs
        maxWidth="max-w-3xl"
        items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Baking Calculator" },
        ]}
      />

      <div className="max-w-3xl mx-auto px-6 lg:px-8 pt-10 pb-16">
        <JsonLd
          data={toolApplicationJsonLd({
            name: "Sourdough Baking Calculator",
            description: BAKING_CALCULATOR_DESCRIPTION,
            path: "/tools/baking-calculator",
          })}
        />
        {/* Header */}
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-terracotta mb-3">
            Tools
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold text-espresso leading-tight">
            Baking Calculator
          </h1>
          <p className="mt-4 text-espresso/60 text-lg leading-relaxed max-w-xl">
            Plan your sourdough bake day. Pick a schedule, set your start time or
            deadline, and get a complete step-by-step timeline.
          </p>
          <div className="mt-6 h-px w-24 bg-amber" />
        </div>

        <ScrollReveal>
          <BakingCalculator />
        </ScrollReveal>

        {/* No-JS fallback. The interactive timeline is computed client-side (it
            needs the visitor's clock), so with JavaScript disabled the planner
            above renders nothing usable. Ship the same step sequences — names,
            durations, and tips — as a static reference so a no-JS reader (and
            crawlers) still get the full schedule, mirroring the /search no-JS
            fallback. Hidden by the browser whenever JS runs. */}
        <noscript>
          <div className="mt-12 space-y-10 border-t border-blush/40 pt-10">
            <p className="text-sm text-espresso/60 leading-relaxed">
              The interactive planner needs JavaScript to fit each timeline to your
              clock. Here are the full step sequences for reference:
            </p>
            {BAKING_PRESETS.map((preset) => {
              const total = preset.steps.reduce(
                (sum, s) => sum + s.durationMinutes,
                0
              );
              return (
                <section key={preset.slug}>
                  <h2 className="text-xl font-semibold text-espresso">
                    {preset.name}
                  </h2>
                  <p className="mt-1 mb-4 text-sm text-espresso/50">
                    Total time: {formatMinutes(total)}
                  </p>
                  <ol className="space-y-4">
                    {preset.steps.map((step, i) => (
                      <li key={i} className="flex gap-4">
                        <span className="text-sm font-semibold text-terracotta shrink-0 w-6 text-right">
                          {i + 1}.
                        </span>
                        <div>
                          <div className="flex flex-wrap items-baseline gap-x-3">
                            <h3 className="font-semibold text-espresso">
                              {step.name}
                            </h3>
                            <span className="text-xs text-espresso-muted font-medium">
                              {formatMinutes(step.durationMinutes)}
                            </span>
                          </div>
                          <p className="text-sm text-espresso/60">{step.tip}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              );
            })}
          </div>
        </noscript>

        <ToolRecipeLinks
          heading="Recipes to bake"
          intro="Got your schedule dialled in? Put it to work on one of these sourdough loaves."
          posts={featuredLoaves}
          browse={
            loaves.length > featuredLoaves.length
              ? { href: "/bread", label: `See all ${loaves.length} sourdough recipes` }
              : null
          }
        />
      </div>
    </>
  );
}
