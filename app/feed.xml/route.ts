import {
  getAllPostsMeta,
  getAllBeanPostsMeta,
  getAllNewslettersMeta,
} from "@/lib/content";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo";

export const dynamic = "force-static";

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

interface FeedItem {
  title: string;
  url: string;
  date: string;
  excerpt: string;
  /** Content-type label first, then the post's own tags — emitted as <category>. */
  categories: string[];
}

/** Human-readable section label for a content `type` (e.g. "coffee" → "Coffee"). */
const TYPE_LABEL: Record<string, string> = {
  coffee: "Coffee",
  bread: "Bread",
  bean: "Bean",
  newsletter: "Newsletter",
};

export async function GET() {
  const [posts, beans, newsletters] = await Promise.all([
    getAllPostsMeta(),
    getAllBeanPostsMeta(),
    getAllNewslettersMeta(),
  ]);

  const items: FeedItem[] = [
    ...posts.map((p) => ({
      title: p.frontmatter.title,
      url: `${SITE_URL}/${p.frontmatter.type}/${p.slug}`,
      date: p.frontmatter.date,
      excerpt: p.frontmatter.excerpt,
      categories: [TYPE_LABEL[p.frontmatter.type], ...p.frontmatter.tags],
    })),
    ...beans.map((b) => ({
      title: `${b.frontmatter.title} from ${b.frontmatter.roaster}`,
      url: `${SITE_URL}/beans/${b.slug}`,
      date: b.frontmatter.date,
      excerpt: b.frontmatter.excerpt,
      categories: [TYPE_LABEL.bean, ...b.frontmatter.tags],
    })),
    ...newsletters.map((n) => ({
      title: n.frontmatter.title,
      url: `${SITE_URL}/newsletter/${n.slug}`,
      date: n.frontmatter.date,
      excerpt: n.frontmatter.excerpt,
      categories: [TYPE_LABEL.newsletter],
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const rssItems = items
    .map((item) => {
      const categories = item.categories
        .filter(Boolean)
        .map((c) => `      <category>${escapeXml(c)}</category>`)
        .join("\n");
      return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.url}</link>
      <guid isPermaLink="true">${item.url}</guid>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
      <description>${escapeXml(item.excerpt)}</description>
${categories}
    </item>`;
    })
    .join("\n");

  // Items are sorted newest-first, so the first item's date is the freshest
  // content — a deterministic <lastBuildDate> that changes only when new content
  // ships (no build-clock churn on every rebuild).
  const lastBuildDate = items.length
    ? new Date(items[0].date).toUTCString()
    : undefined;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
${lastBuildDate ? `    <lastBuildDate>${lastBuildDate}</lastBuildDate>\n` : ""}    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${rssItems}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
