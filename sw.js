// Service Worker for basic PWA functionality
const CACHE_NAME = 'portafolio-artistico-v1.0.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/galeria.html',
    '/sobre-mi.html',
    '/blog.html',
    '/contacto.html',
    '/css/styles.css',
    '/js/main.js',
    '/js/events.js',
    '/js/galeria.js',
    '/js/chatbot.js'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('📦 Service Worker: Cached resources');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Return cached version or fetch from network
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Service Worker: Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Background sync for form submissions when offline
self.addEventListener('sync', function(event) {
    if (event.tag === 'contact-form-sync') {
        event.waitUntil(
            // Handle offline form submissions
            console.log('📧 Service Worker: Syncing contact form data')
        );
    }
});

// Push notification handling
self.addEventListener('push', function(event) {
    if (event.data) {
        const options = {
            body: event.data.text(),
            icon: '/images/icon-192x192.png',
            badge: '/images/badge-72x72.png',
            vibrate: [200, 100, 200],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
            }
        };
        
        event.waitUntil(
            self.registration.showNotification('Portafolio Artístico', options)
        );
    }
});