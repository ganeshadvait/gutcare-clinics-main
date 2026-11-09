/**
 * Blog posts come from WordPress (used as a headless CMS) through its REST API.
 * Blog pages render on request (prerender = false) and are cached on Vercel's CDN for CACHE_SECONDS,
 * so a post published or edited in WordPress shows here within about a minute, with no rebuild.
 */

/** WordPress install that holds the posts. Override with WORDPRESS_URL once WordPress moves to its own subdomain. */
export const WP_URL = (import.meta.env.WORDPRESS_URL || 'https://www.gutcareclinics.com').replace(/\/+$/, '');

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Domains that WordPress content links point at (the public site and the WordPress host itself); rewritten for this site. */
const SITE_HOSTS = `(?:https?://(?:www\\.)?gutcareclinics\\.com|${escapeRe(WP_URL)})`;

/** Categories that say nothing about the topic; never used as a post's main category or as a filter. */
const GENERIC_CATEGORIES = new Set(['blog', 'popular', 'uncategorized', 'general']);

export type Category = { id: number; name: string; slug: string };

export type Post = {
  id: number;
  slug: string;
  /** Path on this site, e.g. /acid-reflux-in-babies/ (same URL the post had on WordPress). */
  url: string;
  title: string;
  excerpt: string;
  /** Post body HTML, cleaned up for this site. */
  html: string;
  date: string;
  modified: string;
  author?: string;
  category: Category;
  categories: Category[];
  image?: { src: string; alt: string; width?: number; height?: number };
  readingMinutes: number;
};

type WpPost = {
  id: number;
  slug: string;
  date_gmt: string;
  modified_gmt: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    author?: { name?: string }[];
    'wp:featuredmedia'?: { source_url?: string; alt_text?: string; media_details?: { width?: number; height?: number } }[];
    'wp:term'?: { id: number; taxonomy: string; name: string; slug: string }[][];
  };
};

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', hellip: '…', ndash: '–', mdash: '—',
  lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”', laquo: '«', raquo: '»', copy: '©', reg: '®', trade: '™', deg: '°',
};

/** Turns WordPress's HTML-encoded text (titles, excerpts) into plain text. */
export function decodeEntities(s: string): string {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, code: string) => {
    if (code[0] === '#') {
      const n = code[1].toLowerCase() === 'x' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : m;
    }
    return NAMED_ENTITIES[code.toLowerCase()] ?? m;
  });
}

const stripTags = (html: string) => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

function cleanExcerpt(html: string, max = 170): string {
  const text = decodeEntities(stripTags(html)).replace(/\s*\[…\]\s*$|\s*\[\.\.\.\]\s*$/, '').trim();
  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(' ', max)).replace(/[,;:.\s]+$/, '') + '…';
}

function cleanContent(html: string): string {
  return (
    html
      // Media stays on the WordPress host.
      .replace(new RegExp(`${SITE_HOSTS}/wp-content/`, 'g'), `${WP_URL}/wp-content/`)
      // Links to other pages and posts become site-relative, so they work in dev and on the live domain.
      .replace(new RegExp(`href="${SITE_HOSTS}/`, 'g'), 'href="/')
      // The page title is the only <h1>.
      .replace(/<h1(\s|>)/g, '<h2$1')
      .replace(/<\/h1>/g, '</h2>')
      // Lazy-load images inside posts.
      .replace(/<img(?![^>]*\bloading=)/g, '<img loading="lazy" decoding="async"')
  );
}

