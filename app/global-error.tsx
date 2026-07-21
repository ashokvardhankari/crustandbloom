"use client";

import { useEffect } from "react";
import "./globals.css";

/**
 * Root-level error boundary. The App Router renders `error.tsx` *inside* the
 * root layout, so a failure in the layout itself (or in anything it renders
 * before the page segment) escapes that boundary and — without this file —
 * falls back to Next's bare, unstyled default screen with no chrome and no way
 * back. `global-error` replaces the whole document (it must supply its own
 * <html>/<body>), so it keeps the site's palette and offers a reload even when
 * the layout can't render. It only activates in production builds.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error for debugging / monitoring.
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-cream text-espresso antialiased">
        <div className="relative min-h-screen overflow-hidden">
          {/* Ambient wash, matching the styled error/404 pages */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-24 right-1/4 w-96 h-96 bg-blush/40 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-sand/40 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-2xl mx-auto px-6 py-32 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-espresso-muted mb-4">
              Crust &amp; Bloom
            </p>
            <h1 className="font-display font-semibold text-6xl sm:text-7xl tracking-tight text-espresso">
              A fallen <span className="italic text-terracotta">loaf</span>.
            </h1>
            <p className="mt-6 text-lg text-espresso/60 leading-relaxed">
              Something went wrong before the page could finish loading. Give it
              another go — if it keeps happening, try reloading in a moment.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button type="button" onClick={reset} className="btn-primary">
                Try again
              </button>
              <a href="/" className="btn-secondary">
                Back home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
