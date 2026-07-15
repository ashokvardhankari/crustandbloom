/**
 * Curated "ideas to try" board for the private admin page at /admin/inclusions.
 *
 * This is a research-backed wishlist — NOT published site content. It lives
 * server-side and is only ever returned by the /api/admin/ideas route after the
 * admin passphrase (ADMIN_SECRET) checks out, so it never ships to an
 * unauthenticated browser. The workflow assumed here: the baker makes their own
 * starter and dough at home and only needs the mix-ins, so every recipe lists
 * exactly what to BUY/prep and when to fold it in.
 *
 * Sourced from 2025–2026 trending sourdough + specialty-coffee coverage
 * (Instagram/TikTok, r/Sourdough, King Arthur, The Fresh Loaf, Onyx, Sprudge…).
 * Combos already baked on the site are intentionally excluded.
 */

export type FlavorProfile = "savory" | "sweet" | "spicy";

export interface InclusionIdea {
  /** Catchy working title for the loaf. */
  name: string;
  flavorProfile: FlavorProfile;
  /** Why it's worth trying / where it's trending. */
  whyTrending: string;
  /**
   * Exactly what to buy/prep, each as "Ingredient, prep note, weight",
   * scaled for a standard ~500g-flour boule.
   */
  inclusions: string[];
  /** When and how to fold the mix-ins into the dough. */
  foldInTip: string;
  /** What to expect in the finished crumb/crust. */
  tastingNote: string;
}

export interface BeanIdea {
  name: string;
  roaster: string;
  origin: string;
  process: string;
  roastLevel: "light" | "medium-light" | "medium" | "medium-dark" | "dark";
  /** Tasting notes the roaster/bag claims. */
  officialNotes: string[];
  whyTry: string;
  approxPrice: string;
}

export interface DrinkIdea {
  name: string;
  category: "latte" | "cappuccino" | "espresso" | "filter";
  brewRatio: string;
  description: string;
  buildSteps: string[];
}

