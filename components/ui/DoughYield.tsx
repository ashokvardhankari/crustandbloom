import type { FormulaRow } from "@/lib/content";
import { doughYield } from "@/lib/utils";

interface DoughYieldProps {
  /** The parsed formula table, or null when the loaf has none. */
  rows: FormulaRow[] | null;
}

/**
 * A derived yield estimate for a bread recipe: the total dough weight on the
 * bench and roughly how many loaves it makes, summed from the formula's gram
 * weights (see doughYield — tsp/tbsp aromatics and surface coatings are left
 * out). Gives bakers a quick sense of banneton size and batch before they read
 * the table. Renders nothing when the formula has no weighable rows.
 */
export default function DoughYield({ rows }: DoughYieldProps) {
  if (!rows) return null;
  const y = doughYield(rows);
  if (!y) return null;

  const grams = y.grams.toLocaleString("en-US");
  return (
    <div className="stat-card flex-col items-stretch gap-1">
      <span className="stat-label">Yield</span>
      <span className="stat-value text-base">&asymp; {grams}&nbsp;g dough</span>
      <span className="text-xs text-espresso-muted leading-snug">
        {y.loaves === 1
          ? "About one large loaf"
          : `Enough for about ${y.loaves} loaves`}{" "}
        &middot; flour, water, starter &amp; weighed inclusions
      </span>
    </div>
  );
}
