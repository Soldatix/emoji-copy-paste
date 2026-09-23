import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";

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


function createDeferred() {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}

function createServiceWorkerHarness({
  fetchImpl,
  initialEntries = [],
  beforePut,
} = {}) {
  const origin = "https://emoji.appsandgames.org";
  const listeners = new Map();
  const entries = new Map();

  const toKey = (request) => {
    const value =
      typeof request === "string"
        ? request
        : request?.url || String(request);
    return new URL(value, origin).href;
  };

  for (const [request, response] of initialEntries) {
    entries.set(toKey(request), response.clone());
  }

  const cache = {
    async match(request) {
      return entries.get(toKey(request))?.clone();
    },
    async put(request, response) {
      if (beforePut) await beforePut(toKey(request), response);
      entries.set(toKey(request), response.clone());
    },
  };

  const cachesApi = {
    async open() {
      return cache;
    },
    async match(request) {
      return cache.match(request);
    },
    async keys() {
      return ["emoji-vita-shell-v1"];
    },
    async delete() {
      return true;
    },
  };

  const selfObject = {
    location: { origin },
    clients: { claim: async () => {} },
    skipWaiting: async () => {},
    addEventListener(type, listener) {
      listeners.set(type, listener);
    },
  };

  runInNewContext(serviceWorkerSource, {
    self: selfObject,
    caches: cachesApi,
    fetch: fetchImpl || (async () => {
      throw new Error("network unavailable");
    }),
    URL,
    Response,
    Set,
    Promise,
  });

  function dispatchFetch(request) {
    const waitUntilPromises = [];
    let responsePromise;

    listeners.get("fetch")({
      request,
      waitUntil(promise) {
        waitUntilPromises.push(Promise.resolve(promise));
      },
      respondWith(promise) {
        responsePromise = Promise.resolve(promise);
      },
    });

    return { responsePromise, waitUntilPromises };
  }

  return { cache, dispatchFetch };
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
      src: "/pwa-maskable-512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "maskable",
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
  assert.deepEqual(readPngDimensions("pwa-maskable-512.png"), {
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

test("static-file navigation cannot overwrite the cached root HTML fallback", async () => {
  const rootHtml = new Response("<!doctype html><title>Emoji</title>", {
    status: 200,
    headers: { "content-type": "text/html; charset=utf-8" },
  });

  let offline = false;
  const harness = createServiceWorkerHarness({
    initialEntries: [["/", rootHtml]],
    fetchImpl: async (request) => {
      if (offline) throw new Error("offline");

      if (new URL(request.url).pathname === "/pwa-icon-192.png") {
        return new Response("png-bytes", {
          status: 200,
          headers: { "content-type": "image/png" },
        });
      }

      throw new Error("unexpected request");
    },
  });

  const imageNavigation = harness.dispatchFetch({
    method: "GET",
    mode: "navigate",
    destination: "",
    url: "https://emoji.appsandgames.org/pwa-icon-192.png",
  });
  const imageResponse = await imageNavigation.responsePromise;
  assert.equal(imageResponse.headers.get("content-type"), "image/png");

  offline = true;
  const rootNavigation = harness.dispatchFetch({
    method: "GET",
    mode: "navigate",
    destination: "",
    url: "https://emoji.appsandgames.org/",
  });
  const offlineResponse = await rootNavigation.responsePromise;

  assert.match(
    offlineResponse.headers.get("content-type") || "",
    /^text\/html\b/i,
  );
  assert.match(await offlineResponse.text(), /<title>Emoji<\/title>/);
});

test("cached static responses keep background refresh alive through cache write", async () => {
  const network = createDeferred();
  const putStarted = createDeferred();
  const allowPut = createDeferred();

  const harness = createServiceWorkerHarness({
    initialEntries: [
      [
        "/assets/app.js",
        new Response("old", {
          status: 200,
          headers: { "content-type": "text/javascript" },
        }),
      ],
    ],
    fetchImpl: () => network.promise,
    beforePut: async (key) => {
      if (key.endsWith("/assets/app.js")) {
        putStarted.resolve();
        await allowPut.promise;
      }
    },
  });

  const event = harness.dispatchFetch({
    method: "GET",
    mode: "no-cors",
    destination: "script",
    url: "https://emoji.appsandgames.org/assets/app.js",
  });

  assert.equal(event.waitUntilPromises.length, 1);

  const cachedResponse = await event.responsePromise;
  assert.equal(await cachedResponse.text(), "old");

  let lifetimeSettled = false;
  event.waitUntilPromises[0].then(() => {
    lifetimeSettled = true;
  });

  network.resolve(
    new Response("new", {
      status: 200,
      headers: { "content-type": "text/javascript" },
    }),
  );

  await putStarted.promise;
  await Promise.resolve();
  assert.equal(
    lifetimeSettled,
    false,
    "waitUntil should remain pending until cache.put completes",
  );

  allowPut.resolve();
  await event.waitUntilPromises[0];
  assert.equal(lifetimeSettled, true);

  const refreshed = await harness.cache.match("/assets/app.js");
  assert.equal(await refreshed.text(), "new");
});
