import Image from "next/image";
import FullWidthGallery from "@/components/ui/FullWidthGallery";
import type { ReactNode } from "react";

interface ImgProps {
  src?: string;
  alt?: string;
}

interface ChildrenProps {
  children?: ReactNode;
}

type MDXComponentMap = {
  [key: string]: (props: Record<string, unknown>) => JSX.Element | null;
};

export const MDXComponents: MDXComponentMap = {
  // Override default img with next/image
  img: ({ src, alt }: ImgProps & Record<string, unknown>) => {
    if (!src || typeof src !== "string") return null;
    return (
      <div className="relative w-full aspect-[4/3] my-8 rounded-xl overflow-hidden">
        <Image
          src={src}
          alt={typeof alt === "string" ? alt : ""}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 80vw"
        />
      </div>
    );
  },

  // Custom callout block
  blockquote: ({ children }: ChildrenProps & Record<string, unknown>) => (
    <blockquote className="border-l-4 border-amber pl-6 my-6 italic text-espresso-light text-lg leading-relaxed">
      {children}
    </blockquote>
  ),

  // Drop-in gallery component available in MDX
  FullWidthGallery: (props: Record<string, unknown>) => {
    const images = props.images as string[] | undefined;
    const alt = props.alt as string | undefined;
    const columns = props.columns as 2 | 3 | undefined;
    return <FullWidthGallery images={images ?? []} alt={alt} columns={columns} />;
  },

  // Styled horizontal rule
  hr: () => <hr className="border-0 border-t border-blush my-10" />,
};
