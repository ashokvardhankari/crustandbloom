import { Resend } from "resend";
import { marked } from "marked";
import { timingSafeEqual } from "crypto";

/**
 * Newsletter backend helpers (Resend).
 *
 * Configuration lives entirely in environment variables so nothing sensitive
 * is committed. See `.env.example` for the full list. When the keys are absent
 * (e.g. local dev, or before the Resend account is set up) the callers degrade
 * gracefully rather than throwing.
 */

export function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  return key ? new Resend(key) : null;
}

/**
 * The Resend segment (formerly "audience") that holds subscribers. Resend
 * migrated Audiences to Segments; the dashboard now exposes a segment id. We
 * read RESEND_SEGMENT_ID, falling back to the older RESEND_AUDIENCE_ID name so
 * either works.
 */
export function getSegmentId(): string | undefined {
  return process.env.RESEND_SEGMENT_ID ?? process.env.RESEND_AUDIENCE_ID;
}

/** From address for sends, e.g. "Crust & Bloom <hello@crustbloom.com>". */
export function getFromAddress(): string | undefined {
  return process.env.NEWSLETTER_FROM;
}

/**
 * Constant-time comparison of the admin passphrase. Returns false if the
 * secret is unset or the provided value is missing, so an unconfigured
 * deployment fails closed.
 */
export function verifyAdminSecret(provided: string | null | undefined): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || !provided) return false;
  const a = Buffer.from(secret);
  const b = Buffer.from(provided);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

const BRAND = {
  cream: "#F7F4EC",
  creamDark: "#EDE8D8",
  card: "#FFFFFF",
  ink: "#1C2B1E",
  muted: "#6A7D68",
  link: "#3A6E42",
};

// Resend replaces this token with the recipient's real unsubscribe URL when
// the email is sent as a broadcast. For test/preview sends it stays inert, so
// we swap in a harmless placeholder instead.
const RESEND_UNSUBSCRIBE_TOKEN = "{{{RESEND_UNSUBSCRIBE_URL}}}";

export interface RenderOptions {
  subject: string;
  markdown: string;
  /** When true, use the live Resend unsubscribe token (broadcast sends). */
  broadcast: boolean;
}

/**
 * Render a newsletter into a self-contained, email-safe HTML document,
 * styled to match the site. The markdown body is converted with `marked`
 * and wrapped in a table-based shell for broad email-client support.
 */
export async function renderNewsletterHtml({
  subject,
  markdown,
  broadcast,
}: RenderOptions): Promise<string> {
  const body = await marked.parse(markdown, { async: true, gfm: true });
  const unsubscribeUrl = broadcast ? RESEND_UNSUBSCRIBE_TOKEN : "#";
  const unsubscribeNote = broadcast
    ? ""
    : ' <span style="color:#A4C898;">(real link added on send)</span>';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light" />
<title>${escapeHtml(subject)}</title>
<style>
  .cb-body a { color: ${BRAND.link}; }
  .cb-body h1, .cb-body h2, .cb-body h3 { color: ${BRAND.ink}; line-height: 1.25; margin: 1.4em 0 0.5em; }
  .cb-body h1 { font-size: 26px; }
  .cb-body h2 { font-size: 21px; }
  .cb-body h3 { font-size: 18px; }
  .cb-body p { margin: 0 0 1em; }
  .cb-body ul, .cb-body ol { margin: 0 0 1em; padding-left: 1.3em; }
  .cb-body li { margin: 0.25em 0; }
  .cb-body img { max-width: 100%; height: auto; border-radius: 8px; }
  .cb-body blockquote { margin: 0 0 1em; padding: 0.4em 1em; border-left: 3px solid ${BRAND.creamDark}; color: ${BRAND.muted}; }
  .cb-body hr { border: none; border-top: 1px solid ${BRAND.creamDark}; margin: 1.6em 0; }
</style>
</head>
<body style="margin:0; padding:0; background:${BRAND.cream};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.cream};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background:${BRAND.card}; border-radius:16px; overflow:hidden; box-shadow:0 1px 3px rgba(28,43,30,0.08);">
          <tr>
            <td style="padding:32px 40px 8px;">
              <a href="https://crustbloom.com" style="text-decoration:none;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="padding-right:12px; vertical-align:middle;">
                      <img src="https://crustbloom.com/images/site/logo-email.png" alt="Crust & Bloom" width="44" height="44" style="display:block; border:0;" />
                    </td>
                    <td style="vertical-align:middle;">
                      <span style="font-family:Georgia,'Times New Roman',serif; font-size:22px; font-weight:600; color:${BRAND.ink}; letter-spacing:-0.01em;">
                        Crust <span style="color:${BRAND.link}; font-style:italic;">&amp;</span> Bloom
                      </span>
                    </td>
                  </tr>
                </table>
              </a>
            </td>
          </tr>
          <tr>
            <td class="cb-body" style="padding:20px 40px 32px; color:${BRAND.ink}; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; font-size:16px; line-height:1.7;">
              ${body}
            </td>
          </tr>
          <tr>
            <td style="padding:22px 40px 36px; border-top:1px solid ${BRAND.creamDark}; color:${BRAND.muted}; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; font-size:12px; line-height:1.6;">
              You're receiving this because you subscribed at crustbloom.com.<br />
              <a href="${unsubscribeUrl}" style="color:${BRAND.link};">Unsubscribe</a>${unsubscribeNote}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
