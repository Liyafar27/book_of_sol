'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "2b181204d6cc992700d588de6c182dba",
"version.json": "f42413829cedbe0a241e36325a721d08",
"index.html": "7f1d6ec478e04507d66f15a4ca4193f2",
"/": "7f1d6ec478e04507d66f15a4ca4193f2",
"main.dart.js": "e583d692892c84f25379d7a66ae5f315",
"flutter.js": "76f08d47ff9f5715220992f993002504",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "d407aebc3985918493d5bde32a577c85",
"icon_book.png": "9c3e46d24aea401c99b45dc959c9e9a6",
"assets/AssetManifest.json": "75f31dbf985a0e27b3f2a837e9f1bff8",
"assets/NOTICES": "9f6ab3ccb38716545120bd1431d1e2f5",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin.json": "88fcccf521bc732ef9e4c9a59d7c603a",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "8e5c651f34eac81f58726b59a8265619",
"assets/fonts/MaterialIcons-Regular.otf": "d54bae5788dd45d8ad345e0ac2eeca7e",
"assets/assets/tg.png": "fc7ccd3353e586ad652bc8b374ac8794",
"assets/assets/background1.jpeg": "807a88004c4aa652ecbeeee66546715b",
"assets/assets/book.png": "37649ce602d44ed1de3a79d50e856ac1",
"assets/assets/pump.png": "dbb9f339592f6f71ac734ed61555cbf5",
"assets/assets/title.png": "813473976690ce10e7015657888c68f1",
"assets/assets/x.png": "54637961216a17952f0dc396555b074b",
"assets/assets/book3.png": "d615f3b9fd17feef82875324677a0bbe",
"assets/assets/pray14.png": "111e7a7f2290bf86790747205ff78f25",
"assets/assets/pray15.png": "9e563c44c1dd0ebb5e35466af9b6276c",
"assets/assets/book_open1.png": "6e0031972acaa537dd4f160092ffc911",
"assets/assets/book2.png": "808728f38d353394a6cc89e5449989b8",
"assets/assets/book_open3.png": "66ba52321820b86a0e2ec58f27fbf19a",
"assets/assets/book_open2.png": "0cda7766f75c2c93bd34bac02984ac8d",
"assets/assets/book1.png": "4bae85b8067cd206c8c11423bfd34c63",
"assets/assets/pray12.png": "cd518b4dc7c9060e74143bc1bd2bddc5",
"assets/assets/pray13.png": "ac67ad4fd33401aa053bfff33e2a92e5",
"assets/assets/book4.png": "33cd22a0d60128109655fe5bd16582b3",
"assets/assets/pray9.png": "68d584730f5ae5de394bc76d04ac0121",
"assets/assets/book_open5.png": "14b50d2472d94628def3a4561eab2ac8",
"assets/assets/background.jpeg": "4924e405901ce952092675e0bd831b36",
"assets/assets/pray11.png": "f6498cd23c3d90ea6dcc92848a8ab283",
"assets/assets/pray10.png": "14354fe9dde7059190c56b52f511088c",
"assets/assets/book_open4.png": "db14bb0db039bc10088a5815729bf162",
"assets/assets/pray8.png": "088416cae38874ed45e3b5c65e640039",
"assets/assets/pray5.png": "828c4f3dac9a6b9f4f8760838ff461c0",
"assets/assets/dex.png": "ea85f35e8f9b2a3242e5f2586ad6e007",
"assets/assets/pray4.png": "c47bf6e8437137742eda99ab12dd3dab",
"assets/assets/pray6.png": "80730a857a257855d3cd68551860fdd9",
"assets/assets/pray7.png": "dabc69f3016fac43e3b28edb76370f06",
"assets/assets/pray3.png": "73dd2fd77c1712a58299fc0520188a1a",
"assets/assets/pray2.png": "2bdf94face8948f4f66998714f4ddaca",
"assets/assets/book_open.png": "89f7f20d1ecb76f76afd89a5f8d122fa",
"assets/assets/pray1.png": "8cda02b48ecc07b7edc263d9fb5e68b9",
"canvaskit/skwasm_st.js": "d1326ceef381ad382ab492ba5d96f04d",
"canvaskit/skwasm.js": "f2ad9363618c5f62e813740099a80e63",
"canvaskit/skwasm.js.symbols": "80806576fa1056b43dd6d0b445b4b6f7",
"canvaskit/canvaskit.js.symbols": "68eb703b9a609baef8ee0e413b442f33",
"canvaskit/skwasm.wasm": "f0dfd99007f989368db17c9abeed5a49",
"canvaskit/chromium/canvaskit.js.symbols": "5a23598a2a8efd18ec3b60de5d28af8f",
"canvaskit/chromium/canvaskit.js": "ba4a8ae1a65ff3ad81c6818fd47e348b",
"canvaskit/chromium/canvaskit.wasm": "64a386c87532ae52ae041d18a32a3635",
"canvaskit/skwasm_st.js.symbols": "c7e7aac7cd8b612defd62b43e3050bdd",
"canvaskit/canvaskit.js": "6cfe36b4647fbfa15683e09e7dd366bc",
"canvaskit/canvaskit.wasm": "efeeba7dcc952dae57870d4df3111fad",
"canvaskit/skwasm_st.wasm": "56c3973560dfcbf28ce47cebe40f3206"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
