import type { MetadataRoute } from "next";

// Web App Manifest — makes the site installable to a phone/tablet home screen
// ("Add to Home Screen"), which pairs with the recipe pages' cook-mode wake lock
// for hands-free use in the kitchen. Icons are SVG (scale to any density); the
// maskable variant keeps the wheat emblem inside the safe zone for Android's
// adaptive icon shapes.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Crust & Bloom",
    short_name: "Crust & Bloom",
    description:
      "Specialty coffee and artisan sourdough: recipes, brews, and bean reviews.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F4EC",
    theme_color: "#F7F4EC",
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
