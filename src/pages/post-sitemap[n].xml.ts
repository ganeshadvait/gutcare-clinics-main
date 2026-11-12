import type { APIRoute, GetStaticPaths } from 'astro';
import { POSTS_PER_SITEMAP, getPosts, postSitemapCount, urlset } from '../lib/sitemap';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();
  return Array.from({ length: postSitemapCount(posts) }, (_, i) => ({ params: { n: String(i + 1) } }));
};

export const GET: APIRoute = async ({ params }) => {
  const start = (Number(params.n) - 1) * POSTS_PER_SITEMAP;
  return urlset((await getPosts()).slice(start, start + POSTS_PER_SITEMAP));
};
