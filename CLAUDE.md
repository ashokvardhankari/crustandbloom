# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Rules

- **Before pushing to git, always verify the change works.** Run `npm run build` to confirm the production build passes, and check the affected pages in the dev server before committing.

## Commands

```bash
npm run dev      # Start local dev server (http://localhost:3000)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint via Next.js
```

No test suite is configured.

## Architecture

**Next.js 14 App Router** with static generation. All pages are async server components. Content is read from disk at build time — there is no database or CMS.

### Content → Page flow

1. MDX files in `content/coffee/*.mdx` or `content/bread/classic/*.mdx` / `content/bread/inclusions/*.mdx`
2. `lib/content.ts` reads files with `gray-matter` (frontmatter) + `next-mdx-remote/rsc` (MDX body)
3. Dynamic routes (`app/coffee/[slug]/page.tsx`, `app/bread/[slug]/page.tsx`) call `generateStaticParams()` to statically pre-render all posts
4. `getAllGalleryImages()` in `lib/content.ts` aggregates images from every post for the gallery page

### Key data shapes (`lib/types.ts`)

- **CoffeePost**: `brewRatio`, `extractionTime`, `milkTemp`, `category` (latte/cappuccino/espresso/filter)
- **BreadPost**: `hydration`, `starterPercentage`, `bulkFermentation`, `bakeTemp`, `inclusions[]`, `flavorProfile` (savory/sweet/spicy — inclusions only), `category` (classic | inclusion), plus optional ISO 8601 durations `prepTime`/`cookTime`/`totalTime` (e.g. `"PT1H"`, `"PT45M"`, `"PT20H"`) that feed the Recipe rich-results schema
- **BeanPost** (`content/beans/*.mdx`): coffee bean reviews. `roaster`, `origin`, `roastLevel` (light/medium-light/medium/medium-dark/dark), `rating` (0–5), `tastingNotes` (what I taste) vs `officialNotes[]` (what the bag claims), plus optional `region`, `process`, `varietal`, `altitude`, `price`, `buyUrl` (affiliate), `brewMethod`, `wouldRebuy`. `coverImage`/`images[]` are **optional** — omit them and a branded placeholder shows until you add the bag photo.
- All share: `title`, `date`, `tags[]`, `excerpt`, `type`

### Adding a new post

Drop a new `.mdx` file into the appropriate `content/` subfolder. The frontmatter schema must match the types above. No code changes needed — `generateStaticParams` picks it up automatically.

### Adding a bean review

1. Create `content/beans/<slug>.mdx`. You can publish **without a photo** — leave `coverImage` out and a placeholder shows.
2. When you have the bag shot, drop it in `public/images/beans/` and set `coverImage: "/images/beans/<slug>.jpg"` (and add more to `images[]` for the photo gallery).

Template:

```md
---
title: "Bean name"
date: "YYYY-MM-DD"
type: "bean"
roaster: "Roaster name"
origin: "Ethiopia"            # or "Blend (Latin America)"
process: "Washed"
roastLevel: "light"          # light | medium-light | medium | medium-dark | dark
price: "$18 / 12oz"
buyUrl: "https://…"           # optional affiliate link → shows a "Buy this bag" button
rating: 4.5                    # 0–5, half-steps ok
officialNotes: ["Chocolate", "Toffee"]   # what the bag claims
tastingNotes: "What I actually taste."
wouldRebuy: true
coverImage: "/images/beans/<slug>.jpg"   # optional — omit for a placeholder
images: ["/images/beans/<slug>.jpg"]      # optional
tags: ["espresso", "single origin"]
excerpt: "One-line summary for cards and search."
---

Body of the review in Markdown.
```

### Styling conventions

- **Color tokens** are defined in `tailwind.config.ts`. Semantic names map to an organic green/cream palette: `amber` (forest green), `blush` (sage), `terracotta` (dark green), `cream` (warm off-white), `espresso` (near-black). Additional tokens: `sage`, `lemon`, `peach`, `rose`, `petal`, `lavender`, `mist`, `sand`, `dune`, `ash`.
- **Category pills** use CSS utility classes defined in `app/globals.css`: `.category-pill-coffee`, `.category-pill-classic`, `.category-pill-inclusion`
- **MDX prose** uses `.prose-cb` (custom typography layer in globals.css), not the default `prose` class
- **`cn()`** from `lib/utils.ts` — use for conditional className merging (wraps `clsx` + `tailwind-merge`)
- **Scroll animations** use `<ScrollReveal>` (wraps children in an `IntersectionObserver`-driven fade/slide). Pass `delay` (ms) to stagger siblings. Hero text uses Tailwind's `animate-fade-in-up` with inline `animationDelay`.
- **Floating images** on the homepage hero use `animate-float`, `animate-float-slow`, `animate-float-delayed` keyframe classes defined in `tailwind.config.ts`.

### Client components

Five components use `"use client"`:
- `FilterBar` — flavor filter state for the bread archive page
- `NewsletterSignup` — form submission state
- `FAQAccordion` — open/close toggle state
- `ScrollReveal` — `IntersectionObserver` for scroll-triggered animations
- `MobileMenu` — hamburger toggle state

Server components pass serializable data as props to these client boundaries. All page-level data fetching stays in server components.

### Images

Static images live in `public/images/{coffee,bread,site}/`. To replace a stock image, drop a new file with the same filename into the correct folder and delete `.next/cache/images/` to clear Next.js's image optimization cache. Use `next/image` everywhere — do not use plain `<img>` tags. `next.config.mjs` also allows remote images from `images.unsplash.com` if needed.

### Font

Plus Jakarta Sans is loaded via `next/font/google` in `app/layout.tsx` and exposed as the CSS variable `--font-jakarta`, wired to `fontFamily.sans` in Tailwind.