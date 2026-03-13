import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://crustandbloom.com"),
  title: {
    default: "Crust & Bloom",
    template: "%s | Crust & Bloom",
  },
  description:
    "A personal site about specialty coffee and artisan sourdough bread — brewed, baked, and photographed by hand.",
  keywords: ["sourdough", "specialty coffee", "bread baking", "espresso", "cappuccino", "latte", "artisan bread"],
  authors: [{ name: "Crust & Bloom" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://crustandbloom.com",
    siteName: "Crust & Bloom",
    title: "Crust & Bloom",
    description:
      "A personal site about specialty coffee and artisan sourdough bread — brewed, baked, and photographed by hand.",
    images: [
      {
        url: "/images/site/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Crust & Bloom",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crust & Bloom",
    description:
      "A personal site about specialty coffee and artisan sourdough bread.",
    images: ["/images/site/og-default.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="bg-cream text-espresso font-jakarta antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
