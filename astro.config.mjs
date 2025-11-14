// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://irvin373.github.io',
  base: '/temporal-page',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [react()], // Integración de React
  server: {
    open: true, // 🚀 Esto hace que se abra el navegador automáticamente
  },
});