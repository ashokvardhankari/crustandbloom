import type {
  BeanFrontmatter,
  BreadFrontmatter,
  CoffeeFrontmatter,
  NewsletterFrontmatter,
} from "./types";

export const SITE_URL = "https://crustbloom.com";
export const SITE_NAME = "Crust & Bloom";
export const SITE_DESCRIPTION =
  "A personal site about specialty coffee and artisan sourdough bread, brewed, baked, and photographed by hand.";

const AUTHOR = { "@type": "Person", name: SITE_NAME } as const;

export function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}

// ─── Markdown helpers (for deriving Recipe fields from the MDX body) ─────────

/** Reduce a markdown fragment to plain sentence text. */
function plainText(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, "")
    .replace(/^\|.*$/gm, "") // drop table rows
    .replace(/^>\s?/gm, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

interface Section {
  heading: string;
  body: string;
}

/** Split a raw MDX document into its H2 sections (frontmatter stripped). */
function sections(raw: string): Section[] {
  const body = raw.replace(/^---[\s\S]*?---/, "");
  return body
    .split(/^##\s+/m)
    .slice(1)
    .map((part) => {
      const nl = part.indexOf("\n");
      return {
        heading: (nl === -1 ? part : part.slice(0, nl)).trim(),
        body: nl === -1 ? "" : part.slice(nl + 1).trim(),
      };
    });
}

/**
 * Pull "500g bread flour"-style ingredient lines out of the Formula table.
 * Returns [] when a post has no formula table, so callers can omit the field.
 */
function formulaIngredients(raw: string): string[] {
  const formula = sections(raw).find((s) =>
    /formula|ingredient/i.test(s.heading)
  );
  if (!formula) return [];

  const ingredients: string[] = [];
  for (const line of formula.body.split("\n")) {
    if (!line.trim().startsWith("|")) continue;
    const cells = line
      .split("|")
      .map((c) => c.replace(/\*\*/g, "").trim())
      .filter(Boolean);
    if (cells.length < 2) continue;
    const [name, weight] = cells;
    if (/^ingredient$/i.test(name) || /^[-: ]+$/.test(name)) continue;
    ingredients.push(
      weight && weight !== "—" && weight !== "-"
        ? `${weight} ${name.charAt(0).toLowerCase()}${name.slice(1)}`
        : name
    );
  }
  return ingredients;
}

/** Turn the post's H2 sections into HowToStep entries, skipping non-method ones. */
function instructionSteps(raw: string) {
  return sections(raw)
    .filter(
      (s) => !/formula|ingredient|recipe vs|the bean|verdict/i.test(s.heading)
    )
    .map((s) => ({
      "@type": "HowToStep",
      name: s.heading,
      text: plainText(s.body),
    }))
    .filter((s) => s.text.length > 0);
}

// ─── JSON-LD builders ─────────────────────────────────────────────────────────

export function breadRecipeJsonLd(
  slug: string,
  fm: BreadFrontmatter,
  raw: string
) {
  const ingredients = formulaIngredients(raw);
  const steps = instructionSteps(raw);
  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: fm.title,
    url: `${SITE_URL}/bread/${slug}`,
    description: fm.excerpt,
    image: fm.images.map(absoluteUrl),
    author: AUTHOR,
    datePublished: fm.date,
    recipeCategory: "Bread",
    recipeYield: "1 loaf",
    keywords: ["sourdough", fm.category, fm.flavorProfile]
      .filter(Boolean)
      .join(", "),
    ...(fm.prepTime && { prepTime: fm.prepTime }),
    ...(fm.cookTime && { cookTime: fm.cookTime }),
    ...(fm.totalTime && { totalTime: fm.totalTime }),
    ...(ingredients.length > 0 && { recipeIngredient: ingredients }),
    ...(steps.length > 0 && { recipeInstructions: steps }),
  };
}

export function coffeeRecipeJsonLd(
  slug: string,
  fm: CoffeeFrontmatter,
  raw: string
) {
  const steps = instructionSteps(raw);
  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: fm.title,
    url: `${SITE_URL}/coffee/${slug}`,
    description: fm.excerpt,
    image: fm.images.map(absoluteUrl),
    author: AUTHOR,
    datePublished: fm.date,
    recipeCategory: "Drink",
    recipeYield: "1 cup",
    keywords: fm.tags.join(", "),
    ...(steps.length > 0 && { recipeInstructions: steps }),
  };
}

export function beanReviewJsonLd(slug: string, fm: BeanFrontmatter) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    url: `${SITE_URL}/beans/${slug}`,
    itemReviewed: {
      "@type": "Product",
      name: `${fm.roaster} ${fm.title}`,
      brand: { "@type": "Brand", name: fm.roaster },
      ...(fm.coverImage && { image: absoluteUrl(fm.coverImage) }),
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: fm.rating,
      bestRating: 5,
      worstRating: 0,
    },
    author: AUTHOR,
    datePublished: fm.date,
    reviewBody: fm.tastingNotes,
  };
}

export function newsletterArticleJsonLd(
  slug: string,
  fm: NewsletterFrontmatter
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: fm.title,
    url: `${SITE_URL}/newsletter/${slug}`,
    description: fm.excerpt,
    ...(fm.coverImage && { image: absoluteUrl(fm.coverImage) }),
    author: AUTHOR,
    datePublished: fm.date,
  };
}

/**
 * BreadcrumbList schema for a detail page's trail. Each crumb needs an
 * absolute `item` URL; the final (current) crumb may omit its href.
 */
export function breadcrumbJsonLd(items: { label: string; href?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      ...(crumb.href && { item: absoluteUrl(crumb.href) }),
    })),
  };
}

/**
 * FAQPage schema for a list of question/answer pairs (e.g. the homepage FAQ).
 * Each answer is plain text that must mirror the visible on-page content.
 */
export function faqPageJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  };
}
