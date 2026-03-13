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
