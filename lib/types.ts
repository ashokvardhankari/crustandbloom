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

export type PostFrontmatter = CoffeeFrontmatter | BreadFrontmatter;

export interface PostMeta<T extends PostFrontmatter = PostFrontmatter> {
  slug: string;
  frontmatter: T;
}

export type FlavorFilter = "all" | "savory" | "sweet" | "spicy";
