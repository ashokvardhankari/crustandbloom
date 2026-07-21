import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { ReactElement } from "react";
import type {
  CoffeeFrontmatter,
  BreadFrontmatter,
  BeanFrontmatter,
  NewsletterFrontmatter,
  PostMeta,
  GalleryImage,
} from "./types";
import { MDXComponents } from "@/components/mdx/MDXComponents";
import { slugify, beanCover, readingTime } from "@/lib/utils";

// ─── Path helpers ───────────────────────────────────────────────────────────

function contentPath(...segments: string[]): string {
  return path.join(process.cwd(), "content", ...segments);
}

async function readMDX(filePath: string): Promise<string> {
  return fs.readFile(filePath, "utf-8");
}

async function getFilesInDir(dir: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(dir);
    return entries.filter((f) => f.endsWith(".mdx"));
  } catch {
    return [];
  }
}

function toSlug(filename: string): string {
  return filename.replace(/\.mdx$/, "");
}

// ─── Coffee ─────────────────────────────────────────────────────────────────

export async function getAllCoffeeSlugs(): Promise<string[]> {
  const files = await getFilesInDir(contentPath("coffee"));
  return files.map(toSlug);
}

export async function getAllCoffeePostsMeta(): Promise<PostMeta<CoffeeFrontmatter>[]> {
  const slugs = await getAllCoffeeSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const raw = await readMDX(contentPath("coffee", `${slug}.mdx`));
      const { data } = matter(raw);
      return { slug, frontmatter: data as CoffeeFrontmatter };
    })
  );
  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export async function getCoffeePost(slug: string): Promise<{
  frontmatter: CoffeeFrontmatter;
  content: ReactElement;
  raw: string;
}> {
  const raw = await readMDX(contentPath("coffee", `${slug}.mdx`));
  const { frontmatter, content } = await compileMDX<CoffeeFrontmatter>({
    source: raw,
    components: MDXComponents,
    options: { parseFrontmatter: true, mdxOptions: { remarkPlugins: [remarkGfm] } },
  });
  return { frontmatter, content, raw };
}

// ─── Bread ───────────────────────────────────────────────────────────────────

export async function getAllBreadSlugs(): Promise<string[]> {
  const [classic, inclusions] = await Promise.all([
    getFilesInDir(contentPath("bread", "classic")),
    getFilesInDir(contentPath("bread", "inclusions")),
  ]);
  return [...classic, ...inclusions].map(toSlug);
}

export async function getAllClassicBreadMeta(): Promise<PostMeta<BreadFrontmatter>[]> {
  const files = await getFilesInDir(contentPath("bread", "classic"));
  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = toSlug(file);
      const raw = await readMDX(contentPath("bread", "classic", file));
      const { data } = matter(raw);
      return { slug, frontmatter: data as BreadFrontmatter };
    })
  );
  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export async function getInclusionLoaves(): Promise<PostMeta<BreadFrontmatter>[]> {
  const files = await getFilesInDir(contentPath("bread", "inclusions"));
  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = toSlug(file);
      const raw = await readMDX(contentPath("bread", "inclusions", file));
      const { data } = matter(raw);
      return { slug, frontmatter: data as BreadFrontmatter };
    })
  );
  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export async function getAllBreadPostsMeta(): Promise<PostMeta<BreadFrontmatter>[]> {
  const [classic, inclusions] = await Promise.all([
    getAllClassicBreadMeta(),
    getInclusionLoaves(),
  ]);
  return [...classic, ...inclusions].sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export async function getBreadPost(slug: string): Promise<{
  frontmatter: BreadFrontmatter;
  content: ReactElement;
  raw: string;
}> {
  // Search classic first, then inclusions
  let raw: string | null = null;

  try {
    raw = await readMDX(contentPath("bread", "classic", `${slug}.mdx`));
  } catch {
    try {
      raw = await readMDX(contentPath("bread", "inclusions", `${slug}.mdx`));
    } catch {
      throw new Error(`Bread post not found: ${slug}`);
    }
  }

  const { frontmatter, content } = await compileMDX<BreadFrontmatter>({
    source: raw,
    components: MDXComponents,
    options: { parseFrontmatter: true, mdxOptions: { remarkPlugins: [remarkGfm] } },
  });
  return { frontmatter, content, raw };
}

// ─── Beans (coffee bean reviews) ──────────────────────────────────────────────

export async function getAllBeanSlugs(): Promise<string[]> {
  const files = await getFilesInDir(contentPath("beans"));
  return files.map(toSlug);
}

export async function getAllBeanPostsMeta(): Promise<PostMeta<BeanFrontmatter>[]> {
  const slugs = await getAllBeanSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const raw = await readMDX(contentPath("beans", `${slug}.mdx`));
      const { data } = matter(raw);
      return { slug, frontmatter: data as BeanFrontmatter };
    })
  );
  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export async function getBeanPost(slug: string): Promise<{
  frontmatter: BeanFrontmatter;
  content: ReactElement;
  raw: string;
}> {
  const raw = await readMDX(contentPath("beans", `${slug}.mdx`));
  const { frontmatter, content } = await compileMDX<BeanFrontmatter>({
    source: raw,
    components: MDXComponents,
    options: { parseFrontmatter: true, mdxOptions: { remarkPlugins: [remarkGfm] } },
  });
  return { frontmatter, content, raw };
}

