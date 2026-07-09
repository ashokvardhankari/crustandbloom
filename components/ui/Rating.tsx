import { cn } from "@/lib/utils";

interface RatingProps {
  value: number; // 0–5
  showNumber?: boolean;
  className?: string;
}

const GOLD = "#C6A052"; // the emblem gold
const EMPTY = "#DED6C2";

function StarShape({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" fill={color} aria-hidden="true" className="block">
      <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.77l-5.2 2.73.99-5.79L1.58 7.62l5.82-.85L10 1.5z" />
    </svg>
  );
}

/** Five stars with half-step fill (via an overflow clip), plus the numeric value. */
export default function Rating({ value, showNumber = true, className }: RatingProps) {
  const clamped = Math.max(0, Math.min(5, value));
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="inline-flex gap-0.5">
        {[0, 1, 2, 3, 4].map((i) => {
          const fill = Math.max(0, Math.min(1, clamped - i));
          return (
            <span key={i} className="relative inline-block" style={{ width: 16, height: 16 }}>
              <StarShape color={EMPTY} />
              {fill > 0 && (
                <span
                  className="absolute top-0 left-0 overflow-hidden"
                  style={{ width: `${fill * 100}%`, height: 16 }}
                >
                  <StarShape color={GOLD} />
                </span>
              )}
            </span>
          );
        })}
      </span>
      {showNumber && (
        <span className="text-sm font-semibold text-espresso tabular-nums">{value.toFixed(1)}</span>
      )}
      <span className="sr-only">{value} out of 5</span>
    </span>
  );
}
