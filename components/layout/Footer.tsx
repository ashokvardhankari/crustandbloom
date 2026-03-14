import Link from "next/link";

const explore = [
  { href: "/coffee", label: "Coffee" },
  { href: "/bread", label: "Bread" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
];

const categories = [
  { href: "/coffee", label: "Espresso Drinks" },
  { href: "/bread", label: "Classic Sourdough" },
  { href: "/bread#inclusions", label: "Inclusion Loaves" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-espresso">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-xl font-bold text-cream tracking-tight hover:opacity-80 transition-opacity">
              Crust <span className="text-blush">&amp;</span> Bloom
            </Link>
            <p className="text-sm text-cream/50 leading-relaxed max-w-xs">
              A personal journal of specialty coffee and artisan sourdough,
              brewed, baked, and photographed by hand.
            </p>
          </div>

          {/* Explore links */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-cream/40">
              Explore
            </p>
            <nav className="flex flex-col gap-2.5">
              {explore.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-cream/60 hover:text-cream transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-cream/40">
              Categories
            </p>
            <nav className="flex flex-col gap-2.5">
              {categories.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-cream/60 hover:text-cream transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-cream/30">
            &copy; {currentYear} Crust &amp; Bloom. All rights reserved.
          </p>
          <p className="text-xs text-cream/30">
            Made with care. Coffee in hand.
          </p>
        </div>
      </div>
    </footer>
  );
}
