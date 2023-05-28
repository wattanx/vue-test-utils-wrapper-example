import { defineConfig } from "vitest/config";
import Vue2 from "@vitejs/plugin-vue2";

export default defineConfig({
  // @ts-ignore
  plugins: [Vue2()],
  test: {
    globals: true,
    environment: "jsdom",
    alias: [
      { find: /^vue$/, replacement: "vue/dist/vue.runtime.common.js" },
      {
        find: "@nuxtjs/composition-api",
        replacement: "@nuxt/bridge/dist/runtime/capi.legacy",
      },
    ],
    deps: {
      inline: ["@nuxt/bridge-edge"],
    },
    clearMocks: true,
    setupFiles: ["setup.ts"],
  },
});
