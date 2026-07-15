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

/** 15 trending sourdough inclusions across savory / sweet / spicy. */
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
];
