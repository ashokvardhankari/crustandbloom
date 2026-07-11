import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export interface Crumb {
  label: string;
  /** Omit on the current (last) page so it renders as plain text. */
  href?: string;
}

/**
 * A breadcrumb trail (e.g. Home › Coffee › Post title) shown at the top of a
 * detail page. Renders the visible navigation plus a matching BreadcrumbList
 * JSON-LD block for breadcrumb rich results. Pass `maxWidth` to align the strip
 * with the page's content container.
 */
export default function Breadcrumbs({
  items,
  maxWidth = "max-w-7xl",
}: {
  items: Crumb[];
  maxWidth?: string;
}) {
  if (items.length === 0) return null;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(items)} />
      <nav
        aria-label="Breadcrumb"
        className={`${maxWidth} mx-auto px-6 lg:px-8 pt-8`}
      >
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-espresso-muted">
          {items.map((crumb, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={`${crumb.label}-${i}`} className="flex items-center gap-1.5">
                {crumb.href && !isLast ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-terracotta transition-colors duration-200"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    className="text-espresso font-medium"
                    aria-current={isLast ? "page" : undefined}
                  >
                    {crumb.label}
                  </span>
                )}
                {!isLast && (
                  <span aria-hidden="true" className="text-blush">
                    ›
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
