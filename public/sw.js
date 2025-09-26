const CACHE_NAME = 'award-system-v3.0';
const DATA_CACHE_NAME = 'award-system-data-v3.0';
const OFFLINE_CACHE_NAME = 'award-system-offline-v3.0';

// Static assets to cache
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/icon-192.png',
  '/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

// Dynamic assets that will be cached on first access
const DYNAMIC_CACHE_PATTERNS = [
  /\/assets\//,
  /\/static\//,
  /\.js$/,
  /\.css$/,
  /\.woff2?$/,
  /\.ttf$/,
  /\.otf$/
];

// API endpoints to cache
const API_CACHE_URLS = [
  '/api/initiatives',
  '/api/award-points',
  '/api/departments',
  '/api/statistics'
];

// Install event - cache static resources
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing v3.0...');
  
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(CACHE_NAME).then(async (cache) => {
        console.log('Service Worker: Caching static assets');
        const localUrls = STATIC_CACHE_URLS.filter(url => !url.startsWith('http'));
        
        // Cache each URL individually to handle failures gracefully
        const cachePromises = localUrls.map(async (url) => {
          try {
            const response = await fetch(url);
            if (response.ok) {
              await cache.put(url, response);
              console.log(`Service Worker: Cached ${url}`);
            }
          } catch (error) {
            console.warn(`Service Worker: Failed to cache ${url}:`, error);
          }
        });
        
        await Promise.allSettled(cachePromises);
      }),
      
      // Cache external resources separately
      caches.open(CACHE_NAME).then(async (cache) => {
        console.log('Service Worker: Caching external resources');
        const externalUrls = STATIC_CACHE_URLS.filter(url => url.startsWith('http'));
        
        const externalPromises = externalUrls.map(async (url) => {
          try {
            const response = await fetch(url, { 
              mode: 'cors',
              cache: 'default'
            });
            if (response.ok) {
              await cache.put(url, response);
              console.log(`Service Worker: Cached external ${url}`);
            }
          } catch (error) {
            console.warn(`Service Worker: Failed to cache external ${url}:`, error);
          }
        });
        
        await Promise.allSettled(externalPromises);
      }),
      
      // Create offline fallback cache
      caches.open(OFFLINE_CACHE_NAME).then(async (cache) => {
        console.log('Service Worker: Creating offline fallback');
        
        // Create offline page content
        const offlineHTML = `
          <!DOCTYPE html>
          <html lang="ar" dir="rtl">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>نظام التميز المؤسسي - وضع عدم الاتصال</title>
            <style>
              body { 
                font-family: 'Tajawal', Arial, sans-serif; 
                text-align: center; 
                padding: 50px; 
                background: linear-gradient(135deg, #c97b4c 0%, #544c48 100%);
                color: white;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
              }
              .offline-container {
                background: rgba(255,255,255,0.1);
                padding: 40px;
                border-radius: 20px;
                backdrop-filter: blur(10px);
                max-width: 500px;
              }
              h1 { color: #fff; margin-bottom: 20px; }
              p { font-size: 18px; line-height: 1.6; margin-bottom: 30px; }
              .retry-btn {
                background: #c97b4c;
                color: white;
                border: none;
                padding: 15px 30px;
                border-radius: 10px;
                font-size: 16px;
                cursor: pointer;
                transition: all 0.3s ease;
              }
              .retry-btn:hover {
                background: #b86a3d;
                transform: translateY(-2px);
              }
            </style>
          </head>
          <body>
            <div class="offline-container">
              <h1>🌐 وضع عدم الاتصال</h1>
              <p>أنت تعمل حالياً في وضع عدم الاتصال. يمكنك الاستمرار في استخدام النظام وسيتم حفظ تغييراتك محلياً.</p>
              <p>عند عودة الاتصال بالإنترنت، سيتم مزامنة جميع البيانات تلقائياً.</p>
              <button class="retry-btn" onclick="window.location.reload()">إعادة المحاولة</button>
            </div>
          </body>
          </html>
        `;
        
        await cache.put('/offline.html', new Response(offlineHTML, {
          headers: { 'Content-Type': 'text/html; charset=utf-8' }
        }));
      })
    ]).then(() => {
      console.log('Service Worker: All caches initialized successfully');
      return self.skipWaiting();
    }).catch((error) => {
      console.error('Service Worker: Cache initialization failed', error);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating v3.0...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && 
              cacheName !== DATA_CACHE_NAME && 
              cacheName !== OFFLINE_CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activated and ready');
      return self.clients.claim();
    })
  );
});

