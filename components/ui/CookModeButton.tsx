"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CookModeButtonProps {
  /** Noun shown after "Keep" — e.g. "Keep screen on while you bake". */
  label?: string;
}

/**
 * "Keep screen on" toggle for hands-free recipe following. Uses the Screen Wake
 * Lock API so the display doesn't dim or sleep mid-bake/brew. The button hides
 * itself entirely on browsers without the API, and is dropped from the printout
 * via `print:hidden`.
 *
 * The browser auto-releases the lock whenever the tab is hidden; we re-acquire
 * it on return so a toggled-on lock survives switching tabs or apps.
 */
export default function CookModeButton({ label = "Keep screen on" }: CookModeButtonProps) {
  const [supported, setSupported] = useState(false);
  const [active, setActive] = useState(false);
  const sentinelRef = useRef<WakeLockSentinel | null>(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    setSupported("wakeLock" in navigator);
  }, []);

  // Acquire or release the lock whenever the toggle flips.
  useEffect(() => {
    if (!supported) return;

    async function acquire() {
      try {
        const sentinel = await navigator.wakeLock.request("screen");
        // The browser releases the lock when the tab is hidden; clear our ref
        // so the visibility handler knows to re-request on return.
        sentinel.addEventListener("release", () => {
          sentinelRef.current = null;
        });
        sentinelRef.current = sentinel;
      } catch {
        // Denied (e.g. low battery) — reflect the failure in the UI.
        setActive(false);
      }
    }

    async function release() {
      try {
        await sentinelRef.current?.release();
      } catch {
        /* already released */
      }
      sentinelRef.current = null;
    }

    if (active) acquire();
    else release();

    return () => {
      void release();
    };
  }, [active, supported]);

  // Re-acquire when the tab becomes visible again, if the user left it on.
  useEffect(() => {
    if (!supported) return;
    function onVisibilityChange() {
      if (
        document.visibilityState === "visible" &&
        activeRef.current &&
        !sentinelRef.current
      ) {
        navigator.wakeLock
          .request("screen")
          .then((sentinel) => {
            sentinel.addEventListener("release", () => {
              sentinelRef.current = null;
            });
            sentinelRef.current = sentinel;
          })
          .catch(() => {});
      }
    }
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [supported]);

  if (!supported) return null;

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => setActive((v) => !v)}
      title={
        active
          ? "Screen will stay on while this page is open"
          : "Stop the screen from dimming or sleeping"
      }
      className={cn(
        "print:hidden inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest border rounded-full px-4 py-2 transition-colors",
        active
          ? "bg-terracotta border-terracotta text-cream hover:bg-terracotta-dark"
          : "border-blush text-espresso-muted hover:bg-blush/30 hover:text-espresso"
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
      {active ? "Screen staying on" : label}
    </button>
  );
}