function toPost(p: WpPost): Post {
  const terms = (p._embedded?.['wp:term'] ?? []).flat().filter((t) => t?.taxonomy === 'category');
  const categories = terms.map((t) => ({ id: t.id, name: decodeEntities(t.name), slug: t.slug }));
  const category = categories.find((c) => !GENERIC_CATEGORIES.has(c.slug)) ?? categories[0] ?? { id: 0, name: 'Gut Health', slug: 'gut-health' };
  const media = p._embedded?.['wp:featuredmedia']?.[0];
  const html = cleanContent(p.content.rendered);

  return {
    id: p.id,
    slug: p.slug,
    url: `/${p.slug}/`,
    title: decodeEntities(stripTags(p.title.rendered)),
    excerpt: cleanExcerpt(p.excerpt.rendered || p.content.rendered),
    html,
    date: `${p.date_gmt}Z`,
    modified: `${p.modified_gmt}Z`,
    author: p._embedded?.author?.[0]?.name,
    category,
    categories,
    image: media?.source_url
      ? {
          src: media.source_url.replace(new RegExp(`^${SITE_HOSTS}/wp-content/`), `${WP_URL}/wp-content/`),
          alt: media.alt_text ?? '',
          width: media.media_details?.width,
          height: media.media_details?.height,
        }
      : undefined,
    readingMinutes: Math.max(1, Math.round(stripTags(html).split(' ').length / 200)),
  };
}

/** How long Vercel's CDN may serve a blog page before checking WordPress again. */
export const CACHE_SECONDS = 60;

/** Lets Vercel's CDN cache an on-demand page; a stale copy is served while a fresh one is fetched in the background. */
export function cacheHeaders(headers: Headers) {
  headers.set('Cache-Control', `public, max-age=0, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=600`);
}

const EMBED = '_embed=author,wp:featuredmedia,wp:term';

async function wp<T>(path: string): Promise<{ data: T; headers: Headers } | null> {
  const url = `${WP_URL}/wp-json/wp/v2/${path}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  // WordPress answers 400 for a page number past the end of a list.
  if (res.status === 400 || res.status === 404) return null;
  if (!res.ok) throw new Error(`WordPress request failed (${res.status}) for ${url}`);
  return { data: (await res.json()) as T, headers: res.headers };
}

export type PostList = { posts: Post[]; total: number; totalPages: number };

/** One page of published posts, newest first, optionally limited to a category. Null if the page doesn't exist. */
export async function getPosts({ page = 1, perPage = 12, categoryId, exclude }: { page?: number; perPage?: number; categoryId?: number; exclude?: number } = {}): Promise<PostList | null> {
  const query = new URLSearchParams({ per_page: String(perPage), page: String(page), orderby: 'date', order: 'desc' });
  if (categoryId) query.set('categories', String(categoryId));
  if (exclude) query.set('exclude', String(exclude));
  const res = await wp<WpPost[]>(`posts?${query}&${EMBED}`);
  if (!res) return null;
  return {
    posts: res.data.map(toPost),
    total: Number(res.headers.get('X-WP-Total') ?? res.data.length),
    totalPages: Number(res.headers.get('X-WP-TotalPages') ?? 1),
  };
}

/** A single published post by its slug, or null. */
export async function getPost(slug: string): Promise<Post | null> {
  const res = await wp<WpPost[]>(`posts?slug=${encodeURIComponent(slug)}&${EMBED}`);
  const post = res?.data[0];
  return post ? toPost(post) : null;
}

/** Latest posts in the same category, for "More on …". */
export async function getRelated(post: Post, count = 3): Promise<Post[]> {
  if (!post.category.id) return [];
  return (await getPosts({ perPage: count, categoryId: post.category.id, exclude: post.id }))?.posts ?? [];
}

/** Topic categories worth offering as filters (at least `minPosts` posts), biggest first. */
export async function getTopicCategories(minPosts = 5): Promise<(Category & { count: number })[]> {
  const res = await wp<{ id: number; name: string; slug: string; count: number }[]>(
    'categories?per_page=100&hide_empty=true&_fields=id,name,slug,count',
  );
  return (res?.data ?? [])
    .filter((c) => !GENERIC_CATEGORIES.has(c.slug) && c.count >= minPosts)
    .map((c) => ({ ...c, name: decodeEntities(c.name) }))
    .sort((a, b) => b.count - a.count);
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
