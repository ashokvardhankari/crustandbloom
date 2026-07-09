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

          {/* CTA + mobile menu */}
          <div className="flex items-center gap-3">
            <Link
              href="/coffee"
              className="hidden md:inline-flex items-center bg-terracotta text-white font-semibold px-5 py-2 rounded-full text-sm tracking-wide transition-all duration-200 hover:bg-terracotta-dark hover:shadow-glow active:scale-[0.98]"
            >
              Start exploring
            </Link>
            <MobileMenu links={navLinks} />
          </div>
        </div>
      </div>
    </header>
  );
}
