"use client";

import { useState } from "react";
import type { FormulaRow } from "@/lib/content";
import { doughYield } from "@/lib/utils";

interface RecipeScalerProps {
  rows: FormulaRow[];
  /** Singular baked-good noun this formula yields; defaults to "loaf". */
  unit?: string;
}

const PRESETS = [
  { factor: 0.5, label: "½×" },
  { factor: 1, label: "1×" },
  { factor: 1.5, label: "1½×" },
  { factor: 2, label: "2×" },
  { factor: 3, label: "3×" },
];

/** Format a scaled number: up to 2 decimals, no trailing ".0" ("600", "4.5"). */
function fmt(n: number): string {
  return String(Math.round(n * 100) / 100);
}

/**
 * Scale every numeric token in a weight string ("400g", "2 tbsp (~30g)",
 * "1/2 tsp") by `factor`, leaving the surrounding units and text intact. Simple
 * fractions are evaluated before scaling so "1/2 tsp × 2" → "1 tsp". Baker's
 * percentages are scale-invariant, so this only ever touches the weight column.
 */
function scaleWeight(weight: string, factor: number): string {
  if (factor === 1) return weight;
  return weight.replace(/\d+\/\d+|\d+(?:\.\d+)?/g, (token) => {
    if (token.includes("/")) {
      const [num, den] = token.split("/").map(Number);
      return den ? fmt((num / den) * factor) : token;
    }
    return fmt(Number(token) * factor);
  });
}

/**
 * Interactive batch scaler and mise-en-place checklist for a bread formula.
 * Bakers routinely scale a recipe up (two loaves for the week) or down (a small
 * test bake); this recomputes every weight on the fly while the baker's
 * percentages — which are invariant under scaling — stay fixed. Each ingredient
 * row also doubles as a check-off: tap it as you weigh it out so you never lose
 * your place mid-formula. The MDX body still renders the static 1× table below
 * for printing, no-JS, and SEO; this is a client-side convenience on top.
 */
export default function RecipeScaler({ rows, unit = "loaf" }: RecipeScalerProps) {
  const [factor, setFactor] = useState(1);
  const [weighed, setWeighed] = useState<boolean[]>(() => rows.map(() => false));
  const hasPct = rows.some((r) => r.bakersPct);
  const doneCount = weighed.filter(Boolean).length;

  // Total dough weight for the currently selected scale. The sidebar's derived
  // Yield stat only reflects the 1× batch, so once a baker scales up or down the
  // batch they're actually weighing has no live total — this footer supplies it,
  // reusing the same gram-summing rules (coatings/aromatics excluded). Grams
  // scale linearly, so the 1× total times the factor is exact.
  const baseYield = doughYield(rows);
  const scaledGrams = baseYield ? Math.round(baseYield.grams * factor) : 0;
  const scaledLoaves = baseYield ? Math.max(1, Math.round(scaledGrams / 1100)) : 0;
  const plural = unit === "loaf" ? "loaves" : `${unit}s`;
  const single = unit === "loaf" ? "one large loaf" : `one ${unit}`;

  function toggle(index: number) {
    setWeighed((prev) => prev.map((v, i) => (i === index ? !v : v)));
  }

  return (
    <div className="print:hidden mb-10 rounded-2xl border border-blush/50 bg-cream-dark/60 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-espresso-muted">
            Scale &amp; weigh the formula
          </h2>
          <p className="text-xs text-espresso-muted mt-1">
            Recomputes every weight. Tap a row to check it off as you weigh.
          </p>
        </div>
        <div
          className="inline-flex rounded-full bg-white p-1 shadow-sm"
          role="group"
          aria-label="Recipe scale factor"
        >
          {PRESETS.map((p) => (
            <button
              key={p.factor}
              type="button"
              onClick={() => setFactor(p.factor)}
              aria-pressed={factor === p.factor}
              className={
                "px-3 py-1.5 text-sm font-semibold rounded-full transition-colors " +
                (factor === p.factor
                  ? "bg-terracotta text-cream"
                  : "text-espresso-muted hover:text-espresso")
              }
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-espresso-muted border-b border-blush/40">
            <th className="w-8 py-2">
              <span className="sr-only">Weighed</span>
            </th>
            <th className="py-2 pr-4 font-semibold">Ingredient</th>
            <th className="py-2 pr-4 font-semibold text-right">
              Weight{factor !== 1 && <span className="text-terracotta"> ({fmt(factor)}×)</span>}
            </th>
            {hasPct && <th className="py-2 font-semibold text-right">Baker&apos;s %</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const done = weighed[i];
            return (
              <tr
                key={i}
                className={
                  "border-b border-blush/20 last:border-0 transition-colors " +
                  (done ? "text-espresso-muted/60" : "")
                }
              >
                <td className="py-2 align-middle">
                  <input
                    type="checkbox"
                    checked={done}
                    onChange={() => toggle(i)}
                    aria-label={`Mark ${row.ingredient} as weighed`}
                    className="h-4 w-4 cursor-pointer accent-terracotta align-middle"
                  />
                </td>
                <td
                  onClick={() => toggle(i)}
                  className={
                    "py-2 pr-4 cursor-pointer select-none text-espresso/80 " +
                    (done ? "line-through" : "")
                  }
                >
                  {row.ingredient}
                </td>
                <td
                  onClick={() => toggle(i)}
                  className={
                    "py-2 pr-4 text-right font-medium text-espresso tabular-nums cursor-pointer select-none " +
                    (done ? "line-through" : "")
                  }
                >
                  {scaleWeight(row.weight, factor)}
                </td>
                {hasPct && (
                  <td
                    onClick={() => toggle(i)}
                    className="py-2 text-right text-espresso-muted tabular-nums cursor-pointer select-none"
                  >
                    {row.bakersPct}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
        {baseYield && (
          <tfoot>
            <tr className="border-t-2 border-blush/40 text-espresso">
              <td />
              <td className="py-2 pr-4 align-top">
                <span className="font-semibold">Total dough</span>
                <span className="block text-xs font-normal text-espresso-muted">
                  {scaledLoaves === 1
                    ? `About ${single}`
                    : `About ${scaledLoaves} ${plural}`}
                </span>
              </td>
              <td className="py-2 pr-4 text-right font-semibold tabular-nums align-top">
                &asymp; {scaledGrams.toLocaleString("en-US")} g
              </td>
              {hasPct && <td />}
            </tr>
          </tfoot>
        )}
      </table>

      <div className="mt-4 flex items-center justify-between gap-3 text-xs text-espresso-muted">
        <span aria-live="polite">
          {doneCount} of {rows.length} weighed
        </span>
        {doneCount > 0 && (
          <button
            type="button"
            onClick={() => setWeighed(rows.map(() => false))}
            className="font-semibold text-terracotta hover:text-terracotta-dark transition-colors"
          >
            Reset checklist
          </button>
        )}
      </div>
    </div>
  );
}
