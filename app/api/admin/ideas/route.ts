import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSecret } from "@/lib/newsletter";
import {
  INCLUSION_IDEAS,
  BEAN_IDEAS,
  DRINK_IDEAS,
} from "@/lib/inclusion-ideas";

export const runtime = "nodejs";

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
    inclusions: INCLUSION_IDEAS,
    beans: BEAN_IDEAS,
    drinks: DRINK_IDEAS,
  });
}
