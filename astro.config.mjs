// @ts-check
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sanity from "@sanity/astro";
import { structureTool } from "sanity/structure";

const { SANITY_PROJECT_ID, SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV ?? "development",
  process.cwd(),
  "",
);

if (!SANITY_PROJECT_ID || !SANITY_DATASET) {
  throw new Error("SANITY_PROJECT_ID and SANITY_DATASET must be set");
}

// https://astro.build/config
export default defineConfig({
  integrations: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", { target: "19" }]],
      },
    }),
    sanity({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      // Set useCdn to false if you're building statically.
      useCdn: false,
      // Optional: log server-side Sanity client requests.
      // Modes: 'dev' | 'build' | 'always'
      logClientRequests: "dev",
      studioBasePath: "/admin",
    }),
  ],

  vite: {
    define: {
      "process.env.SANITY_PROJECT_ID": JSON.stringify(SANITY_PROJECT_ID),
      "process.env.SANITY_DATASET": JSON.stringify(SANITY_DATASET),
    },
    plugins: [tailwindcss(), structureTool()],
  },
});
