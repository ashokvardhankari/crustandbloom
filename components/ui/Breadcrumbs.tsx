import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export interface Crumb {
  /** Visible label. */
  label: string;
  /** Relative path, e.g. "/coffee". Absolutised for the JSON-LD. */
  href: string;
}

/**
 * Visible breadcrumb trail plus matching BreadcrumbList structured data.
 * The final crumb is the current page and renders as plain, non-linked text.
 * `containerClassName` overrides the default page-width wrapper (detail pages
 * use the wide grid; the newsletter reader uses a narrower column).
 */
export default function Breadcrumbs({
  items,
  containerClassName,
}: {
  items: Crumb[];
  containerClassName?: string;
}) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("max-w-7xl mx-auto px-6 lg:px-8 pt-6", containerClassName)}
    >
      <JsonLd
        data={breadcrumbJsonLd(items.map((c) => ({ name: c.label, url: c.href })))}
      />
      <ol className="flex flex-wrap items-center gap-2 text-xs text-espresso-muted">
        {items.map((crumb, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-2 min-w-0">
              {isLast ? (
                <span
                  aria-current="page"
                  className="text-espresso/70 font-medium truncate max-w-[220px]"
                >
                  {crumb.label}
                </span>
              ) : (
                <>
                  <Link
                    href={crumb.href}
                    className="hover:text-terracotta transition-colors duration-200"
                  >
                    {crumb.label}
                  </Link>
                  <span aria-hidden="true" className="text-blush">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
