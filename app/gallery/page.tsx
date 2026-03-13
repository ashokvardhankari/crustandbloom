import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllGalleryImages } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "All photos from the Crust & Bloom archives — coffee, bread, process shots, and everything in between.",
};

export default async function GalleryPage() {
  const images = await getAllGalleryImages();

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-14 max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-terracotta mb-3">
          The archive
        </p>
        <h1 className="text-4xl lg:text-5xl font-bold text-espresso leading-tight">
          Gallery
        </h1>
        <p className="mt-4 text-espresso/60 text-lg leading-relaxed">
          Every photo from every post — crumb shots, pour shots, process shots.
          Click any image to read the full story.
        </p>
        <div className="mt-6 h-px w-24 bg-amber" />
      </div>

      {images.length === 0 ? (
        <div className="py-20 text-center text-espresso-muted">
          <p className="text-lg">No photos yet — check back soon.</p>
        </div>
      ) : (
        /* Masonry-style column layout */
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {images.map((image, i) => (
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
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/20 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-cream text-xs font-semibold uppercase tracking-widest bg-espresso/60 px-3 py-1.5 rounded-full">
                    View post
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
