/* Daily Simple Planner — service worker
   Strategia: cache-first per il guscio dell'app, con aggiornamento in background.
   Cambia CACHE ad ogni nuova versione per forzare l'aggiornamento. */
const CACHE = "dsp-v4";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-96.png",
  "./icon-144.png",
  "./icon-180.png",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  e.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          // memorizza una copia (incl. i font Google) per l'uso offline
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => {
          // fallback: se navigazione offline e non in cache, mostra l'app
          if (req.mode === "navigate") return caches.match("./index.html");
        });
    })
  );
});
