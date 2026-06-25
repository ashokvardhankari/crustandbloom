# Baking Timeline Calculator Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a sourdough baking timeline calculator at `/tools/baking-calculator` that generates a step-by-step schedule from three presets with forward/backward time calculation.

**Architecture:** One server component page, one `"use client"` calculator component, and a preset data file. The calculator computes step times from a user-selected anchor time and direction, rendering a vertical timeline. No API calls or database — pure client-side state.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS (custom color tokens), `cn()` utility for conditional classes.

**Spec:** `docs/superpowers/specs/2026-06-25-baking-calculator-design.md`

---

### Task 1: Create preset data

**Files:**
- Create: `lib/baking-presets.ts`

- [ ] **Step 1: Create the preset data file with types and all three presets**

```ts
export interface BakingStep {
  name: string;
  durationMinutes: number;
  tip: string;
}

export interface BakingPreset {
  name: string;
  slug: string;
  steps: BakingStep[];
}

export const BAKING_PRESETS: BakingPreset[] = [
  {
    name: "Overnight Cold Proof",
    slug: "Overnight",
    steps: [
      { name: "Feed starter", durationMinutes: 720, tip: "1:5:5 ratio — wait for it to dome and bubble" },
      { name: "Autolyse", durationMinutes: 60, tip: "Combine flour and water, no salt yet. Rest covered" },
      { name: "Mix & add salt", durationMinutes: 15, tip: "Dissolve salt in reserved water, squeeze through dough" },
      { name: "Bulk fermentation", durationMinutes: 300, tip: "4 sets of stretch & folds in the first 2 hours, then leave it alone" },
      { name: "Pre-shape & bench rest", durationMinutes: 25, tip: "Gentle round on unfloured surface, rest uncovered" },
      { name: "Final shape", durationMinutes: 10, tip: "Build tension, transfer seam-side up into banneton" },
      { name: "Cold proof in fridge", durationMinutes: 720, tip: "Cover and refrigerate — develops flavor and eases scoring" },
      { name: "Preheat oven", durationMinutes: 45, tip: "Dutch oven inside, 500°F" },
      { name: "Bake", durationMinutes: 45, tip: "20 min covered, then uncover and reduce to 460°F" },
      { name: "Cool", durationMinutes: 60, tip: "Resist cutting — crumb sets during cooling" },
    ],
  },
  {
    name: "Same-Day Bake",
    slug: "Same-Day",
    steps: [
      { name: "Feed starter", durationMinutes: 480, tip: "Shorter feed — use a warmer spot to speed activity" },
      { name: "Autolyse", durationMinutes: 60, tip: "Combine flour and water, no salt yet. Rest covered" },
      { name: "Mix & add salt", durationMinutes: 15, tip: "Dissolve salt in reserved water, squeeze through dough" },
      { name: "Bulk fermentation", durationMinutes: 240, tip: "Warmer environment, watch for 50-75% volume increase" },
      { name: "Pre-shape & bench rest", durationMinutes: 25, tip: "Gentle round on unfloured surface, rest uncovered" },
      { name: "Final shape", durationMinutes: 10, tip: "Build tension, transfer seam-side up into banneton" },
      { name: "Room-temp proof", durationMinutes: 120, tip: "Cover and proof at room temperature until puffy" },
      { name: "Preheat oven", durationMinutes: 45, tip: "Dutch oven inside, 500°F" },
      { name: "Bake", durationMinutes: 45, tip: "20 min covered, then uncover and reduce to 460°F" },
      { name: "Cool", durationMinutes: 60, tip: "Resist cutting — crumb sets during cooling" },
    ],
  },
  {
    name: "Weekend Long Ferment",
    slug: "Weekend",
    steps: [
      { name: "Feed starter", durationMinutes: 720, tip: "1:5:5 ratio — wait for it to dome and bubble" },
      { name: "Autolyse", durationMinutes: 60, tip: "Combine flour and water, no salt yet. Rest covered" },
      { name: "Mix & add salt", durationMinutes: 15, tip: "Dissolve salt in reserved water, squeeze through dough" },
      { name: "Bulk fermentation", durationMinutes: 300, tip: "4 sets of stretch & folds in the first 2 hours, then leave it alone" },
      { name: "Pre-shape & bench rest", durationMinutes: 25, tip: "Gentle round on unfloured surface, rest uncovered" },
      { name: "Final shape", durationMinutes: 10, tip: "Build tension, transfer seam-side up into banneton" },
      { name: "Cold proof in fridge", durationMinutes: 1440, tip: "Extended cold retard for deeper, more complex flavor" },
      { name: "Preheat oven", durationMinutes: 45, tip: "Dutch oven inside, 500°F" },
      { name: "Bake", durationMinutes: 45, tip: "20 min covered, then uncover and reduce to 460°F" },
      { name: "Cool", durationMinutes: 60, tip: "Resist cutting — crumb sets during cooling" },
    ],
  },
];
```

- [ ] **Step 2: Verify the file compiles**

Run: `npx tsc --noEmit lib/baking-presets.ts 2>&1 || echo "Check passed via build"` then `npm run build 2>&1 | tail -5`

