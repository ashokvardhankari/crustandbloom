import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

// Organic green/cream palette — Galatea-inspired redesign
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
        // amber → leaf/herb green — buttons, highlights
        amber: {
          DEFAULT: "#4A8C3C",
          light:   "#6AAE58",
          dark:    "#327028",
        },
        // blush → soft sage — pill backgrounds, subtle surfaces
        blush: {
          DEFAULT: "#C4DEB8",
          light:   "#D8EED0",
          dark:    "#A4C898",
        },
        // terracotta → forest green — links, interactive text
        terracotta: {
          DEFAULT: "#3A6E42",
          light:   "#5A9060",
          dark:    "#266030",
        },
        // cream → warm off-white — page background
        cream: {
          DEFAULT: "#F7F4EC",
          dark:    "#EDE8D8",
        },
        // espresso → deep forest green — body text, dark sections
        espresso: {
          DEFAULT: "#1C2B1E",
          light:   "#2E4A30",
          muted:   "#6A7D68",
        },

        // ── Full palette tokens ────────────────────────────────────────────
        sage:     { DEFAULT: "#7BAE6A", light: "#9CC88E", dark: "#5A8C50" },
        lemon:    { DEFAULT: "#D8D870", light: "#E8E898", dark: "#B8B848" },
        peach:    { DEFAULT: "#E0C870", light: "#ECD898", dark: "#C4A840" },
        rose:     { DEFAULT: "#C8A488", light: "#DCBCAA", dark: "#A88060" },
        petal:    { DEFAULT: "#EAE0D0", light: "#F4EEE4", dark: "#D4C8A8" },
        lavender: { DEFAULT: "#B8CCA8", light: "#CCE0BC", dark: "#9AB888" },
        mist:     { DEFAULT: "#C0D8B0", light: "#D4ECCC", dark: "#9EC090" },
        sand:     { DEFAULT: "#E8DCC0", light: "#F4EED8", dark: "#D0C498" },
        dune:     { DEFAULT: "#C4B880", light: "#D8CC9C", dark: "#A49C60" },
        ash:      { DEFAULT: "#D4D0C0", light: "#E4E0D4", dark: "#B8B4A0" },
      },
      fontFamily: {
        jakarta: ["var(--font-jakarta)", "sans-serif"],
      },
      keyframes: {
        fadeInUp: {
          "0%":   { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-14px)" },
        },
      },
      animation: {
        "fade-in-up":      "fadeInUp 0.75s ease-out both",
        "float":           "float 4s ease-in-out infinite",
        "float-slow":      "float 5.5s ease-in-out infinite",
        "float-delayed":   "float 4.5s ease-in-out infinite 1.5s",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#1C2B1E",
            a: { color: "#3A6E42", "&:hover": { color: "#266030" } },
            h1: { color: "#1C2B1E", fontFamily: "var(--font-jakarta)" },
            h2: { color: "#1C2B1E", fontFamily: "var(--font-jakarta)" },
            h3: { color: "#1C2B1E", fontFamily: "var(--font-jakarta)" },
            strong: { color: "#1C2B1E" },
            blockquote: {
              borderLeftColor: "#C4DEB8",
              color: "#2E4A30",
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
