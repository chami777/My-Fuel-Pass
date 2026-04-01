const CACHE_NAME = "fuel-pass-cache-v1";

// පළමු වරට App එකට එන විට ෆයිල් ටික සේව් කරගැනීම
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([
                "./",
                "./index.html",
                "./icon.png"
            ]);
        })
    );
});

// ඊළඟ වතාවලදී Offline වැඩ කිරීමට සහ Online විට Update වීමට
self.addEventListener("fetch", event => {
    event.respondWith(
        fetch(event.request).then(response => {
            // Online නම් අලුත් එක අරන් Cache එකට දානවා
            const resClone = response.clone();
            caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, resClone);
            });
            return response;
        }).catch(() => {
            // Offline (Internet නැත්නම්) Cache කරපු එක පෙන්වනවා
            return caches.match(event.request);
        })
    );
});
