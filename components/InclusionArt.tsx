import { memo } from "react";

/**
 * Decorative, deterministic "cover art" for an inclusion idea that has no real
 * photo yet. Each loaf gets a warm, flavor-keyed gradient scene with a seed
 * scatter and an elegant line-art bakery motif. Everything (palette variation,
 * motif choice, speckle positions) is derived from the loaf name, so a given
 * loaf always renders the same artwork and no two cards look identical.
 *
 * Drop a real photo onto an idea by setting `image` — the card swaps this
 * artwork for the photograph automatically.
 */

export type FlavorProfile = "savory" | "sweet" | "spicy";

// ── Flavor palettes (warm, bread-realistic — sits happily on the cream page) ──
const PALETTES: Record<
  FlavorProfile,
  { from: string; via: string; to: string; ink: string; glow: string }
> = {
  savory: {
    from: "#EBD8A6",
    via: "#D9BC76",
    to: "#B98A3E",
    ink: "#5A3E16",
    glow: "#F5E9C2",
  },
  sweet: {
    from: "#E9CDB7",
    via: "#D3A886",
    to: "#A86F4E",
    ink: "#5A2E1E",
    glow: "#F3DECB",
  },
  spicy: {
    from: "#EFC59D",
    via: "#DC8C55",
    to: "#B5542A",
    ink: "#6E2A12",
    glow: "#F7D6AC",
  },
};

/** Small, stable string hash → non-negative int. */
function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Deterministic flour/seed speckles from a seed. */
function speckles(seed: number, count: number) {
  const out: { x: number; y: number; r: number }[] = [];
  let s = seed || 1;
  const rnd = () => {
    // xorshift — cheap deterministic PRNG
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 1000) / 1000;
  };
  for (let i = 0; i < count; i++) {
    out.push({
      x: 12 + rnd() * 376,
      y: 12 + rnd() * 176,
      r: 0.8 + rnd() * 2.2,
    });
  }
  return out;
}

// ── Line-art bakery motifs (tonal watermark in the corner) ───────────────────
function Motif({ variant, color }: { variant: number; color: string }) {
  const common = {
    fill: "none",
    stroke: color,
    strokeWidth: 2.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (variant === 0) {
    // Wheat sheaf
    return (
      <g {...common} opacity={0.9}>
        <path d="M50 96 L50 20" />
        <path d="M50 30 Q34 26 30 12 Q46 14 50 30" />
        <path d="M50 30 Q66 26 70 12 Q54 14 50 30" />
        <path d="M50 46 Q34 42 30 28 Q46 30 50 46" />
        <path d="M50 46 Q66 42 70 28 Q54 30 50 46" />
        <path d="M50 62 Q34 58 30 44 Q46 46 50 62" />
        <path d="M50 62 Q66 58 70 44 Q54 46 50 62" />
        <path d="M50 78 Q40 76 36 66" />
        <path d="M50 78 Q60 76 64 66" />
      </g>
    );
  }
  if (variant === 1) {
    // Scored boule
    return (
      <g {...common} opacity={0.9}>
        <circle cx="50" cy="52" r="40" />
        <path d="M24 42 Q50 30 76 46" />
        <path d="M28 58 Q50 48 72 62" />
        <path d="M34 72 Q50 66 66 74" />
      </g>
    );
  }
  // Batard with slashes
  return (
    <g {...common} opacity={0.9}>
      <ellipse cx="50" cy="52" rx="44" ry="22" />
      <path d="M30 50 L40 40" />
      <path d="M42 54 L52 44" />
      <path d="M54 54 L64 44" />
    </g>
  );
}

export const InclusionArt = memo(function InclusionArt({
  name,
  flavorProfile,
}: {
  name: string;
  flavorProfile: FlavorProfile;
}) {
  const p = PALETTES[flavorProfile];
  const seed = hash(name);
  const uid = `ia${seed.toString(36)}`;
  const motif = seed % 3;
  const dots = speckles(seed, 26);

  return (
    <svg
      viewBox="0 0 400 200"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${uid}g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={p.from} />
          <stop offset="55%" stopColor={p.via} />
          <stop offset="100%" stopColor={p.to} />
        </linearGradient>
        <radialGradient id={`${uid}glow`} cx="78%" cy="22%" r="70%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.85" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="200" fill={`url(#${uid}g)`} />
      <rect width="400" height="200" fill={`url(#${uid}glow)`} />

      {/* flour / seed scatter */}
      <g fill={p.ink} opacity="0.16">
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} />
        ))}
      </g>

      {/* corner motif watermark */}
      <g
        transform="translate(268 40) scale(1.35)"
        opacity="0.20"
        style={{ color: p.ink }}
      >
        <Motif variant={motif} color={p.ink} />
      </g>
    </svg>
  );
});

// ── Flavor badge icon (SVG, not emoji) ───────────────────────────────────────
export function FlavorIcon({
  flavor,
  className = "h-3.5 w-3.5",
}: {
  flavor: FlavorProfile;
  className?: string;
}) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (flavor === "spicy") {
    // Chili pepper
    return (
      <svg {...common}>
        <path d="M4 15c5 4 12 2 14-4" />
        <path d="M18 11c1-3 0-5-1-6" />
        <path d="M17 5c1-1 2-1 3 0" />
      </svg>
    );
  }
  if (flavor === "sweet") {
    // Honey drop
    return (
      <svg {...common}>
        <path d="M12 3c3 4 5 6.5 5 9a5 5 0 1 1-10 0c0-2.5 2-5 5-9Z" />
      </svg>
    );
  }
  // savory — herb sprig / leaf
  return (
    <svg {...common}>
      <path d="M12 20V8" />
      <path d="M12 12c-3 0-5-2-5-5 3 0 5 2 5 5Z" />
      <path d="M12 10c3 0 5-2 5-5-3 0-5 2-5 5Z" />
    </svg>
  );
}

// ── Ingredient parsing ───────────────────────────────────────────────────────
export type ParsedIngredient = { name: string; prep: string; weight: string };

const WEIGHT_RE = /^[\d¼½¾.\s]+\s?(g|kg|ml|l|tbsp|tsp|cup|cups|clove|cloves|oz|pinch|each)\b/i;

/**
 * Splits "Ingredient, prep note, weight" into its parts. The weight is the last
 * comma-segment when it looks like a measurement; the prep note is everything
 * between the ingredient name and the weight (commas inside prep are rejoined).
 */
export function parseIngredient(raw: string): ParsedIngredient {
  const parts = raw.split(",").map((s) => s.trim());
  const name = parts[0] ?? raw;
  if (parts.length === 1) return { name, prep: "", weight: "" };

  const last = parts[parts.length - 1];
  const hasWeight = WEIGHT_RE.test(last);
  const weight = hasWeight ? last : "";
  const prep = parts.slice(1, hasWeight ? -1 : undefined).join(", ");
  return { name, prep, weight };
}
