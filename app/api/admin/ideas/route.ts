import { existsSync } from "fs";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSecret } from "@/lib/newsletter";
import {
  INCLUSION_IDEAS,
  BEAN_IDEAS,
  DRINK_IDEAS,
  inclusionSlug,
} from "@/lib/inclusion-ideas";

export const runtime = "nodejs";

const IMAGE_DIR = join(process.cwd(), "public", "images", "inclusions");

/**
 * Attach a cover photo to any idea that has a matching file on disk
 * (`public/images/inclusions/<slug>.jpg`). Keeps the data file free of image
 * paths — dropping a correctly-named photo into that folder is all it takes.
 */
function withImages(ideas: typeof INCLUSION_IDEAS) {
  return ideas.map((idea) => {
    if (idea.image) return idea;
    const slug = inclusionSlug(idea.name);
    return existsSync(join(IMAGE_DIR, `${slug}.jpg`))
      ? { ...idea, image: `/images/inclusions/${slug}.jpg` }
      : idea;
  });
}

/**
 * Private "ideas to try" board. The data never reaches an unauthenticated
 * browser — it's only returned once the admin passphrase (ADMIN_SECRET) matches
 * the x-admin-secret header, mirroring the newsletter send route's guard.
 */
export async function POST(req: NextRequest) {
  if (!verifyAdminSecret(req.headers.get("x-admin-secret"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    inclusions: withImages(INCLUSION_IDEAS),
    beans: BEAN_IDEAS,
    drinks: DRINK_IDEAS,
  });
}
