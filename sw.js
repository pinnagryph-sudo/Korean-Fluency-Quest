// ═══════════════════════════════════════════════════════════════
// KOREAN FLUENCY QUEST - Service Worker
// Handles offline caching and PWA functionality
// ═══════════════════════════════════════════════════════════════

const CACHE_NAME = 'korean-fluency-quest-v2.0.1';

// Files to cache for offline use
const CACHE_FILES = [
  './',
  './index.html',
  './styles.css',
  './utils-helpers.js',
  './utils-srs.js',
  './utils-audio.js',
  './data-vocabulary.js',
  './data-sentences.js',
  './data-levels.js',
  './data-grammar.js',
  './app.jsx',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
];

// External resources to cache
const EXTERNAL_CACHE = [
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  'https://unpkg.com/@babel/standalone/babel.min.js',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&family=Outfit:wght@400;500;600;700&display=swap',
];

// ═══════════════════════════════════════════════════════════════
// INSTALL EVENT - Cache all files
// ═══════════════════════════════════════════════════════════════

self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching app shell...');
        
        // Cache local files
        const localPromise = cache.addAll(CACHE_FILES).catch(err => {
          console.warn('[SW] Failed to cache some local files:', err);
        });
        
        // Cache external resources (don't fail if these fail)
        const externalPromise = Promise.all(
          EXTERNAL_CACHE.map(url => 
            cache.add(url).catch(err => {
              console.warn('[SW] Failed to cache external resource:', url);
            })
          )
        );
        
        return Promise.all([localPromise, externalPromise]);
      })
      .then(() => {
        console.log('[SW] Installation complete!');
        return self.skipWaiting();
      })
  );
});

// ═══════════════════════════════════════════════════════════════
// ACTIVATE EVENT - Clean up old caches
// ═══════════════════════════════════════════════════════════════

self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Activation complete!');
        return self.clients.claim();
      })
  );
});

// ═══════════════════════════════════════════════════════════════
// FETCH EVENT - Serve from cache, fallback to network
// ═══════════════════════════════════════════════════════════════

self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip chrome-extension and other non-http(s) requests
  if (!event.request.url.startsWith('http')) return;
  
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached response if available
        if (cachedResponse) {
          // Fetch updated version in background (stale-while-revalidate)
          event.waitUntil(
            fetch(event.request)
              .then((response) => {
                if (response && response.status === 200) {
                  const responseToCache = response.clone();
                  caches.open(CACHE_NAME)
                    .then((cache) => cache.put(event.request, responseToCache));
                }
              })
              .catch(() => {/* Ignore network errors during background fetch */})
          );
          
          return cachedResponse;
        }
        
        // Not in cache, fetch from network
        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Cache successful responses
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => cache.put(event.request, responseToCache));
            
            return response;
          })
          .catch(() => {
            // Network failed and not in cache
            // Return offline fallback for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match('./index.html');
            }
            
            // For other requests, just fail
            return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
          });
      })
  );
});

// ═══════════════════════════════════════════════════════════════
// MESSAGE EVENT - Handle messages from main thread
// ═══════════════════════════════════════════════════════════════

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

console.log('[SW] Service Worker loaded');