// Enhanced fetch event with different strategies for different resource types
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests except for fonts and known CDNs
  if (!request.url.startsWith(self.location.origin) && 
      !request.url.includes('fonts.googleapis.com') &&
      !request.url.includes('fonts.gstatic.com')) {
    return;
  }

  // Handle different types of requests with appropriate strategies
  if (request.method === 'GET') {
    if (isStaticAsset(request)) {
      // Cache First strategy for static assets with dynamic caching
      event.respondWith(enhancedCacheFirst(request));
    } else if (isAPIRequest(request)) {
      // Network First strategy for API requests with fallback to cache
      event.respondWith(networkFirst(request));
    } else if (isNavigationRequest(request)) {
      // Network First for navigation with offline fallback
      event.respondWith(navigationHandler(request));
    } else if (isDynamicAsset(request)) {
      // Stale While Revalidate for dynamic assets
      event.respondWith(staleWhileRevalidate(request));
    } else {
      // Default strategy
      event.respondWith(enhancedCacheFirst(request));
    }
  } else {
    // Handle POST, PUT, DELETE requests for offline functionality
    event.respondWith(handleDataRequest(request));
  }
});

// Enhanced Cache First strategy - good for static assets
async function enhancedCacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('Service Worker: Serving from cache', request.url);
      return cachedResponse;
    }

    console.log('Service Worker: Fetching from network', request.url);
    const networkResponse = await fetch(request);
    
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      // Clone response before caching
      const responseToCache = networkResponse.clone();
      cache.put(request, responseToCache);
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Service Worker: Enhanced cache first failed', error);
    
    // Try to find a fallback in offline cache
    const offlineFallback = await caches.match('/offline.html');
    if (offlineFallback && isNavigationRequest(request)) {
      return offlineFallback;
    }
    
    // Return cached main page as last resort
    return caches.match('/') || new Response('Offline', { 
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Stale While Revalidate strategy - good for dynamic assets
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  // Fetch from network in background
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(error => {
    console.warn('Service Worker: Background fetch failed', error);
    return cachedResponse;
  });
  
  // Return cached version immediately if available, otherwise wait for network
  return cachedResponse || fetchPromise;
}

// Network First strategy - good for API requests
async function networkFirst(request) {
  try {
    console.log('Service Worker: Trying network first', request.url);
    const networkResponse = await fetch(request);
    
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(DATA_CACHE_NAME);
      cache.put(request, networkResponse.clone());
      console.log('Service Worker: Cached API response', request.url);
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Network failed, trying cache', request.url);
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      console.log('Service Worker: Serving API from cache', request.url);
      return cachedResponse;
    }
    
    // Return empty data structure for API requests when offline
    return new Response(JSON.stringify([]), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Navigation handler - for page requests
async function navigationHandler(request) {
  try {
    const networkResponse = await fetch(request);
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Navigation offline, serving cached app');
    const cachedResponse = await caches.match('/');
    return cachedResponse || new Response('App offline', { status: 503 });
  }
}

// Handle data modification requests (POST, PUT, DELETE)
async function handleDataRequest(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    if (networkResponse && networkResponse.status < 400) {
      // Success - invalidate related cache entries
      await invalidateDataCache(request);
      return networkResponse;
    }
    
    return networkResponse;
  } catch (error) {
    // Network failed - store request for later sync
    console.log('Service Worker: Storing request for background sync');
    await storeFailedRequest(request);
    
    // Return a success response to prevent app errors
    return new Response(JSON.stringify({ 
      success: true, 
      offline: true,
      message: 'تم حفظ التغييرات محلياً وسيتم مزامنتها عند الاتصال بالإنترنت'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Helper functions
function isStaticAsset(request) {
  return request.url.includes('/static/') || 
         request.url.includes('/assets/') ||
         request.url.includes('.css') || 
         request.url.includes('.js') ||
         request.url.includes('.png') ||
         request.url.includes('.jpg') ||
         request.url.includes('.jpeg') ||
         request.url.includes('.gif') ||
         request.url.includes('.webp') ||
         request.url.includes('.svg') ||
         request.url.includes('.ico') ||
         request.url.includes('fonts.googleapis.com') ||
         request.url.includes('fonts.gstatic.com');
}

function isDynamicAsset(request) {
  return DYNAMIC_CACHE_PATTERNS.some(pattern => pattern.test(request.url));
}

function isAPIRequest(request) {
  return request.url.includes('/api/') || 
         request.url.includes('database') ||
         request.url.includes('data');
}

function isNavigationRequest(request) {
  return request.mode === 'navigate' || 
         (request.method === 'GET' && request.headers.get('accept').includes('text/html'));
}

async function invalidateDataCache(request) {
  const cache = await caches.open(DATA_CACHE_NAME);
  const keys = await cache.keys();
  
  // Remove related cache entries
  const relatedKeys = keys.filter(key => {
    return key.url.includes('/api/') || key.url.includes('data');
  });
  
  await Promise.all(relatedKeys.map(key => cache.delete(key)));
  console.log('Service Worker: Invalidated data cache');
}

async function storeFailedRequest(request) {
  try {
    const requestData = {
      url: request.url,
      method: request.method,
      headers: Object.fromEntries(request.headers.entries()),
      body: request.method !== 'GET' ? await request.text() : null,
      timestamp: Date.now()
    };
    
    // Store in IndexedDB for background sync
    const db = await openDB();
    const transaction = db.transaction(['failed_requests'], 'readwrite');
    const store = transaction.objectStore('failed_requests');
    await store.add(requestData);
    
    console.log('Service Worker: Stored failed request for sync');
  } catch (error) {
    console.error('Service Worker: Failed to store request', error);
  }
}

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('award_system_sync', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('failed_requests')) {
        const store = db.createObjectStore('failed_requests', { 
          keyPath: 'id', 
          autoIncrement: true 
        });
        store.createIndex('timestamp', 'timestamp');
      }
    };
  });
}

// Background sync for data synchronization
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(syncFailedRequests());
  }
});

