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

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-espresso text-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber mb-4">
            Stay in the loop
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-cream leading-tight">
            New posts, straight to your inbox.
          </h2>
          <p className="mt-4 text-cream/60 text-base leading-relaxed">
            No noise — just fresh content when a new loaf comes out of the oven
            or a new drink is worth writing about.
          </p>

          {status === "success" ? (
            <div className="mt-10 p-6 rounded-2xl bg-espresso-light text-center">
              <p className="text-amber text-lg font-semibold">You&apos;re in.</p>
              <p className="text-cream/60 text-sm mt-1">
                Thanks for subscribing — you&apos;ll hear from me when something good is ready.
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
                className="flex-1 bg-espresso-light text-cream placeholder:text-cream/30 border border-cream/10 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-amber/60 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === "loading" || !email}
                className="bg-amber text-espresso font-semibold px-8 py-3 rounded-full text-sm tracking-wide hover:bg-amber-light transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {status === "loading" ? "Subscribing…" : "Subscribe"}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="mt-3 text-sm text-red-400">
              Something went wrong. Please try again.
            </p>
          )}

          <p className="mt-4 text-xs text-cream/30">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
