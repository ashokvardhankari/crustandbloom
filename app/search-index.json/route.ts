import {
  getAllPostsMeta,
  getAllBeanPostsMeta,
  getAllNewslettersMeta,
} from "@/lib/content";
import { beanCover } from "@/lib/utils";

export const dynamic = "force-static";

export interface SearchEntry {
  title: string;
  url: string;
  kind: "Coffee" | "Bread" | "Beans" | "Newsletter";
  /** Cover thumbnail shown beside the result; omitted when a post has none. */
  image?: string;
  tags: string[];
  /**
   * Extra searchable text that isn't shown on the card: a coffee drink's
   * category, a loaf's flavour + inclusion ingredients, a bean's tasting/roaster
   * notes and origin details. Lets a search for "latte", "paprika", or
   * "bergamot" find posts that never mention those words in their title, tags,
   * or excerpt. Matched at low weight so titles/tags still rank first.
   */
  keywords: string[];
  excerpt: string;
  date: string;
}

/** Drop empty/undefined entries from a list of optional keyword fields. */
function keywords(...parts: (string | undefined)[]): string[] {
  return parts.filter((p): p is string => Boolean(p && p.trim()));
}

export async function GET() {
  const [posts, beans, newsletters] = await Promise.all([
    getAllPostsMeta(),
    getAllBeanPostsMeta(),
    getAllNewslettersMeta(),
  ]);

  const entries: SearchEntry[] = [
    ...posts.map((p) => {
      const f = p.frontmatter;
      return {
        title: f.title,
        url: `/${f.type}/${p.slug}`,
        kind: (f.type === "coffee" ? "Coffee" : "Bread") as "Coffee" | "Bread",
        ...(f.coverImage && { image: f.coverImage }),
        tags: Array.isArray(f.tags) ? f.tags : [],
        keywords:
          f.type === "coffee"
            ? keywords(f.category)
            : keywords(f.category, f.flavorProfile, f.tastingNotes, ...(f.inclusions ?? [])),
        excerpt: f.excerpt,
        date: f.date,
      };
    }),
    ...beans.map((b) => {
      const f = b.frontmatter;
      return {
        title: `${f.title} (${f.roaster})`,
        url: `/beans/${b.slug}`,
        kind: "Beans" as const,
        image: beanCover(f.coverImage),
        tags: [...f.tags, f.origin, f.roastLevel],
        keywords: keywords(
          f.process,
          f.region,
          f.varietal,
          f.brewMethod,
          f.tastingNotes,
          ...(f.officialNotes ?? [])
        ),
        excerpt: f.excerpt,
        date: f.date,
      };
    }),
    ...newsletters.map((n) => ({
      title: n.frontmatter.title,
      url: `/newsletter/${n.slug}`,
      kind: "Newsletter" as const,
      ...(n.frontmatter.coverImage && { image: n.frontmatter.coverImage }),
      tags: [],
      keywords: [],
      excerpt: n.frontmatter.excerpt,
      date: n.frontmatter.date,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return Response.json(entries, {
    headers: { "Cache-Control": "public, max-age=3600" },
  });
}
