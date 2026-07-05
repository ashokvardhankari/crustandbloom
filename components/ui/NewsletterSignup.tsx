"use client";

import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="relative bg-blush/30 border-t border-blush/60 overflow-hidden">
      {/* Ambient wash */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-mist/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-sand/40 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="max-w-xl mx-auto text-center">
          <p className="eyebrow mb-4">
            Stay in the loop
          </p>
          <h2 className="font-display font-semibold text-4xl lg:text-5xl tracking-tight text-espresso leading-tight text-balance">
            New posts, straight to <span className="italic text-terracotta">your inbox</span>.
          </h2>
          <p className="mt-4 text-espresso/55 text-base leading-relaxed">
            No noise, just a note when a new loaf comes out of the oven
            or a drink is worth writing about.
          </p>

          {status === "success" ? (
            <div className="mt-10 p-6 rounded-2xl bg-white text-center shadow-sm">
              <p className="text-terracotta text-lg font-semibold">You&apos;re in.</p>
              <p className="text-espresso/55 text-sm mt-1">
                Thanks for subscribing. You&apos;ll hear from me when something good is ready.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={status === "loading"}
                className="flex-1 bg-white text-espresso placeholder:text-espresso/30 border border-blush rounded-full px-6 py-3.5 text-sm focus:outline-none focus:border-terracotta/50 transition-colors disabled:opacity-50 shadow-sm"
              />
              <button
                type="submit"
                disabled={status === "loading" || !email}
                className="bg-terracotta text-white font-semibold px-8 py-3.5 rounded-full text-sm tracking-wide transition-all duration-200 hover:bg-terracotta-dark hover:shadow-glow active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="mt-3 text-sm text-red-500">
              Something went wrong. Please try again.
            </p>
          )}

          <p className="mt-4 text-xs text-espresso/35">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
