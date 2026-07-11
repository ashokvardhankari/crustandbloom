"use client";

import { useState } from "react";

interface BrewCalculatorProps {
  /** Ratio string from frontmatter, e.g. "1:2" or "1:2.5". */
  brewRatio: string;
  /** This drink's espresso dose in grams (the recipe's starting point). */
  dose: number;
}

const MIN_DOSE = 12;
const MAX_DOSE = 30;
const STEP = 0.5;

/** Parse the yield multiplier out of a "1:N" ratio string. Returns null if unparseable. */
function parseRatio(brewRatio: string): number | null {
  const parts = brewRatio.split(":");
  if (parts.length !== 2) return null;
  const out = Number(parts[1]);
  return Number.isFinite(out) && out > 0 ? out : null;
}

/** Format grams: up to 1 decimal, no trailing ".0" ("42", "45.5"). */
function fmt(n: number): string {
  return String(Math.round(n * 10) / 10);
}

/**
 * Interactive espresso brew calculator for a coffee detail page. Espresso is a
 * ratio-driven recipe: the shot's target yield is the dose times the brew ratio.
 * Baristas routinely dial the dose to their basket or bean, so this recomputes
 * the target output weight live while keeping the drink's ratio fixed — the
 * coffee analogue of the bread formula scaler. The static brew specs and body
 * still carry the canonical numbers below for printing, no-JS, and SEO; this is
 * a client-side convenience on top, so it hides on unparseable ratios.
 */
export default function BrewCalculator({ brewRatio, dose }: BrewCalculatorProps) {
  const ratio = parseRatio(brewRatio);
  const [current, setCurrent] = useState(dose);

  if (ratio === null) return null;

  const clamp = (n: number) => Math.min(MAX_DOSE, Math.max(MIN_DOSE, Math.round(n * 2) / 2));
  const yieldOut = current * ratio;
  const changed = current !== dose;

  return (
    <div className="print:hidden mb-10 rounded-2xl border border-blush/50 bg-cream-dark/60 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-espresso-muted">
            Dial in your shot
          </h2>
          <p className="text-xs text-espresso-muted mt-1">
            Target yield stays on the {brewRatio} ratio as you change the dose.
          </p>
        </div>
        {changed && (
          <button
            type="button"
            onClick={() => setCurrent(dose)}
            className="text-xs font-semibold text-terracotta hover:text-espresso transition-colors"
          >
            Reset to {fmt(dose)}g
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-end gap-6">
        <div>
          <label
            htmlFor="brew-dose"
            className="block text-xs font-semibold uppercase tracking-widest text-espresso-muted mb-2"
          >
            Dose in
          </label>
          <div className="inline-flex items-center rounded-full bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setCurrent((d) => clamp(d - STEP))}
              disabled={current <= MIN_DOSE}
              aria-label="Decrease dose"
              className="w-9 h-9 rounded-full text-lg font-semibold text-espresso-muted hover:text-espresso disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              −
            </button>
            <span className="min-w-[5rem] text-center text-xl font-semibold text-espresso tabular-nums">
              {fmt(current)}g
            </span>
            <button
              type="button"
              onClick={() => setCurrent((d) => clamp(d + STEP))}
              disabled={current >= MAX_DOSE}
              aria-label="Increase dose"
              className="w-9 h-9 rounded-full text-lg font-semibold text-espresso-muted hover:text-espresso disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              +
            </button>
          </div>
        </div>

        <div className="text-terracotta text-2xl font-light pb-1.5" aria-hidden="true">
          →
        </div>

        <div>
          <span className="block text-xs font-semibold uppercase tracking-widest text-espresso-muted mb-2">
            Target yield
          </span>
          <span className="text-3xl font-semibold text-espresso tabular-nums" aria-live="polite">
            {fmt(yieldOut)}g
          </span>
        </div>
      </div>
    </div>
  );
}
