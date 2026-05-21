// @ts-check
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sanity from "@sanity/astro";

const { SANITY_PROJECT_ID, SANITY_DATASET } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwindcss(),
    react(),
    sanity({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      // Set useCdn to false if you're building statically.
      useCdn: false,
      // Optional: log server-side Sanity client requests.
      // Modes: 'dev' | 'build' | 'always'
      logClientRequests: "dev",
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
