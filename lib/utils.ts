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
