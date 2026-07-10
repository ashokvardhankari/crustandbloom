import {
  getAllPostsMeta,
  getAllBeanPostsMeta,
  getAllNewslettersMeta,
} from "@/lib/content";

export const dynamic = "force-static";

export interface SearchEntry {
  title: string;
  url: string;
  kind: "Coffee" | "Bread" | "Beans" | "Newsletter";
  tags: string[];
  excerpt: string;
  date: string;
}

export async function GET() {
  const [posts, beans, newsletters] = await Promise.all([
    getAllPostsMeta(),
    getAllBeanPostsMeta(),
    getAllNewslettersMeta(),
  ]);

  const entries: SearchEntry[] = [
    ...posts.map((p) => ({
      title: p.frontmatter.title,
      url: `/${p.frontmatter.type}/${p.slug}`,
      kind: (p.frontmatter.type === "coffee" ? "Coffee" : "Bread") as
        | "Coffee"
        | "Bread",
      tags:
        "tags" in p.frontmatter && Array.isArray(p.frontmatter.tags)
          ? p.frontmatter.tags
          : [],
      excerpt: p.frontmatter.excerpt,
      date: p.frontmatter.date,
    })),
    ...beans.map((b) => ({
      title: `${b.frontmatter.title} (${b.frontmatter.roaster})`,
      url: `/beans/${b.slug}`,
      kind: "Beans" as const,
      tags: [...b.frontmatter.tags, b.frontmatter.origin, b.frontmatter.roastLevel],
      excerpt: b.frontmatter.excerpt,
      date: b.frontmatter.date,
    })),
    ...newsletters.map((n) => ({
      title: n.frontmatter.title,
      url: `/newsletter/${n.slug}`,
      kind: "Newsletter" as const,
      tags: [],
      excerpt: n.frontmatter.excerpt,
      date: n.frontmatter.date,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return Response.json(entries, {
    headers: { "Cache-Control": "public, max-age=3600" },
  });
}
