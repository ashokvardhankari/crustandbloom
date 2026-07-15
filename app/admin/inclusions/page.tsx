"use client";

import { useState } from "react";

type FlavorProfile = "savory" | "sweet" | "spicy";

type InclusionIdea = {
  name: string;
  flavorProfile: FlavorProfile;
  whyTrending: string;
  inclusions: string[];
  foldInTip: string;
  tastingNote: string;
};

type BeanIdea = {
  name: string;
  roaster: string;
  origin: string;
  process: string;
  roastLevel: string;
  officialNotes: string[];
  whyTry: string;
  approxPrice: string;
};

type DrinkIdea = {
  name: string;
  category: string;
  brewRatio: string;
  description: string;
  buildSteps: string[];
};

type Ideas = {
  inclusions: InclusionIdea[];
  beans: BeanIdea[];
  drinks: DrinkIdea[];
};

const FLAVORS: { value: FlavorProfile; label: string; emoji: string }[] = [
  { value: "savory", label: "Savory", emoji: "🧀" },
  { value: "sweet", label: "Sweet", emoji: "🍫" },
  { value: "spicy", label: "Spicy", emoji: "🌶" },
];

const flavorEmoji = (f: FlavorProfile) =>
  FLAVORS.find((x) => x.value === f)?.emoji ?? "";

