/* Discipline — Habit Wheel service worker (v5: always-fresh) */
const CACHE = "disc-v5";
const CORE = ["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","icon-180.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", e => { if (e.data === "skipWaiting") self.skipWaiting(); });

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // Firebase, fonts -> straight to network

  const isDoc = req.mode === "navigate" || req.destination === "document" ||
                url.pathname.endsWith("/") || url.pathname.endsWith("index.html");

  // The app shell is always fetched fresh when online; cache is only an offline fallback.
  if (isDoc) {
    e.respondWith(
      fetch(req)
        .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put("index.html", copy)); return res; })
        .catch(() => caches.match("index.html").then(r => r || caches.match("./")))
    );
    return;
  }

  // Other same-origin assets (icons, manifest): cache-first, refresh in background.
  e.respondWith(
    caches.match(req).then(hit => {
      const net = fetch(req).then(res => {
        if (res && res.status === 200) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
