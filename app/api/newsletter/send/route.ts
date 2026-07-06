import { NextRequest, NextResponse } from "next/server";
import {
  getResend,
  getSegmentId,
  getFromAddress,
  verifyAdminSecret,
  renderNewsletterHtml,
} from "@/lib/newsletter";

export const runtime = "nodejs";

type Mode = "preview" | "test" | "broadcast";

export async function POST(req: NextRequest) {
  // Every request to this route must carry the admin passphrase.
  if (!verifyAdminSecret(req.headers.get("x-admin-secret"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: { subject?: string; markdown?: string; mode?: Mode; testEmail?: string };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const subject = (payload.subject ?? "").trim();
  const markdown = (payload.markdown ?? "").trim();
  const mode: Mode = payload.mode ?? "preview";

  if (!subject || !markdown) {
    return NextResponse.json(
      { error: "Both a subject and a body are required." },
      { status: 400 },
    );
  }

  // Preview never sends — just return the rendered HTML for the compose page.
  if (mode === "preview") {
    const html = await renderNewsletterHtml({ subject, markdown, broadcast: false });
    return NextResponse.json({ html }, { status: 200 });
  }

  const resend = getResend();
  const from = getFromAddress();
  if (!resend || !from) {
    return NextResponse.json(
      {
        error:
          "Sending is not configured. Set RESEND_API_KEY and NEWSLETTER_FROM in the environment.",
      },
      { status: 503 },
    );
  }

  // Send a single test email to yourself.
  if (mode === "test") {
    const testEmail = (payload.testEmail ?? process.env.ADMIN_EMAIL ?? "").trim();
    if (!testEmail) {
      return NextResponse.json(
        { error: "No test address. Enter one, or set ADMIN_EMAIL." },
        { status: 400 },
      );
    }
    const html = await renderNewsletterHtml({ subject, markdown, broadcast: false });
    const { data, error } = await resend.emails.send({
      from,
      to: testEmail,
      subject,
      html,
    });
    if (error) {
      console.error("[newsletter] test send failed:", error);
      return NextResponse.json({ error: error.message ?? "Test send failed." }, { status: 502 });
    }
    return NextResponse.json(
      { ok: true, mode, id: data?.id, sentTo: testEmail },
      { status: 200 },
    );
  }

  // Broadcast to the whole segment.
  const segmentId = getSegmentId();
  if (!segmentId) {
    return NextResponse.json(
      { error: "No segment configured. Set RESEND_SEGMENT_ID." },
      { status: 503 },
    );
  }

  const html = await renderNewsletterHtml({ subject, markdown, broadcast: true });

  const created = await resend.broadcasts.create({ segmentId, from, subject, html });
  if (created.error || !created.data?.id) {
    console.error("[newsletter] broadcast create failed:", created.error);
    return NextResponse.json(
      { error: created.error?.message ?? "Could not create the broadcast." },
      { status: 502 },
    );
  }

  const sent = await resend.broadcasts.send(created.data.id);
  if (sent.error) {
    console.error("[newsletter] broadcast send failed:", sent.error);
    return NextResponse.json(
      {
        error: `Broadcast created (id ${created.data.id}) but sending failed: ${sent.error.message ?? "unknown error"}`,
      },
      { status: 502 },
    );
  }

  return NextResponse.json(
    { ok: true, mode, broadcastId: created.data.id },
    { status: 200 },
  );
}
