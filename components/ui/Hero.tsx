import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface HeroProps {
  image: string;
  imageAlt?: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  size?: "full" | "medium";
  overlay?: "dark" | "light";
}

export default function Hero({
  image,
  imageAlt = "",
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  size = "full",
  overlay = "dark",
}: HeroProps) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden",
        size === "full" ? "h-[85vh] min-h-[520px]" : "h-[50vh] min-h-[320px]"
      )}
    >
      {/* Background image */}
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Gradient overlay */}
      <div
        className={cn(
          "absolute inset-0",
          overlay === "dark" ? "gradient-overlay" : "gradient-overlay-light"
        )}
      />

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-16 lg:pb-24 w-full">
          <div className="max-w-2xl">
            <h1
              className={cn(
                "font-bold text-cream leading-tight text-balance",
                size === "full"
                  ? "text-4xl sm:text-5xl lg:text-6xl"
                  : "text-3xl sm:text-4xl"
              )}
            >
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 text-cream/80 text-lg sm:text-xl leading-relaxed max-w-xl">
                {subtitle}
              </p>
            )}
            {ctaLabel && ctaHref && (
              <Link
                href={ctaHref}
                className="mt-8 inline-block bg-amber text-espresso font-semibold px-8 py-3 rounded-full text-sm tracking-wide hover:bg-amber-light transition-colors duration-200"
              >
                {ctaLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
