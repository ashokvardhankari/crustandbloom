import { cn } from "@/lib/utils";

interface HydrationMeterProps {
  /** Dough hydration as a whole-number percentage (e.g. 75). */
  hydration: number;
  /** Show the "Stiff … Slack" end labels under the track. Defaults to true. */
  showScale?: boolean;
  className?: string;
}

// The practical sourdough window this site bakes in. A loaf below MIN or above
// MAX just pins to the nearest end of the track rather than running off it.
const MIN = 55;
const MAX = 90;

/**
 * Plain-language read on what a given hydration feels like to bake, so a
 * beginner knows whether "76%" is stiff or slack without having to bake first.
 */
export function hydrationDescriptor(h: number): string {
  if (h < 68) return "Stiffer dough — easier to handle, tighter crumb";
  if (h < 76) return "Balanced hydration — workable dough, open crumb";
  if (h < 83) return "Wetter dough — slacker to shape, airy open crumb";
  return "High hydration — very slack, wide-open crumb";
}

/**
 * A continuous scale that places a loaf on the stiff → slack hydration spectrum.
 * A marker rides a wheat-to-water gradient track at the dough's position, with
 * end labels and a short descriptor so the number reads at a glance. Purely
 * presentational and server-renderable (no client state).
 */
export default function HydrationMeter({
  hydration,
  showScale = true,
  className,
}: HydrationMeterProps) {
  const clamped = Math.min(MAX, Math.max(MIN, hydration));
  const position = ((clamped - MIN) / (MAX - MIN)) * 100;

  return (
    <span className={cn("inline-flex flex-col gap-1.5", className)}>
      <span className="relative block h-2.5 w-full" aria-hidden="true">
        {/* Wheat (dry, stiff) → water (wet, slack) gradient track */}
        <span
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, #D8B98A 0%, #C9B78E 40%, #9FC3B4 75%, #7CA9C4 100%)",
          }}
        />
        {/* The loaf's position along the track */}
        <span
          className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cream bg-espresso"
          style={{
            left: `${position}%`,
            boxShadow: "0 0 0 2px rgba(59, 36, 22, 0.35)",
          }}
        />
      </span>
      {showScale && (
        <span className="flex justify-between text-[10px] uppercase tracking-widest text-espresso-muted">
          <span>Stiff</span>
          <span>Slack</span>
        </span>
      )}
      <span className="sr-only">
        {hydration}% hydration — {hydrationDescriptor(hydration)}
      </span>
    </span>
  );
}
