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

Set `PUBLIC_LEAD_ENDPOINT` (see `.env.example`) to a URL that accepts a JSON POST of
`{ name, phone, treatment, source, page }` (CRM webhook, Google Apps Script, Formspree, etc.).
Until it is set, submitting the form opens WhatsApp with the patient's details pre-filled.
Successful submissions push a `lead_submit` event to `dataLayer` for GTM/Google Ads tracking.

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
