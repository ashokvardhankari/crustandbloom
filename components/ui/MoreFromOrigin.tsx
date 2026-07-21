import type { PostMeta, BeanFrontmatter } from "@/lib/types";
import BeanLink from "./BeanLink";

/**
 * Sidebar block on a bean review that links to other beans reviewed from the
 * same origin. Origin (the growing country/region) is the strongest signal for
 * "I liked this — show me more like it", and it crosses roaster lines, so two
 * Ethiopian bags from different roasters connect here even though the "More from
 * this roaster" block never links them. Server-renderable (no client boundary).
 * Renders nothing when no sibling shares the origin, so it scales in as the
 * shelf grows.
 */
export default function MoreFromOrigin({
  origin,
  beans,
}: {
  origin: string;
  beans: PostMeta<BeanFrontmatter>[];
}) {
  if (beans.length === 0) return null;

  return (
    <div className="pt-2">
      <span className="stat-label mb-2 block">More from {origin}</span>
      <div className="space-y-2">
        {beans.map((bean) => (
          <BeanLink key={bean.slug} bean={bean} />
        ))}
      </div>
    </div>
  );
}
