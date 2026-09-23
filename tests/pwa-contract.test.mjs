import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const manifest = JSON.parse(
  readFileSync(join(projectRoot, "public/manifest.webmanifest"), "utf8"),
);
const layoutSource = readFileSync(join(projectRoot, "app/layout.tsx"), "utf8");

test("PWA manifest defines the Emoji app identity and standalone launch scope", () => {
  assert.equal(manifest.name, "Emoji Copy & Paste");
  assert.equal(manifest.short_name, "Emoji");
  assert.equal(manifest.id, "/");
  assert.equal(manifest.start_url, "/");
  assert.equal(manifest.scope, "/");
  assert.equal(manifest.display, "standalone");
  assert.equal(manifest.lang, "en");
});

test("PWA manifest defines stable theme colors and a scalable icon", () => {
  assert.equal(manifest.background_color, "#ffffff");
  assert.equal(manifest.theme_color, "#0C79D8");
  assert.deepEqual(manifest.icons, [
    {
      src: "/favicon.svg",
      sizes: "any",
      type: "image/svg+xml",
      purpose: "any",
    },
  ]);
});

test("root metadata links the web manifest and exposes PWA browser metadata", () => {
  assert.match(layoutSource, /manifest:\s*["']\/manifest\.webmanifest["']/);
  assert.match(layoutSource, /appleWebApp:\s*\{/);
  assert.match(layoutSource, /capable:\s*true/);
  assert.match(layoutSource, /themeColor:\s*["']#0C79D8["']/);
});
