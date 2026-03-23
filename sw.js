// v4 — force update, clear all old caches
const CACHE = 'kitchen-v4';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Always network first, no caching
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => new Response('Offline', { status: 503 }))
  );
});