/** Trending sourdough inclusions across savory / sweet / spicy. */
export const INCLUSION_IDEAS: InclusionIdea[] = [
  {
    name: "French Onion Soup Boule",
    flavorProfile: "savory",
    whyTrending:
      "The breakout savory sourdough of 2025–2026 all over Instagram and TikTok — French onion soup turned into a loaf with caramelized onions and Gruyère.",
    inclusions: [
      "Yellow onions, caramelized in butter until deep amber then cooled and squeezed dry, 200g",
      "Gruyère, grated, 120g",
      "Fresh thyme leaves, stripped and chopped, 5g",
      "Beef bouillon or onion soup powder, crumbled, 8g",
    ],
    foldInTip:
      "Fold the cooled caramelized onions and thyme in during the first set of coil folds, then laminate the Gruyère across the sheeted dough before the final fold so it stays in defined melty pockets.",
    tastingNote:
      "Tastes like a bubbling crock of onion soup in bread form: sweet jammy onions, savory broth depth, and stretchy cheese caramelizing on the crust.",
  },
  {
    name: "Gochujang, Garlic & Scallion",
    flavorProfile: "spicy",
    whyTrending:
      "A viral Korean-inspired umami loaf championed by bakers like Foodgeek and Humble Herbivore and widely shared in r/Sourdough.",
    inclusions: [
      "Gochujang, whisked into the dough water (reduce hydration ~5%), 60g",
      "Garlic cloves, whole and slow-roasted until soft, 90g",
      "Scallions, finely chopped, 60g",
      "Toasted sesame seeds, 15g",
    ],
    foldInTip:
      "Whisk the gochujang into the water at mixing, then add the roasted garlic and scallions in quarters across four sets of stretch-and-folds so they distribute without shredding the dough.",
    tastingNote:
      "Fermented sweet-spicy chili heat plays off the tang of the crumb, with whole roasted garlic cloves going mild and buttery and scallion sharpness cutting through.",
  },
  {
    name: "Hot Honey Gouda",
    flavorProfile: "spicy",
    whyTrending:
      "Rides 2025's dominant 'sweet heat / swalty' flavor trend, fusing viral hot honey with sourdough.",
    inclusions: [
      "Smoked or aged Gouda, cubed small, 130g",
      "Hot honey, drizzled in during lamination plus extra to brush the crust, 50g",
      "Aleppo or crushed red pepper flakes, 3g",
    ],
    foldInTip:
      "Laminate the Gouda cubes across the stretched dough and drizzle the hot honey over them (wear gloves) just before folding it back up during the last coil fold.",
    tastingNote:
      "Molten smoky cheese pockets balanced by a slow, sweet chili burn, with a lacquered honey-caramelized crust that crackles.",
  },
  {
    name: "Miso Furikake Umami",
    flavorProfile: "savory",
    whyTrending:
      "The Japanese-pantry umami answer to the gochujang craze, surfacing on The Fresh Loaf and umami-forward baking accounts in 2025.",
    inclusions: [
      "White or red miso, dissolved into the dough water (cut added salt to compensate), 45g",
      "Furikake seasoning, 20g",
      "Toasted white and black sesame seeds, 15g",
      "Scallions, thinly sliced, 40g",
    ],
    foldInTip:
      "Blend the miso into the water before mixing, then fold in the furikake, sesame, and scallions during the second set of stretch-and-folds; reserve a little furikake to press onto the crust.",
    tastingNote:
      "A deeply savory, subtly briny loaf with a fermented double-tang from miso plus starter, and toasty nori-sesame crunch throughout the crumb.",
  },
  {
    name: "Dill Pickle & Sharp White Cheddar",
    flavorProfile: "savory",
    whyTrending:
      "A buzzy TikTok-driven trend where bakers swap pickle brine for water and fold in dill and cheddar.",
    inclusions: [
      "Sharp white cheddar, diced into small cubes, 110g",
      "Dill pickles, diced and patted very dry, 90g",
      "Fresh dill, chopped, 8g",
    ],
    foldInTip:
      "Fold the drained pickles and dill in during the second set of coil folds, then laminate the cheddar cubes in during shaping so they don't leak brine into the gluten early.",
    tastingNote:
      "Sharp, funky-tangy pop of pickle and dill against savory cheddar pockets, doubling down on the natural sourness of the crumb.",
  },
  {
    name: "Bacon, Cheddar & Ranch",
    flavorProfile: "savory",
    whyTrending:
      "Repeatedly named a top savory 'inclusions loaf' in 2025 baker blogs for its crowd-pleasing game-day flavor.",
    inclusions: [
      "Thick-cut bacon, cooked crisp, cooled, and diced, 100g",
      "Sharp cheddar, cubed, 110g",
      "Dry ranch seasoning, 12g",
      "Chives, chopped, 6g",
    ],
    foldInTip:
      "Toss the bacon and cheddar with the ranch powder, then laminate the whole mix across the dough before the final fold so the seasoning coats every pocket.",
    tastingNote:
      "Smoky bacon, melty cheddar, and buttermilk-herb ranch tang in every bite, like a loaded baked potato baked into bread.",
  },
  {
    name: "Olive, Feta & Rosemary",
    flavorProfile: "savory",
    whyTrending:
      "Mediterranean flavors were among 2025's most popular new-recipe themes; Alexandra's Kitchen popularized the lamination method for it.",
    inclusions: [
      "Kalamata and green olives, pitted, halved, and dried, 120g",
      "Feta, crumbled into chunks, 90g",
      "Fresh rosemary, finely chopped, 5g",
    ],
    foldInTip:
      "Laminate the olives, feta, and rosemary across the sheeted dough during the second round of stretches so the briny bits stay evenly ribboned through the crumb.",
    tastingNote:
      "Briny, salty olive richness against tangy pockets of feta and piney rosemary, with an open, chewy Mediterranean-style crumb.",
  },
  {
    name: "Jalapeño Popper",
    flavorProfile: "spicy",
    whyTrending:
      "A perennial r/Sourdough favorite that translates the viral game-day appetizer (cream cheese, jalapeño, bacon) into a loaf.",
    inclusions: [
      "Jalapeños, seeded, diced, and patted dry, 80g",
      "Cream cheese, frozen and cut into small cubes, 100g",
      "Bacon, cooked crisp and crumbled, 80g",
      "Cheddar, shredded, 80g",
    ],
    foldInTip:
      "Freeze the cream cheese cubes so they hold their shape, then laminate all four inclusions in together right before the final shaping.",
    tastingNote:
      "Creamy melted cheese pockets, savory bacon, and bright jalapeño heat, exactly like a popper wrapped in a tangy crust.",
  },
  {
    name: "Ube Halaya & White Chocolate",
    flavorProfile: "sweet",
    whyTrending:
      "One of TikTok's most-shared sweet sourdoughs for its naturally vivid purple crumb, made with ube extract, halaya jam, and white chocolate.",
    inclusions: [
      "Ube extract, mixed into the dough water, 12g",
      "Ube halaya (purple yam jam), swirled in, 90g",
      "White chocolate chips, 100g",
      "Toasted coconut flakes, 30g",
    ],
    foldInTip:
      "Blend the ube extract into the water at mixing for an even purple crumb, then laminate the halaya swirl, white chocolate, and coconut in during the final fold to keep marbled ribbons.",
    tastingNote:
      "Nutty-vanilla ube sweetness with creamy white chocolate melts and a striking violet crumb streaked with jammy purple swirls.",
  },
  {
    name: "Marbled Matcha, Cranberry & White Chocolate",
    flavorProfile: "sweet",
    whyTrending:
      "A showstopping two-dough holiday loaf that went viral on TikTok/Instagram for its green matcha swirls dotted with red cranberries.",
    inclusions: [
      "Culinary matcha powder, worked into a portion of the dough, 10g",
      "Dried cranberries, 60g",
      "White chocolate chunks, 90g",
    ],
    foldInTip:
      "Split off a third of the dough and knead the matcha into it, then stack and gently swirl the two doughs together while laminating the cranberries and white chocolate in during shaping.",
    tastingNote:
      "Earthy-bittersweet matcha against tart cranberry bursts and creamy white chocolate, with dramatic green-and-ruby marbling in a tender crumb.",
  },
  {
    name: "Biscoff Cookie Butter Swirl",
    flavorProfile: "sweet",
    whyTrending:
      "The viral sweet sourdough of 2025 on TikTok/Instagram, swirling speculoos cookie butter into dough.",
    inclusions: [
      "Biscoff cookie butter, warmed slightly for swirling, 120g",
      "Biscoff cookies, roughly crushed, 70g",
      "Light brown sugar, 20g",
    ],
    foldInTip:
      "Laminate the dough thin, spread the softened cookie butter over it, scatter the crushed cookies and brown sugar, then roll and fold so it spirals through the crumb.",
    tastingNote:
      "Warm caramelized-spice speculoos ribbons and crunchy cookie shards through a soft crumb, like a cinnamon roll's dessert cousin.",
  },
  {
    name: "Cranberry Orange",
    flavorProfile: "sweet",
    whyTrending:
      "A holiday-season staple that trended hard again in 2025 seasonal roundups — cranberries soaked in orange juice, plus zest.",
    inclusions: [
      "Dried cranberries, soaked in orange juice then drained, 100g",
      "Orange zest, freshly grated, from 2 oranges",
      "Pecans, toasted and chopped, 60g",
    ],
    foldInTip:
      "Fold the plumped cranberries, zest, and pecans in during the second set of stretch-and-folds so the fruit spreads evenly without staining the whole crumb.",
    tastingNote:
      "Bright citrus perfume and tart-sweet cranberry jewels against a nutty pecan crunch, festive and breakfast-perfect.",
  },
  {
    name: "Pumpkin Spice & Maple Pecan",
    flavorProfile: "sweet",
    whyTrending:
      "Rides the $1.1bn pumpkin-spice economy and 2025's pivot toward maple-pecan fall flavors — a top autumn sourdough combo.",
    inclusions: [
      "Pumpkin purée, substituted for part of the dough water, 100g",
      "Pumpkin pie spice, 8g",
      "Pecans, toasted and chopped, 70g",
      "Maple sugar or chopped maple candy, 40g",
    ],
    foldInTip:
      "Mix the pumpkin purée and spice into the dough at mixing (reducing water accordingly), then fold the pecans and maple sugar in during the last set of coil folds.",
    tastingNote:
      "Cozy pumpkin-spiced crumb with a mellow orange hue, toasty pecans, and little pockets of maple sweetness.",
  },
  {
    name: "Chai-Spiced Apple & Sharp Cheddar",
    flavorProfile: "sweet",
    whyTrending:
      "Combines two 2025 trend threads flagged by flavor forecasters: chai hybrids and the elevated apple-plus-sharp-cheddar pairing.",
    inclusions: [
      "Dried apple, diced small, 80g",
      "Sharp cheddar, cubed, 80g",
      "Chai spice blend (cinnamon, cardamom, ginger, clove), 7g",
      "Light brown sugar, 20g",
    ],
    foldInTip:
      "Toss the dried apple and cheddar with the chai spice and sugar, then laminate the mix across the dough during shaping so sweet and savory bits alternate.",
    tastingNote:
      "Warming cardamom-cinnamon spice ties tart-sweet apple to melty sharp cheddar for an unexpected savory-sweet 'apple pie with cheese' bite.",
  },
  {
    name: "Spinach, Artichoke & Parmesan",
    flavorProfile: "savory",
    whyTrending:
      "Turns the ever-popular spinach-artichoke dip into a loaf — an inclusion idea gaining traction in 2025 add-in roundups.",
    inclusions: [
      "Frozen spinach, thawed and squeezed very dry, 90g",
      "Marinated artichoke hearts, drained and chopped, 90g",
      "Parmesan, grated, 80g",
      "Garlic, minced, 6g",
    ],
    foldInTip:
      "Make sure the spinach and artichokes are pressed bone-dry, then laminate everything in during the second round of folds so excess moisture doesn't slacken the dough.",
    tastingNote:
      "Creamy, garlicky spinach-artichoke-dip flavor with salty parmesan sharpness woven through a chewy savory crumb.",
  },
  {
    name: "Chili Crunch, Cheese & Scallion",
    flavorProfile: "spicy",
    whyTrending:
      "A newer viral TikTok combo layering jarred chili crisp with melty cheese and scallions — the chili-crunch craze folded into a loaf.",
    inclusions: [
      "Chili crunch / chili crisp (Momofuku or Lao Gan Ma), oil drained off, 30g",
      "Sharp cheddar or Monterey Jack, cubed small, 125g",
      "Scallions, thinly sliced, 40g",
    ],
    foldInTip:
      "Drain the excess oil off the chili crunch so hydration stays put, then spoon it across the laminated dough with the cheese and scallions and fold up during the final coil fold.",
    tastingNote:
      "Crunchy garlic-chili heat and slick pockets of melted cheese against fresh scallion bite — punchy, savory, and a little addictive.",
  },
  {
    name: "Italian Herbs & Cheese (Subway-style)",
    flavorProfile: "savory",
    whyTrending:
      "A viral copycat of Subway's Italian herbs & cheese bread that blew up in 2025, rebuilt as an artisan sourdough boule.",
    inclusions: [
      "Shredded low-moisture mozzarella + provolone blend, 120g",
      "Grated Parmesan for the crust, 30g",
      "Dried Italian herb blend (oregano, basil, parsley, thyme), 8g",
      "Garlic powder, 4g",
    ],
    foldInTip:
      "Fold the herb blend and garlic powder in during the second set of stretch-and-folds, laminate the mozzarella-provolone in during shaping, and press the Parmesan onto the top before scoring so it crisps.",
    tastingNote:
      "Aromatic dried herbs and molten stretchy cheese with a crackly cheesy crust — the sub-shop classic reimagined with sourdough tang.",
  },
  {
    name: "Blueberry & Sugared Lemon Zest",
    flavorProfile: "sweet",
    whyTrending:
      "A major viral spring loaf on TikTok — fresh blueberries with sugared lemon zest that bakers can't stop snacking on.",
    inclusions: [
      "Freeze-dried blueberries (bleed far less than fresh), 60g — or 100g fresh, handled gently",
      "Lemon zest from 2 lemons, tossed with light sugar, 20g",
      "White chocolate chips, optional, 60g",
    ],
    foldInTip:
      "Toss the zest with the sugar and fold it in early; add the blueberries during the final coil fold and handle gently so they don't burst and stain the whole crumb.",
    tastingNote:
      "Bright lemon perfume and jammy blueberry pockets against the tangy crumb — a springtime toast that practically glows.",
  },
  {
    name: "Honey Lavender",
    flavorProfile: "sweet",
    whyTrending:
      "A spring favorite doing the rounds on baking accounts — culinary lavender infused into the dough water and sweetened with honey.",
    inclusions: [
      "Culinary lavender buds, steeped overnight in the hot dough water then strained out, 6g",
      "Honey, stirred in at mixing, 40g",
      "Lemon zest, optional, from 1 lemon",
    ],
    foldInTip:
      "Steep the lavender in hot water overnight for a strong infusion, strain the buds out, and mix the dough with that water; stir the honey in at mix rather than folding it later.",
    tastingNote:
      "A subtle, floral, honeyed crumb — delicate and perfumed, best as toast with a slick of butter.",
  },
  {
    name: "Goat Cheese & Berry Jam Ribbon",
    flavorProfile: "sweet",
    whyTrending:
      "A sweet-savory TikTok crossover piped between folds for a marbled ribbon rather than one big pocket.",
    inclusions: [
      "Soft goat cheese (chèvre), 100g",
      "Marionberry or blackberry jam, 80g",
      "Fresh thyme, optional, 2g",
    ],
    foldInTip:
      "Loosen the goat cheese and jam into a pipeable spread and pipe a ribbon of it between each set of coil folds so it swirls evenly through the loaf.",
    tastingNote:
      "Tangy, creamy goat cheese ribboned with sweet dark-berry jam — a beautiful marbled crumb that eats like a cheese course.",
  },
  {
    name: "Coconut Lime",
    flavorProfile: "sweet",
    whyTrending:
      "A tropical twist gaining traction in 2025–2026 add-in roundups — toasted coconut with bright lime zest.",
    inclusions: [
      "Toasted shredded coconut, 70g",
      "Lime zest, from 3 limes",
      "White chocolate chips, 70g",
    ],
    foldInTip:
      "Fold the lime zest in early with the dough, then laminate the toasted coconut and white chocolate in during shaping so the coconut stays crisp.",
    tastingNote:
      "Bright lime zing with toasty coconut and creamy white chocolate — a piña-colada-adjacent dessert loaf.",
  },
  {
    name: "Guinness & Aged Cheddar",
    flavorProfile: "savory",
    whyTrending:
      "A splurge-worthy savory loaf with deep malty depth, repeatedly called worth-every-penny for grilled cheese and stew night.",
    inclusions: [
      "Guinness or stout, reduced by half and cooled, swapped for part of the dough water, 100g",
      "Aged / extra-sharp cheddar, cubed, 120g",
      "Whole-grain mustard, optional, 15g",
    ],
    foldInTip:
      "Reduce the stout, cool it fully, and swap it for an equal weight of water at mixing; laminate the cheddar cubes in during shaping.",
    tastingNote:
      "Malty, roasted-barley depth from the stout against sharp melty cheddar — rich and savory, built for a grilled cheese.",
  },
  {
    name: "Pepperoni Pizza",
    flavorProfile: "savory",
    whyTrending:
      "Pizza-inspired loaves are a big savory trend — mozzarella, cured pepperoni, and sun-dried tomato baked into the crumb.",
    inclusions: [
      "Low-moisture mozzarella, cubed, 120g",
      "Mini or diced pepperoni, patted of grease, 80g",
      "Oil-packed sun-dried tomatoes, drained and chopped, 60g",
      "Dried oregano, 4g",
    ],
    foldInTip:
      "Pat the pepperoni to shed excess grease so it doesn't slacken the dough, then laminate everything in together during shaping.",
    tastingNote:
      "Melty cheese, spicy cured pepperoni, and sweet-tart sun-dried tomato — a pepperoni pizza in chewy loaf form.",
  },
  {
    name: "Almond Joy",
    flavorProfile: "sweet",
    whyTrending:
      "A candy-bar-inspired sweet loaf trending in dessert-bread roundups — coconut, dark chocolate, and toasted almonds.",
    inclusions: [
      "Toasted shredded coconut, 70g",
      "Dark chocolate chunks, 90g",
      "Slivered almonds, toasted, 50g",
      "Cocoa powder, bloomed into the dough water for a light chocolate base, optional, 15g",
    ],
    foldInTip:
      "Bloom the cocoa into the dough water first if you want a chocolate crumb, then laminate the coconut, chocolate, and almonds in during shaping.",
    tastingNote:
      "Toasty coconut, melty dark chocolate, and crunchy almond — the candy bar as a sliceable dessert loaf.",
  },
  {
    name: "Orange Vanilla Creamsicle",
    flavorProfile: "sweet",
    whyTrending:
      "A subtle sweet loaf built on fresh orange juice and vanilla — a gentler alternative to the heavier chocolate sweet loaves.",
    inclusions: [
      "Fresh orange juice, swapped for part of the dough water, 80g",
      "Orange zest, from 2 oranges",
      "Vanilla bean paste or extract, 8g",
      "White chocolate chips, optional, 70g",
    ],
    foldInTip:
      "Swap the orange juice for an equal weight of water at mixing and stir in the vanilla; fold the zest (and white chocolate) in during the second set of folds.",
    tastingNote:
      "A creamsicle in bread form — fragrant orange with rounded vanilla warmth and a tender, lightly sweet crumb.",
  },
  {
    name: "Dubai Chocolate Pistachio Crunch",
    flavorProfile: "sweet",
    whyTrending:
      "The single biggest viral flavor of 2024–2026 folded into a loaf — the 'Can't Get Knafeh of It' Dubai chocolate bar (pistachio-tahini cream + crunchy kataifi + chocolate) reimagined as sourdough all over TikTok and the Sourdough Geeks group.",
    inclusions: [
      "Pistachio cream / pistachio-tahini spread, warmed for swirling, 120g",
      "Kataifi (shredded phyllo) or shredded wheat, toasted in butter until golden and crisp, 60g",
      "Dark or milk chocolate, chopped into chunks, 100g",
      "Toasted pistachios, roughly chopped, 40g",
    ],
    foldInTip:
      "Toast the kataifi in butter and cool it fully so it stays crunchy, then laminate the dough thin, spread the pistachio cream over it, scatter the kataifi, chocolate, and pistachios, and roll it up so the layers spiral through the crumb like the bar's cross-section.",
    tastingNote:
      "Rich nutty pistachio cream ribbons and molten chocolate against shards of buttery kataifi crunch — the viral candy bar as a sliceable dessert loaf.",
  },
  {
    name: "Tiramisu",
    flavorProfile: "sweet",
    whyTrending:
      "Coffee-dessert loaves are surging in dessert-bread roundups — tiramisu's espresso, mascarpone, and cocoa translate beautifully into a swirled sweet sourdough (and pair perfectly with your own espresso).",
    inclusions: [
      "Strong cooled espresso or cold brew, swapped for part of the dough water, 80g",
      "Mascarpone, dolloped in cold, 120g",
      "White chocolate chips, 80g",
      "Cocoa powder for dusting the crust plus a little in the swirl, 15g",
    ],
    foldInTip:
      "Swap the cooled espresso for an equal weight of water at mixing for a mocha-tinted crumb, laminate the cold mascarpone and white chocolate in during shaping so they stay in creamy pockets, and dust the crust with cocoa before scoring.",
    tastingNote:
      "Espresso-scented crumb with creamy mascarpone pockets, mellow white chocolate, and a bittersweet cocoa crust — tiramisu you can toast.",
  },
  {
    name: "Kimchi & Aged Cheddar",
    flavorProfile: "spicy",
    whyTrending:
      "The flagship of the Asian-fusion sourdough wave — funky, fermented kimchi paired with sharp cheese, everywhere on baking TikTok and YouTube in 2025–2026.",
    inclusions: [
      "Well-fermented kimchi, chopped small and cooked dry in a hot skillet until the juice cooks off, then cooled, 120g",
      "Aged sharp cheddar or Monterey Jack, cubed, 120g",
      "Scallions, sliced, 40g",
      "Toasted sesame seeds, 10g",
    ],
    foldInTip:
      "Cook the chopped kimchi in a dry skillet until it looks dry so its brine doesn't slacken the dough, cool it fully, then laminate it with the cheese, scallions, and sesame during shaping.",
    tastingNote:
      "Double-fermented tang from kimchi and starter, gentle chili warmth, and melty sharp cheese — savory, funky, and built for a next-level grilled cheese.",
  },
  {
    name: "Buffalo Chicken & Blue Cheese",
    flavorProfile: "spicy",
    whyTrending:
      "A perennial game-day favorite climbing 2025–2026 savory add-in lists — buffalo wing flavor (hot sauce, chicken, blue cheese) baked straight into a loaf.",
    inclusions: [
      "Cooked shredded chicken tossed in Buffalo hot sauce then drained well, 120g",
      "Blue cheese, crumbled, 70g",
      "Sharp cheddar, cubed, 70g",
      "Celery, finely diced and patted dry, plus chives, 40g",
    ],
    foldInTip:
      "Drain the sauced chicken thoroughly so excess hot sauce doesn't over-hydrate the dough, then laminate everything in together during shaping so tangy blue cheese and spicy chicken alternate through the crumb.",
    tastingNote:
      "Vinegary Buffalo heat, savory shredded chicken, and funky blue cheese with a fresh celery snap — a plate of wings in chewy loaf form.",
  },
  {
    name: "Cacio e Pepe",
    flavorProfile: "savory",
    whyTrending:
      "The Roman-pasta-inspired loaf that became a TikTok staple in 2025 — just pecorino and cracked black pepper, but wildly popular for how much punch two ingredients deliver.",
    inclusions: [
      "Pecorino Romano, finely grated (grate rather than cube to keep the crumb tight), 130g",
      "Parmesan, finely grated, 40g",
      "Coarsely cracked black pepper, toasted briefly to bloom, 8g",
      "Extra grated pecorino to press onto the crust, 25g",
    ],
    foldInTip:
      "Fold the cracked pepper in during the first set of stretch-and-folds, then work the finely grated pecorino and parmesan evenly through the dough during the second set (grated, not chunked, so it flavors every bite without blowing out big holes); press extra pecorino onto the crust before scoring.",
    tastingNote:
      "Sharp, salty pecorino woven all the way through a tender crumb with a warm, peppery bite and a crisp cheese-lacquered crust — cacio e pepe you can slice.",
  },
  {
    name: "Roasted Garlic & Herb Parmesan",
    flavorProfile: "savory",
    whyTrending:
      "A repeatedly top-ranked savory add-in — whole cloves of slow-roasted garlic turned sweet and mellow, folded in with parmesan and fresh herbs.",
    inclusions: [
      "Garlic cloves, slow-roasted whole until soft and golden, 90g",
      "Parmesan, cubed and grated (a mix), 110g",
      "Fresh rosemary and thyme, chopped, 6g",
      "Garlic powder for the crust, 4g",
    ],
    foldInTip:
      "Fold the herbs and grated parmesan in during the second set of stretch-and-folds, then laminate the whole roasted garlic cloves and parmesan cubes in during shaping so the cloves stay intact and buttery.",
    tastingNote:
      "Sweet, mellow pockets of whole roasted garlic against salty parmesan and piney herbs — a garlic-bread lover's dream in boule form.",
  },
  {
    name: "Hatch Green Chile & Smoked Gouda",
    flavorProfile: "spicy",
    whyTrending:
      "The Southwest's signature loaf, a staple of New Mexico bakers (Alegre Bread) and a big fall-harvest trend — roasted Hatch green chiles folded in with smoky melting cheese.",
    inclusions: [
      "Roasted Hatch green chiles, drained hard and patted very dry, chopped, 90g",
      "Smoked Gouda, cut into 1/4-inch cubes, 110g",
      "Sharp white cheddar, cubed, 60g",
      "Ground cumin plus garlic powder, 4g",
    ],
    foldInTip:
      "Canned or jarred chiles run wet, so strain and pat them bone-dry first, then laminate the chiles and both cheeses in during the first set of folds so they form defined pockets rather than slackening the crumb.",
    tastingNote:
      "Roasty, earthy Hatch-chile warmth against smoky molten gouda pockets — a New Mexico green-chile classic baked into a tangy loaf.",
  },
  {
    name: "Elote (Mexican Street Corn)",
    flavorProfile: "spicy",
    whyTrending:
      "A viral fusion in the Sourdough Geeks group — esquites (corn, cotija, chili-lime) folded into a loaf that bakers keep calling 'like jalapeño cheddar but even better.'",
    inclusions: [
      "Fire-roasted or grilled corn kernels, drained and patted very dry, 130g",
      "Cotija, crumbled, 80g",
      "Pickled or fresh jalapeño, diced small, 30g",
      "Tajín / chili-lime seasoning plus the zest of 1 lime, 6g",
    ],
    foldInTip:
      "Corn is wet and will slacken the dough, so dry it as much as you can, then laminate the corn, cotija, and jalapeño in during shaping; dust the crust with a little extra Tajín before scoring.",
    tastingNote:
      "Sweet charred corn, salty cotija, and a tangy chili-lime kick — Mexican street corn baked straight into a chewy crumb.",
  },
  {
    name: "Za'atar, Olive & Feta",
    flavorProfile: "savory",
    whyTrending:
      "Rides the continuing Mediterranean-mezze wave — earthy za'atar (sumac, thyme, sesame) with briny olives and feta, a fresh Levantine spin on the popular olive-feta loaf.",
    inclusions: [
      "Za'atar spice blend, 15g (plus a pinch for the crust)",
      "Feta, crumbled into chunks, 90g",
      "Kalamata olives, pitted, halved, and dried, 80g",
      "Good extra-virgin olive oil to brush the crust, 15g",
    ],
    foldInTip:
      "Fold the za'atar in during the second set of stretch-and-folds so its flavor spreads, laminate the feta and olives in during shaping, then brush the crust with olive oil and a final pinch of za'atar before baking.",
    tastingNote:
      "Herby, tangy sumac-and-thyme za'atar against briny olives and salty feta pockets — a mezze board in sliceable loaf form.",
  },
  {
    name: "Cinnamon Crunch Swirl (Panera copycat)",
    flavorProfile: "sweet",
    whyTrending:
      "One of TikTok's biggest copycat bakes — the Panera cinnamon-crunch swirl reimagined as sourdough, sharpened by the Taylor-Swift-fueled cinnamon-swirl craze.",
    inclusions: [
      "Cinnamon-sugar swirl: light brown sugar plus cinnamon, 80g",
      "Softened butter for the swirl, 30g",
      "Turbinado-and-cinnamon 'crunch' topping for the crust, 30g",
    ],
    foldInTip:
      "Laminate the dough thin, spread the softened butter, and sprinkle the cinnamon-sugar, then roll and coil-fold so it spirals through the crumb; press the turbinado-cinnamon topping onto the crust for the signature crackly crust.",
    tastingNote:
      "A soft cinnamon-swirled crumb under a crackly caramelized cinnamon-sugar crust — the Panera crunch bagel as a tangy sliceable loaf.",
  },
  {
    name: "Strawberries & Cream",
    flavorProfile: "sweet",
    whyTrending:
      "Summer 2025's breakout flavor (M&S's viral Wimbledon strawberries-and-cream sandwich spilled into baking) — freeze-dried strawberries and cream cheese folded into a springtime loaf.",
    inclusions: [
      "Freeze-dried strawberries (not fresh — fresh runs the dough wet), lightly crushed, 40g",
      "Cream cheese, frozen and cubed, 100g — or white chocolate chips, 90g",
      "Vanilla bean paste, 6g",
    ],
    foldInTip:
      "Freeze-dried strawberries keep the hydration in check, so avoid fresh; dollop the frozen cream cheese and scatter the crushed berries over the laminated dough during shaping so they stay in defined pink pockets instead of bleeding through.",
    tastingNote:
      "Tart-sweet strawberry pockets against creamy, tangy cream cheese — Wimbledon strawberries and cream you can toast.",
  },
  {
    name: "Chocolate Espresso",
    flavorProfile: "sweet",
    whyTrending:
      "Repeatedly called the sweet loaf that wins over skeptics — a sophisticated bittersweet mocha crumb that ties your baking straight into your morning espresso.",
    inclusions: [
      "Dutch-process cocoa, bloomed into the warm dough water, 25g",
      "Strong cooled espresso or cold brew, swapped for part of the dough water, 60g",
      "Dark chocolate chunks (60–70%), 110g",
      "Instant espresso powder for depth, 6g",
    ],
    foldInTip:
      "Bloom the cocoa and espresso powder into the warm water for an even mocha crumb (reduce the plain water to match), then laminate the dark chocolate chunks in during shaping so they stay in molten pockets.",
    tastingNote:
      "A deep bittersweet cocoa crumb with an espresso backbone and molten dark-chocolate pockets — the loaf that pairs itself with your morning shot.",
  },
  {
    name: "Lemon Poppyseed",
    flavorProfile: "sweet",
    whyTrending:
      "Named a leading 2026 sourdough flavor by bakery trend forecasters (bright citrus + speckled texture) and riding the Taylor-Swift-fueled sweet-loaf wave right alongside her viral blueberry-lemon loaf — a sunny, sugared-zest crumb.",
    inclusions: [
      "Lemon zest from 3 lemons, tossed with light sugar to draw out the oils, 25g",
      "Poppy seeds, 20g",
      "A little fresh lemon juice swapped for part of the dough water, 20g",
      "White chocolate chips, optional, 60g",
    ],
    foldInTip:
      "Toss the zest with the sugar and stir it plus the poppy seeds in early (first set of stretch-and-folds) so both spread evenly; swap the lemon juice for an equal weight of water at mixing, and laminate the white chocolate in during shaping if using.",
    tastingNote:
      "A fragrant, sunny crumb flecked with poppy seeds and perfumed with sugared lemon zest — the classic muffin flavor as a tangy sliceable loaf.",
  },
  {
    name: "Chocolate Orange",
    flavorProfile: "sweet",
    whyTrending:
      "Flagged as a rising 2026 sweet-crossover sourdough by British Baker / bakery trend reports — the Terry's-chocolate-orange pairing (bittersweet cocoa + bright citrus) folded into a loaf.",
    inclusions: [
      "Dutch-process cocoa, bloomed into the warm dough water, 22g",
      "Orange zest from 2 oranges, plus a splash of orange juice swapped for part of the water, 60g",
      "Dark chocolate chunks (60–70%), 110g",
      "Candied orange peel, finely chopped, optional, 40g",
    ],
    foldInTip:
      "Bloom the cocoa into the warm water (reduce the plain water to match) for an even chocolate crumb and stir in the orange juice; fold the zest in during the second set of folds, then laminate the dark chocolate (and candied peel) in during shaping so they stay in molten pockets.",
    tastingNote:
      "A bittersweet cocoa crumb lifted by bright orange oil, with molten dark-chocolate pockets and little chewy bursts of candied peel — Terry's chocolate orange you can toast.",
  },
  {
    name: "Cookies & Cream",
    flavorProfile: "sweet",
    whyTrending:
      "A breakout of the viral 'sourdough flight' trend on TikTok (bakers baking mini loaves in dessert flavors) — crushed chocolate sandwich cookies and white chocolate baked into a soft crumb.",
    inclusions: [
      "Chocolate sandwich cookies (Oreo-style), roughly broken into chunks, 100g",
      "White chocolate chips, 90g",
      "Cream cheese, frozen and cubed, optional for a cheesecake edge, 80g",
      "Vanilla bean paste, 6g",
    ],
    foldInTip:
      "Keep the cookie pieces chunky and add them late — laminate them with the white chocolate (and frozen cream cheese) in during shaping so they don't dissolve and grey out the whole crumb; stir the vanilla in at mixing.",
    tastingNote:
      "Cocoa-cookie crunch and creamy white-chocolate melts through a vanilla crumb — cookies and cream as a sliceable dessert loaf.",
  },
  {
    name: "Baklava Walnut-Honey",
    flavorProfile: "sweet",
    whyTrending:
      "Baklava-inspired formats were called out as a defining 2026 'elevated comfort' trend (layered, nutty, honey-soaked) — the walnut-cinnamon-honey filling and buttery phyllo crunch reimagined as a swirled sourdough.",
    inclusions: [
      "Walnuts (or a walnut-pistachio mix), toasted and finely chopped, tossed with cinnamon and a pinch of clove, 120g",
      "Kataifi or crushed phyllo, toasted in butter until deep golden and crisp, 50g",
      "Honey, warmed for swirling, plus extra to brush the crust, 70g",
      "A little orange-blossom or rose water, optional, 3g",
    ],
    foldInTip:
      "Toast the phyllo/kataifi in butter and cool it fully so it stays crunchy, then laminate the dough thin, brush with the warm honey (and blossom water), scatter the spiced walnuts and phyllo, and roll it up so the layers spiral through the crumb; brush the baked crust with a little more honey while warm.",
    tastingNote:
      "Spiced honey-soaked walnut ribbons against shards of buttery phyllo crunch — a slice of baklava turned into tangy sourdough.",
  },
  {
    name: "Mango Chamoy",
    flavorProfile: "spicy",
    whyTrending:
      "The clearest example of 2026's 'fricy' (fruity + spicy) wave that trend forecasters say is crossing from snacks into bakery — sweet-tart-spicy Mexican chamoy with dried mango and a Tajín-dusted crust.",
    inclusions: [
      "Dried mango, diced and pre-soaked (or add a little extra dough water for it to plump), 100g",
      "Chamoy sauce, reduced slightly so it isn't runny, swirled in, 50g",
      "Tajín / chili-lime seasoning plus the zest of 1 lime, 6g",
      "Pickled or fresh jalapeño, finely diced and patted dry, optional, 30g",
    ],
    foldInTip:
      "Pre-soak the dried mango (or add extra water at mixing so it plumps in the dough), then laminate the mango and jalapeño in during shaping and ribbon the reduced chamoy between the folds; dust the crust with a little Tajín before scoring. Cool at least 2 hours — the mango pockets act like molten jam.",
    tastingNote:
      "Juicy mango against a sweet-salty-tangy chamoy swirl and a slow chili-lime tingle — a Mexican street-snack flavor baked into a tangy loaf.",
  },
  {
    name: "Yuzu Kosho & White Cheddar",
    flavorProfile: "spicy",
    whyTrending:
      "Yuzu kosho — the Japanese fermented chili-citrus paste — was named specifically in 2026 'fricy'/botanical trend coverage as it moves from specialty menus into bakery; its bright, salty heat is a fresh spin on the jalapeño-cheddar loaf.",
    inclusions: [
      "Yuzu kosho paste, whisked into the dough water (it's salty — cut added salt to compensate), 30g",
      "Sharp white cheddar, cubed, 130g",
      "Scallions, thinly sliced, 40g",
      "Yuzu or lemon zest, from 1 fruit",
    ],
    foldInTip:
      "Whisk the yuzu kosho into the water at mixing (reducing the loaf's salt since the paste is salty), fold the zest and scallions in during the second set of folds, then laminate the cheddar cubes in during shaping so they stay in melty pockets.",
    tastingNote:
      "Bright fermented-citrus heat and salty green-chili zing against melty sharp cheddar and fresh scallion — jalapeño-cheddar's more aromatic Japanese cousin.",
  },
  {
    name: "Caprese",
    flavorProfile: "savory",
    whyTrending:
      "The breakout savory loaf of summer 2026 — the caprese salad (tomato, mozzarella, basil) turned into a boule went viral on Instagram via accounts like hercules_noble_food, riding the same 'salad-into-bread' wave as the elote and spinach-artichoke loaves.",
    inclusions: [
      "Sun-dried or oven-semi-dried tomatoes (fresh tomato is far too wet — dry it hard or use oil-packed, drained and blotted), chopped, 90g",
      "Low-moisture mozzarella pearls or cubes, patted dry, 120g",
      "Fresh basil, chiffonaded, 10g (plus a little dried basil for insurance, since fresh can brown)",
      "Garlic, minced, plus a splash of good balsamic reduced to a syrup, 15g",
    ],
    foldInTip:
      "Keep the tomatoes bone-dry so they don't slacken the crumb, fold the basil and garlic in during the second set of stretch-and-folds, then laminate the mozzarella and tomatoes in during shaping so they stay in defined red-and-white pockets; a drizzle of the balsamic syrup between folds adds sweet-tart depth.",
    tastingNote:
      "Sweet concentrated tomato, milky melted mozzarella, and fragrant basil against the tangy crumb — a caprese salad you can slice and toast, magic with a drizzle of olive oil.",
  },
  {
    name: "Boursin Garlic & Herb",
    flavorProfile: "savory",
    whyTrending:
      "Boursin's viral moment (the baked-Boursin-pasta craze) spilled straight into sourdough in 2025–2026 — the soft garlic-and-herb cheese melts into luscious creamy pockets, the easiest luxe savory upgrade going.",
    inclusions: [
      "Boursin garlic & herb cheese (or homemade garlic-herb whipped cream cheese), frozen and cut into small cubes, 130g",
      "Roasted garlic cloves, 60g",
      "Fresh chives and parsley, chopped, 8g",
      "Cracked black pepper plus a little garlic powder for the crust, 4g",
    ],
    foldInTip:
      "Freeze the Boursin cubes so they hold their shape instead of smearing into the gluten, fold the fresh herbs in during the second set of folds, then laminate the frozen cheese cubes and roasted garlic in during shaping so they melt into gooey herbed pockets.",
    tastingNote:
      "Rich, creamy garlic-and-herb cheese melting into soft pockets against sweet roasted garlic and a peppery crust — decadent savory comfort in loaf form.",
  },
  {
    name: "Caramelized Onion & Asiago",
    flavorProfile: "savory",
    whyTrending:
      "Repeatedly called a possible all-time-favorite savory inclusion in 2025–2026 baker roundups — deeply caramelized onions folded in with nutty, sharp Asiago, a more rustic cousin of the French onion loaf.",
    inclusions: [
      "Yellow onions, slow-caramelized in butter until jammy and deep amber, cooled and squeezed dry, 200g",
      "Asiago, cubed and a little grated (a mix), 130g",
      "Fresh thyme, chopped, 4g",
      "Extra grated Asiago to press onto the crust, 25g",
    ],
    foldInTip:
      "Cool the caramelized onions completely and squeeze out excess moisture so they don't slacken the dough, fold them in with the thyme during the first set of coil folds, then laminate the Asiago in during shaping and press the extra grated cheese onto the top before scoring so it crisps into a lacy crust.",
    tastingNote:
      "Sweet, jammy caramelized onion against nutty, salty Asiago that browns into a crackly cheese crust — savory, deeply oniony, and built for a soup night.",
  },
  {
    name: "Chorizo & Manchego",
    flavorProfile: "spicy",
    whyTrending:
      "Spanish tapas flavors are surging (chorizo had a headline 2026 comeback moment), and smoky paprika-spiced chorizo with nutty Manchego makes a bold, oily-in-the-best-way spicy loaf that eats like a tapa.",
    inclusions: [
      "Cured Spanish chorizo, diced small and briefly dry-skillet-rendered then blotted of its red oil, cooled, 110g",
      "Manchego, cubed, 120g",
      "Smoked paprika (pimentón) plus a pinch of cayenne, 5g",
      "Fresh parsley and a little orange zest, optional, 6g",
    ],
    foldInTip:
      "Render the diced chorizo briefly and blot off the paprika oil so it doesn't grease out the gluten (save a little to brush the crust for color), fold the smoked paprika in during the second set of folds, then laminate the chorizo and Manchego in during shaping.",
    tastingNote:
      "Smoky, garlicky paprika heat from the chorizo against nutty melted Manchego pockets and a paprika-lacquered crust — a Spanish tapas board baked into a tangy loaf.",
  },
  {
    name: "Nashville Hot",
    flavorProfile: "spicy",
    whyTrending:
      "Nashville hot chicken is still one of the biggest viral food trends (The Red Chickz and copycats all over TikTok), and its signature cayenne-brown-sugar heat with pickles translates into a punchy spicy loaf — a fierier cousin of the buffalo-chicken loaf.",
    inclusions: [
      "Nashville hot paste: cayenne, smoked paprika, brown sugar, and garlic powder bloomed in a little melted butter, cooled, 30g (plus extra to brush the crust)",
      "Sharp cheddar, cubed, 120g",
      "Dill pickles, diced and patted very dry, 70g",
      "Cooked crumbled chicken or crisp bacon, optional, 90g",
    ],
    foldInTip:
      "Bloom the cayenne-brown-sugar spices in butter and cool so the heat spreads without scorching, fold the paste in during the second set of stretch-and-folds, then laminate the cheddar, well-drained pickles (and chicken/bacon if using) in during shaping; brush the crust with a little more of the hot butter while warm.",
    tastingNote:
      "Slow-building cayenne heat rounded by brown-sugar sweetness, sharp melty cheddar, and bright pickle pop — Nashville hot chicken's crave-factor baked into a tangy crumb.",
  },
  {
    name: "Harissa & Whipped Feta",
    flavorProfile: "spicy",
    whyTrending:
      "Harissa whipped feta is a defining 2026 flavor (M&S released a ready-made tub; recipe feeds are full of it) — the North African chili paste ribboned through creamy, tangy feta brings the trendiest spicy-Mediterranean combo into a loaf.",
    inclusions: [
      "Harissa paste, reduced slightly so it isn't runny, swirled in, 40g (plus a little to brush the crust)",
      "Feta, half crumbled in chunks and half whipped smooth to a pipeable spread, 130g",
      "Roasted red pepper, drained and patted very dry, chopped, 60g",
      "Toasted sesame or a pinch of caraway plus mint, optional, 6g",
    ],
    foldInTip:
      "Blot the roasted peppers bone-dry, laminate the feta chunks and peppers in during shaping, and pipe a ribbon of the whipped feta and reduced harissa between the coil folds so it marbles through the crumb rather than pooling; brush the crust with a thin harissa glaze before baking for color.",
    tastingNote:
      "Smoky, aromatic chili warmth from the harissa ribboned through creamy, salty-tangy feta with sweet roasted-pepper pockets — a mezze-board spread baked straight into a spicy loaf.",
  },
  {
    name: "Truffle & Wild Mushroom",
    flavorProfile: "savory",
    whyTrending:
      "The luxe savory loaf topping 2026's gourmet 'inclusion flight' boards (a truffle-mushroom loaf featured alongside garlic-confit and pancetta loaves), and a long-running Forager Chef / Sourdough Geeks favorite — dried wild mushrooms rehydrated so the bread genuinely tastes of mushroom, finished with a whisper of truffle.",
    inclusions: [
      "Dried porcini / mixed wild mushrooms, rehydrated in hot water then squeezed dry and chopped (save the strained soaking liquid), 40g dried",
      "The strained mushroom soaking liquid, cooled and swapped for part of the dough water, 100g",
      "Fontina or Gruyère, cubed, 110g",
      "Truffle paste or a few drops of real truffle oil, plus thyme and a little roasted garlic, 15g",
    ],
    foldInTip:
      "Use the strained mushroom-soaking liquid as part of your dough water for deep umami, squeeze the rehydrated mushrooms bone-dry and fold them in with the thyme during the first set of folds, laminate the cheese in at shaping, and add the truffle very sparingly at shaping — a little reads elegant, too much turns synthetic.",
    tastingNote:
      "Deep, earthy wild-mushroom umami all through the crumb with molten cheese pockets and a haunting truffle perfume — a decadent savory loaf built for a swipe of butter or a soft egg.",
  },
  {
    name: "Sun-Dried Tomato & Goat Cheese",
    flavorProfile: "savory",
    whyTrending:
      "A repeatedly name-checked 2025–2026 'gourmet twist' inclusion — sweet-tart oil-packed sun-dried tomatoes against tangy, creamy chèvre, the Mediterranean-deli pairing that reads more refined than the cheddar version.",
    inclusions: [
      "Oil-packed sun-dried tomatoes, drained, blotted well, and chopped, 90g",
      "Soft goat cheese (chèvre), frozen and cut into small cubes, 110g",
      "Fresh basil and oregano, chopped, 6g",
      "Toasted pine nuts, optional, plus a little of the tomato oil to brush the crust, 30g",
    ],
    foldInTip:
      "Freeze the goat cheese cubes so they hold their shape instead of smearing, blot the tomatoes so their oil doesn't grease the gluten, fold the herbs in during the second set of folds, then laminate the tomatoes, cheese, and pine nuts in during shaping; brush the crust with a little tomato oil for color.",
    tastingNote:
      "Concentrated sweet-tart tomato against creamy, tangy goat-cheese pockets and toasty pine nuts — a sun-drenched deli loaf that's stunning with olive oil or under a fried egg.",
  },
  {
    name: "Zucchini & Parmesan",
    flavorProfile: "savory",
    whyTrending:
      "The garden-glut savory loaf getting fresh 2026 attention — grated zucchini and sharp Parmesan make a moist, tender savory crumb that pairs beautifully with soups and salads, a lighter alternative to the heavy cheese loaves.",
    inclusions: [
      "Zucchini, coarsely grated, tossed with salt, rested 20 min, then squeezed VERY dry in a towel, 150g grated (about 90g after squeezing)",
      "Parmesan, cubed and grated (a mix), 110g",
      "Garlic, minced, plus lemon zest and cracked black pepper, 8g",
      "Extra grated Parmesan to press onto the crust, 25g",
    ],
    foldInTip:
      "Zucchini is nearly all water, so salt it, rest it, and wring it out hard in a towel — this is the make-or-break step or the loaf turns gummy; fold the squeezed zucchini, garlic, zest, and pepper in during the first set of folds, laminate the Parmesan at shaping, and press extra Parmesan onto the top so it crisps.",
    tastingNote:
      "A tender, moist crumb flecked green with grated zucchini, sharp nutty Parmesan pockets, and a lacy cheese crust with a bright lemon-pepper lift — savory, garden-fresh, and soup's best friend.",
  },
  {
    name: "Chipotle Chocolate",
    flavorProfile: "spicy",
    whyTrending:
      "The textbook example of 2026's structural 'swicy' shift that trend forecasters (bakeryandsnacks, McCormick's Flavor Forecast) keep naming — instead of a chili drizzle on top, smoky chipotle heat is folded straight into a dark-chocolate crumb, a grown-up sweet-heat loaf.",
    inclusions: [
      "Dutch-process cocoa, bloomed into the warm dough water, 22g",
      "Ground chipotle plus a pinch of cinnamon, bloomed with the cocoa, 5g",
      "Dark chocolate chunks (60–70%), 110g",
      "Light brown sugar in the crumb plus smoked flaky salt for the crust, 25g",
    ],
    foldInTip:
      "Bloom the cocoa, chipotle, and cinnamon into the warm water together (reduce the plain water to match) so the heat spreads evenly instead of hot-spotting, work the brown sugar in at mixing, then laminate the dark chocolate chunks in during shaping so they stay in molten pockets; finish the crust with smoked flaky salt.",
    tastingNote:
      "A deep bittersweet cocoa crumb with molten dark-chocolate pockets and a slow, smoky chipotle warmth that builds on the finish — the swicy loaf that wins over people who think they don't like heat in dessert.",
  },
  {
    name: "Calabrian Chili & Honey",
    flavorProfile: "spicy",
    whyTrending:
      "Named a 'super unique sweet-and-spicy' 2026 combo in inclusion roundups — fiery, fruity Calabrian chili paste ribboned with honey (the sharper, more assertive hot-honey the swicy trend is moving toward) and melty cheese.",
    inclusions: [
      "Calabrian chili paste (or chopped oil-packed Calabrian chilies), drained of excess oil, 35g",
      "Honey, warmed for drizzling, plus extra to brush the crust, 45g",
      "Provolone or fontina, cubed, 120g",
      "Fresh oregano and a little garlic, 5g",
    ],
    foldInTip:
      "Drain the chili paste of excess oil so hydration stays put, fold the oregano and garlic in during the second set of folds, then laminate the cheese in at shaping and ribbon the Calabrian chili and honey between the coil folds (wear gloves); brush the baked crust with a little more honey while warm for a lacquered, sweet-hot finish.",
    tastingNote:
      "Bright, fruity Calabrian heat and floral honey against melty cheese pockets and a glossy sweet-hot crust — the sharpest, most assertive swicy loaf on the board, made for antipasto night.",
  },
  {
    name: "Pimento Cheese & Pickled Jalapeño",
    flavorProfile: "spicy",
    whyTrending:
      "Pimento cheese — 'the caviar of the South' — is having a national moment, and bakers are folding the sharp-cheddar-and-pimento spread (spiked with pickled jalapeño) straight into a loaf for a tangy, creamy, gently spicy Southern crowd-pleaser.",
    inclusions: [
      "Sharp cheddar, cubed, 120g",
      "Cream cheese, frozen and cut into small cubes, 80g",
      "Diced pimentos or roasted red pepper, drained and blotted very dry, 50g",
      "Pickled jalapeños, diced and patted dry, plus smoked paprika and a pinch of cayenne, 40g",
    ],
    foldInTip:
      "Freeze the cream cheese cubes so they hold their shape, blot the pimentos and pickled jalapeños bone-dry so their brine doesn't slacken the dough, fold the smoked paprika and cayenne in during the second set of folds, then laminate the cheddar, cream cheese, pimentos, and jalapeños in together during shaping.",
    tastingNote:
      "Creamy, tangy pimento-cheese pockets against sharp cheddar, sweet roasted pepper, and a bright pickled-jalapeño kick — a Southern snack-board spread baked into a soft, gently spicy loaf.",
  },
  {
    name: "Reuben (Corned Beef, Swiss & Kraut)",
    flavorProfile: "savory",
    whyTrending:
      "The deli-sandwich-as-loaf trend hit the Reuben in 2026 — bakers build a rye-leaning boule with pickle brine and caraway, then fold in corned beef, Swiss, and sauerkraut so the whole sandwich lives in the crumb.",
    inclusions: [
      "Dill pickle brine, swapped for part of the dough water for that rye-deli tang, 60g",
      "Caraway seeds, toasted, worked into the dough, 8g",
      "Cooked corned beef (or pastrami), diced small and patted dry, 100g",
      "Swiss or Gruyère, cubed, 110g",
      "Sauerkraut, squeezed VERY dry and chopped, 70g",
    ],
    foldInTip:
      "Swap the pickle brine for an equal weight of water at mixing and stir the toasted caraway in early; the make-or-break step is wringing the sauerkraut bone-dry so its brine doesn't slacken the dough, then laminate the corned beef, Swiss, and kraut in together during shaping. A little Thousand-Island-style paprika-and-mustard dust on the crust nods to the dressing.",
    tastingNote:
      "Caraway-scented, gently tangy crumb studded with savory corned beef, melty Swiss pockets, and bright funky kraut — a hot Reuben you can slice and griddle.",
  },
  {
    name: "Pretzel & Beer Cheese",
    flavorProfile: "savory",
    whyTrending:
      "Pretzel sourdough is a runaway 2026 trend — a baking-soda-bathed loaf with a deep-mahogany salty crust and a soft chewy interior, here stuffed with sharp cheddar and a splash of beer for a beer-cheese-dip-in-bread-form.",
    inclusions: [
      "Amber ale or lager, reduced by half and cooled, swapped for part of the dough water, 80g",
      "Sharp cheddar, cubed, 130g",
      "Baking-soda bath: 30g baking soda dissolved in 1L water for a 15–20 second dunk before baking",
      "Pretzel salt or coarse flaky salt for the crust, plus a little grated cheddar to crisp on top, 15g",
    ],
    foldInTip:
      "Reduce and cool the beer and swap it for an equal weight of water at mixing; laminate the cheddar cubes in during shaping. After the final proof, gently dunk the shaped loaf in the warm baking-soda bath for 15–20 seconds (don't skip this — it's what makes the true pretzel crust and color), then score, salt heavily, and bake.",
    tastingNote:
      "A glossy mahogany pretzel crust with a pretzel-salt crackle over a soft chewy crumb shot through with molten sharp-cheddar pockets — a warm soft pretzel and beer-cheese in one slice.",
  },
  {
    name: "Pesto & Mozzarella",
    flavorProfile: "savory",
    whyTrending:
      "A summery, aromatic laminated loaf all over the baking feeds in 2026 — basil pesto rippled through the crumb with milky mozzarella pearls, the fresh green counterpart to the caprese loaf.",
    inclusions: [
      "Basil pesto, drained of excess oil and used sparingly (too much seeps out during shaping), 60g",
      "Low-moisture mozzarella pearls or cubes, patted dry, 130g",
      "Toasted pine nuts, 30g",
      "Grated Parmesan to press onto the crust, 25g",
    ],
    foldInTip:
      "Pesto is oily, so measure it and go light — drain off the surface oil and spread a thin layer over the laminated dough, then scatter the mozzarella and pine nuts and fold up during shaping; a heavy hand makes it weep and turns the dough hard to handle. Press the Parmesan onto the crust before scoring so it crisps.",
    tastingNote:
      "Fragrant basil-garlic pesto swirled green through the crumb with milky melted mozzarella and toasty pine nuts — high summer in a loaf, unbeatable toasted for a caprese sandwich.",
  },
  {
    name: "Earl Grey & White Chocolate",
    flavorProfile: "sweet",
    whyTrending:
      "Tea-infused bakes are a named 2026 flavor axis (forecasters flag Earl Grey and chai crossing from cakes into bread) — bergamot-scented Earl Grey steeped into the dough water against creamy white chocolate for an elegant, perfumed sweet loaf.",
    inclusions: [
      "Earl Grey tea, 3–4 bags (or 8g loose) steeped strong in the hot dough water overnight then strained out, plus 2g finely ground leaves worked into the dough for flecks and aroma",
      "White chocolate chips or chunks, 110g",
      "Orange zest, from 1 orange, to amplify the bergamot, 8g",
      "A little honey or light brown sugar, 20g",
    ],
    foldInTip:
      "Steep the tea strong in the hot water overnight for a pronounced bergamot infusion, strain the bags out, and mix the dough with that tea-water plus the honey; fold the ground leaves and orange zest in during the first set of stretch-and-folds, then laminate the white chocolate in during shaping so it stays in creamy pockets.",
    tastingNote:
      "A fragrant, faintly floral bergamot crumb flecked with tea against sweet, creamy white-chocolate melts and a lift of orange — a cup of Earl Grey turned into toast.",
  },
  {
    name: "'Nduja & Hot Honey",
    flavorProfile: "spicy",
    whyTrending:
      "'Nduja — the soft, spreadable Calabrian chili salami — is having a major 2026 moment (all over pizza and toast feeds), and dolloped into a loaf with hot honey it makes the richest, most assertive swicy bake going, a fierier cousin of the Calabrian-chili-and-honey loaf.",
    inclusions: [
      "'Nduja, briefly warmed in a dry skillet to loosen it and render some of its chili oil (blot off the excess), cooled to a soft paste, 90g",
      "Hot honey, warmed for drizzling, plus extra to brush the crust, 45g",
      "Provolone or fontina, cubed, 110g",
      "Fresh oregano and a little orange zest, 5g",
    ],
    foldInTip:
      "'Nduja is soft and oily, so warm it just enough to spread, blot off the rendered red oil so it doesn't grease the gluten (save a little to brush the crust for color), and add it late — dot it across the laminated dough with the cheese during shaping and ribbon the hot honey between the coil folds (wear gloves); brush the baked crust with more hot honey while warm.",
    tastingNote:
      "Deep, smoky-spicy pork-and-chili richness from the 'nduja against floral hot-honey sweetness, melty cheese pockets, and a lacquered sweet-hot crust — the boldest swicy loaf on the board, made for a runny egg on top.",
  },
  {
    name: "Sweet Sriracha & Sharp Cheddar",
    flavorProfile: "spicy",
    whyTrending:
      "Sriracha keeps climbing the sweet-heat charts, and 2026 bakers are folding a sweetened sriracha glaze into cheddar loaves — a brighter, more garlicky-vinegary spin on jalapeño-cheddar that reads more flavor than fire.",
    inclusions: [
      "Sweet sriracha glaze: sriracha simmered briefly with a little honey and garlic until jammy, cooled, 45g (plus a little to brush the crust)",
      "Extra-sharp cheddar, cubed, 130g",
      "Scallions, thinly sliced, 40g",
      "Toasted sesame seeds for the crust, 10g",
    ],
    foldInTip:
      "Simmer the sriracha with honey and garlic into a jammy glaze so it isn't runny, cool it, then ribbon it across the laminated dough with the cheddar and scallions during shaping; brush the crust with a little more glaze and press on sesame before baking. Freshly shred/cube the cheddar and keep the glaze thick so the moisture stays in check.",
    tastingNote:
      "Bright garlicky-vinegary sriracha warmth rounded by honey against melty sharp-cheddar pockets and fresh scallion — the crave-factor of sriracha-mayo baked into a tangy loaf, more flavor than fire.",
  },
];