// ─── Newsletters (published issue archive) ────────────────────────────────────

export async function getAllNewsletterSlugs(): Promise<string[]> {
  const files = await getFilesInDir(contentPath("newsletters"));
  return files.map(toSlug);
}

export async function getAllNewslettersMeta(): Promise<
  (PostMeta<NewsletterFrontmatter> & { readingMinutes: number })[]
> {
  const slugs = await getAllNewsletterSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const raw = await readMDX(contentPath("newsletters", `${slug}.mdx`));
      const { data } = matter(raw);
      return {
        slug,
        frontmatter: data as NewsletterFrontmatter,
        readingMinutes: readingTime(raw),
      };
    })
  );
  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export async function getNewsletterPost(slug: string): Promise<{
  frontmatter: NewsletterFrontmatter;
  content: ReactElement;
  raw: string;
}> {
  const raw = await readMDX(contentPath("newsletters", `${slug}.mdx`));
  const { frontmatter, content } = await compileMDX<NewsletterFrontmatter>({
    source: raw,
    components: MDXComponents,
    options: { parseFrontmatter: true, mdxOptions: { remarkPlugins: [remarkGfm] } },
  });
  return { frontmatter, content, raw };
}

/**
 * Newsletters whose body links to a given recipe path (e.g. "/bread/foo" or
 * "/coffee/bar"), newest issue first. Used to surface a "Featured in the
 * newsletter" cross-link on recipe pages — the reverse of the links the
 * letters already carry into the site. The path must terminate at a non-slug
 * character so "/bread/fig" can't match a "/bread/fig-walnut" link. Returns an
 * empty array when no issue references the recipe.
 */
