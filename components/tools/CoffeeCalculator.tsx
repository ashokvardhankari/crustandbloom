"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { RATIO_PRESETS, DRINK_PRESETS } from "@/lib/coffee-presets";

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
const PILL_BASE =
  "text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full transition-colors duration-200";

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
          <label className="text-xs font-semibold uppercase tracking-widest text-espresso/60">
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
          <label className="text-xs font-semibold uppercase tracking-widest text-espresso/60">
            Ratio
          </label>
          <div className="flex flex-wrap gap-2">
            {RATIO_PRESETS.map((r, i) => (
              <button
                key={r.label}
                onClick={() => setSelectedIdx(i)}
                className={cn(
                  PILL_BASE,
                  i === selectedIdx ? PILL_ACTIVE : PILL_INACTIVE
                )}
              >
                {r.label}
              </button>
            ))}
            <button
              onClick={() => setSelectedIdx("custom")}
              className={cn(
                PILL_BASE,
                selectedIdx === "custom" ? PILL_ACTIVE : PILL_INACTIVE
              )}
            >
              Custom
            </button>
          </div>
          {selectedIdx === "custom" && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-espresso/60">1 :</span>
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
        <p className="text-xs font-semibold uppercase tracking-widest text-espresso/60 mb-2">
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

function ProportionBar({
  espresso,
  liquid,
  liquidLabel,
}: {
  espresso: number;
  liquid: number;
  liquidLabel: string;
}) {
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
      <div className="flex justify-between text-xs text-espresso/60">
        <span>Espresso {Math.round(espressoPct)}%</span>
        <span>
          {liquidLabel} {Math.round(liquidPct)}%
        </span>
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
              "relative text-xs font-semibold px-4 rounded-full transition-colors duration-200",
              d.isCustom ? "pt-2 pb-5" : "py-2",
              i === drinkIdx ? PILL_ACTIVE : PILL_INACTIVE
            )}
          >
            {d.name}
            {d.isCustom && (
              <span
                className={cn(
                  "absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-medium whitespace-nowrap",
                  i === drinkIdx ? "text-white/70" : "text-terracotta"
                )}
              >
                My recipe
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-widest text-espresso/60">
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
            <label className="text-xs font-semibold uppercase tracking-widest text-espresso/60">
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
            <label className="text-xs font-semibold uppercase tracking-widest text-espresso/60">
              Yield (g)
            </label>
            <p className="px-4 py-2 text-sm font-semibold text-espresso">
              {yieldG}g
            </p>
          </div>

          {!isEspresso && (
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-widest text-espresso/60">
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
              <label className="text-xs font-semibold uppercase tracking-widest text-espresso/60">
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
            <label className="text-xs font-semibold uppercase tracking-widest text-espresso/60">
              Total volume
            </label>
            <p className="px-4 py-2 text-sm font-semibold text-espresso">
              {totalMl}ml
            </p>
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
  const extractionYield =
    dose > 0 ? ((bevWeight * (activeTds / 100)) / dose) * 100 : 0;
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

  const markerPct = Math.min(
    100,
    Math.max(0, ((yieldRounded - 14) / (26 - 14)) * 100)
  );

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-widest text-espresso/60">
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
          <label className="text-xs font-semibold uppercase tracking-widest text-espresso/60">
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
          <label className="text-xs font-semibold uppercase tracking-widest text-espresso/60">
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
          <label className="text-xs font-semibold uppercase tracking-widest text-espresso/60">
            TDS %
          </label>
          {mode === "quick" ? (
            <div>
              <p className="px-4 py-2 text-sm font-semibold text-espresso">
                1.35%
              </p>
              <p className="text-[10px] text-espresso/40 mt-1">
                Typical for well-extracted espresso
              </p>
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
          <p className="text-xs font-semibold uppercase tracking-widest text-espresso/60 mb-2">
            Extraction Yield
          </p>
          <p className={cn("text-5xl font-bold", rangeColor)}>
            {yieldRounded}%
          </p>
          <p className={cn("text-sm font-semibold mt-1", rangeColor)}>
            {rangeLabel}
          </p>
        </div>

        <div className="space-y-2">
          <div className="relative h-3 rounded-full overflow-hidden flex">
            <div className="bg-peach/60" style={{ width: "33.3%" }} />
            <div className="bg-sage/60" style={{ width: "33.4%" }} />
            <div className="bg-terracotta/40" style={{ width: "33.3%" }} />
          </div>
          <div className="relative h-0" style={{ marginTop: "-18px" }}>
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
