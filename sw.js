// Bump the cache name to force the service worker to update its cached files
// Whenever you make changes to cached assets (like index.html),
// you should increment this version string. This ensures that
// browsers will fetch the new version and discard the old cache.
const CACHE_NAME = 'coin-game-cache-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
  // إذا كان لديك ملفات إضافية (صور، أصوات...) أضفها هنا بنفس الشكل
];

// تثبيت الـ Service Worker وتخزين الملفات في الكاش
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// تفعيل وحذف الكاشات القديمة إذا وجدت
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(
        names.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// جلب الملفات (أولاً من الكاش ثم من الإنترنت إذا لم توجد)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});