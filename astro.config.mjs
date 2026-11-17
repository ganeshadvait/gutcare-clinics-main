// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://www.gutcareclinics.com',
  // Pages are static by default; the blog pages opt out (prerender = false) so new WordPress posts show without a rebuild.
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
});
