// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://irvin373.github.io',
  base: '/temporal-page',
  vite: {
    plugins: [tailwindcss()]
  },
  server: {
    open: true, // 🚀 Esto hace que se abra el navegador automáticamente
  },
});