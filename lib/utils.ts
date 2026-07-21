import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { FormulaRow } from "@/lib/content";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getPostUrl(
  type: "coffee" | "bread",
  slug: string
): string {
  return `/${type}/${slug}`;
}

/** Shown on bean reviews that don't have a bag photo yet. */
export const BEAN_PLACEHOLDER = "/images/beans/placeholder.jpg";

/** A bean's cover image, falling back to the branded placeholder. */
export function beanCover(coverImage?: string): string {
  return coverImage || BEAN_PLACEHOLDER;
}

/** Coarse roast bucket for filtering: light / medium / dark. */
export function roastBucket(level: string): "light" | "medium" | "dark" {
  if (level === "light" || level === "medium-light") return "light";
  if (level === "medium-dark" || level === "dark") return "dark";
  return "medium";
}

/** Human label for a roast level, e.g. "medium-dark" → "Medium-Dark". */
export function roastLabel(level: string): string {
  return level.split("-").map(capitalize).join("-");
}

/**
 * Turn an ISO 8601 duration ("PT1H", "PT45M", "PT1H30M", "P1DT2H") into a
 * human-readable label like "1 hr", "45 min", "1 hr 30 min", "1 day 2 hr".
 * Returns null for empty or unparseable input so callers can skip rendering.
 */
export function formatDuration(iso?: string): string | null {
  if (!iso) return null;
  const match = /^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?)?$/.exec(iso.trim());
  if (!match) return null;
  const days = Number(match[1] ?? 0);
  const hours = Number(match[2] ?? 0);
  const minutes = Number(match[3] ?? 0);
  const parts: string[] = [];
  if (days) parts.push(`${days} day${days === 1 ? "" : "s"}`);
  if (hours) parts.push(`${hours} hr`);
  if (minutes) parts.push(`${minutes} min`);
  return parts.length > 0 ? parts.join(" ") : null;
}

/**
 * Count the words a reader actually reads in a body of MDX/markdown prose.
 * Strips a leading YAML frontmatter block plus code spans and the noisiest
 * markdown punctuation so the tally reflects prose, not syntax.
 */
