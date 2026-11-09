# GutCare Clinics website

Astro + Tailwind CSS v4 rebuild of https://www.gutcareclinics.com.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

## Structure

- `src/layouts/Layout.astro` – shared shell: header, footer, mobile action bar and the booking popup
- `src/pages/index.astro` – home page: Hero (Book Appointment button → popup) → Treatments → Why Us → Doctors → Patient Journey → Reviews → CTA banner → Clinic & location → Blog → FAQ
- `src/pages/[slug].astro` – the 9 treatment pages (URLs match the old WordPress site, e.g. `/best-piles-treatment-bangalore/`);
  content lives in `src/data/treatments/*.ts` (one file per treatment, shape in `types.ts`)
- `src/pages/about-gut-care.astro`, `dr-yuvraj-singh-gehlot.astro`, `medical-tourism.astro`, `appointment.astro`, `404.astro`
- `src/components/PageHero.astro` – shared hero for inner pages (breadcrumbs, Book Appointment, optional image and quick facts)
- `src/pages/blog/index.astro` – all articles with topic filters (home shows the latest 3 + "View more blogs")
- `src/components/LeadForm.astro` – the one name + mobile form, used inside the booking popup
- `src/components/LeadModal.astro` – centred popup. Any element with `data-open-form="<source>"` opens it; the source is sent with the lead
- `src/components/PatientJourney.astro` – scroll-drawn "gut path" timeline
- `src/data/` – site details, treatments, blog posts, reviews

## Lead form

Submissions go to the same places as the old site (URLs at the top of the script in `LeadForm.astro`):
Zoho CRM (via the AWS `create-lead` endpoint), then the Zapier webhook, plus a row in the SheetDB Google Sheet.
UTM parameters and `gclid`/`fbclid` from the page URL are sent with the lead.
Successful submissions push a `lead_submit` event to `dataLayer` for GTM/Google Ads tracking.

## Blog (WordPress)

Posts are written in WordPress and shown on this site through the WordPress REST API, at the same URLs
they always had (e.g. `/acid-reflux-in-babies/`). Code: `src/lib/wordpress.ts`.

- Blog pages (`/[post]`, `/blog/…`, `/blog/category/…`) and the home-page "latest posts" block render on request
  on Vercel and are cached on its CDN for 60 seconds (`CACHE_SECONDS`), so a new or edited post is live
  within about a minute, with no rebuild. Everything else is static.
- `WORDPRESS_URL` (Vercel env var) points at the WordPress install. Defaults to https://www.gutcareclinics.com;
  set it to the CMS subdomain (e.g. https://cms.gutcareclinics.com) once this site takes over www.
- Category filters are the WordPress categories with 5+ posts ("Blog", "popular", "General", "Uncategorized" are hidden).
  Rename or merge categories in WordPress to change them.
- `npm run export:html` only covers the static pages; blog pages need the server.

## Reviews

- Before/after recovery stories: `stories` in `src/data/reviews.ts` (real, consented stories only).
- Google rating + latest reviews: set `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACE_ID`; they are fetched at build time.
  Rebuild periodically to refresh. With 4+ reviews the wall becomes an auto-scrolling marquee.
- Extra reviews can be added to `manualReviews` in the same file.

## Images

- Doctor photos: `src/assets/doctors/` (team and blog covers were copied from the current WordPress uploads).
- Clinic photos: drop files into `src/assets/clinic/` named `reception`, `consultation`, `procedure`, `recovery`,
  `emergency` or `exterior` (`.jpg/.png/.webp`). They replace the illustrated placeholder tiles automatically.
- Logo: replace the vector recreation in `src/components/Logo.astro` with the official file.
