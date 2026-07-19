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
  image: string;
  note?: string;
}

export const DRINK_PRESETS: DrinkPreset[] = [
  { name: "Espresso", slug: "espresso", isCustom: false, dose: 18, ratioMultiplier: 2, milkMl: null, waterMl: null, milkTempC: null, image: "/images/coffee/drink-espresso.jpg" },
  { name: "Macchiato", slug: "macchiato", isCustom: false, dose: 18, ratioMultiplier: 2, milkMl: 30, waterMl: null, milkTempC: 60, image: "/images/coffee/drink-macchiato.jpg", note: "Dollop of foam" },
  { name: "Cortado", slug: "cortado", isCustom: false, dose: 18, ratioMultiplier: 2, milkMl: 60, waterMl: null, milkTempC: 60, image: "/images/coffee/drink-cortado.jpg", note: "Equal parts" },
  { name: "Flat White", slug: "flat-white", isCustom: false, dose: 18, ratioMultiplier: 2, milkMl: 150, waterMl: null, milkTempC: 62, image: "/images/coffee/drink-flat-white.jpg", note: "Microfoam, no dry foam" },
  { name: "Cappuccino", slug: "cappuccino", isCustom: false, dose: 18, ratioMultiplier: 2, milkMl: 120, waterMl: null, milkTempC: 65, image: "/images/coffee/drink-cappuccino.jpg", note: "Equal thirds" },
  { name: "Latte", slug: "latte", isCustom: false, dose: 18, ratioMultiplier: 2, milkMl: 240, waterMl: null, milkTempC: 65, image: "/images/coffee/drink-latte.jpg", note: "Milk-forward" },
  { name: "Americano", slug: "americano", isCustom: false, dose: 18, ratioMultiplier: 2, milkMl: null, waterMl: 180, milkTempC: null, image: "/images/coffee/drink-americano.jpg", note: "Espresso + hot water" },
  { name: "My Cappuccino", slug: "my-cappuccino", isCustom: true, dose: 21, ratioMultiplier: 2, milkMl: 180, waterMl: null, milkTempC: 60, image: "/images/coffee/drink-my-cappuccino.jpg", note: "Counter Culture Forty-Six, wet cap style" },
  { name: "My Honey Lavender Latte", slug: "my-honey-lavender", isCustom: true, dose: 18, ratioMultiplier: 2.5, milkMl: 240, waterMl: null, milkTempC: 62, image: "/images/coffee/drink-my-honey-lavender.jpg", note: "Oat milk, lavender syrup + honey" },
  { name: "My Mocha", slug: "my-mocha", isCustom: true, dose: 18, ratioMultiplier: 2, milkMl: 240, waterMl: null, milkTempC: 60, image: "/images/coffee/drink-my-mocha.jpg", note: "Counter Culture Forty-Six + local chocolate sauce" },
];
