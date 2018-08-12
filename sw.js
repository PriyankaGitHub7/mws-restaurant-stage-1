self.addEventListener('fetch', function(event) {
  var requestUrl = new URL(event.request.url);

  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname === '/') {
      event.respondWith(caches.match('/'));
      return;
    }
  }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('restaurants-v3').then(function(cache) {
        return cache.addAll([
        '/',
        'js/main.js',
        'css/styles.css',
        'js/dbhelper.js'
        ]);
      })
    );
});