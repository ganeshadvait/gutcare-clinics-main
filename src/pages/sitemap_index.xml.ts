import type { APIRoute } from 'astro';
import { SITE, POSTS_PER_SITEMAP, getPosts, postSitemapCount, sitemapIndex } from '../lib/sitemap';

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const postMaps = Array.from({ length: postSitemapCount(posts) }, (_, i) => ({
    loc: `${SITE}/post-sitemap${i + 1}.xml`,
    // Posts are sorted newest first, so each sitemap's first entry is its latest change.
    lastmod: posts[i * POSTS_PER_SITEMAP]?.lastmod,
  }));
  // Same 7 sitemaps, in the same order, as the old Rank Math index.
  return sitemapIndex([
    ...postMaps,
    { loc: `${SITE}/page-sitemap.xml` },
    { loc: `${SITE}/e-landing-page-sitemap.xml` },
    { loc: `${SITE}/category-sitemap.xml` },
  ]);
};
