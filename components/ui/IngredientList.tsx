"use client";

import { useState } from "react";

/**
 * A scannable "What you'll need" ingredient list for recipe pages. Coffee
 * recipes carry no formula table (unlike bread), so their ingredients otherwise
 * live only inside the narrative prose — this surfaces them up front and also
 * lets the page feed `recipeIngredient` into the Recipe JSON-LD. Renders nothing
 * when a post has no ingredients listed.
 *
 * Each item doubles as a check-off so a barista can tick ingredients as they
 * gather them — the same mise-en-place affordance the bread `RecipeScaler`
 * offers, brought to the coffee side for parity. The check UI is `print:hidden`;
 * in print the list falls back to a clean terracotta-bulleted list, so the page
 * still prints (and reads with no JS) as a plain ingredient list.
 */
interface IngredientListProps {
  items?: string[];
  heading?: string;
}

export default function IngredientList({
  items,
  heading = "What you'll need",
}: IngredientListProps) {
  const [gathered, setGathered] = useState<boolean[]>(() =>
    (items ?? []).map(() => false),
  );

  if (!items || items.length === 0) return null;

  const doneCount = gathered.filter(Boolean).length;
  const toggle = (index: number) =>
    setGathered((prev) => prev.map((v, i) => (i === index ? !v : v)));

  return (
    <section
      aria-labelledby="ingredients-heading"
      className="mb-10 rounded-2xl border border-blush/50 bg-cream/40 p-6 print:bg-transparent print:border-espresso/20"
    >
      <h2
        id="ingredients-heading"
        className="text-xs font-semibold uppercase tracking-widest text-espresso-muted mb-4"
      >
        {heading}
      </h2>
      <ul className="space-y-2.5">
        {items.map((item, i) => {
          const done = gathered[i];
          return (
            <li key={i} className="flex gap-3 leading-snug">
              <input
                type="checkbox"
                checked={done}
                onChange={() => toggle(i)}
                aria-label={`Gathered: ${item}`}
                className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-terracotta print:hidden"
              />
              <span
                aria-hidden="true"
                className="mt-2 hidden h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta print:block"
              />
              <span
                onClick={() => toggle(i)}
                className={
                  "cursor-pointer select-none text-espresso print:cursor-auto " +
                  (done ? "line-through text-espresso-muted/60 print:no-underline" : "")
                }
              >
                {item}
              </span>
            </li>
          );
        })}
      </ul>
      {doneCount > 0 && (
        <div className="mt-4 flex items-center justify-between gap-3 text-xs text-espresso-muted print:hidden">
          <span aria-live="polite">
            {doneCount} of {items.length} gathered
          </span>
          <button
            type="button"
            onClick={() => setGathered(items.map(() => false))}
            className="font-semibold text-terracotta hover:text-terracotta-dark transition-colors"
          >
            Reset
          </button>
        </div>
      )}
    </section>
  );
}
