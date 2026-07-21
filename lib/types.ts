export interface CoffeeFrontmatter {
  title: string;
  date: string;
  type: "coffee";
  category: "latte" | "cappuccino" | "espresso" | "filter";
  coverImage: string;
  images: string[];
  brewRatio: string;
  extractionTime: string;
  milkTemp?: string;
  /** Espresso dose in grams for this drink, powering the inline brew calculator (e.g. 18, 21) */
  dose?: number;
  tags: string[];
  excerpt: string;
}

export interface BreadFrontmatter {
  title: string;
  date: string;
  type: "bread";
  category: "classic" | "inclusion";
  flavorProfile?: "savory" | "sweet" | "spicy";
  coverImage: string;
  images: string[];
  hydration: number;
  starterPercentage: number;
  bulkFermentation: string;
  bakeTemp: string;
  inclusions?: string[];
  tastingNotes: string;
  tags: string[];
  excerpt: string;
  /** ISO 8601 durations for recipe rich results, e.g. "PT1H", "PT45M", "PT20H" */
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
}

export type RoastLevel =
  | "light"
  | "medium-light"
  | "medium"
  | "medium-dark"
  | "dark";

export interface BeanFrontmatter {
  title: string; // the bean's name, e.g. "Forty-Six"
  date: string;
  type: "bean";
  roaster: string;
  origin: string; // country or "Blend (region)"
  region?: string;
  process?: string; // washed / natural / honey …
  varietal?: string;
  roastLevel: RoastLevel;
  altitude?: string;
  price?: string; // e.g. "$18 / 12oz"
  buyUrl?: string; // where to buy — treated as an affiliate link
  brewMethod?: string;
  rating: number; // 0–5, half-steps allowed
  officialNotes?: string[]; // what the roaster claims
  tastingNotes: string; // what I actually taste
  wouldRebuy?: boolean;
  coverImage?: string; // omit until you have the bag photo — a placeholder is shown
  images?: string[];
  tags: string[];
  excerpt: string;
}

export interface NewsletterFrontmatter {
  title: string; // the subject line the issue went out with
  date: string;
  type: "newsletter";
  issue: number;
  coverImage?: string;
  excerpt: string;
}

export type PostFrontmatter = CoffeeFrontmatter | BreadFrontmatter;

export interface PostMeta<T = PostFrontmatter> {
  slug: string;
  frontmatter: T;
}

export type FlavorFilter = "all" | "savory" | "sweet" | "spicy";
export type RoastFilter = "all" | "light" | "medium" | "dark";

/** Which content area a gallery photo comes from, used for the gallery filter. */
export type GalleryCategory = "coffee" | "bread" | "beans";
export type GalleryFilter = "all" | GalleryCategory;

export interface GalleryImage {
  src: string;
  alt: string;
  /** Link back to the post the photo belongs to. */
  postUrl: string;
  category: GalleryCategory;
}
