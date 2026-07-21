/**
 * Standard security response headers applied to every route.
 *
 * The site shipped with none of these, leaving a static content site without the
 * baseline hardening most production hosts expect. All of the values below are
 * non-breaking for a purely-GET content site (no cross-origin embedding, no
 * powerful browser APIs, no third-party framing), so they add defence-in-depth
 * without touching how any page renders. A Content-Security-Policy is
 * deliberately omitted: Next.js injects inline bootstrap scripts/styles, so a
 * safe CSP needs per-request nonces (middleware) rather than a static header,
 * and a wrong CSP silently breaks hydration — out of scope for a config-only,
 * verifiable change.
 */
const securityHeaders = [
  // Force HTTPS for two years incl. subdomains. `preload` is intentionally left
  // off: submitting to the browser preload list is hard to reverse, and the
  // reversible max-age form already delivers the protection.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  // Stop browsers MIME-sniffing a response into a different content type.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Clickjacking protection: the site is never meant to be framed elsewhere.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Send only the origin (not the full path/query) on cross-origin navigations.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Opt out of powerful features the site never uses, plus Google's Topics API.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
