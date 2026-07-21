import type { Metadata } from "next";
import { roastLabel, slugify, wordCount } from "./utils";
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
 * BCP-47 language tag for the site's content, emitted as `inLanguage` on every
 * CreativeWork-subtype JSON-LD entity (Recipe, Review, Article, CollectionPage,
 * AboutPage, ImageGallery, WebApplication, FAQPage, WebSite). The site is written
 * entirely in US English — the same signal already carried by `<html lang="en">`,
 * the manifest `lang: "en-US"`, and the `og:locale` `en_US` — so declaring it in
 * structured data gives search engines an explicit content-language signal for
 * regional targeting that the JSON-LD previously omitted. Matches the manifest's
 * hyphenated BCP-47 form (schema.org `inLanguage` expects BCP-47, not the
 * underscore `og:locale` form).
 */
export const SITE_LANGUAGE = "en-US";

/**
 * Social profiles for the brand. Single source of truth for both the footer
 * links and the Organization JSON-LD `sameAs`, so a handle change updates both.
 */
export const SITE_SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/crustandbloom" },
  { label: "Pinterest", href: "https://pinterest.com/crustandbloom" },
] as const;

const AUTHOR = { "@type": "Person", name: SITE_NAME } as const;

/**
 * Reference to the site-wide Organization node (injected once per page by the
 * root layout via `organizationJsonLd`, which carries the brand `name` + `logo`).
 * Used as the `publisher` on detail-page Recipe/Review/Article structured data
 * so those entities resolve to a single publisher in the page's JSON-LD graph
 * — the same `@id` reference `websiteJsonLd` already uses — rather than each
 * page redeclaring (or, until now, omitting) the publisher. Article rich
 * results in particular recommend a `publisher` with a logo, which this supplies.
 */
const PUBLISHER = { "@id": `${SITE_URL}/#organization` } as const;

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

/**
 * The site-wide default social share image, used by pages that have no single
 * cover photo of their own (the homepage and every listing/static page). Shared
 * between the root layout and `listingMetadata` so the dimensions/alt stay in
 * one place.
 */
export const DEFAULT_OG_IMAGE = {
  url: "/images/site/og-default.jpg",
  width: 1200,
  height: 630,
  alt: SITE_NAME,
} as const;

/**
 * Metadata for a listing/static page — archives (/coffee, /bread, /beans,
 * /newsletter) and standalone pages (/gallery, /tools, /about, /search, /tags).
 *
 * These pages set only a top-level `title`/`description`, which Next does NOT
 * copy into Open Graph — so a shared /coffee link rendered the layout's generic
 * site-wide card, and (because the layout's `openGraph.url` is the homepage)
 * `og:url` pointed every listing page at "/", telling Facebook/LinkedIn/Slack to
 * canonicalise the share to the homepage. This helper gives each page its own
 * `og:title`/`og:description`/`og:url` plus a matching Twitter card.
 *
 * Because Next shallow-merges the `openGraph` object, setting it here replaces
 * the layout's wholesale, so `type`/`siteName`/`locale`/`image` are re-declared
 * (the same merge quirk `articleMetadata` handles). `og:type` stays "website"
 * since these aren't articles, and the shared default image is used since these
 * pages have no cover photo.
 */
export function listingMetadata(opts: {
  title: string;
  description: string;
  /** Relative path of this page, e.g. "/coffee", for a self-canonical + og:url. */
  canonical: string;
}): Metadata {
  return {
    title: opts.title,
    description: opts.description,
    alternates: pageAlternates(opts.canonical),
    openGraph: {
      type: "website",
      title: opts.title,
      description: opts.description,
      siteName: SITE_NAME,
      locale: "en_US",
      url: absoluteUrl(opts.canonical),
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [{ url: DEFAULT_OG_IMAGE.url, alt: DEFAULT_OG_IMAGE.alt }],
    },
  };
}

// ─── Page metadata helpers ───────────────────────────────────────────────────

