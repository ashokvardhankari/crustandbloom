/**
 * Gear on the shelf page. Add `url` (treated as an affiliate link and
 * labelled as such) when there is a real product link to share —
 * items without a url render without a buy button.
 */
export interface GearItem {
  name: string;
  category: "bread" | "coffee";
  blurb: string;
  url?: string;
}

export const GEAR: GearItem[] = [
  {
    name: "Dutch oven",
    category: "bread",
    blurb:
      "Every loaf on this site bakes in one. The trapped steam in the first 20 minutes is what makes the crust blister and the ear open up.",
  },
  {
    name: "Digital kitchen scale",
    category: "bread",
    blurb:
      "Every formula here is in grams for a reason. A scale that reads to 1g makes the difference between a recipe and a guess.",
  },
  {
    name: "Burr grinder",
    category: "coffee",
    blurb:
      "I grind fresh for every shot. With a cappuccino, the difference between grinding ahead and grinding right before is noticeable in the cup.",
  },
  {
    name: "Milk pitcher",
    category: "coffee",
    blurb:
      "Pre-warmed before every steam. A pitcher with a sharp spout is half the battle for latte art, and the other half is practice.",
  },
];
