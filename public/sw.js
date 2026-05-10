const CACHE_NAME = "skynotes-v2";

const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/logo.png",
  // Sky background images (all 8 themes, both formats)
  "/sky-images/1-golden-sunrise.jpg",
  "/sky-images/2-bright-morning.jpg",
  "/sky-images/3-cloudy-noon.jpg",
  "/sky-images/4-golden-hour.jpg",
  "/sky-images/5-blue-hour.jpg",
  "/sky-images/6-starlit-night.jpg",
  "/sky-images/7-milky-way-night.jpg",
  "/sky-images/8-astronomical-dawn.jpg",
  // Icons
  "/web-app-manifest-192x192.png",
  "/web-app-manifest-512x512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      caches.match("/index.html").then((cached) => cached ?? fetch(request)),
    );
    return;
  }

  if (
    url.pathname.startsWith("/sky-images/") ||
    url.pathname.startsWith("/web-app-manifest")
  ) {
    event.respondWith(
      caches.match(request).then((cached) => cached ?? fetchAndCache(request)),
    );
    return;
  }

  if (
    url.pathname.startsWith("/assets/") ||
    url.pathname.endsWith(".js") ||
    url.pathname.endsWith(".css")
  ) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request)),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => cached ?? fetch(request)),
  );
});

async function fetchAndCache(request) {
  const cache = await caches.open(CACHE_NAME);
  const response = await fetch(request);
  cache.put(request, response.clone());
  return response;
}

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (
    event.request.method === "POST" &&
    url.pathname === "/" &&
    url.searchParams.has("share-target")
  ) {
    event.respondWith(
      (async () => {
        const formData = await event.request.formData();
        const title = formData.get("title") ?? "";
        const text = formData.get("text") ?? "";
        const sharedUrl = formData.get("url") ?? "";

        const body = [text, sharedUrl].filter(Boolean).join("\n");

        const redirectUrl = new URL("/", self.location.origin);
        if (title) redirectUrl.searchParams.set("share_title", title);
        if (body) redirectUrl.searchParams.set("share_text", body);

        return Response.redirect(redirectUrl.toString(), 303);
      })(),
    );
  }
});
