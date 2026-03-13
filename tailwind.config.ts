import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

// Palette sourced from the reference image (10 soft pastels)
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Semantic tokens (used throughout components) ─────────────────────
        // amber → dune/warm tan (DARK BROWN from palette)
        amber: {
          DEFAULT: "#D4C49C",
          light: "#E4D4B0",
          dark: "#C0AA78",
        },
        // blush → rose (RED from palette)
        blush: {
          DEFAULT: "#F9D0D8",
          light: "#FCE4EC",
          dark: "#F0B4C0",
        },
        // terracotta → warm readable brown (derived from dune, meets WCAG AA)
        terracotta: {
          DEFAULT: "#6B5228",
          light: "#8A6A40",
          dark: "#4A3818",
        },
        // cream → peach (ORANGE from palette)
        cream: {
          DEFAULT: "#FCE8C8",
          dark: "#F2DCC0",   // sand / LIGHT BROWN from palette
        },
        // espresso → deep warm brown (kept dark for text readability)
        espresso: {
          DEFAULT: "#2C1810",
          light: "#4A3020",
          muted: "#7A6040",
        },

        // ── Full image palette as named tokens ────────────────────────────────
        sage:     { DEFAULT: "#C8D9C0", light: "#D8E8D0", dark: "#A8C4A0" },
        lemon:    { DEFAULT: "#FAFACD", light: "#FCFCDF", dark: "#F0F098" },
        peach:    { DEFAULT: "#FCE8C8", light: "#FEF4E4", dark: "#F0D4A8" },
        rose:     { DEFAULT: "#F9D0D8", light: "#FCE4EC", dark: "#F0B4C0" },
        petal:    { DEFAULT: "#FAE0EB", light: "#FCF0F6", dark: "#F0C8DC" },
        lavender: { DEFAULT: "#EDD8F8", light: "#F6ECF8", dark: "#D8B8F0" },
        mist:     { DEFAULT: "#DCE8F0", light: "#EEF4F8", dark: "#C0D4E4" },
        sand:     { DEFAULT: "#F2DCC0", light: "#FAF0E0", dark: "#E0C4A0" },
        dune:     { DEFAULT: "#D4C49C", light: "#E4D4B0", dark: "#C0AA78" },
        ash:      { DEFAULT: "#E8E8E0", light: "#F4F4F0", dark: "#D0D0C8" },
      },
      fontFamily: {
        jakarta: ["var(--font-jakarta)", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#2C1810",
            a: { color: "#6B5228", "&:hover": { color: "#4A3818" } },
            h1: { color: "#2C1810", fontFamily: "var(--font-jakarta)" },
            h2: { color: "#2C1810", fontFamily: "var(--font-jakarta)" },
            h3: { color: "#2C1810", fontFamily: "var(--font-jakarta)" },
            strong: { color: "#2C1810" },
            blockquote: {
              borderLeftColor: "#D4C49C",
              color: "#4A3020",
              fontStyle: "italic",
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