Expected: No type errors.

- [ ] **Step 3: Commit**

```bash
git add lib/baking-presets.ts
git commit -m "Add baking preset data for timeline calculator"
```

---

### Task 2: Create the BakingCalculator client component

**Files:**
- Create: `components/tools/BakingCalculator.tsx`

**References:**
- `lib/baking-presets.ts` — preset data and types
- `lib/utils.ts` — `cn()` for conditional classes
- `app/globals.css` — `.category-pill` base class for styling reference
- `components/ui/ScrollReveal.tsx` — wrap timeline for page-load animation

- [ ] **Step 1: Create the component directory**

Run: `mkdir -p components/tools`

- [ ] **Step 2: Create the BakingCalculator component**

Create `components/tools/BakingCalculator.tsx` with:

```tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { BAKING_PRESETS } from "@/lib/baking-presets";
import type { BakingPreset } from "@/lib/baking-presets";

function roundUpToNextHour(): string {
  const now = new Date();
  now.setMinutes(0, 0, 0);
  now.setHours(now.getHours() + 1);
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const h = String(now.getHours()).padStart(2, "0");
  return `${y}-${m}-${d}T${h}:00`;
}

function formatDuration(minutes: number): string {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs === 0) return `${mins} min`;
  if (mins === 0) return hrs === 1 ? "1 hour" : `${hrs} hours`;
  return `${hrs} hr ${mins} min`;
}

function formatTime(date: Date): string {
  return date.toLocaleString("en-US", {
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

interface ScheduledStep {
  name: string;
  durationMinutes: number;
  tip: string;
  startTime: Date;
  endTime: Date;
}

function computeSchedule(
  preset: BakingPreset,
  anchor: Date,
  direction: "forward" | "backward"
): ScheduledStep[] {
  if (direction === "forward") {
    let current = new Date(anchor);
    return preset.steps.map((step) => {
      const startTime = new Date(current);
      const endTime = new Date(current.getTime() + step.durationMinutes * 60_000);
      current = endTime;
      return { ...step, startTime, endTime };
    });
  }

  // backward: anchor is the end of the last step
  let current = new Date(anchor);
  const steps: ScheduledStep[] = [];
  for (let i = preset.steps.length - 1; i >= 0; i--) {
    const step = preset.steps[i];
    const endTime = new Date(current);
    const startTime = new Date(current.getTime() - step.durationMinutes * 60_000);
    current = startTime;
    steps.unshift({ ...step, startTime, endTime });
  }
  return steps;
}

function isActiveStep(step: ScheduledStep): boolean {
  const now = new Date();
  return now >= step.startTime && now < step.endTime;
}

export default function BakingCalculator() {
  const [presetIndex, setPresetIndex] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [dateTime, setDateTime] = useState(roundUpToNextHour);

  const preset = BAKING_PRESETS[presetIndex];
  const anchor = new Date(dateTime);
  const schedule = computeSchedule(preset, anchor, direction);

  return (
    <div className="space-y-10">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Preset pills */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-espresso-muted">
            Schedule
          </label>
          <div className="flex gap-2">
            {BAKING_PRESETS.map((p, i) => (
              <button
                key={p.slug}
                onClick={() => setPresetIndex(i)}
                className={cn(
                  "text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full transition-colors duration-200",
                  i === presetIndex
                    ? "bg-terracotta text-white"
                    : "bg-blush/40 text-espresso hover:bg-blush/60"
                )}
              >
                {p.slug}
              </button>
            ))}
          </div>
        </div>

        {/* Direction toggle */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-espresso-muted">
            Planning from
          </label>
          <div className="flex gap-2">
            {(
              [
                { value: "forward", label: "I'm starting at…" },
                { value: "backward", label: "I want bread by…" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.value}
                onClick={() => setDirection(opt.value)}
                className={cn(
                  "text-xs font-semibold px-4 py-2 rounded-full transition-colors duration-200",
                  direction === opt.value
                    ? "bg-terracotta text-white"
                    : "bg-blush/40 text-espresso hover:bg-blush/60"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Date/time picker */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-espresso-muted">
            Date &amp; time
          </label>
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="block w-full sm:w-auto px-4 py-2 rounded-full border border-blush bg-white text-espresso text-sm font-medium focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent"
          />
        </div>
      </div>

      {/* Preset description */}
      <p className="text-sm text-espresso/50">
        {preset.name} — total time:{" "}
        {formatDuration(preset.steps.reduce((sum, s) => sum + s.durationMinutes, 0))}
      </p>

      {/* Timeline */}
      <div className="relative pl-8">
        {/* Vertical line */}
        <div className="absolute left-[11px] top-2 bottom-2 w-px bg-blush" />

        <div className="space-y-0">
          {schedule.map((step, i) => {
            const active = isActiveStep(step);
            return (
              <div key={i} className="relative flex gap-4 pb-8 last:pb-0">
                {/* Dot */}
                <div
                  className={cn(
                    "absolute -left-8 top-1.5 w-[22px] h-[22px] rounded-full border-[3px] border-cream flex items-center justify-center z-10",
                    active ? "bg-sage" : "bg-terracotta"
                  )}
                >
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full",
                      active ? "bg-sage" : "bg-terracotta"
                    )}
                  />
                </div>

                {/* Card */}
                <div
                  className={cn(
                    "flex-1 rounded-xl px-5 py-4 transition-colors",
                    active ? "bg-blush/30" : "bg-white"
                  )}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                    <h3 className="font-semibold text-espresso">{step.name}</h3>
                    <span className="text-xs text-espresso-muted font-medium">
                      {formatDuration(step.durationMinutes)}
                    </span>
                  </div>
                  <p className="text-sm text-espresso/60 mb-2">{step.tip}</p>
                  <p className="text-xs font-semibold text-terracotta">
                    {formatTime(step.startTime)} → {formatTime(step.endTime)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify the file compiles**

Run: `npm run build 2>&1 | tail -10`

Expected: Build passes (the component isn't referenced by a page yet, but should compile without errors).

- [ ] **Step 4: Commit**

```bash
git add components/tools/BakingCalculator.tsx
git commit -m "Add BakingCalculator client component with timeline rendering"
```

---

### Task 3: Create the page route and update navigation

**Files:**
- Create: `app/tools/baking-calculator/page.tsx`
- Modify: `components/layout/Navigation.tsx:6` — add Tools to `navLinks`

- [ ] **Step 1: Create the page directory**

Run: `mkdir -p app/tools/baking-calculator`

- [ ] **Step 2: Create the server page component**

Create `app/tools/baking-calculator/page.tsx`:

```tsx
import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import BakingCalculator from "@/components/tools/BakingCalculator";

