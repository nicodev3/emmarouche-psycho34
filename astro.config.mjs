import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://emmarouche-psycho34.com",
  integrations: [sitemap()],
  build: {
    format: "file",
  },
  fonts: [
    {
      name: "Lora",
      cssVariable: "--font-lora",
      provider: fontProviders.google(),
      weights: [400, 700],
      styles: ["normal"],
      subsets: ["latin", "latin-ext"],
      fallbacks: ["serif"],
    },
    {
      name: "Satisfy",
      cssVariable: "--font-satisfy",
      provider: fontProviders.google(),
      weights: [400],
      styles: ["normal"],
      subsets: ["latin", "latin-ext"],
      fallbacks: ["cursive"],
    },
  ],
});
