"use client";

import { useState } from "react";
import type { FormulaRow } from "@/lib/content";

interface RecipeScalerProps {
  rows: FormulaRow[];
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
 * Interactive batch scaler for a bread formula. Bakers routinely scale a recipe
 * up (two loaves for the week) or down (a small test bake); this recomputes
 * every weight on the fly while the baker's percentages — which are invariant
 * under scaling — stay fixed. The MDX body still renders the static 1× table
 * below for printing, no-JS, and SEO; this is a client-side convenience on top.
 */
export default function RecipeScaler({ rows }: RecipeScalerProps) {
  const [factor, setFactor] = useState(1);
  const hasPct = rows.some((r) => r.bakersPct);

  return (
    <div className="print:hidden mb-10 rounded-2xl border border-blush/50 bg-cream-dark/60 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-espresso-muted">
            Scale the formula
          </h2>
          <p className="text-xs text-espresso-muted mt-1">
            Recomputes every weight. Baker&apos;s percentages stay the same.
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
            <th className="py-2 pr-4 font-semibold">Ingredient</th>
            <th className="py-2 pr-4 font-semibold text-right">
              Weight{factor !== 1 && <span className="text-terracotta"> ({fmt(factor)}×)</span>}
            </th>
            {hasPct && <th className="py-2 font-semibold text-right">Baker&apos;s %</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-blush/20 last:border-0">
              <td className="py-2 pr-4 text-espresso/80">{row.ingredient}</td>
              <td className="py-2 pr-4 text-right font-medium text-espresso tabular-nums">
                {scaleWeight(row.weight, factor)}
              </td>
              {hasPct && (
                <td className="py-2 text-right text-espresso-muted tabular-nums">{row.bakersPct}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
