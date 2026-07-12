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
} from "./types";
import { MDXComponents } from "@/components/mdx/MDXComponents";

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
}> {
  const raw = await readMDX(contentPath("beans", `${slug}.mdx`));
  const { frontmatter, content } = await compileMDX<BeanFrontmatter>({
    source: raw,
    components: MDXComponents,
    options: { parseFrontmatter: true, mdxOptions: { remarkPlugins: [remarkGfm] } },
  });
  return { frontmatter, content };
}

// ─── Newsletters (published issue archive) ────────────────────────────────────

export async function getAllNewsletterSlugs(): Promise<string[]> {
  const files = await getFilesInDir(contentPath("newsletters"));
  return files.map(toSlug);
}

export async function getAllNewslettersMeta(): Promise<
  PostMeta<NewsletterFrontmatter>[]
> {
  const slugs = await getAllNewsletterSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const raw = await readMDX(contentPath("newsletters", `${slug}.mdx`));
      const { data } = matter(raw);
      return { slug, frontmatter: data as NewsletterFrontmatter };
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
}> {
  const raw = await readMDX(contentPath("newsletters", `${slug}.mdx`));
  const { frontmatter, content } = await compileMDX<NewsletterFrontmatter>({
    source: raw,
    components: MDXComponents,
    options: { parseFrontmatter: true, mdxOptions: { remarkPlugins: [remarkGfm] } },
  });
  return { frontmatter, content };
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

// ─── Adjacent posts (previous / next navigation) ──────────────────────────────

export interface AdjacentPost {
  slug: string;
  title: string;
}

export interface AdjacentPosts {
  /** The older, chronologically-previous post. */
  previous: AdjacentPost | null;
  /** The newer, chronologically-next post. */
  next: AdjacentPost | null;
}

/**
 * Given a list already sorted newest-first, find the posts flanking `slug`.
 * "previous" is the older neighbour (further down the list), "next" the newer.
 */
function adjacentFrom<T extends { title: string }>(
  sorted: PostMeta<T>[],
  slug: string
): AdjacentPosts {
  const i = sorted.findIndex((p) => p.slug === slug);
  if (i === -1) return { previous: null, next: null };
  const toAdjacent = (p: PostMeta<T> | undefined): AdjacentPost | null =>
    p ? { slug: p.slug, title: p.frontmatter.title } : null;
  return {
    previous: toAdjacent(sorted[i + 1]),
    next: toAdjacent(sorted[i - 1]),
  };
}

export async function getCoffeeAdjacent(slug: string): Promise<AdjacentPosts> {
  return adjacentFrom(await getAllCoffeePostsMeta(), slug);
}

export async function getBeanAdjacent(slug: string): Promise<AdjacentPosts> {
  return adjacentFrom(await getAllBeanPostsMeta(), slug);
}

export async function getBreadAdjacent(slug: string): Promise<AdjacentPosts> {
  const [classic, inclusions] = await Promise.all([
    getAllClassicBreadMeta(),
    getInclusionLoaves(),
  ]);
  const all = [...classic, ...inclusions].sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
  return adjacentFrom(all, slug);
}

// ─── Gallery: collect all images from all posts ───────────────────────────────

export async function getAllGalleryImages(): Promise<
  { src: string; alt: string; postUrl: string }[]
> {
  const [all, beans] = await Promise.all([getAllPostsMeta(), getAllBeanPostsMeta()]);
  const images: { src: string; alt: string; postUrl: string }[] = [];

  for (const post of all) {
    const type = post.frontmatter.type;
    const url = `/${type}/${post.slug}`;
    for (const src of post.frontmatter.images) {
      images.push({ src, alt: post.frontmatter.title, postUrl: url });
    }
  }

  for (const bean of beans) {
    const url = `/beans/${bean.slug}`;
    for (const src of bean.frontmatter.images ?? []) {
      images.push({ src, alt: bean.frontmatter.title, postUrl: url });
    }
  }

  return images;
}
