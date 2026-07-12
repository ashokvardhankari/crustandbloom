"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface DoughCalculatorProps {
  /** Water as a percentage of total flour (baker's %). */
  hydration: number;
  /** Active starter as a percentage of total flour (baker's %). */
  starterPercentage: number;
  /** Salt as a percentage of total flour. Recipes here run 1.8–2%; 2% is the default. */
  saltPercentage?: number;
}

const FLOUR_PRESETS = [250, 500, 1000];
const DEFAULT_FLOUR = 500;

/** Round to the nearest gram for a clean, weigh-able number. */
function grams(value: number): string {
  return `${Math.round(value)}g`;
}

/**
 * A live baker's-percentage scaler. Every bread recipe on the site is built on
 * 500g of total flour, so at the default this reproduces the published formula
 * exactly; change the flour weight to scale the whole batch up or down.
 */
export default function DoughCalculator({
  hydration,
  starterPercentage,
  saltPercentage = 2,
}: DoughCalculatorProps) {
  const [flour, setFlour] = useState<number>(DEFAULT_FLOUR);

  const safeFlour = Number.isFinite(flour) && flour > 0 ? flour : 0;
  const water = safeFlour * (hydration / 100);
  const starter = safeFlour * (starterPercentage / 100);
  const salt = safeFlour * (saltPercentage / 100);
  const total = safeFlour + water + starter + salt;

  const rows = [
    { label: "Total flour", value: safeFlour, pct: "100%" },
    { label: "Water", value: water, pct: `${hydration}%` },
    { label: "Starter", value: starter, pct: `${starterPercentage}%` },
    { label: "Salt", value: salt, pct: `${saltPercentage}%` },
  ];

  return (
    <div className="stat-card no-print">
      <span className="stat-label mb-3">Scale this recipe</span>

      {/* Flour presets */}
      <div className="flex gap-1.5 mb-3">
        {FLOUR_PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => setFlour(preset)}
            className={cn(
              "flex-1 text-xs font-semibold px-2 py-1.5 rounded-full transition-colors duration-200",
              flour === preset
                ? "bg-terracotta text-white"
                : "bg-blush/40 text-espresso hover:bg-blush/60"
            )}
          >
            {preset}g
          </button>
        ))}
      </div>

      {/* Custom flour input */}
      <label className="flex items-center gap-2 mb-4">
        <span className="text-xs text-espresso-muted whitespace-nowrap">Flour</span>
        <input
          type="number"
          min={0}
          step={10}
          value={Number.isFinite(flour) ? flour : ""}
          onChange={(e) => setFlour(e.target.valueAsNumber)}
          aria-label="Total flour in grams"
          className="w-full px-3 py-1.5 rounded-full border border-blush bg-white text-espresso text-sm font-medium focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent"
        />
        <span className="text-xs text-espresso-muted">g</span>
      </label>

      {/* Scaled formula */}
      <dl className="space-y-1.5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-2">
            <dt className="text-sm text-espresso/70">
              {row.label}
              <span className="ml-1.5 text-xs text-espresso-muted">{row.pct}</span>
            </dt>
            <dd className="text-sm font-semibold text-espresso tabular-nums">
              {grams(row.value)}
            </dd>
          </div>
        ))}
        <div className="flex items-baseline justify-between gap-2 pt-1.5 mt-1.5 border-t border-blush/40">
          <dt className="text-sm font-semibold text-espresso">Total dough</dt>
          <dd className="text-sm font-semibold text-terracotta tabular-nums">
            {grams(total)}
          </dd>
        </div>
      </dl>
    </div>
  );
}
