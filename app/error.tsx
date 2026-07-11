"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Route-level error boundary. Next.js App Router renders this (inside the root
 * layout, so the header/footer stay) whenever a segment throws at runtime — for
 * example a client component like the search, brew calculator, or newsletter
 * form. Without it, an uncaught error falls back to Next's bare, unstyled,
 * unrecoverable screen; this keeps the site chrome and offers a way back.
 */
export default function Error({
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
    <div className="relative overflow-hidden">
      {/* Ambient wash */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 right-1/4 w-96 h-96 bg-blush/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-sand/40 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto px-6 py-32 text-center">
        <p className="eyebrow mb-4 animate-fade-in-up">Something went wrong</p>
        <h1
          className="font-display font-semibold text-6xl sm:text-7xl tracking-tight text-espresso animate-fade-in-up"
          style={{ animationDelay: "120ms" }}
        >
          A fallen <span className="italic text-terracotta">loaf</span>.
        </h1>
        <p
          className="mt-6 text-lg text-espresso/60 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "240ms" }}
        >
          A hiccup on our end kept this page from finishing. Give it another
          go — if it keeps happening, head back home and try a fresh path.
        </p>
        <div
          className="mt-10 flex flex-wrap justify-center gap-4 animate-fade-in-up"
          style={{ animationDelay: "360ms" }}
        >
          <button type="button" onClick={reset} className="btn-primary">
            Try again
          </button>
          <Link href="/" className="btn-secondary">
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