/**
 * Metadata for a content detail page (coffee, bread, bean, newsletter).
 *
 * Centralises the Open Graph + Twitter card so a shared post shows its own
 * cover image (not the site default) and is typed `og:type=article`. Without
 * this, each page overriding only `openGraph` silently inherits the layout's
 * generic Twitter image and `website` type.
 *
 * Because Next shallow-merges nested metadata, a page's `openGraph` replaces the
 * layout's wholesale — so `url`, `siteName`, and `locale` must be re-declared
 * here or they vanish from every detail page. `og:url` is what Facebook,
 * LinkedIn, Slack, and iMessage read to canonicalise and label a shared link,
 * and `og:site_name` brands the preview card; both were absent site-wide until
 * this set them explicitly. The cover image also carries an `alt` on both the
 * Open Graph and Twitter cards so assistive tech reading a shared link preview
 * gets a described image (parity with the layout's default OG image).
 */
export function articleMetadata(opts: {
  title: string;
  description: string;
  image?: string;
  publishedTime?: string;
  /** Relative path of this page, e.g. "/coffee/foo", for a self-canonical URL. */
  canonical?: string;
  /** Content section for `article:section` (e.g. "Coffee", "Bread", "Beans", "Newsletter"). */
  section?: string;
  /** Post tags, emitted as one `article:tag` each so platforms can categorise the share. */
  tags?: string[];
}): Metadata {
  const images = opts.image
    ? [{ url: opts.image, alt: opts.title }]
    : undefined;
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
      siteName: SITE_NAME,
      locale: "en_US",
      authors: [SITE_NAME],
      ...(opts.section && { section: opts.section }),
      ...(opts.tags && opts.tags.length > 0 && { tags: opts.tags }),
      ...(opts.canonical && { url: absoluteUrl(opts.canonical) }),
      ...(opts.publishedTime && { publishedTime: opts.publishedTime }),
      ...(images && { images }),
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      ...(opts.image && { images: [{ url: opts.image, alt: opts.title }] }),
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

/**
 * Turn the post's H2 sections into HowToStep entries, skipping non-method ones.
 * `pageUrl` is the recipe's absolute URL; each step gets a `url` that deep-links
 * to its on-page anchor (`#<slugified-heading>`, the same id the MDX renderer
 * emits), a Google-recommended HowToStep field for richer step navigation.
 */
function instructionSteps(raw: string, pageUrl: string) {
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
      url: `${pageUrl}#${slugify(s.heading)}`,
    }))
    .filter((s) => s.text.length > 0);
}

// ─── JSON-LD builders ─────────────────────────────────────────────────────────

/**
 * Build a Recipe `keywords` string from an ordered list of candidate terms,
 * dropping empties and case-insensitive duplicates (first occurrence wins). Lets
 * a recipe's base descriptors and its authored tags merge into one comma list
 * without "sourdough"/"sweet" repeating when a tag echoes a base term.
 */
function keywordList(values: (string | undefined)[]): string {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const v of values) {
    if (!v) continue;
    const key = v.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(v);
  }
  return out.join(", ");
}

