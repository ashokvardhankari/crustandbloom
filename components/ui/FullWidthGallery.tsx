import Image from "next/image";
import Link from "next/link";

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

export default function FullWidthGallery({
  images,
  alt = "Photo",
  columns = 3,
}: FullWidthGalleryProps) {
  if (!images || images.length === 0) return null;

  const gridClass =
    columns === 2
      ? "grid grid-cols-1 sm:grid-cols-2 gap-3"
      : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3";

  return (
    <div className={`${gridClass} my-10`}>
      {images.map((item, i) => {
        const src = isGalleryImage(item) ? item.src : item;
        const itemAlt = isGalleryImage(item) ? (item.alt ?? alt) : alt;
        const postUrl = isGalleryImage(item) ? item.postUrl : undefined;

        const imageEl = (
          <div
            key={i}
            className="relative aspect-square overflow-hidden rounded-xl bg-blush/20 group"
          >
            <Image
              src={src}
              alt={`${itemAlt}, photo ${i + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        );

        if (postUrl) {
          return (
            <Link key={i} href={postUrl} className="block">
              {imageEl}
            </Link>
          );
        }

        return <div key={i}>{imageEl}</div>;
      })}
    </div>
  );
}