/** Specialty beans worth reviewing next. */
export const BEAN_IDEAS: BeanIdea[] = [
  {
    name: "Colombia La Palma Natural Gesha",
    roaster: "Onyx Coffee Lab",
    origin: "Colombia (Cauca / La Palma)",
    process: "Natural",
    roastLevel: "light",
    officialNotes: ["Jasmine", "Tropical fruit", "Bergamot", "Peach"],
    whyTry:
      "Onyx has held the #1 spot on The World's 100 Best Coffee Shops list in 2025 and 2026; their natural Gesha lots are the flagship of a clean, floral, fruit-bomb light roast.",
    approxPrice: "$40 / 5oz",
  },
  {
    name: "Costa Rica Las Lajas SL28 Anaerobic Natural",
    roaster: "Vibrant Coffee Roasters",
    origin: "Costa Rica (Central Valley / Las Lajas)",
    process: "Anaerobic natural",
    roastLevel: "light",
    officialNotes: ["Blackberry", "Raspberry jam", "Plum", "Red wine"],
    whyTry:
      "From the Chacon family's celebrated Las Lajas mill — a juicy 2025-harvest anaerobic pairing the prized SL28 variety with expert fermentation.",
    approxPrice: "$22 / 12oz",
  },
  {
    name: "Fast Forward (seasonal single origin)",
    roaster: "Counter Culture Coffee",
    origin: "Rotating (recent lots from Ethiopia / Colombia)",
    process: "Washed",
    roastLevel: "medium-light",
    officialNotes: ["Citrus", "Floral", "Clean", "Sweet"],
    whyTry:
      "The most transparently documented single origin in specialty coffee — an ideal 'reference washed coffee' benchmark to review.",
    approxPrice: "$20 / 12oz",
  },
  {
    name: "Ethiopia Yirgacheffe (Washed)",
    roaster: "The Barn (Berlin) / Tim Wendelboe (Oslo)",
    origin: "Ethiopia (Yirgacheffe)",
    process: "Washed",
    roastLevel: "light",
    officialNotes: ["Lemon", "Jasmine", "Bergamot", "Tea-like"],
    whyTry:
      "The genre-defining bright, floral washed Ethiopian — the classic yardstick every home barista should have tasted.",
    approxPrice: "$21 / 250g",
  },
  {
    name: "Devoción Colombian Single Origin",
    roaster: "Devoción",
    origin: "Colombia (Bogotá-managed farm network)",
    process: "Washed",
    roastLevel: "medium",
    officialNotes: ["Caramel", "Red apple", "Milk chocolate", "Sweet"],
    whyTry:
      "Devoción controls drying, export, and roasting for unusually fresh green coffee — a balanced, sweet everyday single origin that also pulls well as espresso.",
    approxPrice: "$22 / 12oz",
  },
  {
    name: "AVATARA — Gayo Carbonic Maceration Natural",
    roaster: "Hayati Coffee (Yogyakarta)",
    origin: "Indonesia (Gayo, Aceh)",
    process: "Carbonic maceration natural",
    roastLevel: "medium-light",
    officialNotes: ["Blueberry", "Cheesecake", "Creamy", "Sweet"],
    whyTry:
      "Indonesian roasters are emerging as serious experimental-process players; this carbonic maceration Gayo is blueberry-forward straight and even better in a flat white.",
    approxPrice: "$24 / 200g",
  },
  {
    name: "Kenya AA (Nyeri)",
    roaster: "Coffee Collective (Copenhagen)",
    origin: "Kenya (Nyeri)",
    process: "Washed",
    roastLevel: "light",
    officialNotes: ["Blackcurrant", "Grapefruit", "Tomato", "Red wine"],
    whyTry:
      "Kenyan SL28/SL34 is the boldest, most structured cup in specialty coffee — wine-like acidity and blackcurrant that demand your attention. The must-taste benchmark for high-acid coffee.",
    approxPrice: "$23 / 250g",
  },
  {
    name: "Guatemala Huehuetenango (Reserve)",
    roaster: "Tandem Coffee Roasters (Portland, ME)",
    origin: "Guatemala (Huehuetenango)",
    process: "Washed",
    roastLevel: "medium",
    officialNotes: ["Cocoa", "Brown sugar", "Warm spice", "Syrupy"],
    whyTry:
      "A balanced, richer Central American cup with cocoa and brown-sugar sweetness and a syrupy body — an easy bridge from darker roasts into specialty, and a great everyday espresso.",
    approxPrice: "$19 / 12oz",
  },
  {
    name: "El Vergel — Lychee Thermal-Shock Co-Ferment",
    roaster: "Sey Coffee (Brooklyn)",
    origin: "Colombia (Tolima / El Vergel Estate)",
    process: "Thermal-shock co-ferment (natural)",
    roastLevel: "light",
    officialNotes: ["Lychee", "Strawberry", "Rosé", "Candied"],
    whyTry:
      "Co-ferments are the defining experimental process of 2026 (68% of specialty roasters now stock them), and El Vergel is the estate that put competition-grade fruit-in-the-tank lots on the map — the clearest way to taste what co-fermentation actually does. Brew fresh as pour-over.",
    approxPrice: "$28 / 250g",
  },
  {
    name: "Uganda Sipi Falls (Natural)",
    roaster: "Square Mile Coffee Roasters (London)",
    origin: "Uganda (Mt. Elgon / Sipi Falls)",
    process: "Natural",
    roastLevel: "medium-light",
    officialNotes: ["Red berries", "Cocoa", "Orange", "Syrupy"],
    whyTry:
      "Uganda is 2026's emerging origin to watch, and Mt. Elgon naturals deliver berry-and-cocoa sweetness with a syrupy body — a fresh origin for the review shelf beyond the usual Ethiopia/Kenya axis.",
    approxPrice: "$19 / 350g",
  },
  {
    name: "Brazil Cerrado (Pulped Natural)",
    roaster: "Verve Coffee Roasters (Santa Cruz)",
    origin: "Brazil (Cerrado Mineiro / Sul de Minas)",
    process: "Pulped natural",
    roastLevel: "medium-dark",
    officialNotes: ["Milk chocolate", "Hazelnut", "Caramel", "Brown sugar"],
    whyTry:
      "Every bean on this board so far is a bright, high-acid light roast — this fills the gap with a low-acid, chocolate-and-nut espresso base that pulls thick, sweet crema and shines in milk. It's the reference bean for the shaken-espresso and cortado drinks below, and the perfect pairing for the Tiramisu and Chocolate Espresso loaves.",
    approxPrice: "$18 / 12oz",
  },
  {
    name: "Honduras Santa Bárbara — Yellow Honey",
    roaster: "Black & White Coffee Roasters (Raleigh)",
    origin: "Honduras (Santa Bárbara)",
    process: "Yellow honey",
    roastLevel: "medium-light",
    officialNotes: ["Honeycomb", "Red apple", "Dried apricot", "Nougat"],
    whyTry:
      "Honey process is the one gap in this board's line-up — every other bean is washed, natural, or an experimental co-ferment, and 2026 coverage keeps flagging the full 'natural / honey / washed' spectrum as the way to taste how process alone reshapes a cup. This yellow-honey Santa Bárbara is the sweet, syrupy-bodied middle path: cleaner than a natural, rounder and more caramel-sweet than a washed. Brew as pour-over or a forgiving everyday espresso.",
    approxPrice: "$20 / 12oz",
  },
  {
    name: "Ethiopia Guji (Natural)",
    roaster: "SEY / Onyx / Roastworks (widely stocked)",
    origin: "Ethiopia (Guji, Oromia)",
    process: "Natural (dry-processed)",
    roastLevel: "light",
    officialNotes: ["Blueberry", "Strawberry", "Baking chocolate", "Floral"],
    whyTry:
      "Every Ethiopian on this board so far is a washed Yirgacheffe — but the classic 'blueberry-bomb' natural comes from Guji, the region that year after year produces the most explosive fruit-forward naturals (whole cherries dried on raised beds for weeks). It's the essential natural-Ethiopia benchmark, and its bright, refreshing character also makes it the ideal bean for the viral coffee lemonade below. Brew as pour-over for the full blueberry-to-cocoa range.",
    approxPrice: "$21 / 250g",
  },
];

