import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