export function breadRecipeJsonLd(
  slug: string,
  fm: BreadFrontmatter,
  raw: string
) {
  const ingredients = formulaIngredients(raw);
  const steps = instructionSteps(raw, `${SITE_URL}/bread/${slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: fm.title,
    url: `${SITE_URL}/bread/${slug}`,
    description: fm.excerpt,
    inLanguage: SITE_LANGUAGE,
    image: fm.images.map(absoluteUrl),
    author: AUTHOR,
    publisher: PUBLISHER,
    datePublished: fm.date,
    // Recipes are static, frontmatter-driven copies with no edit tracking, so
    // dateModified equals datePublished (the same honest "as published" signal
    // newsletterArticleJsonLd emits) rather than a build-clock value.
    dateModified: fm.date,
    recipeCategory: "Bread",
    recipeYield: `1 ${fm.yieldUnit ?? "loaf"}`,
    keywords: keywordList([
      "sourdough",
      fm.category,
      fm.flavorProfile,
      ...fm.tags,
    ]),
    ...(fm.prepTime && { prepTime: fm.prepTime }),
    ...(fm.cookTime && { cookTime: fm.cookTime }),
    ...(fm.totalTime && { totalTime: fm.totalTime }),
    ...(ingredients.length > 0 && { recipeIngredient: ingredients }),
    ...(steps.length > 0 && { recipeInstructions: steps }),
  };
}

/**
 * Convert a coffee drink's `extractionTime` (e.g. "25s", "28s") into an ISO 8601
 * duration ("PT25S") for the Recipe `cookTime` field. The espresso extraction —
 * the shot pull — is the drink's actual brewing step, so it is the one honest,
 * non-fabricated time value a coffee recipe carries (grinding/steaming times
 * aren't recorded, so prepTime/totalTime are deliberately left off). Returns
 * undefined when the string has no whole-second value to read.
 */
function extractionCookTime(extractionTime?: string): string | undefined {
  if (!extractionTime) return undefined;
  const match = /(\d+)\s*s/i.exec(extractionTime);
  if (!match) return undefined;
  const seconds = parseInt(match[1], 10);
  if (!Number.isFinite(seconds) || seconds <= 0) return undefined;
  return `PT${seconds}S`;
}

export function coffeeRecipeJsonLd(
  slug: string,
  fm: CoffeeFrontmatter,
  raw: string
) {
  const steps = instructionSteps(raw, `${SITE_URL}/coffee/${slug}`);
  const cookTime = extractionCookTime(fm.extractionTime);
  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: fm.title,
    url: `${SITE_URL}/coffee/${slug}`,
    description: fm.excerpt,
    inLanguage: SITE_LANGUAGE,
    image: fm.images.map(absoluteUrl),
    author: AUTHOR,
    publisher: PUBLISHER,
    datePublished: fm.date,
    // See breadRecipeJsonLd: dateModified mirrors datePublished (no edit tracking).
    dateModified: fm.date,
    recipeCategory: "Drink",
    recipeYield: "1 cup",
    // cookTime = the espresso extraction (shot pull), the one honest brewing
    // duration a coffee drink records; prepTime/totalTime are omitted rather
    // than fabricated from unrecorded grinding/steaming times.
    ...(cookTime && { cookTime }),
    // Merge the drink's category (latte/cappuccino/…) in with its authored tags,
    // deduped, matching how breadRecipeJsonLd folds its base descriptors into
    // keywords — a drink whose category isn't also a tag (e.g. the mocha, tagged
    // mocha/chocolate but category "latte") would otherwise lose that signal.
    keywords: keywordList([fm.category, ...fm.tags]),
    ...(fm.ingredients &&
      fm.ingredients.length > 0 && { recipeIngredient: fm.ingredients }),
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

/**
 * Structured `additionalProperty` PropertyValues describing a coffee bean's
 * defining, honest attributes (origin, region, process, varietal, roast,
 * altitude) — the specs that drive the visible sidebar but otherwise never
 * reach the reviewed Product in structured data. Origin and roast are always
 * present; the rest are included only when the bean carries them. Returns an
 * empty array only if a bean somehow has neither, so the Product simply omits
 * `additionalProperty`.
 */
function beanProductProperties(fm: BeanFrontmatter) {
  const specs: [string, string | undefined][] = [
    ["Origin", fm.origin],
    ["Region", fm.region],
    ["Process", fm.process],
    ["Varietal", fm.varietal],
    ["Roast", roastLabel(fm.roastLevel)],
    ["Altitude", fm.altitude],
  ];
  return specs
    .filter((s): s is [string, string] => Boolean(s[1]))
    .map(([name, value]) => ({ "@type": "PropertyValue", name, value }));
}

export function beanReviewJsonLd(slug: string, fm: BeanFrontmatter) {
  const offers = beanOffer(fm.price, fm.buyUrl);
  const properties = beanProductProperties(fm);
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    url: `${SITE_URL}/beans/${slug}`,
    inLanguage: SITE_LANGUAGE,
    itemReviewed: {
      "@type": "Product",
      name: `${fm.roaster} ${fm.title}`,
      brand: { "@type": "Brand", name: fm.roaster },
      category: "Coffee",
      ...(fm.coverImage && { image: absoluteUrl(fm.coverImage) }),
      ...(properties.length > 0 && { additionalProperty: properties }),
      ...(offers && { offers }),
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: fm.rating,
      bestRating: 5,
      worstRating: 0,
    },
    author: AUTHOR,
    publisher: PUBLISHER,
    datePublished: fm.date,
    // Reviews are static frontmatter copies with no edit tracking, so
    // dateModified equals datePublished — same rationale as the Recipe schemas.
    dateModified: fm.date,
    reviewBody: fm.tastingNotes,
  };
}

/**
 * Article schema for a published newsletter issue. When the letter's `raw` body
 * is passed, it also emits `wordCount` and a `timeRequired` ISO-8601 duration
 * (the same word tally / ~200-wpm pace that drives the visible "N min read"
 * indicator), plus `dateModified` — Google-recommended Article fields. Archived
 * issues are copies of the letter as sent, so `dateModified` equals
 * `datePublished` (never edited after publishing) rather than a build-clock value.
 */
export function newsletterArticleJsonLd(
  slug: string,
  fm: NewsletterFrontmatter,
  raw?: string
) {
  const words = raw ? wordCount(raw) : 0;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: fm.title,
    url: `${SITE_URL}/newsletter/${slug}`,
    description: fm.excerpt,
    inLanguage: SITE_LANGUAGE,
    ...(fm.coverImage && { image: absoluteUrl(fm.coverImage) }),
    author: AUTHOR,
    publisher: PUBLISHER,
    datePublished: fm.date,
    dateModified: fm.date,
    ...(words > 0 && {
      wordCount: words,
      timeRequired: `PT${Math.max(1, Math.ceil(words / 200))}M`,
    }),
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
    inLanguage: SITE_LANGUAGE,
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
 * AboutPage schema for the /about page. Ties the page to the site-wide
 * Organization node (`mainEntity` → the same `@id` the layout injects), giving
 * search engines an explicit "this is the about page for this brand" signal —
 * the structured-data counterpart the About page previously lacked while every
 * other primary page type (archives → CollectionPage, detail pages →
 * Recipe/Review/Article, home → FAQPage) already emitted one.
 */
export function aboutPageJsonLd(opts: { name: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: opts.name,
    description: opts.description,
    url: absoluteUrl("/about"),
    inLanguage: SITE_LANGUAGE,
    mainEntity: { "@id": `${SITE_URL}/#organization` },
    publisher: PUBLISHER,
  };
}

