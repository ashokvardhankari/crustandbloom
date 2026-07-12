import type { MetadataRoute } from "next";
import {
  getAllCoffeePostsMeta,
  getAllClassicBreadMeta,
  getInclusionLoaves,
  getAllBeanPostsMeta,
  getAllNewslettersMeta,
  getAllTags,
} from "@/lib/content";
import { SITE_URL } from "@/lib/seo";

/** Newest post date in a list, as a Date; undefined for an empty list. */
function latest<T extends { frontmatter: { date: string } }>(
  posts: T[]
): Date | undefined {
  let newest: number | undefined;
  for (const p of posts) {
    const t = new Date(p.frontmatter.date).getTime();
    if (!Number.isNaN(t) && (newest === undefined || t > newest)) newest = t;
  }
  return newest === undefined ? undefined : new Date(newest);
}

/** The more recent of two possibly-undefined dates. */
function maxDate(a?: Date, b?: Date): Date | undefined {
  if (!a) return b;
  if (!b) return a;
  return a.getTime() >= b.getTime() ? a : b;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [coffee, classic, inclusions, beans, newsletters, tags] =
    await Promise.all([
      getAllCoffeePostsMeta(),
      getAllClassicBreadMeta(),
      getInclusionLoaves(),
      getAllBeanPostsMeta(),
      getAllNewslettersMeta(),
      getAllTags(),
    ]);

  const bread = [...classic, ...inclusions];

  // Newest content date per section — feeds the section listing / aggregate pages.
  const coffeeLatest = latest(coffee);
  const breadLatest = latest(bread);
  const beansLatest = latest(beans);
  const newslettersLatest = latest(newsletters);
  const siteLatest = [
    coffeeLatest,
    breadLatest,
    beansLatest,
    newslettersLatest,
  ].reduce((acc, d) => maxDate(acc, d), undefined as Date | undefined);

  // Purely static utility pages have no content date, so lastModified is omitted.
  const sectionLatest: Record<string, Date | undefined> = {
    "": siteLatest,
    "/coffee": coffeeLatest,
    "/bread": breadLatest,
    "/beans": beansLatest,
    "/newsletter": newslettersLatest,
    "/gallery": siteLatest,
    "/search": siteLatest,
    "/tags": siteLatest,
  };

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/coffee",
    "/bread",
    "/beans",
    "/gallery",
    "/newsletter",
    "/search",
    "/tags",
    "/about",
    "/tools",
    "/tools/baking-calculator",
    "/tools/coffee-calculator",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    ...(sectionLatest[path] && { lastModified: sectionLatest[path] }),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = [
    ...coffee.map((p) => ({ path: `/coffee/${p.slug}`, date: p.frontmatter.date })),
    ...bread.map((p) => ({ path: `/bread/${p.slug}`, date: p.frontmatter.date })),
    ...beans.map((p) => ({ path: `/beans/${p.slug}`, date: p.frontmatter.date })),
    ...newsletters.map((p) => ({
      path: `/newsletter/${p.slug}`,
      date: p.frontmatter.date,
    })),
  ].map(({ path, date }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Tag archive pages have no single content date; fall back to the site-wide latest.
  const tagRoutes: MetadataRoute.Sitemap = tags.map(({ slug }) => ({
    url: `${SITE_URL}/tags/${slug}`,
    ...(siteLatest && { lastModified: siteLatest }),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...postRoutes, ...tagRoutes];
}
