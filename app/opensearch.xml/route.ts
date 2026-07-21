import { SITE_URL, SITE_NAME } from "@/lib/seo";

export const dynamic = "force-static";

/** Escape the five XML predefined entities so brand text like "Crust & Bloom" stays well-formed. */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * OpenSearch description document (https://github.com/dewitt/opensearch).
 *
 * Lets a browser discover and add Crust & Bloom's own search engine to its
 * address/search bar (the "Add Crust & Bloom" affordance browsers surface when
 * a page advertises `<link rel="search" type="application/opensearchdescription+xml">`).
 * This is the browser-facing counterpart to the WebSite `SearchAction` JSON-LD
 * (which advertises the same `/search?q=` deep-link to search engines): both
 * point at the client-side search page, which already seeds its query from the
 * `?q=` param, so a search launched from the browser bar lands on live results
 * with no extra JS.
 *
 * `ShortName` is kept to the spec's 16-character limit; the `&` is XML-escaped.
 * Two `Image` elements are offered so a browser can pick the format it supports:
 * the scalable site favicon (honest at any size, declared 16×16) and the square
 * brand PNG at its true 480×480 dimensions.
 */
export function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/" xmlns:moz="http://www.mozilla.org/2006/browser/search/">
  <ShortName>${escapeXml(SITE_NAME)}</ShortName>
  <Description>Search every ${escapeXml(SITE_NAME)} recipe, bean review, and newsletter issue.</Description>
  <InputEncoding>UTF-8</InputEncoding>
  <Image width="16" height="16" type="image/svg+xml">${SITE_URL}/icon.svg</Image>
  <Image width="480" height="480" type="image/png">${SITE_URL}/images/site/logo-email.png</Image>
  <Url type="text/html" method="get" template="${SITE_URL}/search?q={searchTerms}"/>
  <Url type="application/opensearchdescription+xml" rel="self" template="${SITE_URL}/opensearch.xml"/>
  <moz:SearchForm>${SITE_URL}/search</moz:SearchForm>
</OpenSearchDescription>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/opensearchdescription+xml; charset=utf-8",
    },
  });
}