/**
 * ImageGallery schema for the /gallery page. The site's photography ("brewed,
 * baked, and photographed by hand") is core to the brand, and while the image
 * sitemap exposes each photo grouped under its post, the gallery page itself —
 * the one page that presents every image as a curated collection — emitted no
 * structured data. This wraps each photo as an `ImageObject` in
 * `associatedMedia`, carrying its caption and a `contentUrl` (absolute) plus a
 * `url` deep-linking to the post it belongs to, so search engines can read the
 * page as a gallery rather than a flat document. Renders `numberOfItems: 0`
 * gracefully for an empty gallery.
 */
export function imageGalleryJsonLd(opts: {
  name: string;
  description: string;
  /** Relative path of the gallery page itself, e.g. "/gallery". */
  path: string;
  /** Photos in display order; each carries the image src, a caption, and its post URL. */
  images: { src: string; caption: string; postPath: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    inLanguage: SITE_LANGUAGE,
    numberOfItems: opts.images.length,
    associatedMedia: opts.images.map((image) => ({
      "@type": "ImageObject",
      contentUrl: absoluteUrl(image.src),
      caption: image.caption,
      url: absoluteUrl(image.postPath),
    })),
  };
}

/**
 * WebApplication schema for an interactive tool page (the baking / coffee
 * calculators). The tool pages are the last primary pages emitting no
 * structured data; a CollectionPage or Article would misdescribe them, but
 * each is genuinely a free, browser-based utility — the schema.org
 * `WebApplication` type (a `SoftwareApplication` that runs in the browser)
 * is the accurate fit. Marks the tool as a free `UtilitiesApplication`,
 * ties it to the site-wide Organization as publisher, and states its
 * browser-based, no-download nature so search engines can present it as an
 * app rather than a flat document.
 */
export function toolApplicationJsonLd(opts: {
  name: string;
  description: string;
  /** Relative path of the tool page itself, e.g. "/tools/baking-calculator". */
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    inLanguage: SITE_LANGUAGE,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript.",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: PUBLISHER,
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
    inLanguage: SITE_LANGUAGE,
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
    inLanguage: SITE_LANGUAGE,
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
