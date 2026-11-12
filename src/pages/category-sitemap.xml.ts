import type { APIRoute } from 'astro';
import { getCategories, urlset } from '../lib/sitemap';

export const GET: APIRoute = async () => urlset(await getCategories());
