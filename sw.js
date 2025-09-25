const CACHE_NAME = 'opsec-timer-cache-v1';
const URLS_TO_CACHE = [
    '/',
    '/index.html'
];

// Evento de instalación: se abre el caché y se guardan los archivos principales
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(URLS_TO_CACHE);
            })
    );
});

// Evento fetch: intercepta las peticiones de red
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si el archivo está en caché, lo devuelve. Si no, lo busca en la red.
                return response || fetch(event.request);
            })
    );
});