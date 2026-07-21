import { cn } from "@/lib/utils";

interface BrewRatioMeterProps {
  /** Brew ratio as written in frontmatter, e.g. "1:2", "1:2.5", "1:16". */
  ratio: string;
  /** Show the "Concentrated … Diluted" end labels under the track. Defaults to true. */
  showScale?: boolean;
  className?: string;
}

/**
 * A brew ratio is written as coffee : yield, so the number after the colon is
 * how many parts of liquid come off one part of grounds. That single figure is
 * the yield we place on the strength spectrum.
 */
function parseYield(ratio: string): number | null {
  const parts = ratio.split(":");
  if (parts.length !== 2) return null;
  const y = parseFloat(parts[1]);
  return Number.isFinite(y) ? y : null;
}

// Espresso pulls and filter brews live on completely different number lines
// (1:1–1:4 vs 1:14–1:18), so pick the regime from the yield itself — nothing
// real sits in the gap between them — and give each its own track range.
type Regime = { min: number; max: number };
function regimeFor(y: number): Regime {
  return y < 6 ? { min: 1, max: 3.5 } : { min: 13, max: 19 };
}

/**
 * Plain-language read on what a given ratio tastes like, so a beginner knows
 * whether "1:2.5" is strong or weak without pulling a shot first. Returns null
 * for anything it can't parse so the caller can skip the whole block.
 */
export function brewRatioDescriptor(ratio: string): string | null {
  const y = parseYield(ratio);
  if (y === null) return null;
  if (y < 6) {
    if (y < 1.5) return "Ristretto — short and syrupy, intense concentration";
    if (y < 2.3) return "Standard espresso — balanced strength and body";
    return "Lungo — longer pull, lighter and more extracted";
  }
  if (y < 15) return "Strong brew — bold, heavier body";
  if (y < 17) return "Balanced brew — even strength and clarity";
  return "Light brew — delicate and tea-like";
}

/**
 * A continuous scale that places a coffee on the concentrated → diluted
 * strength spectrum. A marker rides a dark-crema-to-pale gradient track at the
 * brew's position, with end labels and a short descriptor so the ratio reads at
 * a glance. Purely presentational and server-renderable (no client state).
 * Renders nothing when the ratio string can't be parsed.
 */
export default function BrewRatioMeter({
  ratio,
  showScale = true,
  className,
}: BrewRatioMeterProps) {
  const y = parseYield(ratio);
  if (y === null) return null;

  const { min, max } = regimeFor(y);
  const clamped = Math.min(max, Math.max(min, y));
  const position = ((clamped - min) / (max - min)) * 100;
  const descriptor = brewRatioDescriptor(ratio);

  return (
    <span className={cn("inline-flex flex-col gap-1.5", className)}>
      <span className="relative block h-2.5 w-full" aria-hidden="true">
        {/* Dark crema (concentrated) → pale coffee (diluted) gradient track */}
        <span
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, #3B2416 0%, #6F4A2E 45%, #A9885F 75%, #D8C3A5 100%)",
          }}
        />
        {/* The brew's position along the track */}
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
          <span>Concentrated</span>
          <span>Diluted</span>
        </span>
      )}
      <span className="sr-only">
        Brew ratio {ratio}
        {descriptor ? ` — ${descriptor}` : ""}
      </span>
    </span>
  );
}
