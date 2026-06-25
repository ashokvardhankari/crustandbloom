# Baking Timeline Calculator — Design Spec

## Overview

A sourdough baking timeline calculator at `/tools/baking-calculator`. Users pick a preset schedule, choose whether they're planning from a start time or a deadline, enter a date/time, and instantly see a full step-by-step baking schedule rendered as a vertical timeline.

## Page structure

- **Route:** `app/tools/baking-calculator/page.tsx` (server component)
- **Client component:** `components/tools/BakingCalculator.tsx` ("use client")
- **Preset data:** `lib/baking-presets.ts` (plain data, no component logic)
- **Nav update:** Add "Tools" link to `navLinks` in `components/layout/Navigation.tsx`

The server component provides metadata and the page header (uppercase terracotta label, bold espresso heading, thin divider — matching `/about` and `/bread`). The `<BakingCalculator />` client component renders below.

## Presets

Three preset schedules stored in `lib/baking-presets.ts`. Each preset is an object with a `name`, `slug`, and `steps` array. Each step has `name`, `durationMinutes`, and `tip`.

### Overnight Cold Proof (default)

| Step | Duration | Tip |
|---|---|---|
| Feed starter | 12 hrs | 1:5:5 ratio — wait for it to dome and bubble |
| Autolyse | 60 min | Combine flour and water, no salt yet. Rest covered |
| Mix & add salt | 15 min | Dissolve salt in reserved water, squeeze through dough |
| Bulk fermentation | 5 hrs | 4 sets of stretch & folds in the first 2 hours, then leave it alone |
| Pre-shape & bench rest | 25 min | Gentle round on unfloured surface, rest uncovered |
| Final shape | 10 min | Build tension, transfer seam-side up into banneton |
| Cold proof in fridge | 12 hrs | Cover and refrigerate — develops flavor and eases scoring |
| Preheat oven | 45 min | Dutch oven inside, 500°F |
| Bake | 45 min | 20 min covered, then uncover and reduce to 460°F |
| Cool | 60 min | Resist cutting — crumb sets during cooling |

### Same-Day Bake

| Step | Duration | Tip |
|---|---|---|
| Feed starter | 8 hrs | Shorter feed — use a warmer spot to speed activity |
| Autolyse | 60 min | Combine flour and water, no salt yet. Rest covered |
| Mix & add salt | 15 min | Dissolve salt in reserved water, squeeze through dough |
| Bulk fermentation | 4 hrs | Warmer environment, watch for 50-75% volume increase |
| Pre-shape & bench rest | 25 min | Gentle round on unfloured surface, rest uncovered |
| Final shape | 10 min | Build tension, transfer seam-side up into banneton |
| Room-temp proof | 2 hrs | Cover and proof at room temperature until puffy |
| Preheat oven | 45 min | Dutch oven inside, 500°F |
| Bake | 45 min | 20 min covered, then uncover and reduce to 460°F |
| Cool | 60 min | Resist cutting — crumb sets during cooling |

### Weekend Long Ferment

| Step | Duration | Tip |
|---|---|---|
| Feed starter | 12 hrs | 1:5:5 ratio — wait for it to dome and bubble |
| Autolyse | 60 min | Combine flour and water, no salt yet. Rest covered |
| Mix & add salt | 15 min | Dissolve salt in reserved water, squeeze through dough |
| Bulk fermentation | 5 hrs | 4 sets of stretch & folds in the first 2 hours, then leave it alone |
| Pre-shape & bench rest | 25 min | Gentle round on unfloured surface, rest uncovered |
| Final shape | 10 min | Build tension, transfer seam-side up into banneton |
| Cold proof in fridge | 24 hrs | Extended cold retard for deeper, more complex flavor |
| Preheat oven | 45 min | Dutch oven inside, 500°F |
| Bake | 45 min | 20 min covered, then uncover and reduce to 460°F |
| Cool | 60 min | Resist cutting — crumb sets during cooling |

## Input controls

Three controls rendered horizontally (stacking on mobile):

1. **Preset selector** — three pill-style buttons: "Overnight", "Same-Day", "Weekend". Styled like existing category pills. "Overnight" selected by default.
2. **Direction toggle** — two-option toggle: "I'm starting at..." / "I want bread by...". Default: "I'm starting at...".
3. **Date/time picker** — native `<input type="datetime-local">` styled to match the site palette. Defaults to current time rounded to the nearest hour.

No submit button. All changes update the timeline instantly.

## Timeline output

A vertical timeline below the controls. Each step is a card connected by a thin vertical line in `blush` color.

Each step card contains:
- **Time** (left side) — formatted as "Sat 8:00 AM" (short day name + 12-hour time)
- **Step name** — bold `espresso` text
- **Duration** — small muted text (e.g. "5 hours")
- **Tip** — one-line description in `espresso/60`

### Active step highlighting

If the generated schedule spans the current time, the step that is currently "active" gets:
- A subtle `blush/30` background
- A green dot on the timeline connector instead of the default `terracotta` dot

### Animation

The timeline wraps in `<ScrollReveal>` for the initial page load. When the user changes inputs and the timeline re-renders, no additional animation — instant update.

## Calculation logic

- **"I'm starting at..."** — the selected time is the start of step 1. Each subsequent step starts when the previous one ends. Sum the durations forward.
- **"I want bread by..."** — the selected time is the end of the last step (Cool). Subtract durations backward to find each step's start time.

All times are local to the user's browser timezone.

## Styling

- Follow existing site conventions: `cream` backgrounds, `espresso` text, `terracotta` accents, `blush` borders and decorative elements.
- Use `cn()` from `lib/utils.ts` for conditional classes.
- Responsive: controls stack vertically on mobile, timeline remains vertical on all sizes.
- Pill buttons match the visual weight of existing category pills in `globals.css`.

## Files to create

1. `lib/baking-presets.ts` — preset data
2. `components/tools/BakingCalculator.tsx` — client component
3. `app/tools/baking-calculator/page.tsx` — server page

## Files to modify

1. `components/layout/Navigation.tsx` — add "Tools" to `navLinks`

## Out of scope

- Export (clipboard, .ics) — potential future addition
- Custom step durations — potential future addition
- Coffee brew calculator — separate future feature, would also live under `/tools`
