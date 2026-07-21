import { beanValue } from "@/lib/utils";

interface CostPerCupProps {
  /** The bean's price string, e.g. "$18 / 12oz". */
  price?: string;
}

/**
 * A value estimate for a bean review: how much a cup costs and roughly how many
 * cups the bag yields, derived from the price + weight. Renders nothing when the
 * price can't be parsed into a dollar amount and an ounce weight.
 */
export default function CostPerCup({ price }: CostPerCupProps) {
  const value = beanValue(price);
  if (!value) return null;

  return (
    <div className="stat-card flex-col items-stretch gap-1">
      <span className="stat-label">Cost per cup</span>
      <span className="stat-value text-base">
        {value.approximate ? "~" : ""}
        {value.perCup}
      </span>
      <span className="text-xs text-espresso-muted leading-snug">
        ≈ {value.cups} cups per bag · based on an 18&nbsp;g dose
      </span>
    </div>
  );
}
