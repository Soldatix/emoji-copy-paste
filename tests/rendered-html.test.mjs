import assert from "node:assert/strict";
import test from "node:test";

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

  // Document title
  assert.match(html, /<title>Emoji Copy &amp; Paste.*?Apps &amp; Games<\/title>/i);

  // Canonical URL
  assert.match(html, /<link rel="canonical" href="https:\/\/emoji\.appsandgames\.org\/"/);

  // Meta description
  assert.match(html, /<meta name="description" content="[^"]*(emoji|flags|traffic signs)[^"]*"/i);

  // Robots
  assert.match(html, /<meta name="robots" content="index, follow"/i);

  // Open Graph
  assert.match(html, /<meta property="og:title" content="Emoji Copy &amp; Paste/);
  assert.match(html, /<meta property="og:image" content="https:\/\/appsandgames\.org\/assets\/social\/emoji-copy-paste\.jpg"/);

  // Twitter Card
  assert.match(html, /<meta name="twitter:card" content="summary_large_image"/);
  assert.match(html, /<meta name="twitter:image" content="https:\/\/appsandgames\.org\/assets\/social\/emoji-copy-paste\.jpg"/);

  // JSON-LD
  assert.match(html, /<script type="application\/ld\+json">/);
  assert.match(html, /"@type":\s*"WebApplication"/);
  assert.match(html, /"name":\s*"Emoji Copy & Paste"/);
  assert.match(html, /"isAccessibleForFree":\s*true/);
  assert.match(html, /"inLanguage":\s*\["en","hr","de","it","es"\]/);
});
