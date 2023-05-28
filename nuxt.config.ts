import { defineNuxtConfig } from "@nuxt/bridge";

export default defineNuxtConfig({
  bridge: {
    capi: true,
    nitro: false,
  },
});
