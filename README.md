# Crust & Bloom

A personal content site about specialty coffee and artisan sourdough bread. Photo-forward, statically generated, no CMS or database.

## Stack

- **Next.js 14** — App Router, static generation (`generateStaticParams`)
- **TypeScript**
- **Tailwind CSS v3** — custom design tokens, keyframe animations
- **next-mdx-remote v5** (`next-mdx-remote/rsc`) — MDX rendering in React Server Components
- **gray-matter** — frontmatter-only parsing for index/archive pages
- **Plus Jakarta Sans** — loaded via `next/font/google`

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

No test suite.

## Content

All posts are MDX files. No code changes are needed to add new posts — drop a file in the right folder and the routes pick it up automatically.

```
content/
├── coffee/                  # *.mdx — one file per drink
└── bread/
    ├── classic/             # *.mdx — plain sourdough loaves
    └── inclusions/          # *.mdx — loaves with mix-ins (cheese, chocolate, etc.)
```

### Coffee frontmatter

```yaml
title: "..."
date: "YYYY-MM-DD"
type: "coffee"
category: "latte" | "cappuccino" | "espresso" | "filter"
coverImage: "/images/coffee/filename.jpg"
images:
  - "/images/coffee/filename.jpg"
  - "/images/coffee/filename-2.jpg"
brewRatio: "1:2"
extractionTime: "25s"
milkTemp: "60°C"          # optional
tags: [...]
excerpt: "..."
```

### Bread frontmatter

```yaml
title: "..."
date: "YYYY-MM-DD"
type: "bread"
category: "classic" | "inclusion"
flavorProfile: "savory" | "sweet" | "spicy"   # inclusions only
coverImage: "/images/bread/filename.jpg"
images:
  - "/images/bread/filename.jpg"
  - "/images/bread/filename-crumb.jpg"
hydration: 78
starterPercentage: 20
bulkFermentation: "5 hours at 76°F"
bakeTemp: "500°F"
inclusions:               # optional
  - "ingredient, amount"
tastingNotes: "..."
excerpt: "..."
```

## Images

Static images live in `public/images/{coffee,bread,site}/`. To replace an image, overwrite the file and clear the Next.js cache:

```bash
rm -rf .next/cache/images
```

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero, latest posts, category panels, FAQ, newsletter |
| `/coffee` | All coffee posts |
| `/coffee/[slug]` | Individual drink — MDX body + brew specs sidebar |
| `/bread` | Classic loaves + filterable inclusions grid |
| `/bread/[slug]` | Individual loaf — MDX body + bake stats sidebar |
| `/gallery` | Masonry grid of all images from all posts |
| `/about` | About page |
| `/api/newsletter` | Stub POST endpoint (returns 200) |
