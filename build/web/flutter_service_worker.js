'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "c27c608e8531c18c783a30866589075e",
"version.json": "f42413829cedbe0a241e36325a721d08",
"index.html": "bb5f19b85bd21c30833c309a33e612b7",
"/": "bb5f19b85bd21c30833c309a33e612b7",
"main.dart.js": "4334d588798ea2cdc506e205c40b4947",
"flutter.js": "76f08d47ff9f5715220992f993002504",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "d407aebc3985918493d5bde32a577c85",
"icon_book.png": "9c3e46d24aea401c99b45dc959c9e9a6",
"assets/AssetManifest.json": "5791d24e51cf53be4c0236cd7b9dab43",
"assets/NOTICES": "9f6ab3ccb38716545120bd1431d1e2f5",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin.json": "9b9a264390ed277b70d58b108a1e2c8b",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "f0782566e9abd13fa9bcdf5168528564",
"assets/fonts/MaterialIcons-Regular.otf": "49f8e7138002a69dff4b1eacc54f386e",
"assets/assets/tg.png": "fc7ccd3353e586ad652bc8b374ac8794",
"assets/assets/background1.jpeg": "807a88004c4aa652ecbeeee66546715b",
"assets/assets/book.png": "a2f04b9fa2b4579c2943c263c7cc9836",
"assets/assets/pump.png": "dbb9f339592f6f71ac734ed61555cbf5",
"assets/assets/title.png": "813473976690ce10e7015657888c68f1",
"assets/assets/x.png": "54637961216a17952f0dc396555b074b",
"assets/assets/pray14.png": "c47041566a30dd3d1d90ac0a02c2ef98",
"assets/assets/pray15.png": "bac33aa2356c43ea4e39b15437c11023",
"assets/assets/book_open1.png": "73fb437caa3a0744ddf79f85be6c2a47",
"assets/assets/book_open3.png": "8d53ab4707aebb3a6c7ccb37c51beced",
"assets/assets/book_open2.png": "2cef82a74cdcd271c7f460b710f486cc",
"assets/assets/book_open6.png": "ba950cfa5563b60663b1dde98fa49e8b",
"assets/assets/pray12.png": "9432fc94c23fe5d52722ba7796ac0f1a",
"assets/assets/pray13.png": "a21b5fa8c23543b73d5b8b1e930ae2e4",
"assets/assets/book_open7.png": "1e2fa58ca440494199031f495f0306d1",
"assets/assets/pray9.png": "3e0510ab1636557a9ccbd90428601581",
"assets/assets/book_open5.png": "6763913c683a692aea154feaa42d326a",
"assets/assets/pray11.png": "4138a26a4b38bfe3c1159cd50338febb",
"assets/assets/pray10.png": "14354fe9dde7059190c56b52f511088c",
"assets/assets/book_open4.png": "9493c40b2096acd3b6dc00967c7328b7",
"assets/assets/pray8.png": "58fb3b8dc479d2339404702e30e97ac9",
"assets/assets/pray5.png": "99c8c63c61a851a9e1133f07c0de0485",
"assets/assets/dex.png": "ea85f35e8f9b2a3242e5f2586ad6e007",
"assets/assets/book_open8.png": "ac98397bd669c8f7f01da38152065051",
"assets/assets/pray4.png": "d3ebf1e85ae805692b3cb6fc3f8de89a",
"assets/assets/pray6.png": "8910a056cfb18cd39aab82465334e36a",
"assets/assets/pray7.png": "dabc69f3016fac43e3b28edb76370f06",
"assets/assets/pray3.png": "070e4b7cef028adb0e6d636ccd29b91c",
"assets/assets/pray2.png": "162dfd728d8e91265168c6fef7012cf5",
"assets/assets/pray1.png": "d808549952bda33bb88c367960d5c8e3",
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
