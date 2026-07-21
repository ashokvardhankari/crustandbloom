"use client";

import { useEffect, useState } from "react";
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

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

// iCalendar UTC timestamp: YYYYMMDDTHHMMSSZ
function toICSDate(date: Date): string {
  return (
    date.getUTCFullYear().toString() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    "T" +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) +
    "Z"
  );
}

function escapeICS(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

// Fold long lines to 75 octets per RFC 5545, continuation lines start with a space.
function foldICSLine(line: string): string {
  if (line.length <= 75) return line;
  const parts: string[] = [];
  let rest = line;
  parts.push(rest.slice(0, 75));
  rest = rest.slice(75);
  while (rest.length > 74) {
    parts.push(" " + rest.slice(0, 74));
    rest = rest.slice(74);
  }
  if (rest.length > 0) parts.push(" " + rest);
  return parts.join("\r\n");
}

function buildICS(preset: BakingPreset, schedule: ScheduledStep[], stamp: string): string {
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Crust & Bloom//Baking Calculator//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeICS(`${preset.name} bake`)}`,
  ];
  schedule.forEach((step, i) => {
    lines.push(
      "BEGIN:VEVENT",
      `UID:crustandbloom-${stamp}-${preset.slug.toLowerCase()}-${i}`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${toICSDate(step.startTime)}`,
      `DTEND:${toICSDate(step.endTime)}`,
      `SUMMARY:${escapeICS(`🍞 ${preset.slug}: ${step.name}`)}`,
      `DESCRIPTION:${escapeICS(step.tip)}`,
      "END:VEVENT"
    );
  });
  lines.push("END:VCALENDAR");
  return lines.map(foldICSLine).join("\r\n");
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
  // Start empty so the static HTML never bakes in the build-time clock. The
  // real "next hour" is computed on the client after mount, in the visitor's
  // own timezone — avoiding a stale default and a hydration mismatch.
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    setDateTime(roundUpToNextHour());
  }, []);

  const preset = BAKING_PRESETS[presetIndex];
  const anchor = dateTime ? new Date(dateTime) : null;
  const schedule = anchor ? computeSchedule(preset, anchor, direction) : null;

  function downloadICS() {
    if (!schedule || schedule.length === 0) return;
    const ics = buildICS(preset, schedule, toICSDate(new Date()));
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${preset.slug.toLowerCase()}-bake-schedule.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

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
                  "text-sm font-semibold px-5 py-2.5 rounded-full whitespace-nowrap transition-colors duration-200",
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

      {/* Preset description + calendar export */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-sm text-espresso/50">
          {preset.name} · total time:{" "}
          {formatDuration(preset.steps.reduce((sum, s) => sum + s.durationMinutes, 0))}
        </p>
        {schedule && (
          <button
            onClick={downloadICS}
            className="inline-flex items-center gap-2 self-start sm:self-auto text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full bg-blush/40 text-espresso hover:bg-blush/60 transition-colors duration-200"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Add to calendar
          </button>
        )}
      </div>

      {/* Timeline — rendered client-side only, once the current time is known */}
      <div className="relative pl-8 min-h-[8rem]">
        {/* Vertical line */}
        <div className="absolute left-[11px] top-2 bottom-2 w-px bg-blush" />

        <div className="space-y-0">
          {(schedule ?? []).map((step, i) => {
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
