// Korean Fluency Quest - Service Worker v3.0.0
const CACHE_NAME = 'korean-fluency-quest-v3.0.0';

const ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.jsx',
  '/data-vocabulary.js',
  '/data-sentences.js',
  '/data-levels.js',
  '/data-grammar.js',
  '/utils-helpers.js',
  '/utils-srs.js',
  '/utils-audio.js',
  '/manifest.json',
  '/icon-72.png',
  '/icon-96.png',
  '/icon-128.png',
  '/icon-144.png',
  '/icon-152.png',
  '/icon-192.png',
  '/icon-384.png',
  '/icon-512.png'
];

// Install - cache assets
self.addEventListener('install', event => {
  console.log('Service Worker v3.0.0 installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching assets...');
        return cache.addAll(ASSETS);
      })
      .then(() => {
        console.log('Assets cached successfully');
        return self.skipWaiting();
      })
      .catch(err => console.error('Cache failed:', err))
  );
});

// Activate - clean old caches
self.addEventListener('activate', event => {
  console.log('Service Worker v3.0.0 activating...');
  event.waitUntil(
    caches.keys()
      .then(keys => {
        return Promise.all(
          keys.filter(key => key !== CACHE_NAME)
            .map(key => {
              console.log('Deleting old cache:', key);
              return caches.delete(key);
            })
        );
      })
      .then(() => {
        console.log('Old caches cleared');
        return self.clients.claim();
      })
  );
});

// Fetch - cache first, network fallback
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) {
          return cached;
        }
        return fetch(event.request)
          .then(response => {
            // Don't cache non-successful responses or non-GET requests
            if (!response || response.status !== 200 || event.request.method !== 'GET') {
              return response;
            }
            // Clone and cache
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, responseToCache));
            return response;
          });
      })
      .catch(() => {
        // Offline fallback for HTML pages
        if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('/index.html');
        }
      })
  );
});

// Listen for messages to trigger updates
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
