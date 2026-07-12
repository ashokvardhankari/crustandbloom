"use client";

interface PrintButtonProps {
  /** Accessible label, e.g. "Print recipe" or "Print brew guide". */
  label?: string;
}

/**
 * Triggers the browser print dialog for the current recipe/guide page.
 * Hidden on paper via the `no-print` utility (see @media print in globals.css).
 */
export default function PrintButton({ label = "Print recipe" }: PrintButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-espresso-muted hover:text-terracotta transition-colors duration-200"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4"
        aria-hidden="true"
      >
        <polyline points="6 9 6 2 18 2 18 9" />
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <rect x="6" y="14" width="12" height="8" />
      </svg>
      {label}
    </button>
  );
}
