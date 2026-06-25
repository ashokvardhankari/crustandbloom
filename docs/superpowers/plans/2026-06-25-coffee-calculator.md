# Coffee Calculator Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a tabbed coffee calculator at `/tools/coffee-calculator` with Brew Ratio, Drink Builder, and Extraction Yield calculators, plus a tools index page.

**Architecture:** One server component page, one `"use client"` calculator component with three tab panels, a preset data file, and a tools index page. The nav link updates to point at the index. All calculations are pure client-side math — no API calls.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS (custom color tokens), `cn()` utility.

**Spec:** `docs/superpowers/specs/2026-06-25-coffee-calculator-design.md`

---

### Task 1: Create coffee preset data

**Files:**
- Create: `lib/coffee-presets.ts`

- [ ] **Step 1: Create the preset data file with types and all presets**

```ts
export interface CoffeeRatioPreset {
  label: string;
  multiplier: number;
}

export const RATIO_PRESETS: CoffeeRatioPreset[] = [
  { label: "1:1", multiplier: 1 },
  { label: "1:1.5", multiplier: 1.5 },
  { label: "1:2", multiplier: 2 },
  { label: "1:2.5", multiplier: 2.5 },
  { label: "1:3", multiplier: 3 },
];

export interface DrinkPreset {
  name: string;
  slug: string;
  isCustom: boolean;
  dose: number;
  ratioMultiplier: number;
  milkMl: number | null;
  waterMl: number | null;
  milkTempC: number | null;
  note?: string;
}

export const DRINK_PRESETS: DrinkPreset[] = [
  { name: "Espresso", slug: "espresso", isCustom: false, dose: 18, ratioMultiplier: 2, milkMl: null, waterMl: null, milkTempC: null },
  { name: "Macchiato", slug: "macchiato", isCustom: false, dose: 18, ratioMultiplier: 2, milkMl: 30, waterMl: null, milkTempC: 60, note: "Dollop of foam" },
  { name: "Cortado", slug: "cortado", isCustom: false, dose: 18, ratioMultiplier: 2, milkMl: 60, waterMl: null, milkTempC: 60, note: "Equal parts" },
  { name: "Flat White", slug: "flat-white", isCustom: false, dose: 18, ratioMultiplier: 2, milkMl: 150, waterMl: null, milkTempC: 62, note: "Microfoam, no dry foam" },
  { name: "Cappuccino", slug: "cappuccino", isCustom: false, dose: 18, ratioMultiplier: 2, milkMl: 120, waterMl: null, milkTempC: 65, note: "Equal thirds" },
  { name: "Latte", slug: "latte", isCustom: false, dose: 18, ratioMultiplier: 2, milkMl: 240, waterMl: null, milkTempC: 65, note: "Milk-forward" },
  { name: "Americano", slug: "americano", isCustom: false, dose: 18, ratioMultiplier: 2, milkMl: null, waterMl: 180, milkTempC: null, note: "Espresso + hot water" },
  { name: "My Cappuccino", slug: "my-cappuccino", isCustom: true, dose: 21, ratioMultiplier: 2, milkMl: 180, waterMl: null, milkTempC: 60, note: "Counter Culture Forty-Six, wet cap style" },
  { name: "My Honey Lavender Latte", slug: "my-honey-lavender", isCustom: true, dose: 18, ratioMultiplier: 2.5, milkMl: 240, waterMl: null, milkTempC: 62, note: "Oat milk, lavender syrup + honey" },
];
```

- [ ] **Step 2: Verify the file compiles**

Run: `npx tsc --noEmit`

Expected: No type errors.

- [ ] **Step 3: Commit**

```bash
git add lib/coffee-presets.ts
git commit -m "Add coffee preset data for calculator"
```

---

### Task 2: Create the CoffeeCalculator client component

**Files:**
- Create: `components/tools/CoffeeCalculator.tsx`

**References:**
- `lib/coffee-presets.ts` — preset data and types
- `lib/utils.ts` — `cn()` for conditional classes
- `components/tools/BakingCalculator.tsx` — styling patterns to follow

- [ ] **Step 1: Create the CoffeeCalculator component**

Create `components/tools/CoffeeCalculator.tsx` with the full component. The component manages these state pieces:

- `activeTab`: `"ratio" | "drinks" | "yield"` (default `"ratio"`)
- Brew Ratio tab: `dose` (number), `selectedRatio` (index into RATIO_PRESETS or `"custom"`), `customRatio` (string)
- Drink Builder tab: `selectedDrink` (index), `drinkDose`, `drinkRatio`, `drinkMilk`, `drinkWater`, `drinkTemp` (all reset when drink selection changes)
- Extraction Yield tab: `eyDose`, `eyBevWeight`, `eyTds`, `eyMode` (`"quick" | "refractometer"`)

```tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { RATIO_PRESETS, DRINK_PRESETS } from "@/lib/coffee-presets";
import type { DrinkPreset } from "@/lib/coffee-presets";

type Tab = "ratio" | "drinks" | "yield";

const TABS: { value: Tab; label: string }[] = [
  { value: "ratio", label: "Brew Ratio" },
  { value: "drinks", label: "Drink Builder" },
  { value: "yield", label: "Extraction Yield" },
];

const INPUT_CLASS =
  "w-24 px-4 py-2 rounded-full border border-blush bg-white text-espresso text-sm font-medium focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent text-center";

const PILL_ACTIVE = "bg-terracotta text-white";
const PILL_INACTIVE = "bg-blush/40 text-espresso hover:bg-blush/60";
const PILL_BASE = "text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full transition-colors duration-200";

function BrewRatioPanel() {
  const [dose, setDose] = useState(18);
  const [selectedIdx, setSelectedIdx] = useState<number | "custom">(2);
  const [customRatio, setCustomRatio] = useState("15");

  const multiplier =
    selectedIdx === "custom"
      ? parseFloat(customRatio) || 0
      : RATIO_PRESETS[selectedIdx].multiplier;
  const yieldG = Math.round(dose * multiplier * 10) / 10;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-espresso-muted">
            Dose (g)
          </label>
          <input
            type="number"
            value={dose}
            onChange={(e) => setDose(Number(e.target.value))}
            min={1}
            className={INPUT_CLASS}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-espresso-muted">
            Ratio
          </label>
          <div className="flex flex-wrap gap-2">
            {RATIO_PRESETS.map((r, i) => (
              <button
                key={r.label}
                onClick={() => setSelectedIdx(i)}
                className={cn(PILL_BASE, i === selectedIdx ? PILL_ACTIVE : PILL_INACTIVE)}
              >
                {r.label}
              </button>
            ))}
            <button
              onClick={() => setSelectedIdx("custom")}
              className={cn(PILL_BASE, selectedIdx === "custom" ? PILL_ACTIVE : PILL_INACTIVE)}
            >
              Custom
            </button>
          </div>
          {selectedIdx === "custom" && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-espresso-muted">1 :</span>
              <input
                type="number"
                value={customRatio}
                onChange={(e) => setCustomRatio(e.target.value)}
                min={0.1}
                step={0.1}
                className={cn(INPUT_CLASS, "w-20")}
              />
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-espresso-muted mb-2">
          Yield
        </p>
        <p className="text-5xl font-bold text-espresso">{yieldG}g</p>
      </div>

      <p className="text-xs text-espresso/40 text-center">
        1:1 ristretto · 1:2 espresso · 1:2.5 lungo · 1:15 pour-over
      </p>
    </div>
  );
}

function ProportionBar({ espresso, liquid, liquidLabel }: { espresso: number; liquid: number; liquidLabel: string }) {
  const total = espresso + liquid;
  if (total === 0) return null;
  const espressoPct = (espresso / total) * 100;
  const liquidPct = (liquid / total) * 100;

  return (
    <div className="space-y-2">
      <div className="flex h-4 rounded-full overflow-hidden">
        <div
          className="bg-terracotta transition-all duration-200"
          style={{ width: `${espressoPct}%` }}
        />
        <div
          className="bg-blush transition-all duration-200"
          style={{ width: `${liquidPct}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-espresso-muted">
        <span>Espresso {Math.round(espressoPct)}%</span>
        <span>{liquidLabel} {Math.round(liquidPct)}%</span>
      </div>
    </div>
  );
}

