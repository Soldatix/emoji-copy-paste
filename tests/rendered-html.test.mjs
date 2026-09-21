import assert from "node:assert/strict";
import test from "node:test";

function parseAttributes(tag) {
  const attributes = {};
  const attributePattern = /([^\s=/>]+)\s*=\s*(["'])(.*?)\2/g;

  for (const match of tag.matchAll(attributePattern)) {
    attributes[match[1].toLowerCase()] = match[3];
  }

  return attributes;
}

function findTag(html, tagName, predicate) {
  const pattern = new RegExp(`<${tagName}\\b[^>]*>`, "gi");

  for (const match of html.matchAll(pattern)) {
    const attributes = parseAttributes(match[0]);
    if (predicate(attributes)) return attributes;
  }

  return null;
}

function findJsonLd(html) {
  const pattern = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;

  for (const match of html.matchAll(pattern)) {
    const attributes = parseAttributes(`<script${match[1]}>`);
    if ((attributes.type || "").toLowerCase() === "application/ld+json") {
      return match[2];
    }
  }

  return null;
}

test("verifies production metadata and SEO contract", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );

  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "";
  assert.match(title, /Emoji Copy &amp; Paste/i);
  assert.match(title, /Apps &amp; Games/i);

  const canonical = findTag(
    html,
    "link",
    (attrs) =>
      (attrs.rel || "").toLowerCase() === "canonical" &&
      attrs.href === "https://emoji.appsandgames.org/",
  );
  assert.ok(canonical, "canonical link should match production URL");

  const description = findTag(
    html,
    "meta",
    (attrs) => (attrs.name || "").toLowerCase() === "description",
  );
  assert.ok(description, "description meta should exist");
  const descriptionContent = (description.content || "").toLowerCase();
  assert.match(descriptionContent, /emoji/);
  assert.match(descriptionContent, /flags/);
  assert.match(descriptionContent, /traffic signs/);

  const robots = findTag(
    html,
    "meta",
    (attrs) => (attrs.name || "").toLowerCase() === "robots",
  );
  assert.equal((robots?.content || "").toLowerCase(), "index, follow");

  const ogTitle = findTag(
    html,
    "meta",
    (attrs) => (attrs.property || "").toLowerCase() === "og:title",
  );
  assert.match(ogTitle?.content || "", /Emoji Copy &amp; Paste/i);

  const socialImage =
    "https://appsandgames.org/assets/social/emoji-copy-paste.jpg";

  const ogImage = findTag(
    html,
    "meta",
    (attrs) => (attrs.property || "").toLowerCase() === "og:image",
  );
  assert.equal(ogImage?.content, socialImage);

  const twitterCard = findTag(
    html,
    "meta",
    (attrs) => (attrs.name || "").toLowerCase() === "twitter:card",
  );
  assert.equal(twitterCard?.content, "summary_large_image");

  const twitterImage = findTag(
    html,
    "meta",
    (attrs) => (attrs.name || "").toLowerCase() === "twitter:image",
  );
  assert.equal(twitterImage?.content, socialImage);

  const jsonLdSource = findJsonLd(html);
  assert.ok(jsonLdSource, "JSON-LD script should exist");
  const jsonLd = JSON.parse(jsonLdSource);

  assert.equal(jsonLd["@type"], "WebApplication");
  assert.equal(jsonLd.name, "Emoji Copy & Paste");
  assert.equal(jsonLd.isAccessibleForFree, true);
  assert.deepEqual(jsonLd.inLanguage, ["en", "hr", "de", "it", "es"]);
});
