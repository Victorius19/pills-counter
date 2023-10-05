'use strict';

const CACHE_NAME = 'static-cache-v2';
const FILES_TO_CACHE = [
    './apple-splash-1125-2436.jpg',
    './apple-splash-1136-640.jpg',
    './apple-splash-1242-2208.jpg',
    './apple-splash-1242-2688.jpg',
    './apple-splash-1334-750.jpg',
    './apple-splash-1536-2048.jpg',
    './apple-splash-1668-2224.jpg',
    './apple-splash-1668-2388.jpg',
    './apple-splash-1792-828.jpg',
    './apple-splash-2048-1536.jpg',
    './apple-splash-2048-2732.jpg',
    './apple-splash-2208-1242.jpg',
    './apple-splash-2224-1668.jpg',
    './apple-splash-2388-1668.jpg',
    './apple-splash-2436-1125.jpg',
    './apple-splash-2688-1242.jpg',
    './apple-splash-2732-2048.jpg',
    './apple-splash-640-1136.jpg',
    './apple-splash-750-1334.jpg',
    './apple-splash-828-1792.jpg',
    './icon-192x192.png',
    './icon-512x512.png',
    'index.html',
    './blueCat.svg',
    './yellowCat.svg',
    './main.js',
    './main.js.map',
    './manifest.json',
    './service-worker.js',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
];

// Install service worker and cache all content
self.addEventListener('install', e => e.waitUntil(
  caches.open(CACHE_NAME).then(c => c.addAll(FILES_TO_CACHE))));

// Fetch content from cache if available for 
// offline support and cache new resources if available
self.addEventListener('fetch', e => e.respondWith(
  caches.match(e.request).then((r) => {
    return r || fetch(e.request).then((res) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(e.request, res.clone());
        return res;
      })
    })
  })
));

// Clean up old caches
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
      if(CACHE_NAME.indexOf(key) === -1) {
        return caches.delete(key);
      }
    }));
  })
));