import { BackgroundSyncPlugin } from "workbox-background-sync";
import { registerRoute } from "workbox-routing";
import { NetworkOnly } from "workbox-strategies";

registerRoute(
  /api/,
  new NetworkOnly({
    plugins: [
      new BackgroundSyncPlugin("myQueueName", {
        maxRetentionTime: 24 * 60, // 1 day
      }),
    ],
  }),
  "POST"
);
