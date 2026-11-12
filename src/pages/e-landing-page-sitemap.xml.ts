import type { APIRoute } from 'astro';
import { getLandingPages, urlset } from '../lib/sitemap';

export const GET: APIRoute = () => urlset(getLandingPages());