export const metadata: Metadata = {
  title: "Baking Calculator",
  description:
    "Plan your sourdough bake day. Pick a schedule, set your start time or deadline, and get a complete step-by-step timeline.",
};

export default function BakingCalculatorPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-14">
        <p className="text-xs font-semibold uppercase tracking-widest text-terracotta mb-3">
          Tools
        </p>
        <h1 className="text-4xl lg:text-5xl font-bold text-espresso leading-tight">
          Baking Calculator
        </h1>
        <p className="mt-4 text-espresso/60 text-lg leading-relaxed max-w-xl">
          Plan your sourdough bake day. Pick a schedule, set your start time or
          deadline, and get a complete step-by-step timeline.
        </p>
        <div className="mt-6 h-px w-24 bg-amber" />
      </div>

      <ScrollReveal>
        <BakingCalculator />
      </ScrollReveal>
    </div>
  );
}
```

- [ ] **Step 3: Add "Tools" to navigation**

In `components/layout/Navigation.tsx`, add `{ href: "/tools/baking-calculator", label: "Tools" }` to `navLinks` array (after "Gallery", before "About"):

```ts
const navLinks = [
  { href: "/coffee", label: "Coffee" },
  { href: "/bread", label: "Bread" },
  { href: "/gallery", label: "Gallery" },
  { href: "/tools/baking-calculator", label: "Tools" },
  { href: "/about", label: "About" },
];
```

- [ ] **Step 4: Run the build to verify everything compiles**

Run: `npm run build`

Expected: Build passes with the new route included in the output.

- [ ] **Step 5: Commit**

```bash
git add app/tools/baking-calculator/page.tsx components/layout/Navigation.tsx
git commit -m "Add baking calculator page and Tools nav link"
```

---

### Task 4: Visual verification in dev server

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`

- [ ] **Step 2: Verify the page renders at `http://localhost:3000/tools/baking-calculator`**

Check:
- Page header matches site style (terracotta label, bold heading, amber divider)
- Three preset pills render, "Overnight" is selected by default
- Direction toggle shows two options, "I'm starting at…" is selected
- Date/time picker shows current time rounded up to the next hour
- Timeline renders 10 steps with times, durations, tips, and terracotta dots
- Vertical blush line connects all steps

- [ ] **Step 3: Test preset switching**

Click "Same-Day" and "Weekend" pills. Verify:
- Timeline updates instantly
- Step count stays at 10
- Durations change (Same-Day has shorter feed starter, room-temp proof instead of cold proof)
- Total time in the description updates

- [ ] **Step 4: Test direction toggle**

Switch to "I want bread by…". Verify:
- Timeline recalculates backward from the selected time
- The selected time now matches the end of the "Cool" step
- All step times shift accordingly

- [ ] **Step 5: Test date/time picker**

Change the date and time. Verify:
- Timeline updates instantly
- Times on all steps reflect the new anchor

- [ ] **Step 6: Test responsive layout**

Resize browser to mobile width (~375px). Verify:
- Controls stack vertically
- Timeline remains readable
- Pills wrap if needed
- "Tools" link appears in the mobile hamburger menu

- [ ] **Step 7: Run production build**

Run: `npm run build`

Expected: Build passes with no errors.

- [ ] **Step 8: Commit any fixes if needed**

If visual testing revealed issues, fix and commit:
```bash
git add -A
git commit -m "Fix baking calculator visual issues from testing"
```
