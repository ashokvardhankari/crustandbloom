import type { PostMeta, BeanFrontmatter } from "@/lib/types";
import BeanLink from "./BeanLink";

/**
 * Sidebar block on a bean review that links to other beans reviewed from the
 * same roaster. Server-renderable (no client boundary). Renders nothing when
 * there are no sibling bags on the shelf, so it scales in as the roaster's
 * catalogue of reviews grows.
 */
export default function MoreFromRoaster({
  roaster,
  beans,
}: {
  roaster: string;
  beans: PostMeta<BeanFrontmatter>[];
}) {
  if (beans.length === 0) return null;

  return (
    <div className="pt-2 print:hidden">
      <span className="stat-label mb-2 block">More from {roaster}</span>
      <div className="space-y-2">
        {beans.map((bean) => (
          <BeanLink key={bean.slug} bean={bean} />
        ))}
      </div>
    </div>
  );
}
