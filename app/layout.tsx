import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { websiteJsonLd, organizationJsonLd, FEED_ALTERNATE_TYPES, DEFAULT_OG_IMAGE } from "@/lib/seo";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://crustbloom.com"),
  title: {
    default: "Crust & Bloom",
    template: "%s | Crust & Bloom",
  },
  description:
    "A personal site about specialty coffee and artisan sourdough bread, brewed, baked, and photographed by hand.",
  keywords: ["sourdough", "specialty coffee", "bread baking", "espresso", "cappuccino", "latte", "artisan bread"],
  authors: [{ name: "Crust & Bloom" }],
  alternates: {
    types: FEED_ALTERNATE_TYPES,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://crustbloom.com",
    siteName: "Crust & Bloom",
    title: "Crust & Bloom",
    description:
      "A personal site about specialty coffee and artisan sourdough bread, brewed, baked, and photographed by hand.",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crust & Bloom",
    description:
      "A personal site about specialty coffee and artisan sourdough bread.",
    images: ["/images/site/og-default.jpg"],
  },
};

export const viewport: Viewport = {
  // Match the sticky cream header so the mobile browser toolbar blends in
  themeColor: "#F7F4EC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${fraunces.variable}`}>
      <body className="bg-cream text-espresso font-jakarta antialiased">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-terracotta focus:text-white focus:text-sm focus:font-semibold focus:rounded-full focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Navigation />
        <main id="main-content">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
