import { defineConfig } from "wmr";
import swPlugin from "@wmrjs/service-worker";

// Full list of options: https://wmr.dev/docs/configuration
export default defineConfig((options) => {
  swPlugin(options);
  return {
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat",
    },
  };
});
