import {
  getAllPostsMeta,
  getAllBeanPostsMeta,
  getAllNewslettersMeta,
} from "@/lib/content";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_LANGUAGE,
  absoluteUrl,
} from "@/lib/seo";

export const dynamic = "force-static";

/** Human-readable section label for a content `type` (e.g. "coffee" → "Coffee"). */
const TYPE_LABEL: Record<string, string> = {
  coffee: "Coffee",
  bread: "Bread",
  bean: "Bean",
  newsletter: "Newsletter",
};

interface FeedSource {
  title: string;
  url: string;
  date: string;
  excerpt: string;
  /** Section label first, then the post's own tags — emitted as JSON Feed `tags`. */
  tags: string[];
  /** Cover photo, emitted as the item `image`; omitted when absent. */
  coverImage?: string;
}

/**
 * JSON Feed 1.1 (https://www.jsonfeed.org/version/1.1/) — a modern, JSON-native
 * companion to the RSS feed at /feed.xml, for readers (NetNewsWire, Feedbin,
 * Inoreader, …) that prefer or only speak JSON. Built from the same three
 * content sources as the RSS feed and sorted newest-first, so the two feeds stay
 * in lockstep. Emitted statically at build time — no build-clock fields — so the
 * output changes only when content does.
 */
export async function GET() {
  const [posts, beans, newsletters] = await Promise.all([
    getAllPostsMeta(),
    getAllBeanPostsMeta(),
    getAllNewslettersMeta(),
  ]);

  const sources: FeedSource[] = [
    ...posts.map((p) => ({
      title: p.frontmatter.title,
      url: `${SITE_URL}/${p.frontmatter.type}/${p.slug}`,
      date: p.frontmatter.date,
      excerpt: p.frontmatter.excerpt,
      tags: [TYPE_LABEL[p.frontmatter.type], ...p.frontmatter.tags],
      coverImage: p.frontmatter.coverImage,
    })),
    ...beans.map((b) => ({
      title: `${b.frontmatter.title} from ${b.frontmatter.roaster}`,
      url: `${SITE_URL}/beans/${b.slug}`,
      date: b.frontmatter.date,
      excerpt: b.frontmatter.excerpt,
      tags: [TYPE_LABEL.bean, ...b.frontmatter.tags],
      coverImage: b.frontmatter.coverImage,
    })),
    ...newsletters.map((n) => ({
      title: n.frontmatter.title,
      url: `${SITE_URL}/newsletter/${n.slug}`,
      date: n.frontmatter.date,
      excerpt: n.frontmatter.excerpt,
      tags: [TYPE_LABEL.newsletter],
      coverImage: n.frontmatter.coverImage,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: SITE_NAME,
    home_page_url: `${SITE_URL}/`,
    feed_url: `${SITE_URL}/feed.json`,
    description: SITE_DESCRIPTION,
    language: SITE_LANGUAGE,
    icon: absoluteUrl("/images/site/logo-email.png"),
    favicon: absoluteUrl("/icon.svg"),
    authors: [{ name: SITE_NAME, url: `${SITE_URL}/about` }],
    items: sources.map((item) => ({
      id: item.url,
      url: item.url,
      title: item.title,
      summary: item.excerpt,
      // Excerpts are plain text, so `content_text` is the honest carrier (the
      // spec requires each item to have content_text or content_html).
      content_text: item.excerpt,
      date_published: new Date(item.date).toISOString(),
      tags: item.tags.filter(Boolean),
      ...(item.coverImage && { image: absoluteUrl(item.coverImage) }),
    })),
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      "Content-Type": "application/feed+json; charset=utf-8",
    },
  });
}
