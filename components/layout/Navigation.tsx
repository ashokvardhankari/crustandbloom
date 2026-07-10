import Link from "next/link";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";
import LogoMark from "./LogoMark";

const navLinks = [
  { href: "/coffee", label: "Coffee" },
  { href: "/beans", label: "Beans" },
  { href: "/bread", label: "Bread" },
  { href: "/gallery", label: "Gallery" },
  { href: "/tools", label: "Tools" },
  { href: "/about", label: "About" },
];

const mobileLinks = [
  ...navLinks,
  { href: "/newsletter", label: "Newsletter" },
  { href: "/search", label: "Search" },
];

export default function Navigation() {
  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-blush/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-xl font-display font-semibold text-espresso tracking-tight"
          >
            <LogoMark className="h-8 w-auto text-terracotta transition-transform duration-300 group-hover:rotate-[-8deg]" />
            <span>
              Crust{" "}
              <span className="text-terracotta italic">&amp;</span>{" "}
              Bloom
            </span>
          </Link>

          {/* Desktop nav */}
          <NavLinks links={navLinks} />

          {/* Search + CTA + mobile menu */}
          <div className="flex items-center gap-3">
            <Link
              href="/search"
              aria-label="Search the site"
              className="hidden md:inline-flex items-center justify-center w-9 h-9 rounded-full text-espresso/65 hover:text-espresso hover:bg-blush/40 transition-colors duration-200"
            >
              <svg
                className="w-[18px] h-[18px]"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                />
              </svg>
            </Link>
            <Link
              href="/coffee"
              className="hidden md:inline-flex items-center bg-terracotta text-white font-semibold px-5 py-2 rounded-full text-sm tracking-wide transition-all duration-200 hover:bg-terracotta-dark hover:shadow-glow active:scale-[0.98]"
            >
              Start exploring
            </Link>
            <MobileMenu links={mobileLinks} />
          </div>
        </div>
      </div>
    </header>
  );
}
