const CACHE_PREFIX = "emoji-vita-";
const CACHE_NAME = `${CACHE_PREFIX}shell-v1`;
const CORE_URLS = [
  "/",
  "/manifest.webmanifest",
  "/favicon.svg",
  "/pwa-icon-192.png",
  "/pwa-icon-512.png",
];

const STATIC_DESTINATIONS = new Set([
  "script",
  "style",
  "image",
  "font",
  "worker",
]);

async function cacheResponse(cache, request, response) {
  if (response?.ok) {
    await cache.put(request, response.clone());
  }
  return response;
}

async function warmAppShell() {
  const cache = await caches.open(CACHE_NAME);

  await Promise.allSettled(
    CORE_URLS.map(async (url) => {
      const response = await fetch(url, { cache: "reload" });
      await cacheResponse(cache, url, response);
    }),
  );

  const rootResponse = await cache.match("/");
  if (!rootResponse) return;

  const html = await rootResponse.text();
  const assetUrls = new Set(
    [...html.matchAll(/(?:src|href)=["'](\/[^"'#]+)["']/g)].map(
      (match) => match[1],
    ),
  );

  await Promise.allSettled(
    [...assetUrls].map(async (url) => {
      const response = await fetch(url, { cache: "reload" });
      await cacheResponse(cache, url, response);
    }),
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    warmAppShell().then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();

      await Promise.all(
        cacheNames
          .filter(
            (name) => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME,
          )
          .map((name) => caches.delete(name)),
      );

      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(async (response) => {
          const contentType = response.headers.get("content-type") || "";
          const isRootHtml =
            url.pathname === "/" &&
            url.search === "" &&
            response.ok &&
            contentType.toLowerCase().includes("text/html");

          if (isRootHtml) {
            const cache = await caches.open(CACHE_NAME);
            await cache.put("/", response.clone());
          }

          return response;
        })
        .catch(async () => {
          const cached = await caches.match("/");
          return cached || Response.error();
        }),
    );
    return;
  }

  if (!STATIC_DESTINATIONS.has(request.destination)) return;

  const refresh = fetch(request).then(async (response) => {
    const cache = await caches.open(CACHE_NAME);
    await cacheResponse(cache, request, response);
    return response;
  });

  event.waitUntil(
    refresh.then(
      () => undefined,
      () => undefined,
    ),
  );

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return refresh.catch(() => Response.error());
    }),
  );
});
