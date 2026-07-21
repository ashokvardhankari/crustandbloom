import type { MetadataRoute } from "next";

// Web App Manifest — makes the site installable to a phone/tablet home screen
// ("Add to Home Screen"), which pairs with the recipe pages' cook-mode wake lock
// for hands-free use in the kitchen. Icons are SVG (scale to any density); the
// maskable variant keeps the wheat emblem inside the safe zone for Android's
// adaptive icon shapes.
//
// `id`/`scope` give the installed app a stable identity so the browser doesn't
// treat a start_url change as a different app; `categories` help app stores /
// launchers classify it; `shortcuts` add long-press quick actions on the
// installed icon (Coffee, Bread, Search), the launcher counterpart to the
// site's primary nav — handy for jumping straight to a recipe or search from
// the home screen mid-bake.
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Crust & Bloom",
    short_name: "Crust & Bloom",
    description:
      "Specialty coffee and artisan sourdough: recipes, brews, and bean reviews.",
    start_url: "/",
    scope: "/",
    lang: "en-US",
    dir: "ltr",
    display: "standalone",
    categories: ["food", "lifestyle"],
    background_color: "#F7F4EC",
    theme_color: "#F7F4EC",
    shortcuts: [
      {
        name: "Coffee recipes",
        short_name: "Coffee",
        description: "Espresso drinks and brew guides",
        url: "/coffee",
      },
      {
        name: "Sourdough recipes",
        short_name: "Bread",
        description: "Sourdough loaves and bakes",
        url: "/bread",
      },
      {
        name: "Search the site",
        short_name: "Search",
        description: "Find a recipe, bean, or letter",
        url: "/search",
      },
    ],
    icons: [
      {
        src: "/icon-maskable.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon-maskable.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
