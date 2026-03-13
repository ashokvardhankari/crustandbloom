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
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-blush/40">
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
                className="text-sm font-medium text-espresso/70 hover:text-espresso transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu */}
          <MobileMenu links={navLinks} />
        </div>
      </div>
    </header>
  );
}
