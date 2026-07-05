import type { Metadata } from "next";

// Keep the whole /admin area out of search engines and social crawlers.
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
