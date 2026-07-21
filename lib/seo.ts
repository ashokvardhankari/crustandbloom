import type { Metadata } from "next";
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

/**
 * Social profiles for the brand. Single source of truth for both the footer
 * links and the Organization JSON-LD `sameAs`, so a handle change updates both.
 */
export const SITE_SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/crustandbloom" },
  { label: "Pinterest", href: "https://pinterest.com/crustandbloom" },
] as const;

const AUTHOR = { "@type": "Person", name: SITE_NAME } as const;

export function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}

/**
 * RSS autodiscovery alternate, emitted as `<link rel="alternate"
 * type="application/rss+xml">`. Must be repeated on every page's `alternates`:
 * Next shallow-merges nested metadata, so a page declaring `alternates.canonical`
 * overwrites the layout's `alternates.types` wholesale — which silently dropped
 * the feed link from every canonical-bearing page (i.e. all of them).
 */
export const FEED_ALTERNATE_TYPES = {
  "application/rss+xml": "/feed.xml",
} as const;

/** Canonical URL plus feed autodiscovery for a page's `alternates` block. */
export function pageAlternates(canonical: string): Metadata["alternates"] {
  return { canonical, types: FEED_ALTERNATE_TYPES };
}

// ─── Page metadata helpers ───────────────────────────────────────────────────

/**
 * Metadata for a content detail page (coffee, bread, bean, newsletter).
 *
 * Centralises the Open Graph + Twitter card so a shared post shows its own
 * cover image (not the site default) and is typed `og:type=article`. Without
 * this, each page overriding only `openGraph` silently inherits the layout's
 * generic Twitter image and `website` type.
 */
export function articleMetadata(opts: {
  title: string;
  description: string;
  image?: string;
  publishedTime?: string;
  /** Relative path of this page, e.g. "/coffee/foo", for a self-canonical URL. */
  canonical?: string;
}): Metadata {
  const images = opts.image ? [opts.image] : undefined;
  return {
    title: opts.title,
    description: opts.description,
    alternates: {
      ...(opts.canonical && { canonical: opts.canonical }),
      types: FEED_ALTERNATE_TYPES,
    },
    openGraph: {
      type: "article",
      title: opts.title,
      description: opts.description,
      ...(opts.publishedTime && { publishedTime: opts.publishedTime }),
      ...(images && { images: images.map((url) => ({ url })) }),
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      ...(images && { images }),
    },
  };
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

/**
 * A section that is never a method step regardless of where it sits: the
 * formula/ingredient table, the "My Recipe vs." comparison, an ingredient/bean
 * deep-dive ("The Bean", "On the Seasoning"), a tips list ("Notes", "Notes on
 * the Filling"), or a bean-review verdict.
 */
const DISCUSSION_HEADING =
  /formula|ingredient|recipe vs|the bean|verdict|\bnotes?\b|^on the\b/i;

/** Headings that name an actual baking/brewing action, used to find where the method begins. */
const METHOD_HEADING =
  /\b(mix|knead|ferment|prove?|proof|laminat|shap|bak|steam|pull|pour|assembl|feed|cook|rest|bloom|cool|coat)/i;

/** Turn the post's H2 sections into HowToStep entries, skipping non-method ones. */
function instructionSteps(raw: string) {
  const secs = sections(raw);

  // Bread recipes open with a Formula table, then often an ingredient spotlight
  // ("The Cheddar", "The Sun-Dried Tomatoes") before the first real step. Find
  // where the method actually begins so those spotlights aren't emitted as
  // cooking instructions. Coffee posts have no Formula section, so this is a
  // no-op for them and their noise is caught by DISCUSSION_HEADING alone.
  const formulaIdx = secs.findIndex((s) => /formula|ingredient/i.test(s.heading));
  const methodIdx =
    formulaIdx === -1
      ? -1
      : secs.findIndex((s, i) => i > formulaIdx && METHOD_HEADING.test(s.heading));

  return secs
    .filter((s, i) => {
      if (DISCUSSION_HEADING.test(s.heading)) return false;
      // Drop ingredient spotlights wedged between the Formula and the method.
      if (methodIdx !== -1 && i > formulaIdx && i < methodIdx) return false;
      return true;
    })
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

/**
 * Build a schema.org Offer from a bean's `price` string (e.g. "$18 / 12oz",
 * "~$7 / 13oz"). Parses the first dollar amount as USD and attaches the
 * affiliate `buyUrl` as the offer URL when one exists, so the reviewed product
 * carries its price in structured data. Returns undefined when no dollar amount
 * can be read, so the Product simply omits `offers`.
 */
function beanOffer(price?: string, buyUrl?: string) {
  if (!price) return undefined;
  const dollars = /\$\s*(\d+(?:\.\d+)?)/.exec(price);
  if (!dollars) return undefined;
  return {
    "@type": "Offer",
    priceCurrency: "USD",
    price: dollars[1],
    ...(buyUrl && { url: buyUrl, availability: "https://schema.org/InStock" }),
  };
}

export function beanReviewJsonLd(slug: string, fm: BeanFrontmatter) {
  const offers = beanOffer(fm.price, fm.buyUrl);
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    url: `${SITE_URL}/beans/${slug}`,
    itemReviewed: {
      "@type": "Product",
      name: `${fm.roaster} ${fm.title}`,
      brand: { "@type": "Brand", name: fm.roaster },
      ...(fm.coverImage && { image: absoluteUrl(fm.coverImage) }),
      ...(offers && { offers }),
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
 * CollectionPage schema wrapping an ordered ItemList for an archive/listing
 * page (e.g. /coffee, /bread, /beans, /newsletter). Each entry is a ListItem
 * whose `url` points at the detail page, kept in the page's on-screen order, so
 * search engines can read the page as a curated collection rather than a flat
 * document. Renders `numberOfItems: 0` gracefully for an empty archive.
 */
export function collectionPageJsonLd(opts: {
  name: string;
  description: string;
  /** Relative path of the listing page itself, e.g. "/coffee". */
  path: string;
  /** Items in display order; each `path` is the detail page's relative URL. */
  items: { title: string; path: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: opts.items.length,
      itemListElement: opts.items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.title,
        url: absoluteUrl(item.path),
      })),
    },
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

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/images/site/logo-email.png"),
    description: SITE_DESCRIPTION,
    sameAs: SITE_SOCIAL_LINKS.map((s) => s.href),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
