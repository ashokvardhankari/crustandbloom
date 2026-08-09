/**
 * Symptom → cause → fix data for the /troubleshooting page. Kept as plain data
 * (not MDX) so the page can render it as anchor-linkable sections, feed the
 * same entries into FAQPage structured data, and cross-link fixes to the
 * recipes and tools they reference.
 */

export interface TroubleshootingCause {
  /** Short name of the likely cause, rendered bold. */
  cause: string;
  /** What to actually do about it. */
  fix: string;
  /** Optional deep link to the recipe/guide/tool the fix leans on. */
  link?: { href: string; label: string };
}

export interface TroubleshootingSymptom {
  /** Anchor id for the symptom heading — also the TOC slug. */
  slug: string;
  /** The problem as the baker/barista experiences it. */
  symptom: string;
  /** One-line description of what this looks like. */
  detail: string;
  causes: TroubleshootingCause[];
}

export const BREAD_SYMPTOMS: TroubleshootingSymptom[] = [
  {
    slug: "flat-loaf",
    symptom: "The loaf spreads flat instead of rising",
    detail:
      "The dough looked fine until it hit the oven, then it slumped into a disc instead of standing tall.",
    causes: [
      {
        cause: "Over-proofed dough",
        fix: "The gluten ran out of strength before the bake. Shorten bulk fermentation or the final proof, and use the poke test: a gentle press should spring back slowly, not stay dented.",
        link: { href: "/tools/baking-calculator", label: "Plan your timings with the baking calculator" },
      },
      {
        cause: "Weak or past-peak starter",
        fix: "Starter that collapsed hours before mixing leavens poorly and ferments unevenly. Catch it at or just before peak, roughly doubled with a dome that is just starting to flatten.",
        link: { href: "/starter", label: "Reading starter readiness" },
      },
      {
        cause: "Loose shaping",
        fix: "Without surface tension the dough has nothing to rise against. Shape with a firm drag across the bench so the skin tightens, and let it rest seam-side up in a floured banneton.",
      },
      {
        cause: "Hydration too high for your flour",
        fix: "All-purpose and weaker bread flours cannot hold 78% water the way a strong flour can. Drop hydration five points and work back up one bake at a time.",
        link: { href: "/bread/country-sourdough", label: "The country sourdough baseline" },
      },
    ],
  },
  {
    slug: "gummy-crumb",
    symptom: "The crumb is gummy or wet inside",
    detail:
      "The loaf looks baked but the interior is dense, sticky, and claggy on the knife.",
    causes: [
      {
        cause: "Cut too soon",
        fix: "Sourdough finishes setting as it cools. Wait at least an hour, ideally two, before slicing — a hot loaf will always read gummy.",
      },
      {
        cause: "Underbaked centre",
        fix: "Bake to an internal temperature around 208°F, or until the loaf sounds hollow when knocked. If the crust darkens too fast, drop the oven 15°F and extend the bake.",
      },
      {
        cause: "Under-fermented dough",
        fix: "Yeast never opened the crumb, so moisture has nowhere to go. Extend bulk until the dough is airy, domed, and jiggles like set custard.",
      },
    ],
  },
  {
    slug: "dense-loaf",
    symptom: "Dense, tight crumb with little rise",
    detail: "The loaf is heavy for its size, with a closed, cakey interior.",
    causes: [
      {
        cause: "Bulk fermentation cut short",
        fix: "This is the most common cause in a cold kitchen. Below 74°F the timelines stretch dramatically, so watch the dough, not the clock: it should grow 50 to 75% and feel airy at the end of bulk.",
        link: { href: "/tools/baking-calculator", label: "Adjust your schedule for temperature" },
      },
      {
        cause: "Starter not at peak strength",
        fix: "A sluggish starter cannot raise a loaf no matter how long you wait. Give it a few 1:5:5 feedings at room temperature, with a spoonful of rye, until it doubles on schedule.",
        link: { href: "/starter", label: "Reviving a neglected starter" },
      },
      {
        cause: "Weak flour",
        fix: "Bread flour with 12%+ protein traps gas that all-purpose lets escape. If you must use all-purpose, drop hydration and expect a tighter crumb.",
      },
    ],
  },
  {
    slug: "no-oven-spring",
    symptom: "No oven spring or ear",
    detail:
      "The loaf bakes fine but never gets that dramatic rise, and the score opens weakly or not at all.",
    causes: [
      {
        cause: "Not enough steam",
        fix: "A dry oven sets the crust before the loaf can expand. Bake in a covered dutch oven for the first 20 minutes — it traps the loaf's own steam better than any tray of water.",
      },
      {
        cause: "Shallow or hesitant scoring",
        fix: "Score decisively at a shallow 30° angle, about half an inch deep, in one confident stroke. A slow, timid cut drags and seals itself.",
      },
      {
        cause: "Over-proofed in the fridge",
        fix: "A retard that runs too long uses up the rise. Keep cold proofs in the 12 to 16 hour range and bake straight from the fridge — cold dough scores cleaner and springs harder.",
      },
      {
        cause: "Degassed at shaping",
        fix: "Pressing all the air out during shaping undoes bulk fermentation. Handle the dough firmly but keep the large bubbles intact.",
      },
    ],
  },
  {
    slug: "too-sour",
    symptom: "The loaf is too sour",
    detail: "The tang has crossed from pleasant into sharp and vinegary.",
    causes: [
      {
        cause: "Cold retard ran long",
        fix: "Acetic acid builds in the fridge. Trim the cold proof toward 12 hours, or skip the retard entirely for the mildest loaf.",
      },
      {
        cause: "Starter used past peak",
        fix: "A collapsed, hungry starter carries a heavy acid load into the dough. Use it at peak, and if it regularly overshoots overnight, feed at a leaner ratio like 1:8:8 or feed later in the evening.",
        link: { href: "/starter", label: "My feeding routine" },
      },
      {
        cause: "High whole-grain percentage",
        fix: "Rye and whole wheat ferment faster and carry more acid. Keep them at 10 to 15% of the flour if you want a gentle tang.",
      },
    ],
  },
  {
    slug: "bland-loaf",
    symptom: "The flavour is flat or bland",
    detail: "The loaf looks the part but tastes like little more than plain flour.",
    causes: [
      {
        cause: "Fermentation too short",
        fix: "Flavour is fermentation. Add an overnight cold retard — it is the single biggest flavour upgrade available, and it makes scheduling easier too.",
      },
      {
        cause: "All-white flour",
        fix: "Swap 10% of the bread flour for whole wheat or rye. It deepens the flavour immediately without noticeably changing handling.",
      },
      {
        cause: "Not enough salt",
        fix: "Salt should be 2 to 2.2% of flour weight. Below that, even a well-fermented loaf tastes muted.",
      },
      {
        cause: "Ready for inclusions",
        fix: "If the base loaf is dialled in, flavour can come from what you fold in — cheese, chilies, fruit, herbs.",
        link: { href: "/bread#inclusions", label: "Browse the inclusion loaves" },
      },
    ],
  },
  {
    slug: "burnt-bottom",
    symptom: "The bottom burns before the crumb is done",
    detail: "A charred, bitter base while the rest of the loaf is perfect.",
    causes: [
      {
        cause: "Direct heat from below",
        fix: "Move the dutch oven up a rack, and slide a baking sheet onto the rack below it as a heat shield. Both together tame nearly any oven.",
      },
      {
        cause: "Loaf sitting on scorched parchment",
        fix: "Add a layer of coarse cornmeal or semolina under the loaf, or set a trivet of crumpled foil under the parchment to lift it off the pot floor.",
      },
      {
        cause: "Temperature too high after uncovering",
        fix: "Drop the oven 25°F when the lid comes off. The crust still browns, but the base stops racing ahead.",
      },
    ],
  },
  {
    slug: "uneven-crumb",
    symptom: "Huge tunnels or an uneven crumb",
    detail:
      "Giant caverns near the top or around inclusions, with dense patches elsewhere.",
    causes: [
      {
        cause: "Air trapped at shaping",
        fix: "Big irregular tunnels usually get sealed in during shaping. Press out only the largest bubbles as you pre-shape, and keep the surface tension even all the way around.",
      },
      {
        cause: "Inclusions creating gaps",
        fix: "Oily or wet add-ins like cheese and tomatoes melt away from the crumb and leave caverns. Fold them in during lamination in an even single layer rather than dumping them in at the mix.",
        link: { href: "/bread/sundried-tomato-cheddar", label: "How I laminate inclusions" },
      },
      {
        cause: "Under-fermented dough baked anyway",
        fix: "When bulk is cut short, gas concentrates in a few weak spots instead of an even network. Let bulk finish — airy, domed, wobbly.",
      },
    ],
  },
  {
    slug: "sticky-dough",
    symptom: "The dough is too sticky to shape",
    detail: "It glues itself to hands, bench, and scraper, and shaping feels impossible.",
    causes: [
      {
        cause: "Gluten not developed",
        fix: "Early in bulk every high-hydration dough feels like glue. Give it its stretch-and-folds and time — by the last fold it should be smooth and coherent.",
      },
      {
        cause: "Hydration beyond your flour",
        fix: "There is no shame in 72%. Drop the water until shaping feels manageable, then climb back up as your handling improves.",
      },
      {
        cause: "Dry hands and a dry bench",
        fix: "Work with wet hands during bulk and a lightly floured bench only at shaping. Fast, confident movements stick far less than slow ones.",
      },
      {
        cause: "Bulk fermentation overshot",
        fix: "Dough that has fermented too far turns slack and pasty and never firms up. If it degrades from smooth to soupy, shape it as best you can, proof cold, and shorten bulk next time.",
      },
    ],
  },
];

