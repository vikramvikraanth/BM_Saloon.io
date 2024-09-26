'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "e49fff8ef8cb4273a8db9d103dad44cc",
"version.json": "8be53a664743cf6c66bab358d7b4fd6e",
"favicon.ico": "1fcbff3a05b142639857d6686b838184",
"index.html": "e17b0f2c71d1e227a59f564f677201b4",
"/": "e17b0f2c71d1e227a59f564f677201b4",
"main.dart.js": "40aa5ebd4da26b9cc628faa1c1273313",
"flutter.js": "f393d3c16b631f36852323de8e583132",
"icons/Icon-192.png": "74e892c279d1383ba0dfeb3b8c6eaa9d",
"icons/Icon-maskable-192.png": "74e892c279d1383ba0dfeb3b8c6eaa9d",
"icons/Icon-maskable-512.png": "6702c03c9976c8234ef3be962f1dc2f0",
"icons/Icon-512.png": "6702c03c9976c8234ef3be962f1dc2f0",
"manifest.json": "ee80bf1fb274b1ccaee0f16295ff4b05",
"assets/AssetManifest.json": "ac546a0701ca66fb52da3e5c04137148",
"assets/NOTICES": "d965b1393bfeb68338775ea6267695b4",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin.json": "ef4e3514fcf9bb2615afe0fb9bc8d2ec",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "b1177ec5fe249ad61dd3ac85ede875b6",
"assets/fonts/MaterialIcons-Regular.otf": "0c4a456ef1becca7bba3d195197670a8",
"assets/assets/lottie_file/landing.json": "069c6053f2372b0efc78c3a2603c39ae",
"assets/assets/image/svg/ic_user.svg": "959b5ff1ad11c9e837e6fdbd67587cb3",
"assets/assets/image/svg/ic_dashboard.svg": "d2164e9f8e2a21a1d5a5b5ac819ec863",
"assets/assets/image/ic_musk.png": "f6e609b4905f1d562b736d075a3cb32d",
"assets/assets/image/shop_image.jpg": "5373e4ef8ed6ef13ff4fe3f2ddd09769",
"assets/assets/image/ic_bg_img.jpg": "b9f1512d23a3b5d71d3b6ccd5147d034",
"assets/assets/image/ic_hair_styles.png": "df5a77e84a3942dc43121bf546edf66c",
"assets/assets/image/ic_shop.jpg": "4518d496aee50405e6867f879225b51e",
"assets/assets/image/ic_bg_work.png": "4801957442d8c62a177ff2dbe70c1940",
"assets/assets/image/ic_header_logo.png": "282c15f16b4af5f49a0b8bdfdf91339f",
"assets/assets/image/ic_style5.png": "d5d21159513dff06f377c2abdc1f642c",
"assets/assets/image/ic_style4.png": "54079f3dcb96dbf800b8a4ebed670e97",
"assets/assets/image/ic_style6.png": "1b1da38b74eccdf9d6f13c2ddadbf3a1",
"assets/assets/image/ic_style3.png": "4d6e01da7883f0d65704723cfd18b92f",
"assets/assets/image/ic_style2.png": "ece8ac5c5c8753f17be1cedf706d3558",
"assets/assets/image/ic_style1.png": "b7173e25720e54916ee3b3d11ad26076",
"assets/assets/image/ic_logo.png": "4c227d3f4f3287ba654c4e397ecfe90e",
"assets/assets/image/ic_call.png": "dffaf5694cb4fae9fbca0692cb02a357",
"canvaskit/skwasm.js": "694fda5704053957c2594de355805228",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/chromium/canvaskit.js": "671c6b4f8fcc199dcc551c7bb125f239",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/canvaskit.js": "66177750aff65a66cb07bb44b8c6422b",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c"};
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
