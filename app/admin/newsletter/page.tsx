"use client";

import { useState } from "react";

type Feedback = { kind: "info" | "success" | "error"; text: string } | null;

const markdownHelp: { code: string; what: string }[] = [
  { code: "## Heading", what: "section headline (serif)" },
  { code: "*word*", what: "green italic accent" },
  { code: "**bold**", what: "bold" },
  { code: "- item", what: "bullet list" },
  { code: "[text](url)", what: "link" },
  { code: "[text →](url)", what: "green button (note the →)" },
  { code: "![alt](url)", what: "image (full https URL)" },
  { code: "> quote", what: "indented quote" },
];

const shortcodeHelp: { code: string; what: string }[] = [
  { code: "::stats Hydration=76% | Starter=20% | Bake=500°F", what: "stat tiles" },
  { code: "::inside 80g tomatoes | 100g cheddar", what: "inclusion chips" },
  { code: "::quote A short, highlighted line.", what: "pull-quote" },
  { code: "::note Something personal about this bake.", what: "baker's note box" },
  { code: "::teaser What's coming next week.", what: "next-week teaser" },
  { code: "::tool baking", what: "tool card (baking or coffee)" },
  { code: "::photos url1 | url2", what: "side-by-side photos" },
  { code: "::poll Focaccia | Rye | Bagels", what: "vote buttons (reply-based)" },
  { code: "::reply What should I bake next?", what: "reply prompt + button" },
  { code: "::forward", what: "forward-to-a-friend nudge" },
];

export default function NewsletterComposePage() {
  const [secret, setSecret] = useState("");
  const [subject, setSubject] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [testEmail, setTestEmail] = useState("");
  const [previewHtml, setPreviewHtml] = useState("");
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [busy, setBusy] = useState<null | "preview" | "test" | "broadcast">(null);

  async function call(mode: "preview" | "test" | "broadcast") {
    if (!secret) return setFeedback({ kind: "error", text: "Enter the passphrase first." });
    if (!subject.trim() || !markdown.trim()) {
      return setFeedback({ kind: "error", text: "Add a subject and a body." });
    }
    if (mode === "broadcast") {
      const ok = window.confirm(
        "Send this to every subscriber? This cannot be undone.",
      );
      if (!ok) return;
    }

    setBusy(mode);
    setFeedback({ kind: "info", text: mode === "preview" ? "Rendering…" : "Sending…" });
    try {
      const res = await fetch("/api/newsletter/send", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-secret": secret },
        body: JSON.stringify({ mode, subject, markdown, testEmail }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFeedback({ kind: "error", text: data.error ?? `Request failed (${res.status}).` });
        return;
      }
      if (mode === "preview") {
        setPreviewHtml(data.html ?? "");
        setFeedback({ kind: "info", text: "Preview updated." });
      } else if (mode === "test") {
        setFeedback({ kind: "success", text: `Test sent to ${data.sentTo}.` });
      } else {
        setFeedback({ kind: "success", text: "Broadcast sent to your subscribers. 🎉" });
      }
    } catch {
      setFeedback({ kind: "error", text: "Network error. Try again." });
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
      <div className="mb-8">
        <p className="eyebrow mb-2">Admin</p>
        <h1 className="font-display font-semibold text-4xl tracking-tight text-espresso">
          Compose newsletter
        </h1>
        <p className="mt-2 text-sm text-espresso/60">
          Write in Markdown. Preview it, send a test to yourself, then send to everyone.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor */}
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-widest text-espresso-muted">
              Passphrase
            </span>
            <input
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Admin passphrase"
              autoComplete="off"
              className="bg-white border border-blush rounded-xl px-4 py-2.5 text-sm text-espresso focus:outline-none focus:border-terracotta/50"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-widest text-espresso-muted">
              Subject
            </span>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="What's in this issue?"
              className="bg-white border border-blush rounded-xl px-4 py-2.5 text-sm text-espresso focus:outline-none focus:border-terracotta/50"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-widest text-espresso-muted">
              Body (Markdown)
            </span>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder={"## A fresh loaf\n\nThis week I baked…\n\n- one\n- two\n\nRead more at [crustbloom.com](https://crustbloom.com)."}
              rows={16}
              className="bg-white border border-blush rounded-xl px-4 py-3 text-sm text-espresso font-mono leading-relaxed focus:outline-none focus:border-terracotta/50 resize-y"
            />
          </label>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
            <label className="flex flex-col gap-1.5 flex-1">
              <span className="text-xs font-semibold uppercase tracking-widest text-espresso-muted">
                Test address
              </span>
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="you@example.com (or set ADMIN_EMAIL)"
                className="bg-white border border-blush rounded-xl px-4 py-2.5 text-sm text-espresso focus:outline-none focus:border-terracotta/50"
              />
            </label>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <button
              onClick={() => call("preview")}
              disabled={busy !== null}
              className="border border-espresso/20 text-espresso font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-blush/30 transition-colors disabled:opacity-50"
            >
              {busy === "preview" ? "Rendering…" : "Preview"}
            </button>
            <button
              onClick={() => call("test")}
              disabled={busy !== null}
              className="border border-espresso/20 text-espresso font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-blush/30 transition-colors disabled:opacity-50"
            >
              {busy === "test" ? "Sending…" : "Send test to me"}
            </button>
            <button
              onClick={() => call("broadcast")}
              disabled={busy !== null}
              className="bg-terracotta text-white font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-terracotta-dark transition-colors disabled:opacity-50"
            >
              {busy === "broadcast" ? "Sending…" : "Send to everyone"}
            </button>
          </div>

          {feedback && (
            <p
              role="status"
              className={
                "text-sm mt-1 " +
                (feedback.kind === "error"
                  ? "text-red-600"
                  : feedback.kind === "success"
                    ? "text-terracotta font-medium"
                    : "text-espresso/60")
              }
            >
              {feedback.text}
            </p>
          )}
        </div>

        {/* Preview */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-widest text-espresso-muted">
            Preview
          </span>
          <div className="flex-1 min-h-[480px] rounded-xl border border-blush overflow-hidden bg-cream-dark">
            {previewHtml ? (
              <iframe
                title="Newsletter preview"
                srcDoc={previewHtml}
                className="w-full h-full min-h-[480px] bg-white"
              />
            ) : (
              <div className="h-full min-h-[480px] flex items-center justify-center text-sm text-espresso/40 px-6 text-center">
                Hit Preview to see the rendered email here.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Formatting guide */}
      <details className="mt-10 rounded-xl border border-blush bg-cream-dark/40 p-5">
        <summary className="cursor-pointer text-sm font-semibold text-espresso">
          Formatting guide
        </summary>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-espresso-muted mb-3">
              Markdown
            </p>
            <ul className="space-y-2">
              {markdownHelp.map((h) => (
                <li key={h.code} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <code className="font-mono text-xs bg-white border border-blush rounded px-1.5 py-0.5 text-terracotta">
                    {h.code}
                  </code>
                  <span className="text-espresso/55">{h.what}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-espresso-muted mb-3">
              Blocks — each on its own line
            </p>
            <ul className="space-y-2.5">
              {shortcodeHelp.map((h) => (
                <li key={h.code} className="flex flex-col gap-1">
                  <code className="font-mono text-xs bg-white border border-blush rounded px-1.5 py-0.5 text-terracotta w-fit">
                    {h.code}
                  </code>
                  <span className="text-espresso/55">{h.what}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </details>
    </div>
  );
}
