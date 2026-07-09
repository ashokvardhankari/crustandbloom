import { NextRequest, NextResponse } from "next/server";
import { getResend, getSegmentId, sendWelcomeEmail } from "@/lib/newsletter";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const resend = getResend();
    const segmentId = getSegmentId();

    // Not configured yet (no Resend keys): don't break the live form. Log the
    // signup and report success so nothing is lost from the user's side. Real
    // storage kicks in automatically once RESEND_API_KEY + RESEND_SEGMENT_ID
    // are set in the environment.
    if (!resend || !segmentId) {
      console.warn(`[newsletter] not configured; signup not stored: ${email}`);
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const { error } = await resend.contacts.create({
      email: cleanEmail,
      segments: [{ id: segmentId }],
      unsubscribed: false,
    });

    if (error) {
      // An already-subscribed address is a success — and gets no second welcome.
      if (isAlreadyExists(error)) {
        return NextResponse.json({ success: true }, { status: 200 });
      }
      console.error("[newsletter] Resend contacts.create failed:", error);
      return NextResponse.json({ error: "Subscription failed" }, { status: 502 });
    }

    // New subscriber: send the welcome email. Never let it fail the signup.
    await sendWelcomeEmail(cleanEmail).catch((e) =>
      console.error("[newsletter] welcome send threw:", e),
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isAlreadyExists(error: { message?: string; name?: string }): boolean {
  const msg = `${error?.message ?? ""} ${error?.name ?? ""}`.toLowerCase();
  return msg.includes("already") || msg.includes("exist");
}
