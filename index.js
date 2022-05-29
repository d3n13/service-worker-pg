const SYNC_MESSAGES_TAG = "sync-messages";

const POSITIVE_EMOJI = "🟢";
const NEGATIVE_EMOJI = "🔴";

const render = {
  connectivityStatus: {
    online: () => (connectionStatus.innerText = `${POSITIVE_EMOJI} online`),
    offline: () => (connectionStatus.innerText = `${NEGATIVE_EMOJI} offline`),
  },
  backgroundSyncStatus: {
    syncMessagesTag: {
      found: () => {
        backgroundSyncStatus.innerText = `${POSITIVE_EMOJI} ${SYNC_MESSAGES_TAG} tag found`;
      },
      notFound: () => {
        backgroundSyncStatus.innerText = `${NEGATIVE_EMOJI} ${SYNC_MESSAGES_TAG} tag not found`;
      },
    },
  },
};

checkServiceWorkerSupport();

function checkServiceWorkerSupport() {
  const supported = "serviceWorker" in navigator;

  if (supported) {
    return;
  }

  const errorMessage = "serviceWorker was not found in navigator";
  alert(errorMessage);
  throw new Error(errorMessage);
}

function registerServiceWorker() {
  navigator.serviceWorker
    .register("service-worker.js")
    .then(function (registration) {
      console.info("Service Worker Registered", registration);
    })
    .catch(function (err) {
      console.error("Service Worker Failed to Register", err);
    });
}

window.addEventListener("load", registerServiceWorker);

function onFetchClick() {
  console.info("onFetchClick");
  fetch("response.json");
}

bthFetch.addEventListener("click", onFetchClick);

async function registerBackgroundSync() {
  const registration = await navigator.serviceWorker.ready;
  try {
    await registration.sync.register(SYNC_MESSAGES_TAG);
    console.log(`register ${SYNC_MESSAGES_TAG} did not throw`);
  } catch (e) {
    console.error(`register ${SYNC_MESSAGES_TAG} failed!`, e);
  }
}

registerBackgroundSync();

navigator.onLine
  ? render.connectivityStatus.online()
  : render.connectivityStatus.offline();

window.addEventListener("online", render.connectivityStatus.online);
window.addEventListener("offline", render.connectivityStatus.offline);

btnCheckBackgroundSyncStatus.addEventListener(
  "click",
  onCheckBackgroundSyncStatusClick
);

function checkBackgroundSyncStatus() {
  navigator.serviceWorker.ready.then((registration) => {
    registration.sync.getTags().then((tags) => {
      if (tags.includes(SYNC_MESSAGES_TAG)) {
        render.backgroundSyncStatus.syncMessagesTag.found();
      } else {
        render.backgroundSyncStatus.syncMessagesTag.notFound();
      }
    });
  });
}

function onCheckBackgroundSyncStatusClick() {
  checkBackgroundSyncStatus();
}

checkBackgroundSyncStatus();
