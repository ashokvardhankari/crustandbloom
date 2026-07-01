"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLink {
  href: string;
  label: string;
}

export default function NavLinks({ links }: { links: NavLink[] }) {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-8">
      {links.map((link) => {
        const active =
          pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <Link
            key={link.href}
            href={link.href}
            data-active={active}
            aria-current={active ? "page" : undefined}
            className={cn(
              "link-underline text-sm font-medium transition-colors duration-200 tracking-wide",
              active ? "text-espresso" : "text-espresso/65 hover:text-espresso"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
