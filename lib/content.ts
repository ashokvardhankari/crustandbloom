import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import type { ReactElement } from "react";
import type { CoffeeFrontmatter, BreadFrontmatter, PostMeta } from "./types";
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
}> {
  const raw = await readMDX(contentPath("coffee", `${slug}.mdx`));
  const { frontmatter, content } = await compileMDX<CoffeeFrontmatter>({
    source: raw,
    components: MDXComponents,
    options: { parseFrontmatter: true },
  });
  return { frontmatter, content };
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
    options: { parseFrontmatter: true },
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

// ─── Gallery: collect all images from all posts ───────────────────────────────

export async function getAllGalleryImages(): Promise<
  { src: string; alt: string; postUrl: string }[]
> {
  const all = await getAllPostsMeta();
  const images: { src: string; alt: string; postUrl: string }[] = [];

  for (const post of all) {
    const type = post.frontmatter.type;
    const url = `/${type}/${post.slug}`;
    for (const src of post.frontmatter.images) {
      images.push({ src, alt: post.frontmatter.title, postUrl: url });
    }
  }

  return images;
}
