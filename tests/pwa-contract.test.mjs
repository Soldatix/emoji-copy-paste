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
const providersSource = readFileSync(
  join(projectRoot, "app/providers.tsx"),
  "utf8",
);
const serviceWorkerSource = readFileSync(
  join(projectRoot, "public/sw.js"),
  "utf8",
);

function readPngDimensions(fileName) {
  const png = readFileSync(join(projectRoot, "public", fileName));
  assert.deepEqual(
    [...png.subarray(0, 8)],
    [137, 80, 78, 71, 13, 10, 26, 10],
    `${fileName} should be a PNG file`,
  );

  return {
    width: png.readUInt32BE(16),
    height: png.readUInt32BE(20),
  };
}

test("PWA manifest defines the Emoji app identity and standalone launch scope", () => {
  assert.equal(manifest.name, "Emoji Copy & Paste");
  assert.equal(manifest.short_name, "Emoji");
  assert.equal(manifest.id, "/");
  assert.equal(manifest.start_url, "/");
  assert.equal(manifest.scope, "/");
  assert.equal(manifest.display, "standalone");
  assert.equal(manifest.lang, "en");
});

test("PWA manifest defines stable theme colors and compatible icons", () => {
  assert.equal(manifest.background_color, "#ffffff");
  assert.equal(manifest.theme_color, "#0C79D8");

  for (const expected of [
    {
      src: "/pwa-icon-192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "any",
    },
    {
      src: "/pwa-icon-512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any",
    },
    {
      src: "/favicon.svg",
      sizes: "any",
      type: "image/svg+xml",
      purpose: "any",
    },
  ]) {
    assert.ok(
      manifest.icons.some(
        (icon) =>
          icon.src === expected.src &&
          icon.sizes === expected.sizes &&
          icon.type === expected.type &&
          icon.purpose === expected.purpose,
      ),
      `manifest should include ${expected.src}`,
    );
  }

  assert.deepEqual(readPngDimensions("pwa-icon-192.png"), {
    width: 192,
    height: 192,
  });
  assert.deepEqual(readPngDimensions("pwa-icon-512.png"), {
    width: 512,
    height: 512,
  });
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

test("production client registers the service worker as progressive enhancement", () => {
  assert.match(providersSource, /process\.env\.NODE_ENV !== "production"/);
  assert.match(providersSource, /"serviceWorker" in navigator/);
  assert.match(
    providersSource,
    /navigator\.serviceWorker[\s\S]*?\.register\("\/sw\.js",\s*\{[\s\S]*?scope:\s*"\/"[\s\S]*?updateViaCache:\s*"none"/,
  );
  assert.match(providersSource, /\.catch\(\(\) => \{/);
});

test("service worker provides conservative same-origin offline caching", () => {
  assert.doesNotThrow(
    () => new Function(serviceWorkerSource),
    "service worker source should parse as classic JavaScript",
  );
  assert.match(serviceWorkerSource, /self\.addEventListener\("install"/);
  assert.match(serviceWorkerSource, /self\.addEventListener\("activate"/);
  assert.match(serviceWorkerSource, /self\.addEventListener\("fetch"/);
  assert.match(serviceWorkerSource, /request\.method !== "GET"/);
  assert.match(serviceWorkerSource, /url\.origin !== self\.location\.origin/);
  assert.match(serviceWorkerSource, /request\.mode === "navigate"/);
  assert.match(serviceWorkerSource, /caches\.match\("\/"\)/);
  assert.match(serviceWorkerSource, /STATIC_DESTINATIONS\.has\(request\.destination\)/);
  assert.doesNotMatch(serviceWorkerSource, /addEventListener\(["']push["']/);
});
