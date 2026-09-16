const CACHE = 'plugtv-adsense-v3';
const FILES = ['./', './index.html', './manifest.json'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.map(k => { if(k !== CACHE) return caches.delete(k) }))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Não guarda cache dos anúncios do Google
  if(e.request.url.includes('googlesyndication') || e.request.url.includes('adsbygoogle')){
    return;
  }
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
