/**
 * XML sitemaps, using the same file names as the old WordPress / Rank Math sitemaps
 * (sitemap_index.xml, page-sitemap.xml, post-sitemap1.xml …) so Google Search Console keeps working.
 */
import { treatments } from '../data/site';

export const SITE = 'https://www.gutcareclinics.com';
const WP_URL = (import.meta.env.WORDPRESS_URL || SITE).replace(/\/$/, '');

/** Posts per post-sitemapN.xml (Rank Math uses 200). */
export const POSTS_PER_SITEMAP = 200;

export interface SitemapEntry {
  loc: string;
  lastmod?: string;
}

/** Pages that must never be listed. */
const EXCLUDED_PAGES = new Set(['/404/']);

/**
 * Every page of this site, found automatically on each build:
 * - each .astro file in src/pages (add a page file and it is listed on the next deploy), and
 * - each treatment in src/data/site.ts (served by src/pages/[slug].astro).
 * Dynamic routes ([...]) and non-HTML endpoints (the sitemaps themselves) are skipped.
 */
export function getPages(): SitemapEntry[] {
  const files = Object.keys(import.meta.glob('../pages/**/*.astro'));
  const pagePaths = files
    .map((f) => f.replace(/^\.\.\/pages/, '').replace(/\.astro$/, ''))
    .filter((p) => !p.includes('['))
    .map((p) => (p.replace(/(^|\/)index$/, '') + '/').replace(/\/+/g, '/'));
  const paths = [...new Set([...pagePaths, ...treatments.map((t) => `/${t.slug}/`)])]
    .filter((p) => !EXCLUDED_PAGES.has(p))
    // Home first, then alphabetical.
    .sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)));
  return paths.map((p) => ({ loc: SITE + p }));
}

/**
 * Elementor ad landing pages from the old WordPress site (its e-landing-page-sitemap.xml).
 * WordPress does not expose these through its API, so the list is kept here.
 * /thank-you/ is left out on purpose: a form confirmation page should not be in search results.
 */
const LANDING_PAGES = [
  '/best-doctor-for-fistula-treatment/',
  '/affordable-piles-treatment/',
  '/best-hospital-for-piles-treatment/',
  '/best-treatment-for-hemorrhoids/',
  '/best-doctor-for-piles-treatment/',
  '/best-doctor-for-fissures-treatment/',
  '/affordable-fistula-treatment/',
  '/best-treatment-for-anal-fistula/',
  '/best-hospital-for-fistula-treatment/',
  '/best-female-doctor-for-piles-treatment/',
  '/best-treatment-for-gallstone-removal/',
  '/affordable-appendicitis-treatment/',
  '/have-you-been-advised-for-hernia-surgery/',
  '/hernia-treatment-hospital-bangalore/',
  '/best-treatment-for-appendicitis/',
  '/best-hospital-for-appendicitis-treatment/',
  '/best-doctor-for-appendicitis-treatment/',
  '/best-treatment-for-hernia/',
  '/best-piles-hospital-in-bangalore/',
  '/best-hospital-for-gallstone-treatment/',
  '/affordable-gallstones-removal-surgery/',
  '/affordable-hernia-treatment/',
  '/have-you-been-advised-for-piles-surgery/',
  '/have-you-been-advised-for-fistula-surgery/',
  '/have-you-been-advised-for-fissures-surgery/',
  '/have-you-been-advised-for-gallstones-removal/',
  '/have-you-been-advised-for-appendicitis/',
  '/best-hospital-for-treating-fissures/',
  '/best-treatment-for-anal-fissures/',
  '/affordable-anal-fissures-treatment/',
  '/best-hospital-for-hernia-treatment/',
  '/best-doctor-for-gallstones-treatment/',
  '/best-doctor-for-hernia-treatment/',
];

export function getLandingPages(): SitemapEntry[] {
  return LANDING_PAGES.map((p) => ({ loc: SITE + p }));
}

/** Same rule as the blog's category pages: real topics with at least 5 posts. */
const GENERIC_CATEGORIES = new Set(['blog', 'popular', 'uncategorized', 'general']);
const MIN_CATEGORY_POSTS = 5;

/** Blog category pages (/blog/category/<slug>/). */
export async function getCategories(): Promise<SitemapEntry[]> {
  const url = `${WP_URL}/wp-json/wp/v2/categories?per_page=100&_fields=slug,count`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sitemap: WordPress responded ${res.status} for ${url}`);
  return ((await res.json()) as { slug: string; count: number }[])
    .filter((c) => c.count >= MIN_CATEGORY_POSTS && !GENERIC_CATEGORIES.has(c.slug))
    .map((c) => ({ loc: `${SITE}/blog/category/${c.slug}/` }));
}

let postsCache: Promise<SitemapEntry[]> | undefined;

/** Every published WordPress post, newest first, linked at this site's root (/<slug>/). */
export function getPosts(): Promise<SitemapEntry[]> {
  postsCache ??= (async () => {
    const entries: SitemapEntry[] = [];
    for (let page = 1, total = 1; page <= total; page++) {
      // Page through by id (a stable order); sorting by modified date can repeat or skip posts across pages.
      const url = `${WP_URL}/wp-json/wp/v2/posts?per_page=100&page=${page}&orderby=id&order=desc&_fields=slug,modified_gmt`;
      const res = await fetch(url);
      // Fail the build rather than publish an empty sitemap.
      if (!res.ok) throw new Error(`Sitemap: WordPress responded ${res.status} for ${url}`);
      total = Number(res.headers.get('X-WP-TotalPages')) || 1;
      for (const p of (await res.json()) as { slug: string; modified_gmt: string }[]) {
        entries.push({ loc: `${SITE}/${p.slug}/`, lastmod: `${p.modified_gmt}+00:00` });
      }
    }
    // Newest change first.
    return entries.sort((a, b) => b.lastmod!.localeCompare(a.lastmod!));
  })();
  return postsCache;
}

export function postSitemapCount(posts: SitemapEntry[]) {
  return Math.max(1, Math.ceil(posts.length / POSTS_PER_SITEMAP));
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const lastmod = (e: SitemapEntry) => (e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : '');

/** `count` is written as a comment at the top (shown in the browser, ignored by search engines). */
function xml(body: string, count: string) {
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<!-- ${count} -->\n${body}\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}

export function urlset(entries: SitemapEntry[]) {
  const urls = entries.map((e) => `  <url><loc>${esc(e.loc)}</loc>${lastmod(e)}</url>`).join('\n');
  return xml(`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`, `This sitemap contains ${entries.length} URLs`);
}

export function sitemapIndex(entries: SitemapEntry[]) {
  const maps = entries.map((e) => `  <sitemap><loc>${esc(e.loc)}</loc>${lastmod(e)}</sitemap>`).join('\n');
  return xml(`<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${maps}\n</sitemapindex>`, `This sitemap index contains ${entries.length} sitemaps`);
}