async function syncFailedRequests() {
  try {
    const db = await openDB();
    const transaction = db.transaction(['failed_requests'], 'readonly');
    const store = transaction.objectStore('failed_requests');
    const requests = await store.getAll();
    
    console.log(`Service Worker: Syncing ${requests.length} failed requests`);
    
    for (const requestData of requests) {
      try {
        const response = await fetch(requestData.url, {
          method: requestData.method,
          headers: requestData.headers,
          body: requestData.body
        });
        
        if (response.ok) {
          // Remove successfully synced request
          const deleteTransaction = db.transaction(['failed_requests'], 'readwrite');
          const deleteStore = deleteTransaction.objectStore('failed_requests');
          await deleteStore.delete(requestData.id);
          console.log('Service Worker: Synced request', requestData.url);
        }
      } catch (error) {
        console.error('Service Worker: Failed to sync request', error);
      }
    }
  } catch (error) {
    console.error('Service Worker: Background sync failed', error);
  }
}

// Enhanced push notifications
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received');
  
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || 'إشعار جديد من نظام التميز المؤسسي',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: data.id || 1,
      url: data.url || '/'
    },
    actions: [
      {
        action: 'explore',
        title: 'عرض التفاصيل',
        icon: '/icon-192.png'
      },
      {
        action: 'close',
        title: 'إغلاق',
        icon: '/icon-192.png'
      }
    ],
    requireInteraction: data.requireInteraction || false,
    silent: data.silent || false
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'نظام التميز المؤسسي', options)
  );
});

// Enhanced notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked', event.action);
  
  event.notification.close();

  if (event.action === 'explore') {
    const url = event.notification.data.url || '/';
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        // Check if app is already open
        for (const client of clientList) {
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        // Open new window if app is not open
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
    );
  }
});

// Enhanced message handler
self.addEventListener('message', (event) => {
  console.log('Service Worker: Message received', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      }).then(() => {
        event.ports[0].postMessage({ success: true });
      })
    );
  }
  
  if (event.data && event.data.type === 'SYNC_NOW') {
    event.waitUntil(syncFailedRequests());
  }
});

// Error handlers
self.addEventListener('error', (event) => {
  console.error('Service Worker: Error occurred', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('Service Worker: Unhandled promise rejection', event.reason);
  event.preventDefault();
});

// Periodic background sync (if supported)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'data-sync') {
    event.waitUntil(syncFailedRequests());
  }
});

console.log('Service Worker: Enhanced v3.0 loaded successfully with comprehensive offline support');
