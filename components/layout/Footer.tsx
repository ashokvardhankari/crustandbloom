import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-blush/40 bg-cream-dark mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="text-lg font-bold text-espresso tracking-tight">
              Crust <span className="text-terracotta">&amp;</span> Bloom
            </Link>
            <p className="text-sm text-espresso-muted leading-relaxed max-w-xs">
              A personal journal of specialty coffee and artisan sourdough — brewed, baked, and photographed by hand.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-espresso-muted">Explore</p>
            <nav className="flex flex-col gap-2">
              {[
                { href: "/coffee", label: "Coffee" },
                { href: "/bread", label: "Bread" },
                { href: "/gallery", label: "Gallery" },
                { href: "/about", label: "About" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-espresso/60 hover:text-espresso transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-espresso-muted">Categories</p>
            <nav className="flex flex-col gap-2">
              {[
                { href: "/coffee", label: "Espresso Drinks" },
                { href: "/bread", label: "Classic Sourdough" },
                { href: "/bread#inclusions", label: "Inclusion Loaves" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-espresso/60 hover:text-espresso transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="border-t border-blush/30 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-espresso-muted">
            &copy; {currentYear} Crust &amp; Bloom. All rights reserved.
          </p>
          <p className="text-xs text-espresso-muted">
            Made with care — coffee in hand.
          </p>
        </div>
      </div>
    </footer>
  );
}
