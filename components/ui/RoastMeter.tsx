import { cn, roastLabel } from "@/lib/utils";
import type { RoastLevel } from "@/lib/types";

interface RoastMeterProps {
  level: RoastLevel;
  /** Show "Light … Dark" end labels under the strip. Defaults to true. */
  showScale?: boolean;
  className?: string;
}

// The five roast steps, light → dark, each with the roasted-bean tone it sits at.
// Order matters: the index is the bean's position on the spectrum.
const STEPS: { level: RoastLevel; color: string }[] = [
  { level: "light", color: "#C8A579" },
  { level: "medium-light", color: "#A87B4E" },
  { level: "medium", color: "#855C36" },
  { level: "medium-dark", color: "#5E3E24" },
  { level: "dark", color: "#3B2416" },
];

/**
 * A five-segment scale that places a bean on the light → dark roast spectrum.
 * Each segment carries its own roasted tone; the bean's level is filled and
 * ringed while the rest sit muted, so the roast reads at a glance. Purely
 * presentational and server-renderable (no client state).
 */
export default function RoastMeter({ level, showScale = true, className }: RoastMeterProps) {
  const activeIndex = STEPS.findIndex((s) => s.level === level);

  return (
    <span className={cn("inline-flex flex-col gap-1", className)}>
      <span className="inline-flex items-center gap-1" aria-hidden="true">
        {STEPS.map((step, i) => {
          const active = i === activeIndex;
          const reached = i <= activeIndex;
          return (
            <span
              key={step.level}
              className={cn(
                "block h-2.5 rounded-full transition-all",
                active ? "w-7" : "w-4",
              )}
              style={{
                backgroundColor: step.color,
                opacity: reached ? 1 : 0.3,
                boxShadow: active ? `0 0 0 2px rgba(59, 36, 22, 0.35)` : undefined,
              }}
            />
          );
        })}
      </span>
      {showScale && (
        <span className="flex justify-between text-[10px] uppercase tracking-widest text-espresso-muted">
          <span>Light</span>
          <span>Dark</span>
        </span>
      )}
      <span className="sr-only">
        {roastLabel(level)} roast — level {activeIndex + 1} of {STEPS.length}
      </span>
    </span>
  );
}