function DrinkBuilderPanel() {
  const [drinkIdx, setDrinkIdx] = useState(0);
  const preset = DRINK_PRESETS[drinkIdx];

  const [dose, setDose] = useState(preset.dose);
  const [ratio, setRatio] = useState(preset.ratioMultiplier);
  const [milkMl, setMilkMl] = useState(preset.milkMl ?? 0);
  const [waterMl, setWaterMl] = useState(preset.waterMl ?? 0);
  const [tempC, setTempC] = useState(preset.milkTempC ?? 0);

  function selectDrink(idx: number) {
    const p = DRINK_PRESETS[idx];
    setDrinkIdx(idx);
    setDose(p.dose);
    setRatio(p.ratioMultiplier);
    setMilkMl(p.milkMl ?? 0);
    setWaterMl(p.waterMl ?? 0);
    setTempC(p.milkTempC ?? 0);
  }

  const yieldG = Math.round(dose * ratio * 10) / 10;
  const isAmericano = preset.waterMl !== null;
  const isEspresso = preset.milkMl === null && preset.waterMl === null;
  const liquidMl = isAmericano ? waterMl : milkMl;
  const totalMl = Math.round((yieldG + liquidMl) * 10) / 10;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {DRINK_PRESETS.map((d, i) => (
          <button
            key={d.slug}
            onClick={() => selectDrink(i)}
            className={cn(
              "relative text-xs font-semibold px-4 pt-2 rounded-full transition-colors duration-200",
              d.isCustom ? "pb-5" : "pb-2",
              i === drinkIdx ? PILL_ACTIVE : PILL_INACTIVE
            )}
          >
            {d.name}
            {d.isCustom && (
              <span className={cn(
                "absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-medium whitespace-nowrap",
                i === drinkIdx ? "text-white/70" : "text-terracotta"
              )}>
                My recipe
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-widest text-espresso-muted">
              Dose (g)
            </label>
            <input
              type="number"
              value={dose}
              onChange={(e) => setDose(Number(e.target.value))}
              min={1}
              className={INPUT_CLASS}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-widest text-espresso-muted">
              Ratio (1:x)
            </label>
            <input
              type="number"
              value={ratio}
              onChange={(e) => setRatio(Number(e.target.value))}
              min={0.5}
              step={0.1}
              className={INPUT_CLASS}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-widest text-espresso-muted">
              Yield (g)
            </label>
            <p className="px-4 py-2 text-sm font-semibold text-espresso">{yieldG}g</p>
          </div>

          {!isEspresso && (
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-widest text-espresso-muted">
                {isAmericano ? "Water (ml)" : "Milk (ml)"}
              </label>
              <input
                type="number"
                value={isAmericano ? waterMl : milkMl}
                onChange={(e) =>
                  isAmericano
                    ? setWaterMl(Number(e.target.value))
                    : setMilkMl(Number(e.target.value))
                }
                min={0}
                className={INPUT_CLASS}
              />
            </div>
          )}

          {!isEspresso && !isAmericano && (
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-widest text-espresso-muted">
                Milk temp (°C)
              </label>
              <input
                type="number"
                value={tempC}
                onChange={(e) => setTempC(Number(e.target.value))}
                min={0}
                className={INPUT_CLASS}
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-widest text-espresso-muted">
              Total volume
            </label>
            <p className="px-4 py-2 text-sm font-semibold text-espresso">{totalMl}ml</p>
          </div>
        </div>

        {!isEspresso && (
          <ProportionBar
            espresso={yieldG}
            liquid={liquidMl}
            liquidLabel={isAmericano ? "Water" : "Milk"}
          />
        )}

        {preset.note && (
          <p className="text-xs text-espresso/50 italic">{preset.note}</p>
        )}
      </div>
    </div>
  );
}

function ExtractionYieldPanel() {
  const [mode, setMode] = useState<"quick" | "refractometer">("quick");
  const [dose, setDose] = useState(18);
  const [bevWeight, setBevWeight] = useState(36);
  const [tds, setTds] = useState(1.35);

  const activeTds = mode === "quick" ? 1.35 : tds;
  const extractionYield = dose > 0 ? (bevWeight * (activeTds / 100)) / dose * 100 : 0;
  const yieldRounded = Math.round(extractionYield * 100) / 100;

  let rangeLabel: string;
  let rangeColor: string;
  let tip: string;
  if (yieldRounded < 18) {
    rangeLabel = "Under-extracted";
    rangeColor = "text-peach";
    tip = "Try grinding finer or increasing brew time";
  } else if (yieldRounded <= 22) {
    rangeLabel = "Ideal";
    rangeColor = "text-sage";
    tip = "Right in the sweet spot";
  } else {
    rangeLabel = "Over-extracted";
    rangeColor = "text-terracotta";
    tip = "Try grinding coarser or shortening brew time";
  }

  const markerPct = Math.min(100, Math.max(0, ((yieldRounded - 14) / (26 - 14)) * 100));

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-widest text-espresso-muted">
          Mode
        </label>
        <div className="flex gap-2">
          {(
            [
              { value: "quick", label: "Quick Estimate" },
              { value: "refractometer", label: "With Refractometer" },
            ] as const
          ).map((opt) => (
            <button
              key={opt.value}
              onClick={() => setMode(opt.value)}
              className={cn(
                "text-sm font-semibold px-5 py-2.5 rounded-full whitespace-nowrap transition-colors duration-200",
                mode === opt.value ? PILL_ACTIVE : PILL_INACTIVE
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-espresso-muted">
            Dose (g)
          </label>
          <input
            type="number"
            value={dose}
            onChange={(e) => setDose(Number(e.target.value))}
            min={1}
            className={INPUT_CLASS}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-espresso-muted">
            Beverage weight (g)
          </label>
          <input
            type="number"
            value={bevWeight}
            onChange={(e) => setBevWeight(Number(e.target.value))}
            min={1}
            className={INPUT_CLASS}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-espresso-muted">
            TDS %
          </label>
          {mode === "quick" ? (
            <div>
              <p className="px-4 py-2 text-sm font-semibold text-espresso">1.35%</p>
              <p className="text-[10px] text-espresso/40 mt-1">Typical for well-extracted espresso</p>
            </div>
          ) : (
            <input
              type="number"
              value={tds}
              onChange={(e) => setTds(Number(e.target.value))}
              min={0}
              step={0.01}
              className={INPUT_CLASS}
            />
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 text-center space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-espresso-muted mb-2">
            Extraction Yield
          </p>
          <p className={cn("text-5xl font-bold", rangeColor)}>{yieldRounded}%</p>
          <p className={cn("text-sm font-semibold mt-1", rangeColor)}>{rangeLabel}</p>
        </div>

        <div className="space-y-2">
          <div className="relative h-3 rounded-full overflow-hidden flex">
            <div className="bg-peach/60" style={{ width: "33.3%" }} />
            <div className="bg-sage/60" style={{ width: "33.4%" }} />
            <div className="bg-terracotta/40" style={{ width: "33.3%" }} />
          </div>
          <div
            className="relative h-0"
            style={{ marginTop: "-18px" }}
          >
            <div
              className="absolute w-3 h-3 bg-espresso rounded-full border-2 border-cream -translate-x-1/2"
              style={{ left: `${markerPct}%`, top: "0px" }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-espresso/40 pt-2">
            <span>14%</span>
            <span>18%</span>
            <span>22%</span>
            <span>26%</span>
          </div>
        </div>

        <p className="text-sm text-espresso/60">{tip}</p>
      </div>
    </div>
  );
}

export default function CoffeeCalculator() {
  const [activeTab, setActiveTab] = useState<Tab>("ratio");

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              PILL_BASE,
              activeTab === tab.value ? PILL_ACTIVE : PILL_INACTIVE
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "ratio" && <BrewRatioPanel />}
      {activeTab === "drinks" && <DrinkBuilderPanel />}
      {activeTab === "yield" && <ExtractionYieldPanel />}
    </div>
  );
}
```

- [ ] **Step 2: Verify the file compiles**

Run: `npx tsc --noEmit`

Expected: No type errors.

- [ ] **Step 3: Commit**

```bash
git add components/tools/CoffeeCalculator.tsx
git commit -m "Add CoffeeCalculator client component with three tabbed calculators"
```

---

### Task 3: Create the page route, tools index, and update navigation

**Files:**
- Create: `app/tools/coffee-calculator/page.tsx`
- Create: `app/tools/page.tsx`
- Modify: `components/layout/Navigation.tsx:9` — change Tools href

- [ ] **Step 1: Create the coffee calculator page**

Create `app/tools/coffee-calculator/page.tsx`:

```tsx
import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CoffeeCalculator from "@/components/tools/CoffeeCalculator";

export const metadata: Metadata = {
  title: "Coffee Calculator",
  description:
    "Brew ratio calculator, drink builder, and extraction yield calculator for espresso and coffee.",
};

export default function CoffeeCalculatorPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
      <div className="mb-14">
        <p className="text-xs font-semibold uppercase tracking-widest text-terracotta mb-3">
          Tools
        </p>
        <h1 className="text-4xl lg:text-5xl font-bold text-espresso leading-tight">
          Coffee Calculator
        </h1>
        <p className="mt-4 text-espresso/60 text-lg leading-relaxed max-w-xl">
          Dial in your espresso. Calculate brew ratios, build drinks with the
          right proportions, and check your extraction yield.
        </p>
        <div className="mt-6 h-px w-24 bg-amber" />
      </div>

      <ScrollReveal>
        <CoffeeCalculator />
      </ScrollReveal>
    </div>
  );
}
```

- [ ] **Step 2: Create the tools index page**

Create `app/tools/page.tsx`:

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Calculators and tools for baking and coffee. Plan your sourdough schedule or dial in your espresso.",
};

const tools = [
  {
    href: "/tools/baking-calculator",
    title: "Baking Calculator",
    description: "Plan your sourdough bake day with a step-by-step timeline for three different schedules.",
    badge: "Bread",
  },
  {
    href: "/tools/coffee-calculator",
    title: "Coffee Calculator",
    description: "Brew ratio calculator, drink builder with espresso-to-milk ratios, and extraction yield.",
    badge: "Coffee",
  },
];

export default function ToolsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
      <div className="mb-14">
        <p className="text-xs font-semibold uppercase tracking-widest text-terracotta mb-3">
          Resources
        </p>
        <h1 className="text-4xl lg:text-5xl font-bold text-espresso leading-tight">
          Tools
        </h1>
        <p className="mt-4 text-espresso/60 text-lg leading-relaxed max-w-xl">
          Calculators for baking and coffee. Built for the way I actually work.
        </p>
        <div className="mt-6 h-px w-24 bg-amber" />
      </div>

      <div className="grid gap-6">
        {tools.map((tool, i) => (
          <ScrollReveal key={tool.href} delay={i * 100}>
            <Link
              href={tool.href}
              className="block bg-white rounded-2xl p-8 hover:shadow-md transition-shadow duration-300 group"
            >
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-terracotta bg-blush/40 px-3 py-1 rounded-full mb-4">
                {tool.badge}
              </span>
              <h2 className="text-xl font-bold text-espresso mb-2 group-hover:text-terracotta transition-colors duration-200">
                {tool.title}
              </h2>
              <p className="text-sm text-espresso/60 leading-relaxed">
                {tool.description}
              </p>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Update navigation link**

In `components/layout/Navigation.tsx`, change the Tools href:

```ts
// Before:
{ href: "/tools/baking-calculator", label: "Tools" },
// After:
{ href: "/tools", label: "Tools" },
```

- [ ] **Step 4: Run the build to verify everything compiles**

Run: `npm run build`

Expected: Build passes with `/tools`, `/tools/coffee-calculator`, and `/tools/baking-calculator` all in the output.

- [ ] **Step 5: Commit**

```bash
git add app/tools/coffee-calculator/page.tsx app/tools/page.tsx components/layout/Navigation.tsx
git commit -m "Add coffee calculator page, tools index, and update nav"
```

---

### Task 4: Visual verification in dev server

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`

- [ ] **Step 2: Verify the tools index at `/tools`**

Check:
- Page shows two tool cards (Baking Calculator, Coffee Calculator)
- Each card has badge, title, description
- Cards link to the correct pages
- "Tools" nav link navigates here

- [ ] **Step 3: Verify Brew Ratio tab at `/tools/coffee-calculator`**

Check:
- Page header matches site style
- Three tabs render, "Brew Ratio" selected by default
- Dose input defaults to 18
- Ratio pills render with 1:2 selected
- Yield shows "36g"
- Changing dose to 21 with 1:2 ratio shows "42g"
- Clicking "Custom" shows the custom ratio input
- Helper note displays below

- [ ] **Step 4: Verify Drink Builder tab**

Click "Drink Builder" tab. Check:
- All 9 drink pills render (7 standard + 2 custom)
- Custom recipes show "My recipe" badge
- Selecting "Espresso" hides milk/temp fields
- Selecting "Americano" shows "Water (ml)" instead of "Milk (ml)" and hides temp
- Selecting "My Cappuccino" shows dose 21, ratio 2, milk 180, temp 60
- Proportion bar shows espresso vs milk ratio visually
- Editing dose updates yield and total volume instantly
- Notes display below the proportion bar

- [ ] **Step 5: Verify Extraction Yield tab**

Click "Extraction Yield" tab. Check:
- Quick Estimate mode shows TDS as fixed 1.35%
- With defaults (18g dose, 36g bev), yield should be ~2.7%
- Switching to "With Refractometer" makes TDS editable
- Range bar shows three color zones
- Marker dot moves with the yield value
- Tip text updates based on range

- [ ] **Step 6: Test responsive layout**

Resize to mobile (375px). Check:
- Tabs wrap if needed
- Inputs stack vertically
- Drink pills wrap naturally
- Proportion bar stays full-width

- [ ] **Step 7: Run production build**

Run: `npm run build`

Expected: Build passes with no errors.

- [ ] **Step 8: Commit any fixes**

If testing revealed issues, fix and commit:
```bash
git add -A
git commit -m "Fix coffee calculator visual issues from testing"
```
