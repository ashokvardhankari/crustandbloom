import Link from "next/link";

// Quick paths back into the archive for a visitor who landed on a dead link.
const SECTIONS = [
  { href: "/", label: "Home" },
  { href: "/coffee", label: "Coffee" },
  { href: "/bread", label: "Bread" },
  { href: "/beans", label: "Beans" },
  { href: "/gallery", label: "Gallery" },
];

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

        {/* A plain GET form to /search — the search page seeds its query from
            ?q=, so this works with no client JavaScript on the 404 route and
            gets a lost visitor straight into the archive. */}
        <form
          role="search"
          action="/search"
          method="get"
          className="mt-10 relative max-w-md mx-auto animate-fade-in-up"
          style={{ animationDelay: "360ms" }}
        >
          <label htmlFor="notfound-search" className="sr-only">
            Search the site
          </label>
          <svg
            className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-espresso-muted/60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
            />
          </svg>
          <input
            id="notfound-search"
            type="search"
            name="q"
            placeholder="Search recipes, beans, letters…"
            className="w-full pl-14 pr-28 py-4 rounded-full border border-blush bg-white text-espresso text-base focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent placeholder:text-espresso-muted/60"
          />
          <button
            type="submit"
            className="btn-primary absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5"
          >
            Search
          </button>
        </form>

        <div
          className="mt-8 flex flex-wrap justify-center gap-3 animate-fade-in-up"
          style={{ animationDelay: "480ms" }}
        >
          {SECTIONS.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="btn-secondary"
            >
              {section.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
