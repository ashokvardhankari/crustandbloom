import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      {/* Ambient wash */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 right-1/4 w-96 h-96 bg-blush/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-sand/40 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto px-6 py-32 text-center">
        <p className="eyebrow mb-4 animate-fade-in-up">Page not found</p>
        <h1
          className="font-display font-semibold text-7xl sm:text-8xl tracking-tight text-espresso animate-fade-in-up"
          style={{ animationDelay: "120ms" }}
        >
          4<span className="italic text-terracotta">0</span>4
        </h1>
        <p
          className="mt-6 text-lg text-espresso/60 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "240ms" }}
        >
          This page has gone the way of an over-proofed loaf. It doesn&apos;t
          exist, or it&apos;s moved somewhere else.
        </p>
        <div
          className="mt-10 flex flex-wrap justify-center gap-4 animate-fade-in-up"
          style={{ animationDelay: "360ms" }}
        >
          <Link href="/" className="btn-primary">
            Back home
          </Link>
          <Link href="/gallery" className="btn-secondary">
            Browse the gallery
          </Link>
        </div>
      </div>
    </div>
  );
}
