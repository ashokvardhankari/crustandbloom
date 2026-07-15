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
  {
    name: "Gochujang Hot Honey & Asiago",
    flavorProfile: "spicy",
    whyTrending:
      "The exact test loaf 2026 bakers are posting (e.g. wyld.woman.bakery) as the 'swicy' trend matures — gochujang and hot honey are two of the specific heat sources (alongside harissa and Calabrian chile) that flavor forecasters name for taking sweet-heat 'to the next level,' here folded structurally into the crumb with nutty Asiago rather than drizzled on top.",
    inclusions: [
      "Gochujang, whisked into the dough water (reduce hydration ~5% since it's a wet paste), 50g",
      "Hot honey, warmed for ribboning, plus extra to brush the crust, 45g",
      "Asiago, cubed and a little grated, 120g",
      "Scallions and toasted sesame seeds, 40g",
    ],
    foldInTip:
      "Whisk the gochujang into the water at mixing so its fermented sweet-heat spreads through the whole crumb, fold the scallions and sesame in during the second set of folds, then laminate the Asiago in at shaping and ribbon the hot honey between the coil folds (wear gloves); brush the baked crust with a little more hot honey while warm for a lacquered sweet-hot finish.",
    tastingNote:
      "Deep fermented gochujang warmth and floral hot-honey sweetness woven all through a tangy crumb with nutty melted Asiago pockets and a glossy sweet-hot crust — the swicy loaf built for the fermented-chili era.",
  },
  {
    name: "Serrano & Candied Jalapeño Double Cheddar",
    flavorProfile: "spicy",
    whyTrending:
      "The 'elevated jalapeño cheddar' that went viral after one baker's 12-loaf, five-round test — instead of one pepper it layers fresh jalapeño, serrano for real kick, and candied jalapeño for sweetness, with white and yellow cheddar and a splash of jalapeño juice in the dough, turning the board's most classic combo into a complex swicy showpiece.",
    inclusions: [
      "Fresh jalapeños (seeded) plus a serrano or two for heat, diced and patted very dry, 90g",
      "Candied jalapeños ('cowboy candy'), drained and blotted, chopped, 50g",
      "White and yellow sharp cheddar, cubed, 140g",
      "A splash of pickled-jalapeño brine swapped for part of the dough water, 30g",
    ],
    foldInTip:
      "Swap the jalapeño brine for an equal weight of water at mixing for background heat and flavor, pat all the peppers bone-dry so their moisture doesn't slacken the dough, then laminate the fresh peppers, candied jalapeños, and both cheddars in together during shaping so sharp heat and sweet candied bursts alternate through the crumb; sprinkle a little extra cheddar on top to crisp.",
    tastingNote:
      "Layered green heat — grassy fresh jalapeño, a serrano bite, and sweet candied-jalapeño pops — against two melty cheddars and a crackly cheese crust, the jalapeño-cheddar loaf turned all the way up.",
  },
  {
    name: "Salsa Macha & Oaxaca Cheese",
    flavorProfile: "spicy",
    whyTrending:
      "Spiced chili oils are a headline 2026 heat source — the IFT Outlook and flavor forecasters specifically flag salsa macha (Mexican dried-chili-and-seed oil) and Sichuan chili crisp as rising — and folding nutty, smoky salsa macha into a loaf with stringy Oaxaca cheese is the Mexican answer to the viral chili-crunch bake.",
    inclusions: [
      "Salsa macha (dried chili, garlic, peanut, and sesame oil), most of the oil drained off, 35g",
      "Oaxaca or low-moisture mozzarella, pulled or cubed, 130g",
      "Toasted peanuts and sesame seeds from the macha, 30g",
      "A little cotija to crumble on the crust plus lime zest, 20g",
    ],
    foldInTip:
      "Spoon off most of the macha's oil so hydration stays put (save a little to brush the crust for color and sheen), then spoon the chili-nut solids across the laminated dough with the cheese and toasted peanuts and fold up during shaping; press cotija and a little extra sesame onto the crust before scoring.",
    tastingNote:
      "Smoky, nutty, garlicky dried-chili warmth and crunchy peanut-sesame bits against stringy melted Oaxaca cheese and a salty cotija crust — the depth of salsa macha, more toasty than fiery, baked into a tangy loaf.",
  },
  {
    name: "Muffuletta Olive Salad",
    flavorProfile: "savory",
    whyTrending:
      "The New Orleans deli sandwich is the next 'sandwich-as-loaf' after the Reuben — its briny chopped olive salad (olives, giardiniera, garlic, herbs) folded in with provolone and salami turns the muffuletta's whole flavor into a boule, riding 2026's Promiscuous-Palate love of bold, briny deli formats.",
    inclusions: [
      "Olive salad: green and Kalamata olives, giardiniera, and roasted red pepper, chopped and drained VERY well, 120g",
      "Provolone, cubed, 110g",
      "Genoa salami or mortadella, diced small and patted dry, 70g",
      "Dried oregano, garlic, and a splash of the olive-salad oil to brush the crust, 8g",
    ],
    foldInTip:
      "The olive salad is packed in oil and brine, so drain and blot it hard or it will grease and slacken the dough; fold the oregano and garlic in during the second set of folds, then laminate the drained olive salad, provolone, and salami in together during shaping and brush the crust with a little of the reserved oil for sheen.",
    tastingNote:
      "Briny, garlicky olive-and-giardiniera punch against melty provolone and savory cured salami — the whole muffuletta baked into a chewy crumb, unbeatable pressed into a grilled sandwich.",
  },
  {
    name: "Pancetta & Gruyère",
    flavorProfile: "savory",
    whyTrending:
      "One of the cured-pork 'gourmet flight' loaves featured alongside the truffle-mushroom bake on 2026 inclusion boards — crisped pancetta lardons rendered of their fat and folded in with nutty Gruyère make a rich, bistro-style savory loaf, a more refined cousin of the bacon-cheddar-ranch loaf.",
    inclusions: [
      "Pancetta, diced small, rendered crisp, drained on paper, and cooled, 110g",
      "Gruyère, cubed, 120g",
      "Fresh thyme and cracked black pepper, 5g",
      "A little grated Gruyère to press onto the crust, 20g",
    ],
    foldInTip:
      "Render the pancetta until crisp and drain it well on paper towel so its fat doesn't grease out the gluten, cool it fully, fold the thyme and pepper in during the second set of folds, then laminate the pancetta and Gruyère cubes in during shaping and press the extra grated Gruyère onto the top so it browns into a lacy crust.",
    tastingNote:
      "Salty, savory crisped-pancetta bits against nutty melted Gruyère pockets and a thyme-and-pepper lift, with a crackly cheese crust — a bistro flavor baked into a tangy loaf, made for a soft egg or a bowl of soup.",
  },
  {
    name: "Brown Butter Chocolate Chunk Cookie",
    flavorProfile: "sweet",
    whyTrending:
      "The enriched-dessert crossover Puratos calls the 'sourdough revolution' into pastries — bakers are chasing the brown-butter chocolate-chip cookie flavor in a loaf, browning the butter for nutty toffee depth and folding in chocolate chunks and flaky salt for the ultimate sweet toast.",
    inclusions: [
      "Butter, browned until nutty and cooled to soft, worked into the dough (an enriched sweet dough), 50g",
      "Dark and milk chocolate chunks, 120g",
      "Light brown sugar plus a little vanilla bean paste, 40g",
      "Toasted pecans or walnuts, optional, plus flaky salt for the crust, 40g",
    ],
    foldInTip:
      "Brown the butter until it smells of toffee, cool it to a soft paste, and work it plus the brown sugar and vanilla into the dough as an enrichment (it slows fermentation a little, so give it extra time), then laminate the chocolate chunks (and nuts) in during shaping so they stay in molten pockets; finish the crust with flaky salt.",
    tastingNote:
      "A tender, faintly toffee-nutty enriched crumb from the brown butter with molten dark-and-milk chocolate pockets and a flaky-salt finish — a warm chocolate-chip cookie turned into a sliceable, tangy dessert loaf.",
  },
  {
    name: "Philly Cheesesteak",
    flavorProfile: "savory",
    whyTrending:
      "The next deli-sandwich-as-loaf after the Reuben and muffuletta — 2026's 'meal-inspired loaf' wave keeps recreating familiar dishes in bread form, and the Philly (shaved steak, sweated onions and peppers, melty provolone) is the obvious crowd-pleaser to fold into a boule.",
    inclusions: [
      "Shaved ribeye or sirloin, quick-seared, chopped small, drained of its juices, and cooled, 120g",
      "Yellow onion and green bell pepper, sweated in the beef fat until soft, squeezed dry, and cooled, 120g",
      "Provolone (and a little white American for gooeyness), cubed, 120g",
      "Worcestershire plus garlic powder and cracked black pepper, 6g",
    ],
    foldInTip:
      "Cook the steak and the onion-pepper mix, then drain and blot both bone-dry and cool them fully so their juices don't slacken the dough; fold the Worcestershire and pepper in during the second set of folds, then laminate the steak, vegetables, and provolone in together during shaping so every slice eats like a bite of the sandwich.",
    tastingNote:
      "Savory shaved beef, sweet soft onions and peppers, and molten provolone pockets through a tangy crumb — a whole cheesesteak baked into a loaf that's unbeatable griddled with extra cheese.",
  },
  {
    name: "Spanakopita (Spinach & Feta)",
    flavorProfile: "savory",
    whyTrending:
      "Rides the durable Mediterranean-mezze wave into a specific Greek classic — the spanakopita filling (spinach, feta, dill, scallion, lemon) folded into a loaf is the meal-inspired savory bake bakers keep requesting, a fresher, herbier cousin of the spinach-artichoke loaf.",
    inclusions: [
      "Frozen spinach, thawed and squeezed VERY dry, chopped, 120g",
      "Feta, crumbled into chunks, 130g",
      "Scallions and fresh dill, chopped, 20g",
      "Lemon zest, a little garlic, and a pinch of nutmeg, 6g",
    ],
    foldInTip:
      "The make-or-break step is wringing the spinach bone-dry in a towel so its water doesn't turn the crumb gummy; fold the scallions, dill, lemon zest, garlic, and nutmeg in during the second set of folds, then laminate the squeezed spinach and feta in during shaping so they stay in defined green-and-white pockets.",
    tastingNote:
      "Earthy spinach, salty tangy feta, and bright dill-and-lemon lift through a chewy crumb — the whole spanakopita filling baked into a loaf, gorgeous brushed with olive oil and toasted.",
  },
  {
    name: "Peri-Peri Chicken & Pepper Jack",
    flavorProfile: "spicy",
    whyTrending:
      "Peri-peri is explicitly named a rising 2026 heat source by IFT's flavor outlook (alongside serrano and Thai chili) as the Nando's-fueled African-bird's-eye-chili craze goes mainstream — its bright, garlicky, citrus-lifted burn makes a fresh, globally-inspired spin on the buffalo-chicken loaf.",
    inclusions: [
      "Cooked shredded chicken tossed in peri-peri sauce (bird's-eye chili, garlic, lemon, smoked paprika) then drained well, 120g",
      "Pepper Jack, cubed, 120g",
      "Roasted red pepper, drained and patted very dry, chopped, 60g",
      "Lemon zest, smoked paprika, and a little dried oregano, 5g",
    ],
    foldInTip:
      "Drain the sauced chicken thoroughly and blot the roasted peppers bone-dry so their moisture doesn't over-hydrate the dough, fold the lemon zest, paprika, and oregano in during the second set of folds, then laminate the chicken, Pepper Jack, and peppers in together during shaping; brush the crust with a little peri-peri sauce for color.",
    tastingNote:
      "Bright, garlicky bird's-eye heat lifted by lemon and smoky paprika against melty Pepper Jack and sweet roasted-pepper pockets — a plate of peri-peri chicken baked into a tangy, lively loaf.",
  },
  {
    name: "Cajun Andouille & Pepper Jack",
    flavorProfile: "spicy",
    whyTrending:
      "Cajun/Creole flavors are surging as 2026's regional-bold trend rewards specificity (the Minnesota State Fair's 2026 lineup features Cajun shrimp and dirty rice) — smoky andouille sausage and the Holy Trinity of onion, pepper, and celery with a Cajun-spiced crumb make a punchy, dirty-rice-in-loaf-form bake.",
    inclusions: [
      "Andouille sausage, diced small, dry-skillet-rendered and blotted of its oil, cooled, 110g",
      "The 'Holy Trinity': onion, green bell pepper, and celery, finely diced, sweated soft, squeezed dry, and cooled, 100g",
      "Pepper Jack or sharp cheddar, cubed, 110g",
      "Cajun seasoning (paprika, cayenne, garlic, thyme, oregano) worked into the dough, 8g",
    ],
    foldInTip:
      "Render the andouille and blot off its oil, and sweat then wring the trinity vegetables dry so their moisture doesn't slacken the dough; work the Cajun seasoning into the dough at mixing so the whole crumb is spiced, then laminate the sausage, vegetables, and cheese in together during shaping.",
    tastingNote:
      "Smoky, garlicky andouille and a warm cayenne-thyme spice run all through the crumb against melty cheese and sweet soft trinity vegetables — a bowl of dirty rice reimagined as a bold, tangy loaf.",
  },
  {
    name: "Carrot Cake",
    flavorProfile: "sweet",
    whyTrending:
      "Named a defining 2026 'elevated comfort / nostalgic indulgence' bake as vegetable-forward desserts surge — the carrot-cake flavor (spiced crumb, grated carrot, walnuts, raisins, and cream-cheese pockets) folded into a sweet sourdough is the cozy dessert loaf trend forecasters keep pointing to.",
    inclusions: [
      "Carrot, finely grated, tossed with a little sugar, rested, and squeezed to shed some moisture, 120g grated",
      "Cream cheese, frozen and cut into small cubes, for cheesecake-frosting pockets, 100g",
      "Toasted walnuts or pecans, chopped, plus golden raisins, 90g",
      "Warm spice: cinnamon, ginger, nutmeg, and a pinch of clove, plus light brown sugar, 40g",
    ],
    foldInTip:
      "Squeeze some water out of the grated carrot so the crumb doesn't turn gummy, work the spices and brown sugar into the dough at mixing, fold the carrot in during the first set of folds so it colors the crumb evenly, then laminate the frozen cream cheese, nuts, and raisins in during shaping so the cheese stays in defined frosting-like pockets.",
    tastingNote:
      "A moist, warmly spiced crumb flecked orange with carrot, studded with toasty nuts and sweet raisins, and shot through with tangy cream-cheese pockets — carrot cake turned into a sliceable, tangy dessert loaf.",
  },
  {
    name: "S'mores",
    flavorProfile: "sweet",
    whyTrending:
      "The campfire-nostalgia dessert loaf all over the 2026 sweet-sourdough feeds (marshmallows are now a named suggested inclusion) — graham-cracker crunch, molten chocolate, and toasted marshmallow hit the exact nostalgia-plus-texture-contrast sweet spot forecasters call the year's dominant indulgence play.",
    inclusions: [
      "Mini marshmallows (or torn marshmallows), frozen so they hold their shape, 80g",
      "Dark and milk chocolate chunks, 110g",
      "Graham crackers, roughly crushed into chunks, 70g (plus a little to press onto the crust)",
      "A little cinnamon and light brown sugar plus honey to nod to the graham, 25g",
    ],
    foldInTip:
      "Freeze the marshmallows so they don't dissolve into the dough, keep the graham pieces chunky, and add everything late — laminate the frozen marshmallows, chocolate, and graham in during shaping so the marshmallows leave gooey pockets and the graham stays crunchy; press extra graham onto the crust and, if you like, torch a few marshmallows on top after baking.",
    tastingNote:
      "Gooey toasted-marshmallow pockets, molten chocolate, and crunchy honey-graham shards through a lightly spiced crumb — a campfire s'more turned into a sliceable, tangy dessert loaf.",
  },
  {
    name: "Quesabirria",
    flavorProfile: "spicy",
    whyTrending:
      "Birria is the runaway viral Mexican flavor of 2026, and after the taco and grilled-cheese versions bakers are now folding the chili-braised beef and its consommé straight into a loaf (the Sourdough Geeks group has run whole birria experiments) — a rich, dip-in-the-broth quesabirria in boule form.",
    inclusions: [
      "Birria consommé (the chili-braising liquid), skimmed of most of its fat and reduced to concentrate it, cooled, and swapped for part of the dough water, 80g",
      "Shredded birria beef, drained well, patted dry, and cooled, 120g",
      "Oaxaca or low-moisture mozzarella (plus a little Monterey Jack), cubed, 120g",
      "The birria's own chile mix (guajillo/ancho + a pinch of the cumin-oregano braise spices — keep total added spice under ~1% of flour since cumin is anti-microbial), 5g",
    ],
    foldInTip:
      "The consommé is both watery and fatty — skim off most of the fat (fat shortens the gluten) and reduce it so it isn't runny, then swap it for an equal weight of water at mixing for a deep chili-stained crumb; drain and blot the beef bone-dry, keep the added braise spice under 1% of the flour (cumin is anti-microbial and stalls the culture above that), then laminate the beef and cheese in during shaping. Brush the crust with a little of the red consommé fat for color and serve with a cup of warm consommé for dipping.",
    tastingNote:
      "A deep, chili-red crumb tasting of the guajillo-ancho braise, savory shredded beef, and stringy melted cheese pockets — a quesabirria taco turned into a loaf you tear and dunk in warm consommé.",
  },
  {
    name: "Thai Green Curry & Chicken",
    flavorProfile: "spicy",
    whyTrending:
      "Globally-inspired 'meal-in-a-loaf' bakes are a defining 2026 vein, and Thai green curry is the one bakers keep recreating — the fragrant green-curry-and-coconut paste worked into the crumb with chicken and lime leaf makes an aromatic, creamy-hot loaf unlike anything else on the board.",
    inclusions: [
      "Green curry paste, bloomed briefly in a little of the thick coconut cream then cooled, whisked into the dough water (reduce hydration to compensate), 45g",
      "Reduced coconut cream (thick, not the watery milk), cooled and swapped for part of the dough water, 60g",
      "Cooked shredded chicken, tossed in a little of the curry, drained well, and cooled, 120g",
      "Makrint (kaffir) lime leaf and Thai basil, finely slivered, plus lime zest, 8g",
    ],
    foldInTip:
      "Bloom the curry paste in coconut cream to wake up the aromatics, cool it, and whisk it plus the reduced coconut cream into the dough water (cut the plain water to match — coconut cream is rich and its fat softens the gluten, so keep the total modest); fold the slivered lime leaf, Thai basil, and zest in during the second set of folds, then laminate the well-drained chicken in during shaping.",
    tastingNote:
      "A fragrant, gently green crumb perfumed with lemongrass, lime leaf, and coconut against a slow green-chili warmth and savory chicken — a bowl of Thai green curry baked into a tangy, aromatic loaf.",
  },
  {
    name: "Chile Relleno",
    flavorProfile: "spicy",
    whyTrending:
      "The next Mexican dish-as-loaf after birria — the chile relleno (a whole roasted poblano stuffed with melty cheese) folded into a boule brings a deeper, smokier, milder pepper than the jalapeño and Hatch loaves already on the board, riding 2026's regional-specificity heat wave.",
    inclusions: [
      "Roasted poblano peppers, peeled, seeded, drained hard, and patted very dry, chopped, 100g",
      "Queso Oaxaca or Monterey Jack (plus a little sharp cheddar), cubed, 130g",
      "Fire-roasted tomato, drained and reduced to a thick salsa-roja swirl, 40g",
      "Ground cumin (kept under 1% of flour), Mexican oregano, and garlic, 4g",
    ],
    foldInTip:
      "Roast and steam the poblanos so the skins slip off, then drain and blot them bone-dry (they hold a lot of water) so they don't slacken the dough; keep the cumin under 1% of the flour since it's anti-microbial, laminate the poblanos and cheese in during shaping, and ribbon the reduced roasted-tomato salsa between the coil folds for a red streak through the crumb.",
    tastingNote:
      "Smoky, mild roasted-poblano warmth and stringy melted cheese pockets against a tangy roasted-tomato ribbon — a chile relleno turned into a sliceable loaf, gorgeous split and griddled.",
  },
  {
    name: "Sticky Toffee Date",
    flavorProfile: "sweet",
    whyTrending:
      "Sticky toffee pudding is a defining 2026 'elevated comfort' dessert (sticky-toffee banana breads and puddings are all over the feeds), and its date-and-toffee flavor translates into a lusciously sweet, caramel-pocketed sourdough — the year's coziest dessert loaf.",
    inclusions: [
      "Medjool dates, pitted, chopped, and soaked in hot water (or a little dark tea) until soft, then drained, 120g",
      "Toffee / dulce de leche, dolloped in cold so it stays in gooey pockets, 90g",
      "Dark brown or muscovado sugar plus a little vanilla and a pinch of espresso powder for depth, 40g",
      "Toasted pecans, chopped, plus flaky salt for the crust, 50g",
    ],
    foldInTip:
      "Soak the dates until jammy and drain them well so they plump the crumb without wetting it, work the muscovado sugar and vanilla into the dough at mixing, fold the softened dates in during the first set of folds so they melt into sticky pockets, then laminate the cold toffee and pecans in during shaping so the toffee stays in molten caramel pools; finish the crust with flaky salt.",
    tastingNote:
      "A dark, moist, caramel-scented crumb studded with jammy dates and molten toffee pools, toasty pecans, and a flaky-salt finish — sticky toffee pudding turned into a sliceable, tangy dessert loaf.",
  },
  {
    name: "Apple Fritter",
    flavorProfile: "sweet",
    whyTrending:
      "One of the biggest sweet-sourdough bakes of 2026 (the sourdough apple-fritter loaf is everywhere, fresh and discard versions alike) — a cinnamon-brown-sugar apple swirl through the crumb finished with a vanilla glaze, the bakery-case apple fritter as a tangy loaf.",
    inclusions: [
      "Firm sweet-tart apples (Honeycrisp, Fuji, or Gala), diced small, tossed with lemon and lightly pre-cooked or salted-and-drained so they shed water, 130g",
      "Cinnamon-brown-sugar swirl: light brown sugar plus cinnamon and a little softened butter, 70g",
      "Vanilla glaze for after baking: powdered sugar whisked with a little milk and vanilla, 40g",
      "A pinch of nutmeg in the crumb, 2g",
    ],
    foldInTip:
      "Use firm apples and dry them (a quick sauté or a salt-and-drain) so they don't turn the crumb gummy; laminate the dough thin, scatter the apples and cinnamon-brown-sugar swirl, then roll and coil-fold so it spirals through the crumb like a fritter's cross-section. Cool the loaf fully, then drizzle the vanilla glaze over the top for the signature bakery finish.",
    tastingNote:
      "A soft crumb spiraled with cinnamon-brown-sugar and tender apple pockets under a sweet vanilla glaze — the glazed apple fritter reimagined as a sliceable, tangy loaf.",
  },
  {
    name: "Croque Monsieur",
    flavorProfile: "savory",
    whyTrending:
      "After the Reuben, muffuletta, and Philly, the French café classic is the next sandwich-as-loaf — the croque monsieur (ham, Gruyère, béchamel, and Dijon) folded into a boule turns the ultimate toasted sandwich into bread, a bistro counterpart to the pancetta-Gruyère loaf.",
    inclusions: [
      "Thick-cut cooked ham, diced small and patted dry, 110g",
      "Gruyère, cubed (plus a little grated Comté), 120g",
      "Thick béchamel, made stiff and cooled solid, then cut into small cubes so it stays in creamy pockets, 90g",
      "Dijon mustard worked into the dough plus a pinch of nutmeg and cracked pepper, 15g",
      "Extra grated Gruyère to press onto the crust, 20g",
    ],
    foldInTip:
      "Make the béchamel stiff (extra flour, cooled hard in the fridge) and cut it into cubes so it holds its shape instead of dissolving into the dough; work the Dijon and nutmeg in at mixing, then laminate the ham, Gruyère, and béchamel cubes in during shaping and press the extra grated Gruyère onto the top so it browns into a lacy, croque-style crust.",
    tastingNote:
      "Savory ham, nutty melted Gruyère, and creamy nutmeg-scented béchamel pockets with a Dijon lift through a tangy crumb under a browned cheese crust — a croque monsieur baked into a loaf, unbeatable griddled with an egg for a croque madame.",
  },
  {
    name: "Cubano",
    flavorProfile: "savory",
    whyTrending:
      "The next sandwich-as-loaf after the Reuben, muffuletta, Philly, and croque — the Cuban sandwich (roast pork, ham, Swiss, pickle, and yellow mustard) folded into a boule rides 2026's 'meal-inspired loaf' wave and the year's love of bold, briny, pressed-deli formats.",
    inclusions: [
      "Roast pork (mojo-marinated if you have it — garlic, cumin kept light, orange, and oregano), diced small, drained, and cooled, 100g",
      "Thick-cut cooked ham, diced small and patted dry, 90g",
      "Swiss or Gruyère, cubed, 110g",
      "Dill pickles, diced and patted VERY dry, plus yellow mustard worked into the dough and a little more to brush the crust, 60g",
    ],
    foldInTip:
      "Drain and blot the pork and ham bone-dry and wring the pickles very dry so their brine doesn't slacken the dough (keep any cumin in the mojo under ~1% of the flour, since it's anti-microbial and stalls the culture); work the mustard in at mixing, then laminate the pork, ham, Swiss, and pickles in together during shaping. Brush the crust with a little mustard for the pressed-Cubano nod.",
    tastingNote:
      "Garlicky roast pork, savory ham, melty Swiss, and bright pickle-and-mustard tang through a chewy crumb — a whole Cuban sandwich baked into a loaf that's magic split and pressed on a griddle.",
  },
  {
    name: "Bacon Jam & Gruyère",
    flavorProfile: "savory",
    whyTrending:
      "Bacon jam — the sweet-savory slow-cooked bacon-onion-and-brown-sugar spread — is a runaway 2026 condiment (all over burger and cheese-board feeds), and swirled through a loaf with nutty Gruyère it makes a deeper, jammier, more grown-up cousin of the bacon-cheddar-ranch loaf.",
    inclusions: [
      "Bacon jam (bacon slow-cooked down with onion, brown sugar, coffee, and a splash of vinegar until thick and spreadable), cooled to a firm paste, 110g",
      "Gruyère, cubed, 120g",
      "Fresh thyme and cracked black pepper, 5g",
      "A little grated Gruyère to press onto the crust, 20g",
    ],
    foldInTip:
      "Cook the bacon jam down until it's thick and jammy (not runny) and cool it firm so it stays in defined pockets instead of greasing the gluten, fold the thyme and pepper in during the second set of folds, then dot the bacon jam across the laminated dough with the Gruyère cubes during shaping and roll up; press the extra grated Gruyère onto the top so it browns into a lacy crust.",
    tastingNote:
      "Sweet-smoky-savory bacon-jam ribbons — caramelized onion, brown sugar, and a coffee-vinegar edge — against nutty melted Gruyère pockets and a crackly cheese crust, a decadent savory loaf built for a soft egg or a burger.",
  },
  {
    name: "Jerk Chicken & Pineapple",
    flavorProfile: "spicy",
    whyTrending:
      "Caribbean cooking is one of 2026's named rising cuisines as trend forecasters reward regional specificity over generic 'global fusion,' and Jamaican jerk — the scotch-bonnet-and-allspice heat lifted by sweet grilled pineapple — is the swicy, tropical spin bakers are folding into loaves this year.",
    inclusions: [
      "Cooked shredded chicken tossed in jerk seasoning/marinade (scotch bonnet, allspice, thyme, ginger, scallion, brown sugar) then drained well and cooled, 120g",
      "Fresh or canned pineapple, diced small, drained hard, and patted very dry (or lightly grilled first to drive off water), 90g",
      "Sharp white cheddar or Pepper Jack, cubed, 100g",
      "Scallions, thyme, a little lime zest, and extra allspice, 6g",
    ],
    foldInTip:
      "Pineapple is very wet, so drain and blot it bone-dry (grilling it first concentrates the sweetness and drives off water) and drain the sauced chicken well so their moisture doesn't over-hydrate the dough; fold the scallions, thyme, zest, and allspice in during the second set of folds, then laminate the chicken, pineapple, and cheese in together during shaping. Cool the loaf fully — the pineapple pockets act like hot jam.",
    tastingNote:
      "Warm scotch-bonnet-and-allspice jerk heat lifted by sweet-tart pockets of pineapple against melty cheese and fresh scallion — a plate of jerk chicken and grilled pineapple baked into a tangy, tropical loaf.",
  },
  {
    name: "Bánh Mì",
    flavorProfile: "spicy",
    whyTrending:
      "Vietnamese food is explicitly named in 2026's regional-specificity trend, and the bánh mì — the whole Vietnamese sandwich, with its pickled daikon-and-carrot, jalapeño, cilantro, and savory-sweet pork — is the meal-in-a-loaf bakers keep recreating, a bright, herby, pickly cousin of the Cubano and Philly loaves.",
    inclusions: [
      "Quick-pickled daikon and carrot, drained and squeezed VERY dry, 90g",
      "Cooked savory-sweet pork (char siu-style or pâté-spiked seasoned pork), diced small, drained, and cooled, 110g",
      "Fresh jalapeño, seeded, diced, and patted dry, plus a little sriracha simmered thick, 40g",
      "Cilantro and scallion, chopped, plus a splash of the pickle brine and a little Maggi/soy swapped into the dough water, 20g",
    ],
    foldInTip:
      "The make-or-break step is wringing the pickled daikon and carrot bone-dry so their brine doesn't slacken the dough; swap a little of the brine (and a dash of Maggi/soy) for part of the dough water for background tang, drain the pork well, then fold the cilantro and scallion in during the second set of folds and laminate the pork, pickles, and jalapeño in together during shaping. Keep the sriracha thick so it doesn't over-hydrate.",
    tastingNote:
      "Bright pickled-vegetable tang and fresh cilantro against savory-sweet pork, a jalapeño-and-sriracha kick, and a whisper of umami through a chewy crumb — the whole bánh mì baked into a lively, tangy loaf.",
  },
  {
    name: "Gingerbread & Candied Ginger",
    flavorProfile: "sweet",
    whyTrending:
      "Warm-spice holiday bakes are a named 2026 sweet-sourdough vein (gingerbread and molasses keep topping seasonal roundups), and a deeply spiced molasses crumb studded with chewy candied-ginger bursts is the cozy, nostalgic dessert loaf forecasters point to for the fall-and-winter season.",
    inclusions: [
      "Blackstrap or dark molasses plus a little dark brown sugar, worked into the dough at mixing, 60g",
      "Warm spice: ginger, cinnamon, and a pinch each of clove, nutmeg, and allspice (keep the total spice under ~1% of the flour), 8g",
      "Candied/crystallized ginger, finely chopped, 70g",
      "Toasted pecans or a little orange zest, optional, 50g",
    ],
    foldInTip:
      "Work the molasses, brown sugar, and spices into the dough at mixing so the whole crumb is dark and gingery — but keep the total warm spice under about 1% of the flour, since clove, cinnamon, and ginger are anti-microbial and will stall the culture if you overdo it (the added sugar also speeds fermentation, so watch the bulk); fold the candied ginger (and pecans/zest) in during the second set of folds so the chewy bursts spread evenly.",
    tastingNote:
      "A dark, moist, deeply spiced molasses crumb shot through with chewy sweet-hot candied-ginger bursts and toasty pecans — a gingerbread cookie turned into a sliceable, tangy holiday loaf.",
  },
  {
    name: "Bananas Foster",
    flavorProfile: "sweet",
    whyTrending:
      "Banana desserts are surging into sweet sourdough (banana bread's showier cousin), and the New Orleans classic — caramelized banana flambéed in brown-sugar-rum-and-cinnamon sauce — folds into a loaf as a rich, boozy-caramel dessert bake that rides 2026's 'elevated comfort / nostalgic indulgence' wave.",
    inclusions: [
      "Ripe bananas, sliced and caramelized in butter, brown sugar, cinnamon, and a splash of dark rum until jammy, then cooled and drained of excess syrup, 120g",
      "Dulce de leche or the reduced rum-caramel, dolloped in cold so it stays in gooey pockets, 70g",
      "Toasted pecans or walnuts, chopped, 60g",
      "Light brown sugar plus a little vanilla and flaky salt for the crust, 30g",
    ],
    foldInTip:
      "Caramelize and cool the bananas and drain off the loose syrup so they don't wet the crumb, work the brown sugar and vanilla into the dough at mixing (the sugar speeds fermentation, so watch the bulk), fold the caramelized bananas in during the first set of folds so they melt into soft pockets, then laminate the cold caramel and pecans in during shaping so the caramel stays in molten pools; finish the crust with flaky salt.",
    tastingNote:
      "A tender crumb studded with jammy caramelized banana, molten rum-caramel pools, and toasty pecans with a flaky-salt finish — Bananas Foster turned into a sliceable, tangy dessert loaf.",
  },
  {
    name: "Marry Me Chicken",
    flavorProfile: "savory",
    whyTrending:
      "'Marry Me Chicken' has been one of the internet's stickiest viral dinners since 2023 and is still surging into 2026 bakes — the creamy sun-dried-tomato, parmesan, and basil sauce (with a whisper of chili flake) folds into a savory loaf that reads as a comforting dinner-in-bread, distinct from the plainer sun-dried-tomato loaf.",
    inclusions: [
      "Cooked shredded chicken tossed in a little of the sauce then drained well, 110g",
      "Oil-packed sun-dried tomatoes, drained, blotted, and chopped, 70g",
      "Parmesan, grated, plus a little to press on the crust, 90g",
      "Fresh basil chiffonade plus a pinch of red pepper flakes and roasted garlic, 12g",
    ],
    foldInTip:
      "Drain the sauced chicken and blot the sun-dried tomatoes so their oil doesn't grease the gluten, fold the basil, garlic, and chili flakes in during the second set of stretch-and-folds, then laminate the chicken, tomatoes, and grated parmesan in during shaping; press a little extra parmesan onto the crust so it crisps.",
    tastingNote:
      "Savory shredded chicken, sweet-tangy sun-dried tomato, and nutty parmesan with a fragrant basil-and-garlic lift and the faintest chili warmth — the viral creamy-chicken dinner turned into a sliceable loaf.",
  },
  {
    name: "Broccoli Cheddar Soup Boule",
    flavorProfile: "savory",
    whyTrending:
      "Soup-as-a-loaf keeps trending after the breakout French onion boule, and broccoli-cheddar (Panera's most-copied soup) is the obvious next translation — finely chopped roasted broccoli and sharp cheddar baked straight into a crumb meant to eat like its own bread bowl.",
    inclusions: [
      "Broccoli florets, roasted until dry and browned then finely chopped, 120g",
      "Extra-sharp cheddar, cubed, 130g",
      "Grated carrot, squeezed very dry, 40g",
      "Onion powder, garlic powder, and a pinch of dry mustard, 6g",
    ],
    foldInTip:
      "Roast the broccoli hard so it sheds its water (steamed broccoli will slacken the dough) and wring the grated carrot bone-dry, fold the seasonings in during the first set of folds, then laminate the broccoli, carrot, and cheddar cubes in during shaping so the cheese forms melty pockets.",
    tastingNote:
      "Nutty roasted broccoli and sweet flecks of carrot against sharp molten cheddar pockets — Panera's broccoli-cheddar soup baked into a tangy crumb that is its own bread bowl.",
  },
  {
    name: "Chicken Tikka Masala",
    flavorProfile: "spicy",
    whyTrending:
      "Regional-specific Indian flavors are a named 2026 rising vein (tying neatly to the India Araku bean on this board), and chicken tikka masala — Britain's adopted national dish — folds into a loaf as a warmly spiced, tomato-and-cream meal-in-bread that goes beyond generic 'curry.'",
    inclusions: [
      "Cooked tikka chicken tossed in a thick, reduced masala sauce then drained well, 120g",
      "Tomato-onion masala paste, reduced until jammy and cooled, 60g",
      "Paneer, cubed small, or extra sharp cheddar, 80g",
      "Garam masala, ginger, and a little kasoori methi (keep total spice under ~1% of the flour), 8g",
    ],
    foldInTip:
      "Reduce the masala hard so it isn't watery and drain the chicken well, work the reduced paste into the dough at mixing for a warm-toned crumb, and keep the garam masala under about 1% of the flour since cumin, clove, and cinnamon in the blend are anti-microbial and will stall the culture; laminate the chicken and paneer in during shaping.",
    tastingNote:
      "A warm ginger-and-garam-masala crumb with jammy tomato-onion depth, tender spiced chicken, and mild creamy paneer pockets — chicken tikka masala turned into a tangy, sliceable loaf.",
  },
  {
    name: "Sichuan Mala Chili Crisp",
    flavorProfile: "spicy",
    whyTrending:
      "'Mala' (numbing-hot Sichuan peppercorn plus chili) is the specific 2026 heat forecasters call the next step past plain chili crisp — its tingly, aromatic burn is a distinct sensation from the salsa-macha and chili-crunch loaves already on the board.",
    inclusions: [
      "Sichuan chili crisp, oil drained off so mostly the crunchy solids remain, 30g",
      "Toasted, coarsely ground Sichuan peppercorns for the málà tingle, 5g",
      "Sharp cheddar or Monterey Jack, cubed, 120g",
      "Scallions and toasted sesame seeds, 45g",
    ],
    foldInTip:
      "Drain the oil off the chili crisp so hydration stays put and keep back the solids, fold the ground Sichuan peppercorn and sesame in during the second set of folds so the numbing spice spreads evenly, then laminate the chili-crisp solids, cheese, and scallions in during shaping.",
    tastingNote:
      "A slow building chili heat wrapped in the citrusy, lip-tingling buzz of Sichuan peppercorn against melty cheese and fresh scallion — chili-crisp's numbing málà cousin baked into a tangy loaf.",
  },
  {
    name: "Cardamom Bun (Kardemummabullar)",
    flavorProfile: "sweet",
    whyTrending:
      "Scandinavian cardamom bakes are a named 2026 sweet trend (the kardemummabulle has become the cool-café rival to the cinnamon roll), and its fragrant crushed-cardamom-and-brown-sugar swirl with a pearl-sugar crust translates beautifully into a swirled sweet sourdough.",
    inclusions: [
      "Freshly crushed green cardamom seeds, worked into the dough plus more in the swirl, 8g",
      "Cardamom-brown-sugar swirl paste with softened butter, 90g",
      "Pearl sugar (nib sugar) for the crust, 30g",
      "Orange zest, optional, from 1 orange",
    ],
    foldInTip:
      "Crush the cardamom fresh and work some into the dough at mixing for an even fragrance, then laminate the dough thin, spread the softened cardamom-butter-sugar paste, and roll and coil-fold so it spirals through the crumb; press pearl sugar onto the crust before baking for the signature crunch.",
    tastingNote:
      "A warm, floral cardamom crumb swirled with buttery brown sugar under a crackly pearl-sugar crust — the Swedish cardamom bun turned into a tangy sliceable loaf.",
  },
  {
    name: "Black Sesame Swirl",
    flavorProfile: "sweet",
    whyTrending:
      "Black sesame is a leading 2026 Asian-dessert flavor crossing into Western bakeries (nutty, toasty, faintly bitter, dramatic charcoal-grey crumb), and a black-sesame-paste swirl with white chocolate is the sophisticated, less-sugary sweet loaf trend-watchers keep flagging.",
    inclusions: [
      "Black sesame paste (or ground toasted black sesame with a little honey), warmed for swirling, 110g",
      "Toasted black and white sesame seeds, 25g",
      "White chocolate chips, 80g",
      "A little honey or brown sugar worked into the dough, 25g",
    ],
    foldInTip:
      "Loosen the black sesame paste so it's pipeable, laminate the dough thin and spread it, scatter the toasted sesame seeds and white chocolate, then roll and coil-fold so the dark paste marbles through the crumb in grey-black ribbons; stir the honey in at mixing.",
    tastingNote:
      "A striking charcoal-grey crumb ribboned with nutty, toasty black-sesame paste and creamy white-chocolate melts — a sophisticated, barely-sweet loaf that eats like an East-Asian dessert.",
  },
  {
    name: "Marmite & Extra-Mature Cheddar",
    flavorProfile: "savory",
    whyTrending:
      "Britain's ultimate umami loaf — the Marmite-and-cheese toastie flavor baked straight into a boule, riding the 2026 'extreme umami / love-it-or-hate-it' savory wave alongside the miso and gochujang loaves and championed by UK bakers on Instagram and r/Sourdough.",
    inclusions: [
      "Marmite (or Vegemite), thinned with a little warm water and whisked into the dough water (it's very salty — cut the loaf's added salt to compensate), 30g",
      "Extra-mature / vintage cheddar, cut into small cubes, 140g",
      "Chives, chopped, 8g",
      "Extra Marmite whisked with a little melted butter to brush the crust, 15g",
    ],
    foldInTip:
      "Whisk the Marmite into the water at mixing (reducing the loaf's salt since the yeast extract is intensely salty) for an even umami crumb, fold the chives in during the second set of stretch-and-folds, then laminate the cheddar cubes in during shaping; brush the baked crust with the Marmite-butter while warm for a lacquered savory top.",
    tastingNote:
      "A deeply savory, malty-umami crumb the colour of dark toast, studded with sharp molten cheddar pockets — the Marmite-and-cheese toastie you can slice, with the yeast extract's tang doubling down on the sourdough's own.",
  },
  {
    name: "Wild Garlic (Ramp) & Aged Cheddar",
    flavorProfile: "savory",
    whyTrending:
      "The defining spring 2026 foraging bake — wild garlic (ramps/ramsons) is the seasonal green everyone's pesto-ing and folding into bread, a milder, greener, more aromatic take on the garlic-and-cheese loaf that trend-watchers flag every March–April.",
    inclusions: [
      "Wild garlic (ramp) leaves, blanched briefly, squeezed bone-dry, and chopped (or blitzed into a thick oil-light pesto), 60g",
      "Aged / extra-sharp cheddar, cubed, 130g",
      "A little grated Parmesan for depth, 30g",
      "Lemon zest from 1 lemon, plus cracked black pepper, 3g",
    ],
    foldInTip:
      "Blanch and wring the wild garlic bone-dry (raw leaves weep water and dull to olive-drab), fold the chopped leaves, zest, and pepper in during the second set of stretch-and-folds so the green spreads, then laminate the cheddar and Parmesan in during shaping so the cheese stays in defined pockets.",
    tastingNote:
      "A gentle, green, garlicky perfume — softer and more herbal than roasted garlic — laced through a tangy crumb with sharp melted cheddar pockets, the taste of a spring hedgerow in bread form.",
  },
  {
    name: "Berbere & Honey Butter",
    flavorProfile: "spicy",
    whyTrending:
      "East-African spicing is a named 2026 heat trend — berbere (the Ethiopian chili-and-warm-spice blend) is crossing from stews into bakery, and pairing its complex smoky heat with a honey-butter swirl hits the year's dominant 'swicy / structural heat' play from a fresh regional angle.",
    inclusions: [
      "Berbere spice blend, bloomed briefly in a little warm butter to wake the chilies and spices, then cooled, 12g (keep it under ~1% of flour — the clove/fenugreek/cinnamon in it are anti-microbial and can stall the culture)",
      "Honey, warmed for swirling, 40g",
      "Softened butter for the swirl, 25g",
      "Aged white cheddar or a firm feta, cubed, optional, 90g",
    ],
    foldInTip:
      "Bloom the berbere in warm butter and cool it, fold about half into the dough during the second set of folds for an even warm-red crumb, then laminate the dough thin and swirl the honey plus the remaining spiced butter (and cheese cubes) over it before rolling so the heat and sweetness ribbon through.",
    tastingNote:
      "A warm brick-red crumb with layered berbere spice — smoky chili, fenugreek, and warm baking spice — chased by a mellow honey-butter sweetness, savory-hot and aromatic rather than sharply fiery.",
  },
  {
    name: "Sambal & Toasted Coconut",
    flavorProfile: "spicy",
    whyTrending:
      "Indonesian sambal is on 2026's regional-specificity heat list (forecasters name Indonesian, Filipino, and Thai chili pastes by name) — the funky, garlicky, shrimp-paste heat of sambal against sweet toasted coconut is a fresh Southeast-Asian spin on the chili-crisp loaf.",
    inclusions: [
      "Sambal oelek or sambal terasi, cooked down in a dry skillet until the excess liquid steams off, then cooled, 40g",
      "Toasted shredded coconut, 60g",
      "Kaffir lime leaf, very finely slivered, plus lime zest, 4g",
      "Firm Monterey Jack or gouda, cubed, optional, 100g",
    ],
    foldInTip:
      "Cook the sambal dry so its brine doesn't slacken the crumb and cool it, fold the lime leaf and zest in during the second set of folds, then laminate the reduced sambal, toasted coconut, and cheese in during shaping so the coconut stays crisp and the heat forms defined pockets.",
    tastingNote:
      "Garlicky, funky-fermented chili heat against sweet toasty coconut and a bright kaffir-lime lift — a Southeast-Asian sambal loaf that's savory-hot with an aromatic tropical edge.",
  },
  {
    name: "Pandan & Coconut (Kaya)",
    flavorProfile: "sweet",
    whyTrending:
      "Pandan is one of 2026's breakout dessert flavors crossing from Southeast-Asian kitchens into Western bakeries (grassy-vanilla, naturally jade-green), and a kaya (pandan-coconut jam) swirl turns it into the sophisticated, less-sugary sweet loaf trend-watchers keep flagging alongside ube and black sesame.",
    inclusions: [
      "Pandan extract or paste, mixed into the dough water for a jade crumb, 10g",
      "Kaya (pandan-coconut jam), warmed for swirling, 100g",
      "Toasted shredded coconut, 50g",
      "White chocolate chips, optional, 70g",
    ],
    foldInTip:
      "Blend the pandan into the water at mixing for an even green crumb, then laminate the dough thin, spread the kaya, scatter the toasted coconut (and white chocolate), and roll and coil-fold so the jam marbles through in fragrant green-gold ribbons.",
    tastingNote:
      "A soft jade-green crumb ribboned with grassy-vanilla pandan and rich coconut kaya, with toasty coconut flecks — a Singaporean kaya-toast breakfast reimagined as a tender sweet loaf.",
  },
  {
    name: "Rhubarb & Custard",
    flavorProfile: "sweet",
    whyTrending:
      "A nostalgic British sweet-shop flavor named a rising 2026 bakery trend as rhubarb has its 'it-ingredient' moment — tart roasted rhubarb against a creamy vanilla-custard swirl, the retro sweet-and-sour combo reimagined as a spring sourdough.",
    inclusions: [
      "Rhubarb, roasted with a little sugar until soft, drained hard, and patted dry (fresh rhubarb is very wet — roasting and draining is essential), chopped, 90g",
      "Thick vanilla custard or crème pâtissière, chilled and dolloped in, 100g",
      "Vanilla bean paste, 6g",
      "A little demerara sugar for the crust, 20g",
    ],
    foldInTip:
      "Roast and drain the rhubarb bone-dry so its juice doesn't stain and slacken the whole crumb, stir the vanilla in at mixing, then laminate the chilled custard dollops and rhubarb in during shaping so they stay in defined pink-and-cream pockets; press demerara onto the crust for crunch, and cool at least 2 hours before slicing.",
    tastingNote:
      "Tart, jammy rhubarb pockets against a creamy vanilla-custard swirl through a tender crumb — the retro rhubarb-and-custard sweet dissolved into a springtime loaf.",
  },
  {
    name: "Beetroot & Goat Cheese",
    flavorProfile: "savory",
    whyTrending:
      "Naturally jewel-magenta crumb loaves are a viral 2026 'colorful sourdough' trend (roasted beetroot dyes the dough without artificial color), and the earthy-sweet beet against tangy, creamy chèvre and toasted walnut is the salad-into-bread combo bakers keep posting.",
    inclusions: [
      "Beetroot, roasted until soft then puréed (or finely grated raw and wrung bone-dry), swapped for part of the dough water for a magenta crumb, 120g purée",
      "Soft goat cheese (chèvre), frozen and cut into small cubes, 110g",
      "Toasted walnuts, roughly chopped, 50g",
      "Fresh thyme plus orange zest and cracked black pepper, 4g",
    ],
    foldInTip:
      "Blend the beet purée into the dough water at mixing (cut the plain water to match) for an even magenta crumb — if using raw beet, grate and wring it bone-dry first or it will slacken the dough; freeze the goat cheese cubes so they hold their shape instead of smearing, fold the walnuts, thyme, and zest in during the second set of folds, then laminate the frozen chèvre in during shaping.",
    tastingNote:
      "A striking magenta-pink crumb with earthy-sweet beetroot, creamy tangy goat-cheese pockets, and toasty walnut crunch lifted by orange and thyme — a beet-and-chèvre salad baked into a jaw-dropping loaf.",
  },
  {
    name: "Smash Burger",
    flavorProfile: "savory",
    whyTrending:
      "The smash-burger craze is one of 2026's biggest food obsessions, and the burger-as-loaf is the next meal-in-a-loaf after the Philly and Cubano — griddled beef, melty cheese, pickle, and special-sauce spices folded into a sesame-crusted boule.",
    inclusions: [
      "Ground beef, seasoned, crisped hard in a skillet, drained of its fat, and cooled, 120g",
      "American or sharp cheddar, cubed, 110g",
      "Dill pickles, diced and patted VERY dry, 60g",
      "Special-sauce dust (dried onion, mustard powder, smoked paprika, tomato powder) worked into the dough, plus sesame seeds for the crust, 8g",
    ],
    foldInTip:
      "Drain the crisped beef of its fat and wring the pickles bone-dry so grease and brine don't slacken the dough, work the special-sauce spices into the dough at mixing, then laminate the beef, cheese, and pickles in together during shaping; press sesame seeds onto the crust before scoring for the burger-bun nod.",
    tastingNote:
      "Savory griddled-beef, molten cheese, and a bright pickle pop with a tangy special-sauce hum through the crumb under a toasted sesame crust — a smash burger baked into a loaf, unbeatable split and griddled.",
  },
  {
    name: "Aji Amarillo & Queso Fresco",
    flavorProfile: "spicy",
    whyTrending:
      "Peruvian food is a named 2026 rising cuisine, and aji amarillo — the fruity, sunshine-yellow chili behind causa and ají de gallina — is the fresh heat source forecasters flag as it crosses into Western kitchens; folded in with crumbly queso fresco it makes a distinct golden, brightly-spiced loaf unlike the green-and-red chili loaves already on the board.",
    inclusions: [
      "Aji amarillo paste, whisked into the dough water (reduce hydration slightly since it's a wet paste), 40g",
      "Queso fresco or Cotija, crumbled, 110g",
      "Fire-roasted corn or choclo kernels, drained and patted very dry, 70g",
      "Lime zest, garlic, and a little huacatay or cilantro, 6g",
    ],
    foldInTip:
      "Whisk the aji amarillo into the water at mixing for an even golden, gently spicy crumb (cut the plain water to match), dry the corn hard so it doesn't slacken the dough, fold the lime zest, garlic, and herb in during the second set of folds, then laminate the queso fresco and corn in during shaping so the cheese stays in crumbly pockets.",
    tastingNote:
      "A sunny golden crumb carrying the fruity medium heat of aji amarillo against salty crumbles of fresh cheese and sweet pops of corn — a Peruvian ají loaf that's bright and warming rather than sharply fiery.",
  },
  {
    name: "Thai Chili Jam (Nam Prik Pao) & Cashew",
    flavorProfile: "spicy",
    whyTrending:
      "Nam prik pao — Thailand's sweet-smoky roasted-chili jam — is on 2026's regional-specificity heat list as Thai pastes cross from tom yum into bakery; its jammy tamarind-and-dried-chili depth swirled through a loaf with buttery toasted cashews is a fresh Thai spin distinct from the green-curry loaf.",
    inclusions: [
      "Nam prik pao (Thai roasted chili jam), most of its oil drained off, swirled in, 40g",
      "Toasted cashews, roughly chopped, 70g",
      "Firm Monterey Jack or a mild gouda, cubed, optional, 100g",
      "Kaffir lime leaf slivered fine plus scallion and a squeeze of lime, 6g",
    ],
    foldInTip:
      "Drain most of the oil off the chili jam so hydration stays put (save a little to brush the crust for sheen), fold the lime leaf and scallion in during the second set of folds, then ribbon the nam prik pao across the laminated dough with the cashews (and cheese) during shaping so its smoky-sweet heat marbles through the crumb.",
    tastingNote:
      "Sweet-smoky roasted-chili depth with a tamarind tang and a slow building heat against buttery toasted cashews and a bright kaffir-lime lift — a spoonful of Thai chili jam baked into a tangy loaf.",
  },
  {
    name: "Peach Cobbler",
    flavorProfile: "sweet",
    whyTrending:
      "Stone fruit is having a 2026 moment and peach cobbler is the Southern-nostalgia dessert forecasters keep naming for the year's 'elevated comfort / nostalgic indulgence' sweet play — spiced peaches and a buttery cinnamon-brown-sugar streusel folded into a sweet sourdough.",
    inclusions: [
      "Peaches (freeze-dried, or fresh/canned drained hard and pre-cooked with sugar until jammy, then cooled), 90g",
      "Cinnamon-brown-sugar streusel (flour, butter, brown sugar, cinnamon) baked crisp and cooled, 70g",
      "Vanilla bean paste plus a pinch of nutmeg, 6g",
      "Turbinado sugar for the crust, 20g",
    ],
    foldInTip:
      "Peaches are wet, so use freeze-dried or cook fresh/canned peaches down to a thick jam and drain and cool them; stir the vanilla in at mixing, laminate the peaches in during shaping so they stay in defined pockets, and scatter the cooled streusel through so it stays crunchy; press turbinado onto the crust for a cobbler-topping crackle. Cool at least 2 hours before slicing — the peach pockets act like hot jam.",
    tastingNote:
      "Jammy spiced-peach pockets and buttery cinnamon-streusel crunch through a tender vanilla crumb — a warm peach cobbler turned into a sliceable, tangy dessert loaf.",
  },
  {
    name: "Cannoli",
    flavorProfile: "sweet",
    whyTrending:
      "The cannoli flavor — sweet ricotta, chocolate chips, pistachio, and candied orange — is a viral Italian-dessert crossover in 2026 sweet bakes (cannoli everything, from cakes to cold foam), and it makes a creamy, less-sugary sweet loaf that eats like the pastry's filling.",
    inclusions: [
      "Ricotta, drained overnight and lightly sweetened, dolloped in cold (or a stiff ricotta-mascarpone mix), 120g",
      "Mini chocolate chips, 80g",
      "Toasted pistachios, chopped, plus a little candied orange peel, 60g",
      "Vanilla bean paste plus orange zest and a pinch of cinnamon, 6g",
    ],
    foldInTip:
      "Drain the ricotta overnight so it isn't watery (a stiff drained ricotta stays in defined pockets instead of dissolving into the crumb), stir the vanilla and zest in at mixing, then laminate the cold sweetened ricotta, chocolate chips, pistachios, and candied peel in during shaping; dust the cooled crust with powdered sugar for the pastry-case finish.",
    tastingNote:
      "Creamy sweet-ricotta pockets studded with chocolate chips, toasty pistachio, and bright candied-orange bursts through a tender crumb — a cannoli turned into a sliceable, tangy dessert loaf.",
  },
  {
    name: "Chicken Parmesan",
    flavorProfile: "savory",
    whyTrending:
      "The chicken-parm loaf is one of 2026's viral 'dinner-as-a-boule' bakes on Instagram and TikTok — crispy chicken, marinara, and molten mozzarella-parmesan turned into a savory sourdough that eats like the casserole, riding the same salad/meal-into-bread wave as the caprese and marry-me-chicken loaves.",
    inclusions: [
      "Cooked breaded chicken (leftover cutlets or nuggets), diced small and re-crisped so it stays firm, 120g",
      "Thick marinara or sun-dried-tomato paste, reduced hard until jammy and cooled (thin sauce slackens the dough), 70g",
      "Low-moisture mozzarella, cubed, 110g",
      "Parmesan, grated, plus dried oregano and a pinch of garlic powder, 50g",
    ],
    foldInTip:
      "Reduce the marinara to a thick paste and cool it, and re-crisp the diced chicken so it doesn't go soggy, then fold the oregano and grated parmesan in during the second set of folds and laminate the chicken, mozzarella, and jammy marinara in during shaping so they stay in defined pockets; press extra parmesan onto the crust before scoring.",
    tastingNote:
      "Savory tomato depth, crisp-tender chicken, and stretchy melted mozzarella with a parmesan-lacquered crust — chicken parmesan you can slice and toast.",
  },
  {
    name: "Loaded Baked Potato",
    flavorProfile: "savory",
    whyTrending:
      "A viral comfort-food loaf of 2025–2026 — the loaded baked potato (potato, bacon, cheddar, sour cream, chives) folded into a boule, a hearty savory bake bakers keep posting alongside the broccoli-cheddar and French-onion 'soup/side-into-bread' trend.",
    inclusions: [
      "Cooked potato, cubed small and patted very dry (leftover roasted or boiled, or dehydrated potato flakes worked into the dough), 120g",
      "Thick-cut bacon, cooked crisp and diced, 90g",
      "Sharp cheddar, cubed, 110g",
      "Sour-cream / buttermilk-ranch powder plus chopped chives, 12g",
    ],
    foldInTip:
      "Make sure the potato is bone-dry (steamy potato slackens the dough — roast or air-dry the cubes, or use a spoon of potato flakes to soak up moisture), then toss the potato, bacon, and cheddar with the sour-cream powder and chives and laminate the whole mix in during shaping so every pocket is seasoned.",
    tastingNote:
      "Fluffy potato, smoky bacon, and melty sharp cheddar with a tangy sour-cream-and-chive backbone — a loaded baked potato baked into a chewy crumb.",
  },
  {
    name: "Spicy Vodka (Gigi Hadid)",
    flavorProfile: "spicy",
    whyTrending:
      "The viral 'spicy vodka' / Gigi Hadid pasta sauce (creamy tomato with Calabrian-chili heat and parmesan) crossed from the internet's most-made pasta into a 2026 sourdough — a blushing, gently spicy savory loaf riding the same swicy tomato wave as the 'nduja and pepperoni loaves.",
    inclusions: [
      "Spicy vodka / tomato-cream sauce, reduced hard until jammy and cooled (thin sauce over-hydrates the dough), swirled in, 70g",
      "Calabrian chili paste, whisked into the dough water, 20g",
      "Low-moisture mozzarella or crumbled burrata, patted dry, 110g",
      "Parmesan, grated, plus fresh basil and a pinch of chili flakes, 50g",
    ],
    foldInTip:
      "Reduce the vodka sauce to a thick jam and cool it so it stays in pockets, whisk the Calabrian paste into the water at mixing for an even blush crumb (reduce the plain water to match), then fold the basil and parmesan in during the second set of folds and laminate the mozzarella and jammy sauce in during shaping.",
    tastingNote:
      "A rosy, creamy-tomato crumb with a slow Calabrian burn, molten mozzarella pockets, and salty parmesan — the internet's favorite pasta sauce baked into a tangy loaf.",
  },
  {
    name: "Suya-Spiced Beef",
    flavorProfile: "spicy",
    whyTrending:
      "West African flavors are a named 2026 rising trend, and suya — the Nigerian street-grilled beef coated in yaji, a peanut-and-chili spice — makes a bold, nutty-spicy meat loaf that fills a genuine geographic gap between the board's berbere (Ethiopian) and peri-peri (Southern African) entries.",
    inclusions: [
      "Cooked beef (thin-sliced steak or seasoned mince), tossed in yaji and drained of fat, 120g",
      "Yaji suya spice (ground roasted peanut, cayenne, ginger, garlic, paprika, bouillon), 15g — keep any single warming spice under ~1% of flour",
      "Roasted red onion and red bell pepper, diced and patted very dry, 70g",
      "Toasted crushed peanuts for the crumb and crust, 40g",
    ],
    foldInTip:
      "Blot the cooked beef and the roasted onion-pepper bone-dry (rendered fat and vegetable water both slacken the dough), fold the yaji and half the peanuts in during the second set of folds so the spice perfumes the whole crumb, then laminate the beef and onion-pepper in during shaping; press the remaining peanuts onto the crust.",
    tastingNote:
      "Smoky-nutty peanut warmth and a building cayenne-ginger heat against savory beef and sweet roasted pepper — Nigerian suya turned into a bold, tangy loaf.",
  },
  {
    name: "Churro & Dulce de Leche",
    flavorProfile: "sweet",
    whyTrending:
      "Churro-flavored bakes are all over 2026 sweet-sourdough feeds — a cinnamon-sugar swirl with a molten dulce-de-leche ribbon, the fried-street-snack format that follows the same crunchy-cinnamon path as the Panera cinnamon-crunch loaf but with a caramel core.",
    inclusions: [
      "Cinnamon-sugar swirl (light brown sugar plus cinnamon), 70g",
      "Dulce de leche, warmed slightly for swirling, 100g",
      "Softened butter for the swirl, 25g",
      "Turbinado-and-cinnamon 'churro' sugar for the crust, 30g",
    ],
    foldInTip:
      "Laminate the dough thin, spread the softened butter, drizzle the dulce de leche, and dust the cinnamon-sugar, then roll and coil-fold so the caramel and cinnamon spiral through the crumb; roll the shaped loaf's crust in the turbinado-cinnamon sugar for the signature churro crackle.",
    tastingNote:
      "A soft cinnamon-swirled crumb ribboned with molten caramel dulce de leche under a crunchy churro-sugar crust — the fried-dough classic as a sliceable loaf.",
  },
  {
    name: "Red Velvet & Cream Cheese",
    flavorProfile: "sweet",
    whyTrending:
      "Red velvet crossed from cakes into 2026's viral sweet-sourdough 'flights' — a subtly cocoa, dramatically crimson crumb studded with white-chocolate and dolloped with tangy cream cheese, the color-forward dessert loaf that joins the ube-purple, matcha-green, and beetroot-magenta visual-trend axis.",
    inclusions: [
      "Dutch-process cocoa (a modest amount — red velvet is barely chocolatey), bloomed into the warm dough water, 12g",
      "Natural red color (beetroot powder for a clean-label crimson, or a little gel color), worked into the dough, 8g",
      "Cream cheese, frozen and cubed, dolloped in cold, 110g",
      "White chocolate chips plus a splash of buttermilk swapped for part of the water and vanilla bean paste, 90g",
    ],
    foldInTip:
      "Bloom the small amount of cocoa and the color into the warm water for an even crimson crumb (reduce the plain water to match) and swap a little buttermilk in for tang, then laminate the frozen cream cheese and white chocolate in during shaping so they stay in defined pockets against the red crumb.",
    tastingNote:
      "A striking crimson, lightly cocoa crumb with creamy tangy cream-cheese pockets and sweet white-chocolate melts — red velvet cake turned into a sliceable sourdough.",
  },
  {
    name: "Tomato Soup & Grilled Cheese",
    flavorProfile: "savory",
    whyTrending:
      "The next entry in 2026's breakout 'soup-as-a-loaf' sub-genre that the French-onion and broccoli-cheddar boules kicked off — the ultimate comfort-food pairing (creamy tomato soup + a molten grilled-cheese) folded into one nostalgic loaf, all over comfort-baking TikTok this winter.",
    inclusions: [
      "Tomato paste plus a little sun-dried-tomato paste, whisked into the dough water for a tangy red crumb (paste, not soup — soup is far too wet), 60g",
      "Sharp cheddar and low-moisture mozzarella, cubed, 150g",
      "Dried basil and a pinch of smoked paprika, 5g",
      "Grated Parmesan to press onto the crust, 25g",
    ],
    foldInTip:
      "Whisk the concentrated tomato paste into the water at mixing (reduce the plain water to match) for an even rosy crumb without slackening the dough, fold the basil and paprika in during the second set of stretch-and-folds, then laminate the cheddar and mozzarella in during shaping so they stay in molten pockets; press Parmesan onto the crust before scoring so it crisps like the buttered edge of a grilled cheese.",
    tastingNote:
      "A tangy, faintly smoky tomato crumb shot through with melty cheddar-and-mozzarella pockets under a crisped Parmesan crust — tomato soup and grilled cheese in one sliceable loaf, made to be dunked.",
  },
  {
    name: "Green Goddess",
    flavorProfile: "savory",
    whyTrending:
      "Green Goddess — the herb-packed dressing-turned-everything flavor — is one of 2026's biggest savory crossovers (Green Goddess salads, dips, and seasonings are everywhere), and its bright basil-tarragon-chive-parsley punch with a whisper of buttermilk tang folds beautifully into a fresh, verdant loaf distinct from the board's cheese-forward savories.",
    inclusions: [
      "Fresh soft herbs — basil, tarragon, chives, parsley, and dill — finely chopped, 25g",
      "Buttermilk swapped for part of the dough water for tang, 60g",
      "Garlic and the zest of 1 lemon, minced, 10g",
      "Feta or crumbled goat cheese, optional, 80g",
    ],
    foldInTip:
      "Swap the buttermilk in for an equal weight of water at mixing for a subtle tang, fold the chopped herbs, garlic, and lemon zest in during the second set of stretch-and-folds so the green flecks distribute evenly (add them then, not earlier, so they keep their color), and laminate the feta in during shaping if using.",
    tastingNote:
      "A fresh, herb-flecked crumb humming with basil, tarragon, and chive against a bright lemon-buttermilk tang — the Green Goddess salad reimagined as a verdant, aromatic loaf that's magic under a poached egg.",
  },
  {
    name: "Flamin' Hot Cheddar",
    flavorProfile: "spicy",
    whyTrending:
      "The viral 'snackification' loaf of 2026 — bakers crushing Flamin' Hot Cheetos into the dough for a shockingly red crumb and a tangy, spicy corn-cheese hit, one of the most-shared novelty bakes in the Sourdough Geeks group.",
    inclusions: [
      "Flamin' Hot Cheetos (or Takis), crushed to a coarse powder, most worked into the dough plus some reserved for the crust, 60g",
      "Sharp cheddar, cubed, 130g",
      "A little cayenne and smoked paprika to reinforce the heat, 3g",
      "Ground Flamin' Hot dust for rolling the shaped loaf, 20g",
    ],
    foldInTip:
      "Work most of the crushed Flamin' Hot powder and the cayenne into the dough during the first set of stretch-and-folds for an even red-orange crumb, laminate the cheddar in during shaping, then roll the shaped boule in the reserved dust before its final proof so the crust bakes up crimson and spicy.",
    tastingNote:
      "A startling red crumb with a tangy, salty, corn-chip spice and melty sharp-cheddar pockets — the guilty-pleasure snack turned into a crackly, genuinely craveable spicy loaf.",
  },
  {
    name: "Bang Bang",
    flavorProfile: "spicy",
    whyTrending:
      "Bang Bang sauce — the sweet-chili-plus-sriracha-mayo combo behind viral bang-bang shrimp, chicken, and broccoli — is one of 2026's dominant 'swicy' flavors crossing from restaurant menus into everything, and its creamy sweet-hot punch folds into a loaf that eats like the sauce itself.",
    inclusions: [
      "Sweet chili sauce, reduced slightly so it isn't runny, swirled in, 50g",
      "Sriracha, whisked into the dough water (reduce hydration to match), 25g",
      "Monterey Jack or a mild melting cheese, cubed, 120g",
      "Scallions and toasted sesame seeds, 40g",
    ],
    foldInTip:
      "Whisk the sriracha into the water at mixing (reduce the plain water to match its moisture), reduce the sweet chili sauce so it stays put and ribbon it between the coil folds, then fold the scallions and sesame in during the second set and laminate the cheese in during shaping so the sweet-hot swirl runs through melty pockets.",
    tastingNote:
      "A creamy, sweet-then-spicy swirl of chili and sriracha against melty mild-cheese pockets and fresh scallion — the viral bang-bang sauce baked straight into a tangy, addictive loaf.",
  },
  {
    name: "Miso Caramel",
    flavorProfile: "sweet",
    whyTrending:
      "Miso caramel is a flagship of 2026's 'elevated comfort' sweet trend (named alongside brown butter and baklava by bakery forecasters) — the salted-caramel evolution where fermented miso adds a deep, savory, umami edge that plays perfectly against sourdough's own fermented tang.",
    inclusions: [
      "Miso caramel swirl: soft caramel or dulce de leche whisked with a little white miso until smooth and pipeable, 130g",
      "White miso worked into the swirl (it's salty — keep the loaf's added salt light), included above",
      "Toasted pecans or walnuts, chopped, 60g",
      "Flaky salt and a little turbinado to finish the crust, 10g",
    ],
    foldInTip:
      "Whisk the miso into the soft caramel until smooth (keep the dough's own salt light to compensate), laminate the dough thin and pipe the miso-caramel over it with the toasted nuts, then roll and coil-fold so it spirals through the crumb; finish the crust with flaky salt and turbinado before scoring.",
    tastingNote:
      "Deep salted-caramel ribbons with a savory, umami miso undertone and toasty nut crunch through a soft crumb — the sweet-savory 'elevated comfort' loaf that leans into sourdough's own funk.",
  },
  {
    name: "Pistachio & Raspberry",
    flavorProfile: "sweet",
    whyTrending:
      "A darling of 2026's visual-forward bakers — the pistachio-and-raspberry pairing (a patisserie classic) makes a loaf that's as stunning as it is delicious, with green nut flecks and jammy magenta swirls, riding the same pistachio wave as the Dubai loaf but in a fresher, fruit-forward direction.",
    inclusions: [
      "Pistachio cream or paste, warmed for swirling, 100g",
      "Freeze-dried raspberries (fresh runs the dough wet), lightly crushed, 40g — or a thick reduced raspberry jam, 70g",
      "Toasted pistachios, roughly chopped, 50g",
      "White chocolate chips, optional, 60g",
    ],
    foldInTip:
      "Laminate the dough thin, spread the pistachio cream over it, and scatter the crushed freeze-dried raspberries and chopped pistachios (freeze-dried keeps the hydration in check and the swirl vivid), then roll and coil-fold so green and magenta streak the crumb; add the white chocolate during shaping if using.",
    tastingNote:
      "Rich, nutty pistachio-cream ribbons against tart-sweet raspberry bursts and toasted-pistachio crunch — a patisserie pairing turned into a striking green-and-magenta dessert loaf.",
  },
  {
    name: "Cheddar Bay Biscuit (Red Lobster copycat)",
    flavorProfile: "savory",
    whyTrending:
      "Red Lobster's Cheddar Bay Biscuits are one of the most-searched copycat bakes of 2025–2026, and bakers have started folding their garlic-butter-cheddar-Old-Bay flavor straight into a sourdough boule — riding the same 'restaurant staple as a loaf' wave as the Marry Me Chicken and broccoli-cheddar loaves.",
    inclusions: [
      "Sharp cheddar, cubed small, 130g",
      "Garlic-herb butter glaze (melted butter, minced garlic, parsley, a little Old Bay) to brush the crust, 40g",
      "Old Bay or a garlic-salt-parsley blend worked into the dough, 8g",
      "Chives, chopped, 6g",
    ],
    foldInTip:
      "Fold the Old Bay and chives in during the second set of stretch-and-folds so the seasoning spreads, laminate the cheddar cubes in during shaping, then brush the baked crust with the warm garlic-herb butter twice while it's still hot so it soaks in like the biscuit's signature glaze.",
    tastingNote:
      "A savory, garlicky crumb studded with melty cheddar pockets under a buttery, herb-flecked, Old-Bay-scented crust — the drive-through biscuit basket turned into a sliceable loaf.",
  },
  {
    name: "Muhammara (Roasted Red Pepper & Walnut)",
    flavorProfile: "savory",
    whyTrending:
      "Muhammara — the Syrian/Levantine roasted-red-pepper-and-walnut dip with pomegranate molasses — is a named rising 2026 Mediterranean-mezze flavor (following harissa, za'atar, and whipped feta onto menus) and folds into a striking rust-colored savory loaf distinct from the board's other mezze bakes.",
    inclusions: [
      "Roasted red peppers, drained hard and patted very dry, chopped, 90g",
      "Walnuts, toasted and roughly chopped, 80g",
      "Pomegranate molasses, swirled in, 25g",
      "Aleppo pepper, cumin, and a little smoked paprika, 6g",
    ],
    foldInTip:
      "Jarred roasted peppers run wet, so strain and blot them bone-dry first; fold the spices and toasted walnuts in during the second set of folds, laminate the peppers in during shaping, and ribbon the pomegranate molasses between the last folds so it streaks the crumb without slackening it.",
    tastingNote:
      "Sweet-smoky roasted pepper and toasty walnut against a tangy, faintly fruity pomegranate note and gentle Aleppo warmth — a rust-red mezze dip baked into a savory loaf.",
  },
  {
    name: "Buldak (Korean Fire Chicken)",
    flavorProfile: "spicy",
    whyTrending:
      "Buldak — Korean 'fire chicken' and the Samyang buldak fire-noodle craze — is one of 2026's most viral heat trends, and bakers are folding its sweet-savory gochugaru-gochujang glaze into a fiery cheese-pulled loaf, extending the Korean-fusion wave beyond the board's gochujang and kimchi bakes.",
    inclusions: [
      "Cooked shredded chicken tossed in a reduced buldak glaze (gochujang, gochugaru, soy, garlic, a little sugar) then drained well, 120g",
      "Low-moisture mozzarella, cubed (the cheese-pull is the whole point), 120g",
      "Gochugaru (Korean chili flakes) worked into the dough, 8g",
      "Scallions and toasted sesame seeds, 40g",
    ],
    foldInTip:
      "Reduce the buldak glaze thick and drain the sauced chicken well so the extra sauce doesn't over-hydrate the dough; fold the gochugaru in during the first set of folds, then laminate the chicken, mozzarella, and scallions in during shaping so you get spicy meat and molten cheese-pull pockets.",
    tastingNote:
      "Sweet-savory building gochugaru heat and glossy buldak glaze against long strings of molten mozzarella — the viral fire-chicken flavor baked into a stretchy, sweat-inducing loaf.",
  },
  {
    name: "Habanero Peach & Sharp Cheddar",
    flavorProfile: "spicy",
    whyTrending:
      "Habanero-peach is a flagship of 2026's 'fricy' (fruity + spicy) wave — the sweet-heat combo behind viral pepper jellies and hot sauces — and, paired with sharp cheddar, it makes a summery jam-and-cheese loaf that reads fresher than the board's jalapeño and Calabrian bakes.",
    inclusions: [
      "Habanero-peach jam or preserves (or thick peach jam plus minced habanero), reduced slightly so it isn't runny, swirled in, 70g",
      "Dried peach, diced, 60g — or extra freeze-dried peach to keep hydration in check",
      "Sharp white cheddar, cubed, 120g",
      "Fresh habanero, seeded, minced, and patted dry (gloves!), 15g",
    ],
    foldInTip:
      "Reduce the jam so it's thick, then ribbon it between the last coil folds; laminate the dried peach, cheddar, and minced habanero in during shaping so the sweet fruit, molten cheese, and slow habanero burn stay in defined pockets. Cool at least 2 hours so the fruit pockets set.",
    tastingNote:
      "Juicy sweet peach and tangy cheddar hit first, then a slow, floral habanero heat blooms on the finish — a pepper-jelly-and-cheese board baked into a tangy loaf.",
  },
  {
    name: "Chocolate Hazelnut (Nutella / Gianduja)",
    flavorProfile: "sweet",
    whyTrending:
      "The chocolate-hazelnut swirl loaf is a perennial TikTok favorite that surged again in 2026 as gianduja (the artisan Piedmontese chocolate-hazelnut) crossed from confectionery into bakery — a molten Nutella-style spiral that's the sweet crowd-pleaser skeptics ask for by name.",
    inclusions: [
      "Chocolate-hazelnut spread (Nutella or a good gianduja), warmed for swirling, 130g",
      "Toasted skinned hazelnuts, roughly chopped, 70g",
      "Dark chocolate chunks, 60g",
      "A little cocoa and flaky salt to finish the crust, 10g",
    ],
    foldInTip:
      "Laminate the dough thin, spread the warmed chocolate-hazelnut spread over it, and scatter the toasted hazelnuts and dark chocolate, then roll and coil-fold so it spirals through the crumb; keep the spread off the very edges so the seam still seals, and finish the crust with a dusting of cocoa and flaky salt.",
    tastingNote:
      "Molten chocolate-hazelnut ribbons and pockets of dark chocolate against toasty, crunchy hazelnuts through a soft crumb — a jar of Nutella spiraled into a sliceable dessert loaf.",
  },
  {
    name: "Key Lime Pie",
    flavorProfile: "sweet",
    whyTrending:
      "Key lime pie is a defining 2026 'nostalgic dessert as a loaf' bake (joining s'mores, banana pudding, and peach cobbler) — bright key-lime tang, sweet condensed-milk creaminess, and a buttery graham-cracker crunch translated into a swirled sweet sourdough.",
    inclusions: [
      "Key lime zest from 4–5 key limes (or 2 regular limes), tossed with a little sugar, 25g, plus a splash of lime juice swapped for part of the dough water, 20g",
      "Sweetened condensed milk, dolloped in for creamy pockets, 90g — or white chocolate chips, 80g",
      "Graham crackers, crushed into a butter-toasted crumble for the swirl and crust, 60g",
      "Cream cheese, frozen and cubed, optional for a cheesecake edge, 80g",
    ],
    foldInTip:
      "Toss the zest with sugar and stir it plus the lime juice in early so the citrus spreads; laminate the dough thin, dollop the condensed milk (and frozen cream cheese) and scatter the graham crumble over it, then roll and coil-fold so it spirals — press extra graham crumble onto the crust before scoring for the pie-crust crunch.",
    tastingNote:
      "Bright, tangy key-lime perfume and creamy sweet condensed-milk pockets against a buttery graham-cracker crunch — a slice of key lime pie turned into a tangy sourdough loaf.",
  },
  {
    name: "French Dip (Roast Beef & Provolone)",
    flavorProfile: "savory",
    whyTrending:
      "The French dip is the next sandwich-as-loaf after Reuben, Philly, Cubano, and muffuletta — 2026 deli-loaf coverage keeps naming it — and it's distinct from the board's cheesesteak because the flavor comes from a rich beefy au jus folded into the crumb rather than peppers and onions, finished with molten provolone.",
    inclusions: [
      "Deli roast beef, thinly sliced and torn into small pieces, patted dry, 120g",
      "Concentrated beef au jus / demi-glace, reduced thick and cooled, swapped for part of the dough water, 60g",
      "Provolone, cut into small cubes, 120g",
      "Caramelized shallots plus fresh thyme and cracked pepper, 50g",
    ],
    foldInTip:
      "Reduce the au jus until it's a thick, cool paste and swap it for an equal weight of water at mixing for a savory beef-scented crumb; fold the thyme and caramelized shallots in during the second set of folds, then laminate the roast beef and provolone in during shaping so you get beefy shreds and molten cheese pockets. Serve toasted with extra warm jus for dipping.",
    tastingNote:
      "A deeply beefy, herb-and-shallot crumb studded with tender roast beef and molten provolone — a French dip sandwich, jus and all, baked into a tangy loaf that begs to be dunked.",
  },
  {
    name: "Butternut Squash, Sage & Brown Butter",
    flavorProfile: "savory",
    whyTrending:
      "Roasted-squash-and-sage is a defining 2026 autumn savory bake (the elegant cousin of the pumpkin-spice wave) — brown butter and nutty Gruyère turn caramelized butternut into a golden, dinner-party loaf distinct from the board's sweet pumpkin bake.",
    inclusions: [
      "Butternut squash, cubed small, roasted hard until caramelized and dried out, cooled, 150g",
      "Gruyère or aged fontina, cubed, 110g",
      "Brown butter, cooked to a nutty deep gold and cooled, brushed through the lamination, 30g",
      "Fresh sage, chopped, plus a little grated nutmeg, 6g",
    ],
    foldInTip:
      "Roast the squash hard so it's caramelized and dry (steamed or under-roasted squash weeps and slackens the dough), then cool it; fold the sage and nutmeg in during the second set of folds, brush the brown butter over the laminated sheet, and lay the squash and Gruyère across it during shaping so the sweet squash and molten cheese stay in defined pockets.",
    tastingNote:
      "Sweet, caramelized butternut and nutty brown butter against melty Gruyère and earthy sage — a plate of roasted-squash pasta turned into a golden, savory autumn loaf.",
  },
  {
    name: "Italian Grinder (Hot Giardiniera, Salami & Provolone)",
    flavorProfile: "spicy",
    whyTrending:
      "The Italian grinder is one of TikTok's biggest sandwich crazes, and bakers are folding its defining hot giardiniera (spicy pickled Chicago-style vegetables) with cured meats and provolone into a loaf — the heat and vinegar bite make it distinct from the board's muffuletta (olive salad) and pepperoni bakes.",
    inclusions: [
      "Hot giardiniera (spicy pickled peppers, celery, carrot), drained hard and chopped, 90g",
      "Genoa salami and capicola, diced, patted of grease, 90g",
      "Provolone, cubed, 110g",
      "Dried oregano, garlic, and a pinch of crushed red pepper, 6g",
    ],
    foldInTip:
      "Drain and blot the giardiniera bone-dry so its brine and oil don't slacken the dough, and pat the cured meats to shed grease; fold the oregano and red pepper in during the second set of folds, then laminate the giardiniera, meats, and provolone in during shaping so the tangy-spicy peppers and molten cheese alternate through the crumb.",
    tastingNote:
      "Vinegary, spicy pickled-pepper crunch against salty cured salami and molten provolone — a Chicago-style Italian grinder baked into a tangy, punchy loaf.",
  },
  {
    name: "Tandoori Chicken & Mint",
    flavorProfile: "spicy",
    whyTrending:
      "Tandoori chicken is a rising 2026 globally-inspired meal-in-a-loaf that reads fresher than the board's creamy tikka masala — it's the drier, yogurt-and-spice-marinated, char-edged version, brightened with a fresh mint-cilantro streak instead of a rich gravy.",
    inclusions: [
      "Cooked tandoori-marinated chicken (yogurt, garam masala, ginger-garlic, Kashmiri chili, lemon), charred, cooled, and diced small, 130g",
      "Kashmiri chili powder and a little smoked paprika worked into the dough for color and gentle heat, 6g (keep total spice under ~1% of flour)",
      "Fresh mint and cilantro, chopped, ribboned in, 25g",
      "Red onion, finely diced and patted dry, plus a squeeze of lemon zest, 40g",
    ],
    foldInTip:
      "Char and cool the marinated chicken and blot it dry so the yogurt marinade doesn't over-hydrate the dough; keep the added ground spice under ~1% of flour (garam masala's warm spices are anti-microbial and can stall the culture), fold the Kashmiri chili in during the first set of folds for an even blush, then laminate the chicken, red onion, and herbs in during shaping.",
    tastingNote:
      "Smoky, char-edged tandoori spice and gentle Kashmiri warmth against a bright, cooling streak of fresh mint and cilantro — a plate of tandoori chicken baked into a tangy loaf.",
  },
  {
    name: "Banana Pudding",
    flavorProfile: "sweet",
    whyTrending:
      "Banana pudding is a flagship of 2026's 'nostalgic dessert as a loaf' wave (alongside s'mores, peach cobbler, and key lime pie) — the Southern icebox classic of vanilla custard, sliced banana, and Nilla wafers translated into a swirled sweet sourdough, distinct from the board's rum-caramel bananas foster.",
    inclusions: [
      "Freeze-dried banana, crushed, plus a little banana extract, 40g (freeze-dried keeps hydration in check where fresh banana runs wet)",
      "Vanilla pudding / pastry cream, dolloped in cold for creamy pockets, 100g — or white chocolate chips, 80g",
      "Vanilla wafers (Nilla-style), broken into a butter-toasted crumble for the swirl and crust, 60g",
      "Vanilla bean paste, 6g",
    ],
    foldInTip:
      "Use freeze-dried banana (fresh weeps and greys the crumb), stir it plus the vanilla in early; laminate the dough thin, dollop the cold pudding and scatter the wafer crumble over it, then roll and coil-fold so it spirals — press extra wafer crumble onto the crust before scoring for the icebox-pie crunch.",
    tastingNote:
      "Creamy vanilla-custard pockets and sweet banana against a buttery toasted-wafer crunch — a bowl of Southern banana pudding turned into a tangy sliceable loaf.",
  },
  {
    name: "Peanut Butter & Jelly",
    flavorProfile: "sweet",
    whyTrending:
      "PB&J is the ultimate nostalgic-comfort swirl loaf riding 2026's childhood-throwback sweet trend — salty-sweet peanut butter ribboned with bright fruit jam, a crowd-pleaser that (like the board's Nutella loaf) skeptics ask for by name.",
    inclusions: [
      "Natural peanut butter, warmed loose for swirling (a little peanut butter powder in the dough deepens it), 120g",
      "Thick grape or strawberry jam, reduced slightly so it isn't runny, 80g",
      "Roasted salted peanuts, roughly chopped, 50g",
      "A pinch of flaky salt and light brown sugar for the swirl, 15g",
    ],
    foldInTip:
      "Reduce the jam so it's thick (runny jam blows out into holes), then laminate the dough thin, spread the loosened peanut butter, ribbon the jam, and scatter the chopped peanuts and brown sugar before rolling and coil-folding so the two spiral separately through the crumb; keep the fillings off the edges so the seam still seals, and finish with flaky salt. Cool fully so the jam pockets set.",
    tastingNote:
      "Salty-rich peanut butter ribbons weaving through bright sweet-tart jam with a roasted-peanut crunch — the lunchbox classic spiraled into a tangy sourdough loaf.",
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
  {
    name: "Panama Hacienda La Esmeralda Geisha (Washed)",
    roaster: "La Esmeralda / roasted by Onyx, Prodigal, or Proud Mary",
    origin: "Panama (Boquete / Jaramillo)",
    process: "Washed",
    roastLevel: "light",
    officialNotes: ["Jasmine", "Bergamot", "Peach", "Honeysuckle"],
    whyTry:
      "The single most famous coffee in the world and the varietal that started the Geisha craze — the Peterson family's washed Esmeralda Geisha is the reference tea-like, floral, world-record cup every serious taster should sit down with once. The board has a natural Colombian Gesha (Onyx) but not the washed Panama benchmark that defined the whole category. Brew as a gentle pour-over and taste it black, hot and as it cools, to catch the jasmine-to-peach arc.",
    approxPrice: "$45 / 100g",
  },
  {
    name: "Yemen Haraaz (Natural)",
    roaster: "Qima Coffee (London) — widely stocked",
    origin: "Yemen (Haraaz, Sana'a highlands)",
    process: "Natural (dry-processed)",
    roastLevel: "medium-light",
    officialNotes: ["Dark chocolate", "Dried fig", "Baking spice", "Boozy fruit"],
    whyTry:
      "Every origin on this board sits in Latin America, Africa, or Indonesia — there's no coffee from the Arabian Peninsula, the ancestral home of coffee itself (the port of Mocha gave 'mocha' its name). Yemen's ancient landrace varieties dried whole in the high desert give a singular wild, winey, deeply spiced natural that tastes like nothing else in the cup — Qima has been reviving these heritage lots and taking them to the top of the specialty scene. It's the essential heritage-origin benchmark and a fascinating counterpoint to the clean, modern co-ferments and washed lots above. Brew as a gentle pour-over to catch the dried-fruit-to-cocoa arc.",
    approxPrice: "$32 / 250g",
  },
  {
    name: "India Araku Valley (Natural)",
    roaster: "Blue Tokai Coffee Roasters (widely stocked)",
    origin: "India (Araku Valley, Andhra Pradesh)",
    process: "Natural (dry-processed)",
    roastLevel: "medium",
    officialNotes: ["Dark chocolate", "Jaggery", "Stone fruit", "Warm spice"],
    whyTry:
      "India is 2026's rising specialty origin — its home 'third wave' is booming and Western roasters are finally stocking single-origin Indian lots — yet the only Asian coffee on this board is an Indonesian. Araku Valley is India's flagship specialty region (award-winning, tribal-farmed, high-altitude), and a natural Araku is a syrupy, chocolate-and-jaggery cup with stone-fruit sweetness and a whisper of the warm spice India is known for — a distinct, low-and-mid-acid origin that fills the mainland-Asia geographic gap and pulls beautifully as a milk-drink espresso. Brew as pour-over to catch the fruit, or as espresso for the jaggery-cocoa depth.",
    approxPrice: "$20 / 250g",
  },
  {
    name: "Colombia Sugarcane Decaf (EA)",
    roaster: "Widely stocked (e.g. Onyx, Corvus, Trade)",
    origin: "Colombia (Huila / Cauca)",
    process: "Sugarcane EA decaf (washed base)",
    roastLevel: "medium",
    officialNotes: ["Milk chocolate", "Caramel", "Red apple", "Brown sugar"],
    whyTry:
      "Every bean on this board is fully caffeinated — there's no decaf at all, and single-origin specialty decaf is the clearest remaining category gap (and a genuinely hot 2026 sub-trend as roasters take decaf seriously). Colombia's sugarcane (natural ethyl-acetate) process is the gold standard: it strips the caffeine gently while keeping far more of the cup's sweetness and body than the old solvent methods, giving a clean, chocolatey, caramel-and-red-apple coffee you'd struggle to pick out as decaf. It's the essential 'evening espresso' and milk-drink bean for anyone who wants a second Einspänner or Spanish latte after dinner without the jitters — pull it as espresso for the caramel-cocoa depth or brew it as a comforting pour-over.",
    approxPrice: "$19 / 250g",
  },
  {
    name: "El Salvador Los Pirineos Pacamara (Natural)",
    roaster: "Widely stocked (e.g. Onyx, Sey, Prodigal)",
    origin: "El Salvador (Usulután / Los Pirineos)",
    process: "Natural",
    roastLevel: "light",
    officialNotes: ["Strawberry", "Grape candy", "Cocoa nib", "Molasses"],
    whyTry:
      "Every bean on this board is a Geisha, SL28, Bourbon, or landrace variety — there's no Pacamara, which is one of the most distinctive varietals in specialty coffee and a clear gap. Pacamara is a Salvadoran cross of the giant Maragogipe and Pacas, prized for enormous beans and a wild, syrupy, fruit-forward cup unlike anything else; the Diamantina family's celebrated Los Pirineos estate is the benchmark producer. A natural-process Pacamara is a juicy, jammy strawberry-and-grape light roast that shows why El Salvador (a rising Central-American origin with a deep varietal story) belongs on any serious tasting board — brew it as a filter to let the giant beans' fruit unfurl.",
    approxPrice: "$23 / 250g",
  },
  {
    name: "Peru Cajamarca (Washed)",
    roaster: "Passenger Coffee (Lancaster) / widely stocked",
    origin: "Peru (Cajamarca / Jaén)",
    process: "Washed",
    roastLevel: "medium-light",
    officialNotes: ["Brown sugar", "Red apple", "Cacao nib", "Almond"],
    whyTry:
      "There's no Peruvian on the board despite Peru being one of 2026's fastest-rising, often-organic South-American value origins — the only South Americans here are Colombia and Brazil. A washed Cajamarca is a clean, sweet, gently floral cup with a brown-sugar-and-cacao body and an almond finish that punches well above its price and pulls a forgiving, syrupy espresso. It's the ideal 'bridge' origin for anyone stepping up from supermarket coffee, and the natural pairing for the Peruvian aji amarillo loaf above. Brew as a pour-over for the apple-and-cacao sweetness or as an easy everyday espresso.",
    approxPrice: "$18 / 12oz",
  },
  {
    name: "Sumatra Mandheling (Wet-Hulled)",
    roaster: "Onyx Coffee Lab / widely stocked",
    origin: "Indonesia (North Sumatra / Lintong / Mandailing)",
    process: "Wet-hulled (Giling Basah)",
    roastLevel: "medium-dark",
    officialNotes: ["Dark chocolate", "Cedar", "Tobacco", "Earthy"],
    whyTry:
      "Every coffee on the board is either bright-and-fruity or clean-and-chocolatey — none captures the polarizing, intensely earthy low-acid register that defines classic Sumatra, and none uses the wet-hull (giling basah) process, unique to Indonesia, that creates it. Sumatra's Gayo carbonic-maceration lot here is a clean fruity CM natural, the opposite cup. Wet-hulling strips the parchment at 30–40% moisture, producing the signature blue-green bean and a heavy, full-bodied cup of dark chocolate, cedar, and tobacco with almost no acidity — a genuine processing and flavor-profile gap. Roasted medium-dark it's a syrupy, comforting espresso base that grounds a milk drink and pairs with the chocolatey loaves; it's also the ideal base coffee for a café de olla.",
    approxPrice: "$18 / 12oz",
  },
  {
    name: "Rwanda Nyamasheke (Washed Red Bourbon)",
    roaster: "Nova Coffee / Question Coffee / widely stocked",
    origin: "Rwanda (Western Province / Lake Kivu / Nyamasheke)",
    process: "Washed",
    roastLevel: "medium-light",
    officialNotes: ["Red currant", "Orange blossom", "Brown sugar", "Black tea"],
    whyTry:
      "The board's East-African coffees are all Ethiopian, Kenyan, or Ugandan — there's no Rwanda, one of 2026's fastest-rising 'origin to watch' specialty countries and a distinct cup in its own right. High-grown washed Red Bourbon from the hills around Lake Kivu gives a clean, silky, tea-like body with red-currant and orange-blossom brightness and a brown-sugar sweetness — softer and rounder than a punchy Kenyan SL28 and more delicate than a fruit-bomb natural. (It's also the origin where the notorious 'potato defect' can appear, so a well-sorted specialty lot is worth reviewing to show how far Rwandan sorting has come.) Brew it as a pour-over for the florals or pull it as a sweet, gentle filter-forward espresso; it doubles as the elegant base for a marocchino or an einspänner.",
    approxPrice: "$19 / 12oz",
  },
  {
    name: "Mexico Chiapas (Washed)",
    roaster: "Chiapas Coffee / Café Femenino / widely stocked",
    origin: "Mexico (Chiapas / Sierra Madre)",
    process: "Washed",
    roastLevel: "medium",
    officialNotes: ["Milk chocolate", "Toasted almond", "Caramel", "Soft citrus"],
    whyTry:
      "The board covers South America (Colombia, Brazil, Peru), Central America (Guatemala, Honduras, El Salvador, Costa Rica), Africa, Indonesia, and Asia — but there's no Mexico, the largest specialty origin in North America and a top source of organic and women-produced (Café Femenino) lots. High-grown washed Chiapas is a gentle, approachable, cocoa-and-almond cup with a soft citrus lift and a clean, mild body — the antidote to a punchy Kenyan and a natural pairing for the board's Mexican bakes (elote, chamoy, chile relleno) and the Café de Olla drink. Pull it as a smooth, low-drama espresso or brew it as an easygoing everyday filter.",
    approxPrice: "$18 / 12oz",
  },
  {
    name: "Papua New Guinea Sigri Estate (Washed)",
    roaster: "Sey Coffee / Paradise Coffee / widely stocked",
    origin: "Papua New Guinea (Western Highlands / Waghi Valley / Sigri Estate)",
    process: "Washed",
    roastLevel: "medium-light",
    officialNotes: ["Milk chocolate", "Baked apple", "Brown sugar", "Black tea"],
    whyTry:
      "Every origin on the board sits in the Americas, Africa, Indonesia, or mainland Asia — there's no Oceania/Pacific coffee at all, a whole growing region missing. Papua New Guinea (genetically close to Ethiopian heirloom, brought via Jamaica Blue Mountain seed) is the classic Pacific origin, and the estate-grown, fully washed Sigri lots from the high Waghi Valley are its benchmark: a rounded, syrupy, medium-bodied cup of milk chocolate, baked apple, and brown sugar with a black-tea finish — sweeter and rounder than a bright African washed coffee but cleaner than a wet-hulled Sumatra sitting on the same island arc. It's a forgiving, crowd-pleasing everyday espresso and a comforting pour-over that fills a genuine geographic gap.",
    approxPrice: "$19 / 12oz",
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
  {
    name: "Spanish Latte (Café con Leche Condensada)",
    category: "latte",
    brewRatio: "1:2",
    description:
      "One of the most-ordered café drinks of 2025–2026 as milk-forward, gently sweet 'comfort coffee' takes over from oversized syrup drinks — espresso and steamed milk sweetened with a little sweetened condensed milk for a silky, caramel-rounded latte (Middle Eastern and Latin cafés popularized it, and it went viral again on TikTok). A chocolatey medium-dark like the Brazil Cerrado above is ideal.",
    buildSteps: [
      "Spoon 1–2 tsp sweetened condensed milk into a glass or cup — more gives the signature dulce-de-leche roundness, less keeps it grown-up.",
      "Pull a fresh double shot of espresso directly over the condensed milk and stir until it dissolves into a caramel base.",
      "Steam milk to a silky microfoam (or fill with cold milk and ice for the iced version, which is how it most often trends).",
      "Pour the milk in and stir once so the sweetness distributes evenly; no syrup needed — the condensed milk is the whole trick.",
    ],
  },
  {
    name: "Freddo Cappuccino",
    category: "cappuccino",
    brewRatio: "1:2",
    description:
      "Greece's national iced coffee, spreading fast onto global café menus in 2025–2026 — a hard-shaken cold espresso topped with 'kaimaki,' a thick, barely-sweet whipped cold milk foam. It's the elegant, milk-crowned counterpart to the shakerato and the ideal way to show off a chocolatey medium-dark like the Brazil Cerrado above.",
    buildSteps: [
      "Pull a fresh double shot (about 36g) — a chocolatey medium-dark froths thickest — and, if you like, dissolve a little sugar into it while hot (the Greek default is 'metrios,' lightly sweet).",
      "Add the shot to a shaker or a tall jug with a scoop of ice and shake hard (or blend with a hand frother) for 20–30 seconds until it's cold and foamy; pour over a glass of fresh ice.",
      "Make the kaimaki foam: froth cold milk (no sugar) with a handheld frother, tilting the jug, until it holds a thick, glossy, pourable foam.",
      "Spoon and pour the cold milk foam over the top so it sits in a dense cap; serve with a straw and no stirring so you drink through the foam.",
    ],
  },
  {
    name: "Einspänner",
    category: "espresso",
    brewRatio: "1:2",
    description:
      "The 12th-century Viennese coffee — espresso under a thick cap of unsweetened whipped cream, served in a glass — reborn as one of 2026's biggest café drinks via Korean coffee culture and TikTok (where it's ordered hot or iced). You sip the espresso through the cream so it sweetens and softens on the way down. A chocolatey medium-dark like the Brazil Cerrado or the India Araku above is ideal under all that cream.",
    buildSteps: [
      "Whip cold heavy cream (a touch of vanilla or a teaspoon of sugar is optional — the classic is barely sweet) to soft, just-pourable peaks, not stiff.",
      "For the iced version, fill a clear glass with ice; for hot, warm the glass. Pull a fresh double shot (about 36g) — a chocolatey medium-dark stands up best under the cream — and pour it into the glass (over the ice for iced).",
      "Spoon and pour the whipped cream gently over the back of a spoon so it floats in a thick, glossy cap that sits on top rather than sinking.",
      "Don't stir — drink straight through the cream so each sip pulls cold cream through hot (or iced) espresso; dust the cap with cocoa if you like.",
    ],
  },
  {
    name: "Vietnamese Egg Coffee (Cà Phê Trứng)",
    category: "filter",
    brewRatio: "phin drip (roughly 1:2)",
    description:
      "Hanoi's iconic café drink — strong phin-brewed coffee under a thick, sweet, custardy cap of egg yolk whipped with condensed milk — is one of 2026's breakout café orders as forecasters spotlight specific regional cuisines (Vietnamese, Filipino, Thai) over generic 'global' fusion. It eats almost like tiramisu in a cup and is the perfect showcase for a bold, chocolatey dark roast (or the new sugarcane decaf) rather than a delicate light one.",
    buildSteps: [
      "Brew a small, strong cup of coffee — traditionally a dark Vietnamese robusta through a phin filter, but any bold, chocolatey medium-dark works; keep it concentrated, about 40–60ml.",
      "Make the egg cream: whisk 1 fresh egg yolk with 2–3 tsp sweetened condensed milk (and a drop of vanilla) with a handheld frother for 2–3 minutes until it's pale, thick, and mousse-like — set the bowl over warm water while whisking if you'd like it warm and cooked-through.",
      "Pour the hot coffee into a small glass or cup, then spoon the thick egg cream over the top so it floats in a dense, glossy custard cap.",
      "Serve without stirring (dust with cocoa if you like) and sip the hot coffee up through the sweet foam; for the iced version, pour over ice instead.",
    ],
  },
  {
    name: "Cardamom Coffee (Qahwa / Gahwa)",
    category: "filter",
    brewRatio: "brewed (roughly 1:12)",
    description:
      "The heritage coffee of the Arabian Peninsula — lightly roasted beans brewed with green cardamom (and sometimes saffron or clove) and served in small cups — is having a global-café moment in 2026 as forecasters spotlight specific regional traditions over generic 'spiced lattes.' Fragrant, barely bitter, and unsweetened, it's the ideal way to show off a heritage landrace bean like the Yemen Haraaz natural above, whose ancestry is bound up with this very ritual.",
    buildSteps: [
      "Coarsely crush 4–6 green cardamom pods (crack them so the seeds perfume the brew) per two small cups of water.",
      "Brew a light-roast coffee gently — traditionally coarse grounds simmered briefly in a dallah pot, but a light pour-over or French press works — steeping the crushed cardamom (and a thread of saffron or a clove, if you like) with the grounds.",
      "Let it settle so the grounds and pods sink, then pour the clear coffee off the top into small handleless finjan cups, filling each only a third full.",
      "Serve unsweetened and hot, traditionally alongside a date to offset the light, aromatic bitterness — no milk.",
    ],
  },
  {
    name: "Affogato",
    category: "espresso",
    brewRatio: "1:2",
    description:
      "Dessert-coffee is having a 2026 café comeback, and the affogato — a hot double shot 'drowning' a scoop of cold vanilla gelato so it melts into a warm-cold cream — is the simplest and most elegant of them. It's the perfect showcase for a chocolatey medium-dark like the Brazil Cerrado above, and it doubles as dessert alongside any of the sweet loaves on the board.",
    buildSteps: [
      "Scoop a generous ball of good vanilla gelato or ice cream into a small chilled glass or cup.",
      "Pull a fresh hot double shot (about 36g) — a chocolatey medium-dark melts the gelato into the richest cream.",
      "Pour the hot espresso directly over the gelato so it begins melting into a warm-cold, foamy pool.",
      "Serve immediately with a spoon; finish with grated chocolate, toasted chopped nuts, or a crumbled biscotti if you like.",
    ],
  },
  {
    name: "Café de Olla",
    category: "filter",
    brewRatio: "brewed (roughly 1:12)",
    description:
      "Mexico's traditional clay-pot spiced coffee — coarse grounds gently simmered with canela (Mexican cinnamon), piloncillo (unrefined cane sugar), and often clove or star anise — is having a 2026 global-café moment as forecasters spotlight specific regional traditions over generic 'spiced lattes.' Sweet, earthy, and aromatic, it's the ideal way to show off an earthy medium-dark like the new Sumatra Mandheling (or the chocolatey Brazil Cerrado) and the natural coffee counterpart to the board's Mexican loaves (elote, chamoy, aji amarillo).",
    buildSteps: [
      "Bring about 4 cups of water to a simmer with a stick of Mexican canela (Ceylon cinnamon — softer and fruitier than cassia), 30–40g piloncillo (or dark brown sugar), and optionally a clove or a star anise; stir until the sugar dissolves.",
      "Add ~4 tablespoons of coarsely ground medium-dark coffee off the boil, stir once, cover, and steep 4–5 minutes — simmer gently rather than brewing fast so the spices and coffee fully infuse.",
      "Let it settle so the grounds sink, then pour through a fine strainer into small cups or clay jarritos.",
      "Serve hot and unsweetened-to-taste (the piloncillo is the sweetness), traditionally alongside pan dulce; for an iced version, cool and pour over ice with a splash of milk.",
    ],
  },
  {
    name: "Marocchino",
    category: "espresso",
    brewRatio: "1:2",
    description:
      "The small northern-Italian classic — espresso, a dusting of cocoa, and a little milk foam layered in a glass — is having a 2026 specialty-café revival as the elegant, cocoa-kissed middle ground between a cortado and a mocha (and the antidote to oversized syrupy 'mochas'). Served in a clear glass so the dark-cocoa-cream-espresso layers show, it's the ideal tiny drink to show off a chocolatey medium-dark like the Brazil Cerrado above.",
    buildSteps: [
      "Dust the inside of a small clear glass with unsweetened cocoa powder (some baristas add a thin smear of melted chocolate for the deluxe version).",
      "Pull a fresh single or double shot (about 18–36g) — a chocolatey medium-dark plays perfectly with the cocoa — directly into the glass.",
      "Steam a small amount of milk to a silky, dense microfoam and spoon just a thin layer over the espresso so it sits as a pale cap, not a full latte's worth.",
      "Finish with a final dusting of cocoa over the foam; serve small and drink promptly while the layers are still distinct.",
    ],
  },
  {
    name: "Vietnamese Salt Coffee (Cà Phê Muối)",
    category: "filter",
    brewRatio: "phin drip (roughly 1:2)",
    description:
      "Huế's breakout coffee — strong phin-brewed coffee over sweetened condensed milk crowned with a lightly salted whipped-cream foam — is one of the biggest viral café orders of 2025–2026 (millions of TikTok posts) as forecasters keep spotlighting specific regional traditions over generic 'salted' lattes. The pinch of salt rounds out the bitterness and lifts the sweetness, and it's a perfect showcase for a bold, chocolatey dark roast (or the sugarcane decaf) rather than a delicate light one.",
    buildSteps: [
      "Spoon 1–2 tbsp sweetened condensed milk into the bottom of a tall glass.",
      "Brew a small, strong cup of coffee — traditionally dark Vietnamese robusta through a phin filter, but any bold, chocolatey medium-dark works — and let it drip straight over the condensed milk, about 40–60ml.",
      "Make the salted cream: whisk cold heavy cream (or a cream-and-milk mix) with a small pinch of fine salt using a handheld frother until it holds soft, just-pourable peaks.",
      "Fill the glass with ice, spoon and pour the salted cream over the top so it floats in a thick cap, and serve unstirred with a straw so each sip pulls salty cream through the sweet coffee (stir once to combine if you prefer it even).",
    ],
  },
  {
    name: "Yuanyang (Hong Kong Coffee-Milk-Tea)",
    category: "filter",
    brewRatio: "roughly 3 parts milk tea : 7 parts coffee",
    description:
      "Yuanyang (鴛鴦) — Hong Kong's iconic cha chaan teng blend of strong coffee and creamy Hong-Kong-style milk tea over sweetened condensed or evaporated milk — is having a 2026 specialty moment as forecasters keep spotlighting specific regional coffee traditions over generic 'dirty' or 'flavored' lattes. The tannic black tea rounds off the coffee's edge for a smooth, malty, deeply comforting cup, and it's a natural showcase for a bold, chocolatey medium-dark (like the Brazil Cerrado or the new PNG Sigri) rather than a delicate light roast.",
    buildSteps: [
      "Brew a strong black tea — a robust Ceylon or an English-breakfast blend, ideally strained through a cloth 'stocking' the HK way — and, separately, brew a small, strong cup of coffee (bold medium-dark or a dark filter).",
      "Combine roughly 3 parts milk tea to 7 parts coffee to taste (start there and adjust — the coffee should lead, the tea should round it out).",
      "Stir in sweetened condensed milk to taste, or evaporated milk plus a little sugar, until it's silky and lightly sweet.",
      "Serve hot in a thick cup, or pour over a tall glass of ice for the summer version; a straw and a stir bring the malty tea and coffee together in every sip.",
    ],
  },
];
