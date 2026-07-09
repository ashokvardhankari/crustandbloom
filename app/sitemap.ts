import type { MetadataRoute } from "next";
import {
  getAllCoffeeSlugs,
  getAllBreadSlugs,
  getAllBeanSlugs,
} from "@/lib/content";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [coffee, bread, beans] = await Promise.all([
    getAllCoffeeSlugs(),
    getAllBreadSlugs(),
    getAllBeanSlugs(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/coffee",
    "/bread",
    "/beans",
    "/gallery",
    "/about",
    "/tools",
    "/tools/baking-calculator",
    "/tools/coffee-calculator",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = [
    ...coffee.map((slug) => `/coffee/${slug}`),
    ...bread.map((slug) => `/bread/${slug}`),
    ...beans.map((slug) => `/beans/${slug}`),
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...postRoutes];
}