/** Creative espresso/latte drinks trending in 2025–2026. */
export const DRINK_IDEAS: DrinkIdea[] = [
  {
    name: "Espresso Tonic",
    category: "espresso",
    brewRatio: "1:2",
    description:
      "A three-ingredient iced drink (tonic, ice, espresso) whose layered look made it a viral 2025 staple — bright, bittersweet, and effervescent.",
    buildSteps: [
      "Fill a tall clear glass with ice, then pour tonic water until about three-quarters full.",
      "Pull a fresh double shot of espresso (aim for a fruity light roast).",
      "Slowly pour the espresso over the back of a spoon so it floats and layers over the tonic.",
      "Garnish with a slice of orange or lime; stir just before drinking.",
    ],
  },
  {
    name: "Iced Ube Dirty Latte",
    category: "latte",
    brewRatio: "1:2",
    description:
      "The breakout purple drink of 2025–2026 — creamy Filipino ube layered under a shot of espresso for a striking violet 'dirty' latte.",
    buildSteps: [
      "Add a small measure of ube extract to a tall glass and fill with ice (careful — it stains).",
      "Pour in cold milk (almond or whole) and stir until evenly purple.",
      "Dissolve a little sugar into a hot double shot of espresso to avoid gritty settling.",
      "Pour the sweetened espresso over the ube milk; optionally top with ube cold foam and crushed pistachios.",
    ],
  },
  {
    name: "Soup Shot (1:4 Long Espresso)",
    category: "espresso",
    brewRatio: "1:4",
    description:
      "A home-barista-born trend now hitting café menus: a highly extracted, tea-like 'sippable' long shot that showcases delicate fruit and floral notes.",
    buildSteps: [
      "Dose your normal basket but plan for a longer 1:4 yield (e.g. 18g in, ~72g out).",
      "Grind a touch coarser than usual so the shot flows without over-bittering.",
      "Pull the shot long and slow into a small cup or glass, watching for a syrupy, even stream.",
      "Sip like a tea to taste how the extended extraction opens up light-roast aromatics.",
    ],
  },
  {
    name: "Iced Brown Sugar Shaken Espresso",
    category: "espresso",
    brewRatio: "1:2",
    description:
      "The TikTok / café-copycat phenomenon — espresso shaken hard with brown sugar and cinnamon over ice, topped with a splash of milk.",
    buildSteps: [
      "Pull a double shot and stir in 1–2 tsp brown sugar and a pinch of cinnamon while it's still hot so it dissolves.",
      "Add the sweetened shot to a shaker with ice and shake hard for 15–20 seconds to build a frothy crema.",
      "Pour over a glass of fresh ice.",
      "Top with a splash of milk or oat milk and a final dusting of cinnamon.",
    ],
  },
  {
    name: "Pistachio Cream Cold Foam Latte",
    category: "latte",
    brewRatio: "1:2",
    description:
      "Riding the same pistachio craze as the Dubai chocolate loaf — an iced latte crowned with a whipped pistachio-cream cold foam, one of the most-ordered specialty drinks of 2025–2026.",
    buildSteps: [
      "Whisk or froth cold milk with a spoonful of pistachio cream (or pistachio syrup) and a splash of heavy cream until it holds soft peaks.",
      "Fill a tall glass with ice and pour in cold milk, leaving room at the top.",
      "Pull a double shot of espresso and pour it over the iced milk.",
      "Spoon the pistachio cold foam over the top and finish with crushed toasted pistachios.",
    ],
  },
  {
    name: "Dirty Matcha Latte",
    category: "latte",
    brewRatio: "1:2",
    description:
      "A top-five café drink of 2026 — a bright ceremonial-matcha base 'dirtied' with a shot of espresso for a layered green-and-brown cup that unites tea and coffee people in one glass.",
    buildSteps: [
      "Sift 2g ceremonial-grade matcha (culinary turns muddy and bitter) and whisk with a splash of ~80°C water until smooth and frothy.",
      "Fill a tall glass with ice, pour in cold milk (oat holds the layers best), then the matcha, stirring to an even green.",
      "Pull a fresh double shot of espresso.",
      "Slowly pour the espresso over the back of a spoon so it floats over the green; stir just before drinking.",
    ],
  },
  {
    name: "Oleato Shaken Espresso",
    category: "espresso",
    brewRatio: "1:2",
    description:
      "The Starbucks-born olive-oil coffee trend, still viral in 2026 — espresso shaken with good extra-virgin olive oil for a silky, buttery, lightly peppery cup.",
    buildSteps: [
      "Pull a double shot and add it to a shaker with a tablespoon of a peppery extra-virgin olive oil (cheap oil tastes greasy — use a fruity Sicilian or Tuscan).",
      "Add ice and shake hard for 15–20 seconds so the oil emulsifies into the espresso — this is the whole trick; under-shaken and it splits.",
      "Pour over a glass of fresh ice.",
      "Top with a splash of barista oat milk and, optionally, a twist of lemon peel and a pinch of flaky salt.",
    ],
  },
  {
    name: "Cortado",
    category: "espresso",
    brewRatio: "1:1 espresso-to-milk",
    description:
      "2026's quiet counter-trend to oversized sugary drinks — a small (~4oz) Spanish espresso 'cut' with an equal measure of warm, barely-textured milk that softens the acidity without burying the bean. The espresso stays front and center, so it's the ideal way to taste a chocolatey medium-dark like the Brazil Cerrado above.",
    buildSteps: [
      "Pull a fresh double shot (about 36g) into a small 4–4.5oz glass or gibraltar tumbler.",
      "Steam ~40g of milk to just warm (about 55–60°C) with only a thin skin of microfoam — a cortado has texture, not a cappuccino's airy foam.",
      "Pour the warm milk straight into the espresso to an even 1:1, letting the crema fold through so there's no distinct foam cap.",
      "Serve small and drink promptly — no sugar needed; the milk alone rounds the shot into a smooth, espresso-forward sip.",
    ],
  },
  {
    name: "Caffè Shakerato",
    category: "espresso",
    brewRatio: "1:2",
    description:
      "The Italian purist's answer to the sugary shaken-espresso wave — just espresso and ice shaken hard until it turns silky and crowned with a thick natural foam, no syrup. It's re-trending in 2026 as the elegant, unsweetened counter to the brown-sugar version, and it's the clearest way to show off a chocolatey medium-dark like the Brazil Cerrado.",
    buildSteps: [
      "Pull a fresh double shot (about 36g) — a chocolatey medium-dark froths thickest — into a cocktail shaker.",
      "Add a scoop of ice (and, if you like, no more than a bar-spoon of sugar or a splash of simple syrup — the classic is unsweetened).",
      "Shake hard for 20–30 seconds until the shaker frosts over and the espresso builds a dense caramel-colored foam.",
      "Double-strain (no ice) into a chilled coupe or small glass so it pours out silky with a thick foam cap; drink immediately before it separates.",
    ],
  },
  {
    name: "Coffee Lemonade (Dirty Lemonade)",
    category: "espresso",
    brewRatio: "1:2",
    description:
      "The breakout summer drink of 2026 (91M+ TikTok posts as 'dirty lemonade,' with Scandinavian café roots) — a fresh tart lemonade poured over ice and 'dirtied' with a shot of espresso for a bright, sweet-tart, dairy-free pick-me-up. A fruity natural like the Guji above sings here.",
    buildSteps: [
      "Make a fresh lemonade base: fresh lemon juice and a little simple syrup to taste, cut with cold water.",
      "Fill a tall clear glass with ice and pour in the lemonade until about three-quarters full.",
      "Pull a fresh double shot of espresso — a bright, fruity light roast (a natural Ethiopian is ideal) plays best against the citrus.",
      "Slowly pour the espresso over the back of a spoon so it floats in a dark layer over the lemonade; garnish with a lemon wheel and stir just before drinking.",
    ],
  },
];
