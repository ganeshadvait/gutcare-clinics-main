// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://www.gutcareclinics.com',
  // Pages are static by default; the blog pages opt out (prerender = false) so new WordPress posts show without a rebuild.
  // imageService: on-demand pages (blog) resize images via Vercel's optimizer at /_vercel/image;
  // Astro's own /_image endpoint 404s inside the Vercel function.
  adapter: vercel({ imageService: true }),
  vite: {
    plugins: [tailwindcss()],
  },
});
