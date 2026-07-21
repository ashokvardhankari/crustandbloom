"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
  /** Post title — used as the share-sheet title. */
  title: string;
  /** Button label noun — reads "Share recipe". */
  label?: string;
  /** Native tooltip text — defaults to a recipe wording; override for reviews. */
  tooltip?: string;
}

/**
 * Share button for recipe pages. On devices with the Web Share API (most phones
 * and tablets) it opens the native share sheet so a reader can send the recipe
 * straight to Messages, Notes, or any installed app. Everywhere else it copies
 * the page link to the clipboard and briefly confirms. Dropped from the printout
 * via `print:hidden`.
 *
 * Unlike the wake-lock button, this never hides itself: the clipboard fallback
 * works in any secure context (HTTPS / localhost), so the control is always
 * useful and prerenders into the static HTML.
 */
export default function ShareButton({
  title,
  label = "Share",
  tooltip = "Share this recipe",
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;

    // Native share sheet where available (primarily mobile).
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch (err) {
        // The user dismissed the sheet — respect that, don't silently copy.
        if (err instanceof DOMException && err.name === "AbortError") return;
        // Any other failure (e.g. share not allowed here) falls through to copy.
      }
    }

    // Fallback: copy the link and confirm.
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — nothing more we can do */
    }
  }

  return (
    <>
    <button
      type="button"
      onClick={handleShare}
      title={tooltip}
      className={cn(
        "print:hidden inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest border rounded-full px-4 py-2 transition-colors",
        copied
          ? "bg-terracotta border-terracotta text-cream"
          : "border-blush text-espresso-muted hover:bg-blush/30 hover:text-espresso"
      )}
    >
      {copied ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
          aria-hidden="true"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      )}
      {copied ? "Link copied" : label}
    </button>
    {/*
      The visible label swaps to "Link copied", but a focused button's changed
      text isn't reliably re-announced by screen readers. This always-present
      polite live region announces the copy confirmation for assistive tech,
      matching the status-message pattern used by the search UI and signup form.
    */}
    <span role="status" aria-live="polite" className="sr-only">
      {copied ? "Link copied to clipboard" : ""}
    </span>
    </>
  );
}
