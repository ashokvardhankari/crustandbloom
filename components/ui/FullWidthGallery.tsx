"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface GalleryImage {
  src: string;
  alt?: string;
  postUrl?: string;
}

interface FullWidthGalleryProps {
  images: string[] | GalleryImage[];
  alt?: string;
  columns?: 2 | 3;
}

function isGalleryImage(item: string | GalleryImage): item is GalleryImage {
  return typeof item === "object" && "src" in item;
}

/**
 * The site's "Photos" galleries (bean/coffee/bread detail pages and MDX bodies)
 * showed each hand-shot photo cropped to a square with only a hover-zoom — there
 * was no way to view a picture full-size. This renders the same server-rendered
 * grid (so no-JS readers and crawlers still get every photo) and, as a
 * progressive enhancement, opens a full-screen lightbox on click with keyboard
 * navigation (←/→/Esc), a focus trap, and body-scroll lock.
 *
 * Images that carry an explicit `postUrl` keep their navigation intent (rendered
 * as a Link, no lightbox); the plain-photo galleries have none, so they open the
 * viewer.
 */
export default function FullWidthGallery({
  images,
  alt = "Photo",
  columns = 3,
}: FullWidthGalleryProps) {
  // Normalise the two accepted shapes into one list up front so both the grid
  // and the lightbox read from the same source.
  const items = (images ?? []).map((item, i) => {
    const src = isGalleryImage(item) ? item.src : item;
    const itemAlt = isGalleryImage(item) ? (item.alt ?? alt) : alt;
    const postUrl = isGalleryImage(item) ? item.postUrl : undefined;
    return { src, alt: itemAlt, postUrl, label: `${itemAlt}, photo ${i + 1}` };
  });

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  // Element that had focus before the lightbox opened, restored on close.
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpenIndex((i) =>
        i === null ? i : (i + delta + items.length) % items.length
      ),
    [items.length]
  );

  const isOpen = openIndex !== null;

  // While the lightbox is open: lock body scroll, wire global keys, and move
  // focus into the dialog — restoring the trigger's focus when it closes.
  useEffect(() => {
    if (!isOpen) return;

    returnFocusRef.current = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      } else if (e.key === "Tab") {
        // Keep focus inside the dialog.
        const focusable = overlayRef.current?.querySelectorAll<HTMLElement>(
          "button"
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      returnFocusRef.current?.focus?.();
    };
  }, [isOpen, close, step]);

  if (items.length === 0) return null;

  const gridClass =
    columns === 2
      ? "grid grid-cols-1 sm:grid-cols-2 gap-3"
      : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3";

  const active = openIndex === null ? null : items[openIndex];

  return (
    <>
      <div className={`${gridClass} my-10`}>
        {items.map((item, i) => {
          const imageEl = (
            <div className="relative aspect-square overflow-hidden rounded-xl bg-blush/20 group">
              <Image
                src={item.src}
                alt={item.label}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          );

          // A photo that points at a post keeps its navigation intent.
          if (item.postUrl) {
            return (
              <Link key={i} href={item.postUrl} className="block">
                {imageEl}
              </Link>
            );
          }

          // Otherwise clicking opens the full-size viewer.
          return (
            <button
              key={i}
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`View ${item.label} full size`}
              className="block cursor-zoom-in rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              {imageEl}
            </button>
          );
        })}
      </div>

      {active && (
        <div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo viewer, ${openIndex! + 1} of ${items.length}`}
          onClick={close}
          className="fixed inset-0 z-[100] flex flex-col bg-espresso/95 backdrop-blur-sm"
        >
          {/* Top bar: position counter + close */}
          <div className="flex flex-shrink-0 items-center justify-between px-4 py-3 text-cream">
            <span className="text-sm tabular-nums text-cream/80">
              {openIndex! + 1} / {items.length}
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              aria-label="Close photo viewer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Stage: the full-size image, contained (never cropped) */}
          <div className="relative flex-1">
            <Image
              key={active.src}
              src={active.src}
              alt={active.label}
              fill
              className="object-contain p-2 sm:p-6"
              sizes="100vw"
              priority
            />

            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  aria-label="Previous photo"
                  className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream sm:left-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  aria-label="Next photo"
                  className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream sm:right-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Caption */}
          <div className="flex-shrink-0 px-4 py-3 text-center">
            <p className={cn("text-sm text-cream/80")}>{active.alt}</p>
          </div>
        </div>
      )}
    </>
  );
}
