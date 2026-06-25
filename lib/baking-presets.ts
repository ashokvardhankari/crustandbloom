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
