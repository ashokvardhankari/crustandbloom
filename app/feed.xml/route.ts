import fs from "node:fs";
import path from "node:path";
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

/** MIME type for an image path by extension; null for anything unrecognised. */
function imageMimeType(imagePath: string): string | null {
  const ext = path.extname(imagePath).toLowerCase();
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".webp":
      return "image/webp";
    case ".gif":
      return "image/gif";
    default:
      return null;
  }
}

/**
 * Build an RSS `<enclosure>` for a post's cover image, giving feed readers a
 * thumbnail for each hand-shot photo. The enclosure's `length` (byte size) is a
 * required RSS 2.0 attribute, so the image file is stat'd on disk at build time;
 * a missing file or unknown extension yields null and the item ships without an
 * enclosure rather than an invalid one.
 */
function coverEnclosure(coverImage?: string): string | null {
  if (!coverImage || !coverImage.startsWith("/")) return null;
  const type = imageMimeType(coverImage);
  if (!type) return null;
  const filePath = path.join(process.cwd(), "public", coverImage);
  let length: number;
  try {
    length = fs.statSync(filePath).size;
  } catch {
    return null;
  }
  if (!(length > 0)) return null;
  return `      <enclosure url="${SITE_URL}${coverImage}" length="${length}" type="${type}"/>`;
}

interface FeedItem {
  title: string;
  url: string;
  date: string;
  excerpt: string;
  /** Content-type label first, then the post's own tags — emitted as <category>. */
  categories: string[];
  /** Cover photo, emitted as an <enclosure> thumbnail; omitted when absent. */
  coverImage?: string;
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
      coverImage: p.frontmatter.coverImage,
    })),
    ...beans.map((b) => ({
      title: `${b.frontmatter.title} from ${b.frontmatter.roaster}`,
      url: `${SITE_URL}/beans/${b.slug}`,
      date: b.frontmatter.date,
      excerpt: b.frontmatter.excerpt,
      categories: [TYPE_LABEL.bean, ...b.frontmatter.tags],
      coverImage: b.frontmatter.coverImage,
    })),
    ...newsletters.map((n) => ({
      title: n.frontmatter.title,
      url: `${SITE_URL}/newsletter/${n.slug}`,
      date: n.frontmatter.date,
      excerpt: n.frontmatter.excerpt,
      categories: [TYPE_LABEL.newsletter],
      coverImage: n.frontmatter.coverImage,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const rssItems = items
    .map((item) => {
      const categories = item.categories
        .filter(Boolean)
        .map((c) => `      <category>${escapeXml(c)}</category>`)
        .join("\n");
      const enclosure = coverEnclosure(item.coverImage);
      return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.url}</link>
      <guid isPermaLink="true">${item.url}</guid>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
      <description>${escapeXml(item.excerpt)}</description>
${categories}${enclosure ? `\n${enclosure}` : ""}
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
