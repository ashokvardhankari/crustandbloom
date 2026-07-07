import { NextResponse } from "next/server";
import { getAllPostsMeta } from "@/lib/content";

export const runtime = "nodejs";

// Public recipe metadata, used by the compose page's "start from a recipe"
// picker. This is the same data already published on the site, so it isn't
// gated behind the admin passphrase.

interface RecipeFrontmatter {
  type: "coffee" | "bread";
  title: string;
  coverImage: string;
  excerpt?: string;
  tastingNotes?: string;
  category?: string;
  hydration?: number;
  starterPercentage?: number;
  bakeTemp?: string;
  inclusions?: string[];
  brewRatio?: string;
  extractionTime?: string;
  milkTemp?: string;
}

export async function GET() {
  const posts = await getAllPostsMeta();
  const recipes = posts.map((p) => {
    const f = p.frontmatter as unknown as RecipeFrontmatter;
    return {
      type: f.type,
      slug: p.slug,
      title: f.title,
      coverImage: f.coverImage,
      excerpt: f.excerpt ?? "",
      tastingNotes: f.tastingNotes ?? "",
      hydration: f.hydration ?? null,
      starterPercentage: f.starterPercentage ?? null,
      bakeTemp: f.bakeTemp ?? null,
      inclusions: f.inclusions ?? null,
      brewRatio: f.brewRatio ?? null,
      extractionTime: f.extractionTime ?? null,
      milkTemp: f.milkTemp ?? null,
    };
  });
  return NextResponse.json({ recipes });
}
