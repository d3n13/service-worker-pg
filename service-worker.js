const SYNC_MESSAGES_TAG = "sync-messages";

self.addEventListener("install", function (e) {
  console.info("ServiceWorker Installed", e);
});

self.addEventListener("activate", function (e) {
  console.info("ServiceWorker Activated", e);
});

self.addEventListener("message", function (e) {
  console.info("ServiceWorker Message", e);
});

self.addEventListener("sync", (event) => {
  console.info("ServiceWorker sync", event);
  if (event.tag === SYNC_MESSAGES_TAG) {
    event.waitUntil(sendOutboxMessages());
  }
});