export async function getNewslettersFeaturing(
  recipePath: string
): Promise<PostMeta<NewsletterFrontmatter>[]> {
  const escaped = recipePath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const linkRe = new RegExp(`${escaped}(?![\\w-])`);
  const slugs = await getAllNewsletterSlugs();
  const matches = await Promise.all(
    slugs.map(async (slug) => {
      const raw = await readMDX(contentPath("newsletters", `${slug}.mdx`));
      const { data, content } = matter(raw);
      return linkRe.test(content)
        ? { slug, frontmatter: data as NewsletterFrontmatter }
        : null;
    })
  );
  return matches
    .filter((m): m is PostMeta<NewsletterFrontmatter> => m !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

/** A coffee/bread/bean post a newsletter issue links to, resolved for a card. */
export interface LinkedPost {
  title: string;
  url: string;
  kind: "Coffee" | "Bread" | "Beans";
  coverImage: string;
}

/**
 * The forward complement of getNewslettersFeaturing: the coffee, bread, and bean
 * posts a given issue's body links to, in order of first appearance and deduped.
 * Used to surface an "In this issue" block of cross-link cards at the top of a
 * newsletter page, so a text-heavy letter shows at a glance what it covers.
 * Each link is resolved against real post metadata, so a link to a post that no
 * longer exists is silently dropped. Returns an empty array when nothing links.
 */
export async function getPostsLinkedFrom(
  newsletterSlug: string
): Promise<LinkedPost[]> {
  const raw = await readMDX(contentPath("newsletters", `${newsletterSlug}.mdx`));
  const { content } = matter(raw);

  const [coffee, bread, beans] = await Promise.all([
    getAllCoffeePostsMeta(),
    getAllBreadPostsMeta(),
    getAllBeanPostsMeta(),
  ]);

  const index = new Map<string, LinkedPost>();
  for (const p of coffee) {
    index.set(`/coffee/${p.slug}`, {
      title: p.frontmatter.title,
      url: `/coffee/${p.slug}`,
      kind: "Coffee",
      coverImage: p.frontmatter.coverImage,
    });
  }
  for (const p of bread) {
    index.set(`/bread/${p.slug}`, {
      title: p.frontmatter.title,
      url: `/bread/${p.slug}`,
      kind: "Bread",
      coverImage: p.frontmatter.coverImage,
    });
  }
  for (const p of beans) {
    index.set(`/beans/${p.slug}`, {
      title: p.frontmatter.title,
      url: `/beans/${p.slug}`,
      kind: "Beans",
      coverImage: beanCover(p.frontmatter.coverImage),
    });
  }

  // Scan the body for internal post links, keeping first-appearance order and
  // deduping. Exact-path lookup means "/bread/fig" can't resolve a
  // "/bread/fig-walnut" post — only a real link to an existing post matches.
  const linkRe = /\/(?:coffee|bread|beans)\/[a-z0-9-]+/g;
  const seen = new Set<string>();
  const linked: LinkedPost[] = [];
  let match: RegExpExecArray | null;
  while ((match = linkRe.exec(content)) !== null) {
    const url = match[0];
    if (seen.has(url)) continue;
    seen.add(url);
    const post = index.get(url);
    if (post) linked.push(post);
  }
  return linked;
}

// ─── All Posts (mixed feed) ───────────────────────────────────────────────────

export async function getAllPostsMeta(): Promise<
  (PostMeta<CoffeeFrontmatter> | PostMeta<BreadFrontmatter>)[]
> {
  const [coffee, classic, inclusions] = await Promise.all([
    getAllCoffeePostsMeta(),
    getAllClassicBreadMeta(),
    getInclusionLoaves(),
  ]);

  const all = [
    ...coffee,
    ...classic,
    ...inclusions,
  ] as (PostMeta<CoffeeFrontmatter> | PostMeta<BreadFrontmatter>)[];

  return all.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

// ─── Adjacent posts (newer / older) for prev-next navigation ──────────────────

export interface AdjacentPost {
  slug: string;
  title: string;
  /** Publish date (ISO) of the neighbour, shown for chronological context. */
  date: string;
}

/**
 * Given a date-descending list of posts and the current slug, return the
 * chronologically adjacent posts. `newer` is the post one step up the list
 * (more recent), `older` is one step down. Either can be null at the ends.
 */
export function adjacentPosts<
  T extends { slug: string; frontmatter: { title: string; date: string } },
>(posts: T[], slug: string): { newer: AdjacentPost | null; older: AdjacentPost | null } {
  const i = posts.findIndex((p) => p.slug === slug);
  if (i === -1) return { newer: null, older: null };
  const newer = i > 0 ? posts[i - 1] : null;
  const older = i < posts.length - 1 ? posts[i + 1] : null;
  return {
    newer: newer
      ? { slug: newer.slug, title: newer.frontmatter.title, date: newer.frontmatter.date }
      : null,
    older: older
      ? { slug: older.slug, title: older.frontmatter.title, date: older.frontmatter.date }
      : null,
  };
}

// ─── On-page table of contents ────────────────────────────────────────────────

export interface TocHeading {
  text: string;
  slug: string;
  level: 2 | 3;
}

/**
 * Pull the `##`/`###` headings out of a raw MDX body for an on-page table of
 * contents. The slugs are produced by the same `slugify()` the MDX renderer
 * uses for heading `id`s (see MDXComponents), so every entry deep-links to its
 * section. Fenced code blocks are skipped so a `## foo` inside a code sample
 * never becomes a contents entry.
 */
export function extractHeadings(raw: string): TocHeading[] {
  const headings: TocHeading[] = [];
  let inFence = false;

  for (const line of raw.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = line.match(/^(#{2,3})\s+(.+?)\s*#*\s*$/);
    if (!match) continue;

    // Reduce inline markdown (bold/italic/code/links) to the plain text the
    // renderer flattens into the heading id, so labels and slugs stay aligned.
    const text = match[2]
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .trim();
    const slug = slugify(text);
    if (!slug) continue;

    headings.push({ text, slug, level: match[1].length === 2 ? 2 : 3 });
  }

  return headings;
}

// ─── Recipe formula (interactive batch scaler) ────────────────────────────────

export interface FormulaRow {
  ingredient: string;
  weight: string;
  bakersPct: string;
}

/**
 * Pull the ingredient/weight/baker's-% table out of a bread body's raw MDX so
 * the detail page can render an interactive batch scaler alongside the static
 * (printable, no-JS) table the MDX renders inline. Self-locates the first
 * markdown table whose header names an "Ingredient" and a "Weight" column, so
 * it stays correct whether the loaf writes "## Formula" or "## The Formula" and
 * ignores any other table in the body. Returns null when there is no such
 * table (e.g. coffee posts), so callers simply skip the scaler.
 */
export function extractFormula(raw: string): FormulaRow[] | null {
  const lines = raw.split(/\r?\n/);
  let inFence = false;

  for (let i = 0; i < lines.length; i++) {
    if (/^\s*(```|~~~)/.test(lines[i])) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const header = lines[i].trim();
    if (!header.startsWith("|")) continue;

    const cols = header.replace(/^\||\|$/g, "").split("|").map((c) => c.trim().toLowerCase());
    if (!cols.some((c) => c.includes("ingredient")) || !cols.some((c) => c.includes("weight"))) {
      continue;
    }
    // The next line must be the markdown separator row (|---|---|).
    if (!/^\s*\|[-:\s|]+\|\s*$/.test(lines[i + 1] ?? "")) continue;

    const ingredientIdx = cols.findIndex((c) => c.includes("ingredient"));
    const weightIdx = cols.findIndex((c) => c.includes("weight"));
    const pctIdx = cols.findIndex((c) => c.includes("%") || c.includes("baker"));

    const rows: FormulaRow[] = [];
    for (let j = i + 2; j < lines.length; j++) {
      const row = lines[j].trim();
      if (!row.startsWith("|")) break; // table ends at the first non-table line
      const cells = row.replace(/^\||\|$/g, "").split("|").map(cleanCell);
      const ingredient = cells[ingredientIdx] ?? "";
      if (!ingredient) continue;
      rows.push({
        ingredient,
        weight: cells[weightIdx] ?? "",
        bakersPct: pctIdx >= 0 ? cells[pctIdx] ?? "" : "",
      });
    }

    return rows.length > 0 ? rows : null;
  }

  return null;
}

/** Strip a markdown table cell down to plain text (drop bold markers). */
function cleanCell(cell: string): string {
  return cell.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1").trim();
}

// ─── Tags (cross-content archive) ─────────────────────────────────────────────

export interface TaggedEntry {
  title: string;
  url: string;
  kind: "Coffee" | "Bread" | "Beans";
  excerpt: string;
  date: string;
  tags: string[];
}

/**
 * Turn a human tag ("single origin", "Sourdough") into a URL-safe slug
 * ("single-origin", "sourdough"). Tags that differ only in case or spacing
 * therefore collapse to the same archive page.
 */
export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Every coffee, bread, and bean post flattened to a taggable entry. */
async function getTaggableEntries(): Promise<TaggedEntry[]> {
  const [posts, beans] = await Promise.all([
    getAllPostsMeta(),
    getAllBeanPostsMeta(),
  ]);

  const fromPosts: TaggedEntry[] = posts.map((p) => ({
    title: p.frontmatter.title,
    url: `/${p.frontmatter.type}/${p.slug}`,
    kind: p.frontmatter.type === "coffee" ? "Coffee" : "Bread",
    excerpt: p.frontmatter.excerpt,
    date: p.frontmatter.date,
    tags:
      "tags" in p.frontmatter && Array.isArray(p.frontmatter.tags)
        ? p.frontmatter.tags
        : [],
  }));

  const fromBeans: TaggedEntry[] = beans.map((b) => ({
    title: b.frontmatter.title,
    url: `/beans/${b.slug}`,
    kind: "Beans" as const,
    excerpt: b.frontmatter.excerpt,
    date: b.frontmatter.date,
    tags: Array.isArray(b.frontmatter.tags) ? b.frontmatter.tags : [],
  }));

  return [...fromPosts, ...fromBeans];
}

/**
 * All distinct tags across the site, most-used first, with their post counts
 * and the date of the newest post carrying each tag (`lastModified`, ISO string
 * — omitted when no tagged post has a parseable date). The latest date lets the
 * sitemap report an honest per-tag freshness signal instead of a site-wide one.
 */
export async function getAllTags(): Promise<
  { tag: string; slug: string; count: number; lastModified?: string }[]
> {
  const entries = await getTaggableEntries();
  const map = new Map<
    string,
    { tag: string; count: number; latest?: string }
  >();

  for (const entry of entries) {
    const time = new Date(entry.date).getTime();
    const hasDate = !Number.isNaN(time);
    for (const tag of entry.tags) {
      const slug = tagSlug(tag);
      if (!slug) continue;
      const existing = map.get(slug);
      if (existing) {
        existing.count += 1;
        if (hasDate && (!existing.latest || time > new Date(existing.latest).getTime())) {
          existing.latest = entry.date;
        }
      } else {
        map.set(slug, { tag, count: 1, latest: hasDate ? entry.date : undefined });
      }
    }
  }

  return Array.from(map.entries())
    .map(([slug, { tag, count, latest }]) => ({
      slug,
      tag,
      count,
      ...(latest && { lastModified: latest }),
    }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/**
 * Posts carrying the given tag slug, newest first. `tag` is the human label to
 * display (null when no post matches, so callers can `notFound()`).
 */
export async function getPostsByTag(
  slug: string
): Promise<{ tag: string | null; entries: TaggedEntry[] }> {
  const entries = await getTaggableEntries();
  let displayTag: string | null = null;

  const matched = entries.filter((entry) =>
    entry.tags.some((tag) => {
      if (tagSlug(tag) === slug) {
        if (!displayTag) displayTag = tag;
        return true;
      }
      return false;
    })
  );

  matched.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return { tag: displayTag, entries: matched };
}

/**
 * Tags that co-occur with `slug` — i.e. tags applied to the same posts that
 * carry this tag — ranked by how many posts they share (ties broken
 * alphabetically). Gives a tag detail page lateral navigation to neighbouring
 * topics instead of dead-ending at "← All tags". Returns at most `limit`, and
 * an empty list when the tag stands alone, so callers can skip the section.
 */
export async function getRelatedTags(
  slug: string,
  limit = 12
): Promise<{ tag: string; slug: string; count: number }[]> {
  const entries = await getTaggableEntries();
  const matched = entries.filter((entry) =>
    entry.tags.some((tag) => tagSlug(tag) === slug)
  );

  const map = new Map<string, { tag: string; count: number }>();
  for (const entry of matched) {
    for (const tag of entry.tags) {
      const otherSlug = tagSlug(tag);
      if (!otherSlug || otherSlug === slug) continue;
      const existing = map.get(otherSlug);
      if (existing) existing.count += 1;
      else map.set(otherSlug, { tag, count: 1 });
    }
  }

  return Array.from(map.entries())
    .map(([otherSlug, { tag, count }]) => ({ slug: otherSlug, tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
    .slice(0, limit);
}

/**
 * Cross-content posts most related to the one at `currentUrl`, ranked by the
 * number of tags they share (ties broken by recency). Draws from every tagged
 * content type — a cappuccino brew can surface the espresso bean it shares a
 * tag with. Returns at most `limit` entries, and an empty list when the post
 * has no tags or nothing overlaps, so callers can skip the section entirely.
 */
export async function getRelatedPosts(
  currentUrl: string,
  tags: string[],
  limit = 3
): Promise<TaggedEntry[]> {
  const wanted = new Set(tags.map(tagSlug).filter(Boolean));
  if (wanted.size === 0) return [];

  const entries = await getTaggableEntries();

  return entries
    .filter((entry) => entry.url !== currentUrl)
    .map((entry) => ({
      entry,
      shared: entry.tags.reduce(
        (n, tag) => (wanted.has(tagSlug(tag)) ? n + 1 : n),
        0
      ),
    }))
    .filter((scored) => scored.shared > 0)
    .sort(
      (a, b) =>
        b.shared - a.shared ||
        new Date(b.entry.date).getTime() - new Date(a.entry.date).getTime()
    )
    .slice(0, limit)
    .map((scored) => scored.entry);
}

// ─── Gallery: collect all images from all posts ───────────────────────────────

export async function getAllGalleryImages(): Promise<GalleryImage[]> {
  const [all, beans] = await Promise.all([getAllPostsMeta(), getAllBeanPostsMeta()]);
  const images: GalleryImage[] = [];

  for (const post of all) {
    const type = post.frontmatter.type; // "coffee" | "bread"
    const url = `/${type}/${post.slug}`;
    for (const src of post.frontmatter.images) {
      images.push({ src, alt: post.frontmatter.title, title: post.frontmatter.title, postUrl: url, category: type });
    }
  }

  for (const bean of beans) {
    const url = `/beans/${bean.slug}`;
    for (const src of bean.frontmatter.images ?? []) {
      images.push({ src, alt: bean.frontmatter.title, title: bean.frontmatter.title, postUrl: url, category: "beans" });
    }
  }

  return images;
}
