import Link from "next/link";
import { cn } from "@/lib/utils";

interface TagListProps {
  tags: string[];
  /** Extra classes for the wrapping flex row (e.g. `ml-auto`). */
  className?: string;
}

/**
 * Renders a post's tags as chips that link into the site search
 * (`/search?q=<tag>`), turning what used to be inert decoration into a
 * discovery path. Leverages the deep-linkable search (?q=) so a tag click
 * lands on live results. Renders nothing when there are no tags.
 */
export default function TagList({ tags, className }: TagListProps) {
  if (tags.length === 0) return null;
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/search?q=${encodeURIComponent(tag)}`}
          className="text-xs px-2 py-0.5 bg-blush/30 text-espresso-muted rounded-full hover:bg-terracotta hover:text-cream transition-colors duration-200"
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
}