export function wordCount(raw: string): number {
  const body = raw
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "") // drop frontmatter
    .replace(/`{1,3}[^`]*`{1,3}/g, " ") // code spans / fenced blocks
    .replace(/[#>*_~|=[\]()]/g, " "); // markdown punctuation
  return body.split(/\s+/).filter(Boolean).length;
}

/**
 * Estimated reading time in whole minutes for a body of MDX/markdown prose, at
 * an average adult pace (~200 words/min). Uses {@link wordCount} so the visible
 * "N min read" indicator and any derived schema stay in sync. Always ≥ 1 min.
 */
export function readingTime(raw: string): number {
  return Math.max(1, Math.ceil(wordCount(raw) / 200));
}

/**
 * Estimate value from a bean's price string like "$18 / 12oz" or "~$7 / 13oz".
 * Assumes an 18 g dose per cup — a fair middle for a double espresso or a mug
 * of pour-over. Returns null when a dollar amount and an ounce weight can't
 * both be confidently parsed, so callers just skip rendering.
 */
const GRAMS_PER_OZ = 28.35;
const DOSE_GRAMS = 18;

export function beanValue(price?: string): {
  perCup: string; // e.g. "$0.95"
  cups: number; // whole cups per bag, e.g. 19
  approximate: boolean; // price carried a "~"
} | null {
  if (!price) return null;
  const dollars = /\$\s*(\d+(?:\.\d+)?)/.exec(price);
  const weight = /(\d+(?:\.\d+)?)\s*oz\b/i.exec(price);
  if (!dollars || !weight) return null;
  const cost = Number(dollars[1]);
  const grams = Number(weight[1]) * GRAMS_PER_OZ;
  if (!(cost > 0) || !(grams > 0)) return null;
  const exactCups = grams / DOSE_GRAMS;
  const cups = Math.round(exactCups);
  if (cups < 1) return null;
  return {
    perCup: `$${(cost / exactCups).toFixed(2)}`,
    cups,
    approximate: price.includes("~"),
  };
}

/**
 * Sum the gram weights in a bread formula into a total dough weight, and
 * estimate how many loaves it makes. Only rows carrying an explicit gram value
 * count: small-volume aromatics measured in tsp/tbsp (rosemary, zest) add
 * negligible weight, and anything applied as a surface "coating" sits on the
 * crust rather than in the dough — both are excluded so the figure reflects
 * what actually goes on the bench. The gram value is read even from mixed
 * strings like "2 tbsp (~30g)". Returns null when no weighable row is found,
 * so callers just skip rendering.
 */
export function doughYield(rows: FormulaRow[]): {
  grams: number; // total dough weight, rounded
  loaves: number; // estimated loaf count (≥ 1)
} | null {
  let grams = 0;
  for (const row of rows) {
    if (/coating/i.test(row.ingredient)) continue;
    const g = /(\d+(?:\.\d+)?)\s*g\b/i.exec(row.weight);
    if (g) grams += Number(g[1]);
  }
  if (!(grams > 0)) return null;
  // Home sourdough boules run ~750–1300 g of dough; split above that.
  const loaves = Math.max(1, Math.round(grams / 1100));
  return { grams: Math.round(grams), loaves };
}

/**
 * Derive an espresso shot's grams-in / grams-out from its dose and brew ratio.
 * Espresso is ratio-driven — the target yield is the dose times the "1:N" ratio
 * — so a reader scanning the specs can see the actual weights (e.g. "18 g →
 * 45 g") without opening the interactive calculator, mirroring the derived Yield
 * stat on bread pages. Returns null when the dose is missing or the ratio can't
 * be parsed, so callers just skip rendering.
 */
export function shotYield(
  dose?: number,
  brewRatio?: string
): { doseIn: string; yieldOut: string; ratio: number } | null {
  if (!(typeof dose === "number" && dose > 0) || !brewRatio) return null;
  const parts = brewRatio.split(":");
  if (parts.length !== 2) return null;
  const ratio = Number(parts[1]);
  if (!(Number.isFinite(ratio) && ratio > 0)) return null;
  const fmt = (n: number) => String(Math.round(n * 10) / 10);
  return { doseIn: fmt(dose), yieldOut: fmt(dose * ratio), ratio };
}

/**
 * Annotate a temperature string with its converted equivalent so a °C spec also
 * shows °F and vice-versa — the site quotes bake temps in °F but milk temps in
 * °C, and readers think in one system or the other. Every "<n>°C"/"<n>°F" token
 * is converted in place, so compound values like "500°F, then 450°F" annotate
 * each step. Returns null when no temperature token is present, so callers can
 * fall back to the raw string.
 */
export function withTempConversion(value?: string): string | null {
  if (!value) return null;
  let found = false;
  const out = value.replace(
    /(\d+(?:\.\d+)?)\s*°\s*([CF])/gi,
    (_m, num: string, unit: string) => {
      found = true;
      const n = Number(num);
      const converted =
        unit.toUpperCase() === "C"
          ? `${Math.round((n * 9) / 5 + 32)}°F`
          : `${Math.round(((n - 32) * 5) / 9)}°C`;
      return `${num}°${unit.toUpperCase()} (${converted})`;
    }
  );
  return found ? out : null;
}

export function getCategoryLabel(
  type: "coffee" | "bread",
  category: string
): string {
  const labels: Record<string, string> = {
    latte: "Latte",
    cappuccino: "Cappuccino",
    espresso: "Espresso",
    filter: "Filter Coffee",
    classic: "Classic Sourdough",
    inclusion: "Inclusion Loaf",
  };
  return labels[category] ?? capitalize(category);
}
