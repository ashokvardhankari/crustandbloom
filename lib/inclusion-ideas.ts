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
];
