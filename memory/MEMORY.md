# Crust & Bloom — Project Memory

## Overview
Personal content site: specialty coffee + artisan sourdough bread.
Tech: Next.js 14 (App Router), TypeScript, Tailwind CSS, next-mdx-remote v5, gray-matter.

## Key Files
- `lib/content.ts` — all content loaders (getAllPostsMeta, getCoffeePost, getBreadPost, etc.)
- `lib/types.ts` — CoffeeFrontmatter, BreadFrontmatter, PostMeta<T>
- `lib/utils.ts` — cn(), formatDate(), getCategoryLabel()
- `components/mdx/MDXComponents.tsx` — custom MDX component map
- `components/ui/FilterBar.tsx` — client component for inclusion loaf filtering

## Content Structure
- `content/coffee/*.mdx` — coffee posts
- `content/bread/classic/*.mdx` — classic sourdough
- `content/bread/inclusions/*.mdx` — inclusion loaves (flavorProfile: savory|sweet|spicy)

## Design Tokens
- Amber: #E8A838 | Blush: #E8C4A0 | Terracotta: #C4623A
- Cream bg: #FAF5EE | Espresso text: #1E1208
- Font: Plus Jakarta Sans via --font-jakarta CSS variable

## Build Notes
- Node.js installed via Homebrew (not in default PATH — use `export PATH="/opt/homebrew/bin:$PATH"`)
- next.config must be `.mjs` not `.ts` (Next.js 14 constraint)
- @tailwindcss/typography required for `prose` classes
- Placeholder images in public/images/ are valid PNG files named .jpg (browsers handle this fine)

## Sample Content (6 posts)
- coffee: honey-lavender-latte, classic-cappuccino
- bread/classic: country-sourdough
- bread/inclusions: parmesan-rosemary (savory), dark-chocolate-cherry (sweet), calabrian-chili-cheddar (spicy)
