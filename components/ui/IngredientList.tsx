/**
 * A scannable "What you'll need" ingredient list for recipe pages. Coffee
 * recipes carry no formula table (unlike bread), so their ingredients otherwise
 * live only inside the narrative prose — this surfaces them up front and also
 * lets the page feed `recipeIngredient` into the Recipe JSON-LD. Renders nothing
 * when a post has no ingredients listed. Kept visible in print (it belongs on a
 * recipe printout).
 */
interface IngredientListProps {
  items?: string[];
  heading?: string;
}

export default function IngredientList({
  items,
  heading = "What you'll need",
}: IngredientListProps) {
  if (!items || items.length === 0) return null;
  return (
    <section
      aria-labelledby="ingredients-heading"
      className="mb-10 rounded-2xl border border-blush/50 bg-cream/40 p-6 print:bg-transparent print:border-espresso/20"
    >
      <h2
        id="ingredients-heading"
        className="text-xs font-semibold uppercase tracking-widest text-espresso-muted mb-4"
      >
        {heading}
      </h2>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-espresso leading-snug">
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
