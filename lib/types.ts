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
  excerpt: string;
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
  brewMethod?: string;
  rating: number; // 0–5, half-steps allowed
  officialNotes?: string[]; // what the roaster claims
  tastingNotes: string; // what I actually taste
  wouldRebuy?: boolean;
  coverImage: string;
  images: string[];
  tags: string[];
  excerpt: string;
}

export type PostFrontmatter = CoffeeFrontmatter | BreadFrontmatter;

export interface PostMeta<T = PostFrontmatter> {
  slug: string;
  frontmatter: T;
}

export type FlavorFilter = "all" | "savory" | "sweet" | "spicy";
export type RoastFilter = "all" | "light" | "medium" | "dark";
