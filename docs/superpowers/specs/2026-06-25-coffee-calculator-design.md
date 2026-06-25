# Coffee Calculator — Design Spec

## Overview

A coffee calculator at `/tools/coffee-calculator` with three tabbed calculators: Brew Ratio, Drink Builder, and Extraction Yield. Lives alongside the existing baking calculator under `/tools`.

## Page structure

- **Route:** `app/tools/coffee-calculator/page.tsx` (server component)
- **Client component:** `components/tools/CoffeeCalculator.tsx` ("use client")
- **Preset data:** `lib/coffee-presets.ts` (drink recipes, standard ratios, types)
- **Tools index:** `app/tools/page.tsx` (server component, links to both calculators)
- **Nav update:** Change the existing "Tools" nav link `href` from `/tools/baking-calculator` to `/tools` in `components/layout/Navigation.tsx`

The page header follows the same pattern as the baking calculator: uppercase terracotta label, bold espresso heading, description, amber divider.

## Tab bar

Three pill-style tabs matching the baking calculator preset pills: **Brew Ratio**, **Drink Builder**, **Extraction Yield**. "Brew Ratio" selected by default. Switching is instant with no animation — swaps the panel content via React state.

## Tab 1: Brew Ratio

Two inputs and one calculated output.

**Inputs:**
- **Dose (g)** — number input, default `18`
- **Ratio** — pill selector with presets: `1:1`, `1:1.5`, `1:2`, `1:2.5`, `1:3`, plus a `Custom` option. When Custom is selected, a text input appears for the user to type their own ratio (e.g. `1:15`). Default: `1:2`

**Output:**
- **Yield (g)** — calculated as `dose × ratio_multiplier`, displayed prominently in large bold text (e.g. "36g")

Below the output, a helper note: "1:1 ristretto · 1:2 espresso · 1:2.5 lungo · 1:15 pour-over"

All values update instantly on input change. No submit button.

## Tab 2: Drink Builder

### Drink type selector

Pill buttons for each drink. Standard drinks and custom recipes are in one row (wrapping on mobile). Custom recipes are distinguished with a "My recipe" badge (small terracotta text below the pill label).

**Standard drinks:**

| Drink | Dose | Ratio | Yield | Milk (ml) | Milk Temp | Water (ml) | Notes |
|---|---|---|---|---|---|---|---|
| Espresso | 18g | 1:2 | 36g | — | — | — | |
| Macchiato | 18g | 1:2 | 36g | 30 | 60°C | — | Dollop of foam |
| Cortado | 18g | 1:2 | 36g | 60 | 60°C | — | Equal parts |
| Flat White | 18g | 1:2 | 36g | 150 | 62°C | — | Microfoam, no dry foam |
| Cappuccino | 18g | 1:2 | 36g | 120 | 65°C | — | Equal thirds |
| Latte | 18g | 1:2 | 36g | 240 | 65°C | — | Milk-forward |
| Americano | 18g | 1:2 | 36g | — | — | 180 | Espresso + hot water |

**Custom recipes (marked "My recipe"):**

| Drink | Dose | Ratio | Yield | Milk (ml) | Milk Temp | Notes |
|---|---|---|---|---|---|---|
| My Cappuccino | 21g | 1:2 | 42g | 180 | 60°C | Counter Culture Forty-Six, wet cap style |
| My Honey Lavender Latte | 18g | 1:2.5 | 45g | 240 | 62°C | Oat milk, lavender syrup + honey |

### Recipe card

When a drink is selected, a card shows all values as editable inputs:

- **Dose (g)** — number input, defaults to preset
- **Ratio** — number input showing the multiplier (e.g. `2`), defaults to preset
- **Yield (g)** — auto-calculated from `dose × ratio`, read-only display
- **Milk volume (ml)** — number input, defaults to preset. Hidden for Espresso. For Americano, this field shows as "Water (ml)" instead.
- **Milk temp (°C)** — number input, defaults to preset. Hidden for Espresso and Americano.
- **Total drink volume** — auto-calculated: `yield + milk volume` (or `yield + water` for Americano). Read-only display.

Below the inputs, a **proportion bar** — a simple horizontal bar showing the visual ratio of espresso (terracotta) to milk (cream/blush) to foam (white, if applicable). For Americano, shows espresso to water. The bar updates as values change.

**Behavior:** Editing any value updates outputs instantly. Selecting a new drink resets all values to that preset's defaults.

### Custom recipe notes

Each custom recipe includes a one-line `note` field displayed below the proportion bar (e.g. "Counter Culture Forty-Six, wet cap style").

## Tab 3: Extraction Yield

### Mode toggle

Two-option toggle (matching the baking calculator direction toggle style): **Quick Estimate** / **With Refractometer**. "Quick Estimate" selected by default.

### Quick Estimate mode

**Inputs:**
- **Dose (g)** — number input, default `18`
- **Beverage weight (g)** — number input, default `36`
- **TDS** — displayed as `1.35%` (non-editable), with a note: "Typical TDS for well-extracted espresso"

**Output:**
- **Extraction yield %** — calculated as `(beverage_weight × (TDS / 100)) / dose × 100`

### With Refractometer mode

**Inputs:**
- **Dose (g)** — number input, default `18`
- **Beverage weight (g)** — number input, default `36`
- **TDS %** — number input, default `1.35`, step `0.01`

**Output:**
- **Extraction yield %** — same formula as above

### Yield range bar

Below the yield result, a horizontal color-coded bar showing where the value falls:

| Range | Color | Label |
|---|---|---|
| < 18% | `peach` (warm amber) | Under-extracted |
| 18–22% | `sage` (green) | Ideal |
| > 22% | `terracotta` (dark) | Over-extracted |

A marker or dot on the bar indicates the current yield value's position.

### Dynamic tip

A one-line tip below the bar that changes based on the range:
- Under-extracted: "Try grinding finer or increasing brew time"
- Ideal: "Right in the sweet spot"
- Over-extracted: "Try grinding coarser or shortening brew time"

## Types (in `lib/coffee-presets.ts`)

```ts
interface CoffeeRatioPreset {
  label: string;     // e.g. "1:2"
  multiplier: number; // e.g. 2
}

interface DrinkPreset {
  name: string;
  slug: string;
  isCustom: boolean;
  dose: number;
  ratioMultiplier: number;
  milkMl: number | null;    // null for espresso
  waterMl: number | null;   // null unless americano
  milkTempC: number | null; // null for espresso/americano
  note?: string;            // only for custom recipes
}
```

## Styling

- Follow existing site conventions: `cream` backgrounds, `espresso` text, `terracotta` accents, `blush` borders
- Use `cn()` from `lib/utils.ts` for conditional classes
- Number inputs styled with `rounded-full border border-blush bg-white` matching the baking calculator's datetime input
- Tab pills match the baking calculator preset pills
- The proportion bar uses inline width percentages with Tailwind background colors
- Responsive: inputs stack vertically on mobile, proportion bar remains full-width

## Files to create

1. `lib/coffee-presets.ts` — drink presets, ratio presets, types
2. `components/tools/CoffeeCalculator.tsx` — client component with three tabbed calculators
3. `app/tools/coffee-calculator/page.tsx` — server page
4. `app/tools/page.tsx` — tools index page linking to both calculators

## Files to modify

1. `components/layout/Navigation.tsx` — change Tools href from `/tools/baking-calculator` to `/tools`

## Out of scope

- Saving/bookmarking custom recipes
- Integration with coffee post data (potential future feature)
- Grind size recommendations
- Timer functionality
