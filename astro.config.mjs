// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://elementary-cv.web.app',

  vite: {
    plugins: [tailwindcss()]
  },

  server: {
    open: true, // 🚀 Esto hace que se abra el navegador automáticamente
  },

  integrations: [react()],
});