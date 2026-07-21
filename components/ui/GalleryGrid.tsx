"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { GalleryImage, GalleryFilter } from "@/lib/types";
import { cn } from "@/lib/utils";

interface GalleryGridProps {
  images: GalleryImage[];
}

const FILTERS: { value: GalleryFilter; label: string }[] = [
  { value: "all", label: "Everything" },
  { value: "coffee", label: "Coffee" },
  { value: "bread", label: "Bread" },
  { value: "beans", label: "Beans" },
];

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [active, setActive] = useState<GalleryFilter>("all");

  // Only surface a filter pill for categories that actually have photos, so the
  // control never offers an empty view.
  const available = useMemo(() => {
    const present = new Set(images.map((img) => img.category));
    return FILTERS.filter((f) => f.value === "all" || present.has(f.value));
  }, [images]);

  const visible =
    active === "all" ? images : images.filter((img) => img.category === active);

  return (
    <div>
      {available.length > 2 && (
        <div className="flex flex-wrap items-center gap-2 mb-10" role="group" aria-label="Filter gallery by category">
          {available.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              aria-pressed={active === f.value}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200",
                active === f.value
                  ? "bg-terracotta text-cream shadow-sm"
                  : "bg-blush/40 text-espresso hover:bg-blush/70"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {/* Masonry-style column layout */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
        {visible.map((image, i) => (
          <Link
            key={`${image.src}-${i}`}
            href={image.postUrl}
            className="group block break-inside-avoid mb-3"
          >
            <div className="relative overflow-hidden rounded-xl bg-blush/20">
              <Image
                src={image.src}
                alt={image.alt}
                width={0}
                height={0}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="w-full h-auto group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              {/* Hover overlay — names the post each photo links to */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-espresso/70 via-espresso/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="p-3">
                  <p className="text-cream text-sm font-semibold leading-snug line-clamp-2">
                    {image.title}
                  </p>
                  <span className="mt-1 inline-flex items-center gap-1 text-cream/80 text-[11px] font-medium uppercase tracking-widest">
                    View post
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
