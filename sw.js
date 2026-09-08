const CACHE_NAME = "gss-cache-v1";
const ASSETS_TO_CACHE = [
  "index.html",
  "a-propos.html",
  "poles.html",
  "moyens-action.html",
  "conseil-coaching.html",
  "direction.html",
  "contact.html",
  "styles.css",
  "script.js",
  "logo.png",
  "portrait.png",
  "icon-192.png",
  "icon-512.png",
  "manifest.json"
];

// Install: pre-cache the core pages and assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch: serve from cache first, fall back to network, and cache new pages as they're visited
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkFetch = fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return response;
        })
        .catch(() => cached);

      return cached || networkFetch;
    })
  );
});
