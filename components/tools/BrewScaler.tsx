"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface BrewScalerProps {
  /** Brew ratio as written in frontmatter, e.g. "1:2" or "1:2.5". */
  brewRatio: string;
}

/** Common espresso doses in grams. */
const DOSE_PRESETS = [16, 18, 20];
const DEFAULT_DOSE = 18;

/**
 * Parse a "1:x" brew ratio into its yield multiplier. Returns null when the
 * string isn't a recognizable ratio so the caller can skip rendering.
 */
function parseRatio(brewRatio: string): number | null {
  const parts = brewRatio.split(":");
  if (parts.length !== 2) return null;
  const dosePart = parseFloat(parts[0]);
  const yieldPart = parseFloat(parts[1]);
  if (!Number.isFinite(dosePart) || !Number.isFinite(yieldPart) || dosePart <= 0) {
    return null;
  }
  return yieldPart / dosePart;
}

/** Round to one decimal for a clean, weigh-able number. */
function grams(value: number): string {
  return `${Math.round(value * 10) / 10}g`;
}

/**
 * A live brew-ratio scaler, the espresso counterpart to the dough scaler on
 * bread pages. Seeded from the recipe's own ratio, it turns any dose into the
 * target liquid yield so a visitor can dial in their own basket.
 */
export default function BrewScaler({ brewRatio }: BrewScalerProps) {
  const multiplier = parseRatio(brewRatio);
  const [dose, setDose] = useState<number>(DEFAULT_DOSE);

  // Unparseable ratio → nothing sensible to scale; render nothing.
  if (multiplier === null) return null;

  const safeDose = Number.isFinite(dose) && dose > 0 ? dose : 0;
  const yieldG = safeDose * multiplier;

  return (
    <div className="stat-card no-print">
      <span className="stat-label mb-3">Scale this brew</span>

      {/* Dose presets */}
      <div className="flex gap-1.5 mb-3">
        {DOSE_PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => setDose(preset)}
            className={cn(
              "flex-1 text-xs font-semibold px-2 py-1.5 rounded-full transition-colors duration-200",
              dose === preset
                ? "bg-terracotta text-white"
                : "bg-blush/40 text-espresso hover:bg-blush/60"
            )}
          >
            {preset}g
          </button>
        ))}
      </div>

      {/* Custom dose input */}
      <label className="flex items-center gap-2 mb-4">
        <span className="text-xs text-espresso-muted whitespace-nowrap">Dose</span>
        <input
          type="number"
          min={0}
          step={0.5}
          value={Number.isFinite(dose) ? dose : ""}
          onChange={(e) => setDose(e.target.valueAsNumber)}
          aria-label="Coffee dose in grams"
          className="w-full px-3 py-1.5 rounded-full border border-blush bg-white text-espresso text-sm font-medium focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent"
        />
        <span className="text-xs text-espresso-muted">g</span>
      </label>

      {/* Scaled shot */}
      <dl className="space-y-1.5">
        <div className="flex items-baseline justify-between gap-2">
          <dt className="text-sm text-espresso/70">
            Dose
            <span className="ml-1.5 text-xs text-espresso-muted">in</span>
          </dt>
          <dd className="text-sm font-semibold text-espresso tabular-nums">
            {grams(safeDose)}
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-2 pt-1.5 mt-1.5 border-t border-blush/40">
          <dt className="text-sm font-semibold text-espresso">
            Yield
            <span className="ml-1.5 text-xs text-espresso-muted font-normal">
              {brewRatio}
            </span>
          </dt>
          <dd className="text-sm font-semibold text-terracotta tabular-nums">
            {grams(yieldG)}
          </dd>
        </div>
      </dl>
    </div>
  );
}
