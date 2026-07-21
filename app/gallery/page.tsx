import type { Metadata } from "next";
import { getAllGalleryImages } from "@/lib/content";
import GalleryGrid from "@/components/ui/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  alternates: { canonical: "/gallery" },
  description:
    "All photos from the Crust & Bloom archives: coffee, bread, process shots, and everything in between.",
};

export default async function GalleryPage() {
  const images = await getAllGalleryImages();

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-14 max-w-xl animate-fade-in-up">
        <p className="eyebrow mb-3">
          The archive
        </p>
        <h1 className="font-display font-semibold text-5xl lg:text-6xl tracking-tight text-espresso leading-tight">
          Gallery<span className="text-terracotta italic">.</span>
        </h1>
        <p className="mt-4 text-espresso/60 text-lg leading-relaxed">
          Every photo from every post: crumb shots, pour shots, process shots.
          Click any image to read the full story.
        </p>
        <div className="mt-6 h-px w-24 bg-amber" />
      </div>

      {images.length === 0 ? (
        <div className="py-20 text-center text-espresso-muted">
          <p className="text-lg">No photos yet. Check back soon.</p>
        </div>
      ) : (
        <GalleryGrid images={images} />
      )}
    </div>
  );
}
