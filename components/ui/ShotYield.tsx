import { shotYield } from "@/lib/utils";

interface ShotYieldProps {
  /** This drink's espresso dose in grams, from frontmatter (optional). */
  dose?: number;
  /** The "1:N" brew-ratio string from frontmatter. */
  brewRatio: string;
}

/**
 * A derived at-a-glance shot spec for a coffee recipe: grams of ground coffee
 * in and the target beverage weight out, computed from the dose and brew ratio
 * (see shotYield). The page already carries an interactive BrewCalculator, but
 * that's client-only and hidden in print; this static stat gives the canonical
 * in/out weights in the scannable spec sidebar, matching the derived Yield stat
 * on bread pages. Renders nothing when the dose or ratio is unusable.
 */
export default function ShotYield({ dose, brewRatio }: ShotYieldProps) {
  const y = shotYield(dose, brewRatio);
  if (!y) return null;

  return (
    <div className="stat-card flex-col items-stretch gap-1">
      <span className="stat-label">Dose &amp; yield</span>
      <span className="stat-value text-base tabular-nums">
        {y.doseIn}&nbsp;g &rarr; {y.yieldOut}&nbsp;g
      </span>
      <span className="text-xs text-espresso-muted leading-snug">
        Ground coffee in, espresso out on the {brewRatio} ratio.
      </span>
    </div>
  );
}
