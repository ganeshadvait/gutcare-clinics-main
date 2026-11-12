import type { APIRoute } from 'astro';
import { getPages, urlset } from '../lib/sitemap';

export const GET: APIRoute = () => urlset(getPages());