export default function InclusionsIdeaBoard() {
  const [secret, setSecret] = useState("");
  const [ideas, setIdeas] = useState<Ideas | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<FlavorProfile | "all">("all");

  async function unlock(e: React.FormEvent) {
    e.preventDefault();
    if (!secret.trim()) return setError("Enter your passphrase.");
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/ideas", {
        method: "POST",
        headers: { "x-admin-secret": secret },
      });
      if (res.status === 401) {
        setError("That passphrase didn't match. Try again.");
        return;
      }
      if (!res.ok) {
        setError(`Couldn't load the board (${res.status}).`);
        return;
      }
      setIdeas(await res.json());
    } catch {
      setError("Network error. Try again.");
    } finally {
      setBusy(false);
    }
  }

  // ── Locked state: passphrase gate ────────────────────────────────────────
  if (!ideas) {
    return (
      <div className="max-w-md mx-auto px-6 py-24">
        <p className="eyebrow mb-2">Private</p>
        <h1 className="font-display font-semibold text-3xl tracking-tight text-espresso">
          Inclusions to try
        </h1>
        <p className="mt-2 mb-8 text-sm text-espresso/60">
          A private idea board — trending sourdough mix-ins and coffees I
          haven&apos;t made yet. Enter your passphrase to open it.
        </p>
        <form onSubmit={unlock} className="flex flex-col gap-3">
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Admin passphrase"
            autoComplete="off"
            autoFocus
            className="bg-white border border-blush rounded-xl px-4 py-2.5 text-sm text-espresso focus:outline-none focus:border-terracotta/50"
          />
          <button
            type="submit"
            disabled={busy}
            className="bg-terracotta text-cream font-semibold px-5 py-2.5 rounded-full text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {busy ? "Opening…" : "Open the board"}
          </button>
          {error && <p className="text-sm text-red-700">{error}</p>}
        </form>
      </div>
    );
  }

  // ── Unlocked state: the idea board ───────────────────────────────────────
  const visible =
    filter === "all"
      ? ideas.inclusions
      : ideas.inclusions.filter((i) => i.flavorProfile === filter);

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-8 py-12">
      <div className="mb-8">
        <p className="eyebrow mb-2">Private · Ideas to try</p>
        <h1 className="font-display font-semibold text-4xl tracking-tight text-espresso">
          Sourdough inclusions to try next
        </h1>
        <p className="mt-2 text-sm text-espresso/60 max-w-2xl">
          You make the starter and dough at home — these are just the mix-ins to
          buy. Trending combos from 2025–2026 you haven&apos;t baked yet, laid
          out per recipe with when to fold each in.
        </p>
      </div>

      {/* Flavor filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={
            "px-4 py-1.5 rounded-full text-sm font-semibold transition-colors " +
            (filter === "all"
              ? "bg-terracotta text-cream"
              : "border border-espresso/20 text-espresso hover:bg-blush/30")
          }
        >
          All ({ideas.inclusions.length})
        </button>
        {FLAVORS.map((f) => {
          const count = ideas.inclusions.filter(
            (i) => i.flavorProfile === f.value,
          ).length;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={
                "px-4 py-1.5 rounded-full text-sm font-semibold transition-colors " +
                (filter === f.value
                  ? "bg-terracotta text-cream"
                  : "border border-espresso/20 text-espresso hover:bg-blush/30")
              }
            >
              {f.emoji} {f.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Inclusion recipe cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visible.map((idea) => (
          <article
            key={idea.name}
            className="bg-white border border-blush rounded-2xl p-6 flex flex-col gap-4"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-display font-semibold text-xl text-espresso leading-snug">
                  {idea.name}
                </h2>
                <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-espresso/50 whitespace-nowrap">
                  {flavorEmoji(idea.flavorProfile)} {idea.flavorProfile}
                </span>
              </div>
              <p className="mt-1.5 text-xs text-espresso/55 italic">
                {idea.whyTrending}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-espresso-muted mb-2">
                Shopping list
              </p>
              <ul className="flex flex-col gap-1.5">
                {idea.inclusions.map((ing) => (
                  <li
                    key={ing}
                    className="text-sm text-espresso/85 flex gap-2 leading-snug"
                  >
                    <span className="text-terracotta">▪</span>
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-sm text-espresso/70 border-t border-blush/70 pt-3">
              <span className="font-semibold text-espresso">Fold-in:</span>{" "}
              {idea.foldInTip}
            </div>
            <p className="text-sm text-espresso/70 italic">{idea.tastingNote}</p>
          </article>
        ))}
      </div>

      {/* Coffee section */}
      <div className="mt-16">
        <h2 className="font-display font-semibold text-3xl tracking-tight text-espresso mb-1">
          Beans to review next
        </h2>
        <p className="text-sm text-espresso/60 mb-6">
          Specialty lots worth buying for the next bean review.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ideas.beans.map((b) => (
            <article
              key={b.name}
              className="bg-white border border-blush rounded-2xl p-6 flex flex-col gap-2"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display font-semibold text-lg text-espresso leading-snug">
                  {b.name}
                </h3>
                <span className="shrink-0 text-xs font-semibold text-espresso/50 whitespace-nowrap">
                  {b.approxPrice}
                </span>
              </div>
              <p className="text-sm text-espresso/70">
                {b.roaster} · {b.origin}
              </p>
              <p className="text-xs text-espresso/55">
                {b.process} · {b.roastLevel} roast
              </p>
              <div className="flex flex-wrap gap-1.5 my-1">
                {b.officialNotes.map((n) => (
                  <span
                    key={n}
                    className="text-xs bg-dune/40 text-espresso px-2.5 py-0.5 rounded-full"
                  >
                    {n}
                  </span>
                ))}
              </div>
              <p className="text-sm text-espresso/70 italic">{b.whyTry}</p>
            </article>
          ))}
        </div>
      </div>

      {/* Drink ideas */}
      <div className="mt-16">
        <h2 className="font-display font-semibold text-3xl tracking-tight text-espresso mb-1">
          Drink recipes to try
        </h2>
        <p className="text-sm text-espresso/60 mb-6">
          Creative espresso &amp; latte builds trending right now.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ideas.drinks.map((d) => (
            <article
              key={d.name}
              className="bg-white border border-blush rounded-2xl p-6 flex flex-col gap-3"
            >
              <div>
                <h3 className="font-display font-semibold text-lg text-espresso leading-snug">
                  {d.name}
                </h3>
                <p className="text-xs text-espresso/55 mt-0.5">
                  {d.category} · ratio {d.brewRatio}
                </p>
              </div>
              <p className="text-sm text-espresso/70 italic">{d.description}</p>
              <ol className="flex flex-col gap-1.5 list-decimal list-inside">
                {d.buildSteps.map((s) => (
                  <li key={s} className="text-sm text-espresso/80 leading-snug">
                    {s}
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
