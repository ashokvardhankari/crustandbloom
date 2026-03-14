import Link from "next/link";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { href: "/coffee", label: "Coffee" },
  { href: "/bread", label: "Bread" },
  { href: "/gallery", label: "Gallery" },
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
            className="text-xl font-bold text-espresso tracking-tight hover:opacity-80 transition-opacity"
          >
            Crust{" "}
            <span className="text-terracotta">&amp;</span>{" "}
            Bloom
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-espresso/65 hover:text-espresso transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + mobile menu */}
          <div className="flex items-center gap-3">
            <Link
              href="/coffee"
              className="hidden md:inline-flex items-center bg-terracotta text-white font-semibold px-5 py-2 rounded-full text-sm tracking-wide hover:bg-terracotta-dark transition-colors duration-200"
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
