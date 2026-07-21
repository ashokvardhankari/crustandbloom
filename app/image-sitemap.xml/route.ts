import {
  getAllPostsMeta,
  getAllBeanPostsMeta,
  getAllNewslettersMeta,
} from "@/lib/content";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** A page and the photographs shown on it, for the Google image sitemap. */
interface ImageEntry {
  /** Absolute URL of the page the images appear on. */
  pageUrl: string;
  /** The page title, used as each image's <image:title>. */
  title: string;
  /** Absolute, de-duplicated image URLs (cover first, then the gallery). */
  images: string[];
}

/**
 * Cover image first, then the gallery, de-duplicated and made absolute.
 * Skips pages with no photography (e.g. bean reviews still awaiting a bag shot).
 */
function collectImages(
  pageUrl: string,
  title: string,
  cover: string | undefined,
  gallery: string[] | undefined
): ImageEntry | null {
  const seen = new Set<string>();
  const images: string[] = [];
  for (const src of [cover, ...(gallery ?? [])]) {
    if (!src || seen.has(src)) continue;
    seen.add(src);
    images.push(absoluteUrl(src));
  }
  return images.length ? { pageUrl, title, images } : null;
}

/**
 * A dedicated Google image sitemap (sitemap-image/1.1). The default
 * `app/sitemap.ts` route in this Next version can't emit the image extension,
 * so the site's hand-shot coffee/bread/bean photography would otherwise be
 * invisible to Google Images. This groups every photo under the page it appears
 * on so those images become individually indexable.
 */
export async function GET() {
  const [posts, beans, newsletters] = await Promise.all([
    getAllPostsMeta(),
    getAllBeanPostsMeta(),
    getAllNewslettersMeta(),
  ]);

  const entries: ImageEntry[] = [
    ...posts.map((p) =>
      collectImages(
        `${SITE_URL}/${p.frontmatter.type}/${p.slug}`,
        p.frontmatter.title,
        p.frontmatter.coverImage,
        p.frontmatter.images
      )
    ),
    ...beans.map((b) =>
      collectImages(
        `${SITE_URL}/beans/${b.slug}`,
        b.frontmatter.title,
        b.frontmatter.coverImage,
        b.frontmatter.images
      )
    ),
    ...newsletters.map((n) =>
      collectImages(
        `${SITE_URL}/newsletter/${n.slug}`,
        n.frontmatter.title,
        n.frontmatter.coverImage,
        undefined
      )
    ),
  ].filter((e): e is ImageEntry => e !== null);

  const urls = entries
    .map((entry) => {
      const images = entry.images
        .map(
          (loc) =>
            `    <image:image>\n` +
            `      <image:loc>${escapeXml(loc)}</image:loc>\n` +
            `      <image:title>${escapeXml(entry.title)}</image:title>\n` +
            `    </image:image>`
        )
        .join("\n");
      return `  <url>\n    <loc>${escapeXml(entry.pageUrl)}</loc>\n${images}\n  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
