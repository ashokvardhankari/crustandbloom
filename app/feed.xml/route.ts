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
}

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
    })),
    ...beans.map((b) => ({
      title: `${b.frontmatter.title} from ${b.frontmatter.roaster}`,
      url: `${SITE_URL}/beans/${b.slug}`,
      date: b.frontmatter.date,
      excerpt: b.frontmatter.excerpt,
    })),
    ...newsletters.map((n) => ({
      title: n.frontmatter.title,
      url: `${SITE_URL}/newsletter/${n.slug}`,
      date: n.frontmatter.date,
      excerpt: n.frontmatter.excerpt,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const rssItems = items
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.url}</link>
      <guid isPermaLink="true">${item.url}</guid>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
      <description>${escapeXml(item.excerpt)}</description>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
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
