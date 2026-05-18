// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import sanity from '@sanity/astro';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwindcss(), react(), sanity()],

  vite: {
    plugins: [tailwindcss()],
  },
});