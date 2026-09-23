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
  assert.match(
    layoutSource,
    /<link\s+rel=["']manifest["']\s+href=["']\/manifest\.webmanifest["']\s*\/>/,
  );
  assert.match(
    layoutSource,
    /<meta\s+name=["']theme-color["']\s+content=["']#0C79D8["']\s*\/>/,
  );
  assert.match(
    layoutSource,
    /<meta\s+name=["']apple-mobile-web-app-capable["']\s+content=["']yes["']\s*\/>/,
  );
  assert.match(
    layoutSource,
    /<meta\s+name=["']apple-mobile-web-app-title["']\s+content=["']Emoji Copy & Paste["']\s*\/>/,
  );
  assert.match(
    layoutSource,
    /<meta\s+name=["']apple-mobile-web-app-status-bar-style["']\s+content=["']default["']\s*\/>/,
  );
});
