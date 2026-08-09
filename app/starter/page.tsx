import type { Metadata } from "next";
import Link from "next/link";
import FAQAccordion from "@/components/ui/FAQAccordion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import JsonLd from "@/components/seo/JsonLd";
import { AUTHOR, faqJsonLd, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sourdough Starter Guide",
  description:
    "How I feed, store, and revive my sourdough starter. The routine behind every loaf on this site, plus answers to the questions I get asked most.",
};

const faqs = [
  {
    question: "How long does a new starter take from scratch?",
    answer:
      "Plan on 7 to 14 days. Most starters show a burst of activity around day 3 or 4, go quiet for a few days, and then build real, predictable strength in the second week. Do not give up during the quiet stretch. That lull is normal and it fools almost everyone into starting over.",
  },
  {
    question: "Does the float test actually work?",
    answer:
      "It is a rough hint, not a verdict. A starter can fail the float test and still raise a great loaf, especially with whole grain flour in the mix. I trust visual cues more: roughly doubled, a domed top just beginning to flatten, lots of bubbles through the sides of the jar, and a ripe, tangy smell.",
  },
  {
    question: "There is liquid on top of my starter. Is it dead?",
    answer:
      "No. That liquid is called hooch and it just means the starter is hungry. Pour it off or stir it in, either is fine, then feed as usual. A starter is remarkably hard to kill. Pink or orange streaks or a fuzzy surface are the only real reasons to throw one out.",
  },
  {
    question: "Can I use whole wheat or rye flour to feed it?",
    answer:
      "Yes, and a spoonful of either is my favorite way to perk up a sluggish starter. Whole grain flours carry more nutrients and wild yeast on board. I keep my everyday feedings mostly white bread flour with about ten percent rye for insurance.",
  },
  {
    question: "What do I do with the discard?",
    answer:
      "Keep a discard jar in the fridge and fold it into pancakes, crackers, or flatbreads within a week or so. Discard still carries flavour even when it is past its leavening prime. If you bake on a rhythm, you can also size your feedings so there is almost nothing to discard at all.",
  },
];

export default function StarterGuidePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Sourdough Starter Guide",
          url: `${SITE_URL}/starter`,
          description:
            "How I feed, store, and revive my sourdough starter. The routine behind every loaf on this site.",
          author: AUTHOR,
        }}
      />

      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
        <div className="mb-14 animate-fade-in-up">
          <p className="eyebrow mb-3">The engine of every loaf</p>
          <h1 className="font-display font-semibold text-5xl lg:text-6xl tracking-tight text-espresso leading-tight">
            Starter Guide<span className="text-terracotta italic">.</span>
          </h1>
          <p className="mt-4 text-espresso/60 text-lg leading-relaxed max-w-xl">
            Every recipe on this site calls for active starter at 20% of the
            flour weight. This page is how mine stays ready.
          </p>
          <div className="mt-6 h-px w-24 bg-amber" />
        </div>

        <div className="prose-cb">
          <h2>My feeding routine</h2>
          <p>
            I keep about 50g of starter in a straight-sided jar and feed it at
            1:5:5 the night before a bake. That is one part starter, five parts
            flour, five parts water by weight, so 20g of starter gets 100g of
            flour and 100g of water. At a room temperature around 74 to 76°F it
            peaks in 8 to 10 hours, which lines up neatly with mixing dough the
            next morning.
          </p>
          <p>
            The flour mix is plain bread flour with about 10% rye. The rye
            keeps the culture lively and adds a gentle depth to the tang
            without taking over.
          </p>

          <h2>Reading readiness</h2>
          <p>
            A starter is ready to leaven bread when it has roughly doubled, the
            dome on top is just starting to flatten, and it smells ripe and
            tangy rather than sharp like nail polish. Bubbles running up the
            sides of the jar are a better signal than bubbles on the surface. A
            rubber band around the jar at feeding height makes the rise
            impossible to misjudge.
          </p>
          <p>
            Catch it at or just before peak. A starter that collapsed hours ago
            will still work, but the loaf will run more sour and ferment less
            predictably.
          </p>

          <h2>Storage between bakes</h2>
          <p>
            If I am baking weekly or more, the jar lives on the counter and
            gets fed daily. For anything less frequent, the fridge is the right
            home. Feed it, let it sit out for an hour to get moving, then
            refrigerate. It holds happily for a week or two like that, and one
            or two feedings on the counter bring it back to full strength
            before a bake.
          </p>

          <h2>Reviving a neglected starter</h2>
          <p>
            A starter forgotten in the fridge for a month looks grim: grey
            liquid on top, flat, smelling like acetone. It is almost certainly
            fine. Pour off the liquid, discard down to a spoonful, and feed at
            1:5:5 twice a day at room temperature. Within two or three days it
            will be doubling on schedule again. A spoonful of rye in those
            feedings speeds up the recovery noticeably.
          </p>

          <h2>Using it in the recipes here</h2>
          <p>
            Every bread formula on this site is written around active starter
            at 20% of the flour weight, added at or near peak. If your kitchen
            runs colder than 76°F, expect the bulk fermentation times in the
            recipes to stretch, and watch the dough rather than the clock. The{" "}
            <Link href="/tools/baking-calculator">baking calculator</Link> can
            build the full day&apos;s timeline around your schedule.
          </p>
        </div>

        <ScrollReveal>
          <div className="mt-16">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-espresso mb-6">
              Questions I get asked
            </h2>
            <FAQAccordion items={faqs} />
          </div>
        </ScrollReveal>

        <div className="mt-14 p-8 bg-blush/20 rounded-2xl border-l-4 border-amber">
          <p className="text-espresso/80 leading-relaxed">
            Starter happy and doubling? Head to the{" "}
            <Link
              href="/bread"
              className="font-semibold text-terracotta hover:text-terracotta-dark transition-colors duration-200"
            >
              bread archive
            </Link>{" "}
            and put it to work. If a bake misbehaves, the{" "}
            <Link
              href="/troubleshooting"
              className="font-semibold text-terracotta hover:text-terracotta-dark transition-colors duration-200"
            >
              troubleshooting guide
            </Link>{" "}
            covers the usual suspects.
          </p>
        </div>
      </div>
    </>
  );
}
