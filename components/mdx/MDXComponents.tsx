import Image from "next/image";
import Link from "next/link";
import FullWidthGallery from "@/components/ui/FullWidthGallery";
import type { ReactNode } from "react";
import { slugify } from "@/lib/utils";

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

/** Flatten a heading's children (strings, numbers, nested nodes) into plain text. */
function nodeToText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join("");
  if (typeof node === "object" && "props" in node) {
    return nodeToText((node as { props?: { children?: ReactNode } }).props?.children);
  }
  return "";
}

/**
 * A heading that carries a slugified `id` (so recipe sections are deep-linkable,
 * e.g. `/bread/country-sourdough#the-formula`) plus a hover-revealed permalink.
 * `scroll-mt-24` keeps the anchored heading clear of the sticky site header.
 */
function anchoredHeading(Tag: "h2" | "h3") {
  const Heading = ({ children }: ChildrenProps & Record<string, unknown>) => {
    const id = slugify(nodeToText(children));
    if (!id) return <Tag>{children}</Tag>;
    return (
      <Tag id={id} className="group scroll-mt-24">
        {children}
        <a
          href={`#${id}`}
          aria-label="Link to this section"
          className="ml-2 align-middle text-espresso/25 no-underline opacity-0 transition-opacity duration-150 hover:text-terracotta hover:no-underline focus:opacity-100 group-hover:opacity-100 print:hidden"
        >
          #
        </a>
      </Tag>
    );
  };
  return Heading;
}

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

  // Body links: internal paths get client-side navigation, external links open
  // safely in a new tab, and in-page anchors stay plain.
  a: ({ href, children }: { href?: string; children?: ReactNode } & Record<string, unknown>) => {
    const url = typeof href === "string" ? href : "";
    if (url.startsWith("/")) {
      return <Link href={url}>{children}</Link>;
    }
    if (/^https?:\/\//.test(url)) {
      return (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return <a href={url || undefined}>{children}</a>;
  },

  // Deep-linkable section headings (slug ids + hover permalink)
  h2: anchoredHeading("h2"),
  h3: anchoredHeading("h3"),

  // Styled horizontal rule
  hr: () => <hr className="border-0 border-t border-blush my-10" />,
};
