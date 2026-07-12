"use client";

interface PrintButtonProps {
  /** What is being printed — used in the button label ("Print recipe"). */
  label?: string;
}

/**
 * Small "Print recipe" button. Triggers the browser print dialog, which the
 * site's `@media print` styles turn into a clean, ink-friendly one-page recipe
 * (chrome, galleries, and related links stripped out). Hidden from the printout
 * itself via `print:hidden`.
 */
export default function PrintButton({ label = "recipe" }: PrintButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print:hidden inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-espresso-muted border border-blush rounded-full px-4 py-2 transition-colors hover:bg-blush/30 hover:text-espresso"
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
        <polyline points="6 9 6 2 18 2 18 9" />
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <rect x="6" y="14" width="12" height="8" />
      </svg>
      Print {label}
    </button>
  );
}