export const COFFEE_SYMPTOMS: TroubleshootingSymptom[] = [
  {
    slug: "sour-shots",
    symptom: "Espresso tastes sour or sharp",
    detail: "The shot makes you wince — thin, acidic, lemony in the wrong way.",
    causes: [
      {
        cause: "Grind too coarse",
        fix: "Sourness is under-extraction. Tighten the grind a step at a time until the shot runs 25 to 30 seconds for a 1:2 ratio.",
        link: { href: "/tools/coffee-calculator", label: "Dial in with the coffee calculator" },
      },
      {
        cause: "Water not hot enough",
        fix: "Let the machine heat properly — 15 to 20 minutes for most home machines, and flush the group head before pulling.",
      },
      {
        cause: "Ratio cut too tight",
        fix: "A very short ristretto on a light roast often reads sour. Lengthen toward 1:2.5 and see if the sweetness arrives.",
      },
    ],
  },
  {
    slug: "bitter-shots",
    symptom: "Espresso tastes bitter or ashy",
    detail: "Harsh, drying bitterness that lingers at the back of the tongue.",
    causes: [
      {
        cause: "Grind too fine",
        fix: "Bitterness is over-extraction. Coarsen the grind until the shot stops choking the machine and finishes by 30 seconds.",
      },
      {
        cause: "Dark roast brewed hot",
        fix: "Darker roasts extract easily and burn easily. Drop the brew temperature a few degrees, or a notch on the pressurised setting, and keep the ratio shorter.",
        link: { href: "/beans", label: "Find the roast level on the bag" },
      },
      {
        cause: "Stale or oily beans",
        fix: "Beans months past roast turn flat and ashy no matter the recipe. Buy in small bags, and use them between one and six weeks off roast.",
      },
    ],
  },
  {
    slug: "channeling",
    symptom: "Shots spray, gush, or run fast",
    detail:
      "Espresso jets sideways from the portafilter or blond streaks race through the pour.",
    causes: [
      {
        cause: "Uneven puck distribution",
        fix: "Water finds the loose spots. Settle the grounds with a tap or a distribution stir before tamping, then tamp level with firm, consistent pressure.",
      },
      {
        cause: "Grind too coarse for the dose",
        fix: "A fast gusher with no crema usually needs a finer grind, not a harder tamp.",
      },
      {
        cause: "Wrong dose for the basket",
        fix: "Under-dosing leaves headspace where the puck cracks. Weigh the dose — most double baskets want 16 to 18 grams.",
        link: { href: "/tools/coffee-calculator", label: "Check dose and yield" },
      },
    ],
  },
  {
    slug: "flat-milk",
    symptom: "Milk foam is flat, thin, or bubbly",
    detail: "Instead of glossy microfoam you get either no texture or dish-soap bubbles.",
    causes: [
      {
        cause: "Air introduced too late",
        fix: "Stretch in the first few seconds while the milk is still cold — a gentle paper-tearing hiss — then bury the tip and spin until steaming ends.",
      },
      {
        cause: "Milk overheated",
        fix: "Past about 150°F the proteins that hold foam break down and the milk tastes scalded. Stop when the pitcher is just too hot to hold comfortably.",
        link: { href: "/coffee/classic-cappuccino", label: "The cappuccino milk routine" },
      },
      {
        cause: "Big bubbles never integrated",
        fix: "After steaming, tap the pitcher on the counter and swirl hard until the surface turns glossy like wet paint.",
      },
    ],
  },
  {
    slug: "latte-art",
    symptom: "Latte art won't hold a pattern",
    detail: "The milk pours in and disappears, or blobs sit on top instead of drawing.",
    causes: [
      {
        cause: "Foam too thin or too dry",
        fix: "Art needs true microfoam — about a centimetre of texture, fully integrated. Too little and the pour vanishes; too much and it plops.",
      },
      {
        cause: "Pouring from the wrong height",
        fix: "Start high and thin to sink the milk under the crema, then drop the pitcher close to the surface and speed up the pour to draw.",
        link: { href: "/coffee/honey-lavender-latte", label: "The latte pour, step by step" },
      },
      {
        cause: "Crema already broken",
        fix: "Pour promptly after the shot, and give the espresso a gentle swirl first so the surface is even.",
      },
    ],
  },
  {
    slug: "weak-filter",
    symptom: "Filter coffee is weak or muddy",
    detail: "Pour-over or drip that tastes watery, or silty and bitter at the bottom of the cup.",
    causes: [
      {
        cause: "Ratio off",
        fix: "Start at 1:16 coffee to water by weight and adjust to taste. Guessing by scoops swings wildly with grind and roast.",
        link: { href: "/tools/coffee-calculator", label: "Work out the ratio" },
      },
      {
        cause: "Grind mismatched to brew time",
        fix: "Weak and fast means grind finer; bitter and slow means grind coarser. A pour-over should draw down in about three minutes.",
      },
      {
        cause: "Water run cold",
        fix: "Off-boil water, around 200 to 205°F, extracts fully. Water that sat in the kettle underpulls everything.",
      },
    ],
  },
];
