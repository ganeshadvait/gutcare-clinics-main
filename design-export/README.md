# GutCare Clinics: design export

Full-page screenshots of every page of the new website, for review and handoff in Figma.

- `desktop/`: 1440px wide layouts, exported at 2x (2880px images)
- `mobile/`: 390px wide layouts, exported at 2x (780px images)
- Long pages are split into numbered parts (`-part1`, `-part2`, …) of up to 4000px each, because Figma
  downsizes images larger than 4096px. Stack the parts top to bottom with no gap to rebuild the full page.

## Put it in Figma

1. Create a new Figma file with one page per screen size (Desktop, Mobile).
2. For each page, add a frame (1440 wide for desktop, 390 wide for mobile) and name it after the file, e.g. `01-home`.
3. Drag the PNG parts into the frame in order, scale each image to 50% (so it is 1440 / 390 wide), and stack
   them vertically with no gap.
4. Share the file with your team (Share → Invite, or copy the link).

To get **editable layers** instead of images, use the free *html.to.design* Figma plugin with its Chrome
extension on the running site (`npm run dev`, then open http://localhost:4321). It converts each page into
Figma frames, text and auto-layout.

## Pages

| # | Page | URL |
|---|------|-----|
| 01 | Home | `/` |
| 02 | About | `/about-gut-care/` |
| 03 | Our Doctor | `/dr-yuvraj-singh-gehlot/` |
| 04–12 | Treatments (piles, fistula, fissures, hernia, gallstones, appendix, GERD, constipation, colorectal cancer) | e.g. `/best-piles-treatment-bangalore/` |
| 13 | International Patients | `/medical-tourism/` |
| 14 | Appointment | `/appointment/` |
| 15 | Blog | `/blog/` |
| 16 | Not found (404) | any unknown URL |

Not shown in the images: the booking popup (opened by every "Book Appointment" button) and hover states.
Animations (patient-journey path, floating badges, review marquee) are shown in their final state.

## Design tokens

**Typeface:** Plus Jakarta Sans (Google Fonts), weights 400 / 500 / 600 / 700 / 800.

**Brand blue**

| Token | Hex |
|---|---|
| brand-50 | #EEF7FD |
| brand-100 | #D6ECFA |
| brand-200 | #AED9F4 |
| brand-300 | #7CC0EC |
| brand-400 | #46A5E2 |
| brand-500 (primary) | #2590D3 |
| brand-600 | #1873B4 |
| brand-700 | #155C91 |
| brand-800 | #154E78 |
| brand-900 | #0D2F4A |
| brand-950 (dark sections, footer) | #08203A |

**Leaf green**

| Token | Hex |
|---|---|
| leaf-50 | #F2FAEA |
| leaf-100 | #E1F4D1 |
| leaf-200 | #C4E9A6 |
| leaf-300 | #9FD973 |
| leaf-400 | #7FC64A |
| leaf-500 (main CTA) | #63AB2E |
| leaf-600 | #4C8A21 |
| leaf-700 | #3C6A1E |

Text uses Tailwind's slate scale: headings #0F172A (slate-900), body #475569 (slate-600), muted #64748B (slate-500).

**Type scale**

| Style | Size (mobile → desktop) | Weight |
|---|---|---|
| Hero H1 | 30 → 48px | 800 |
| Section heading | 30 → 36 → 48px | 800 |
| Sub-heading | 20 → 24px | 800 |
| Lead paragraph | 16 → 18px | 400 |
| Eyebrow label | 12px, uppercase, 0.14em tracking | 700 |
| Body | 14–16px | 400 |

**Section heading pattern:** eyebrow pill (green dot + label), heading with the key words in brand-500,
then a one-line lead. Used on every section.

**Components:** pill buttons (fully rounded; green = book, blue = primary, white outline = secondary),
24px-radius cards and images, 12px-radius inputs, thin slate-200 dividers instead of card borders in open sections.

**Layout:** 1280px max content width, 16 / 24 / 32px side padding (mobile / tablet / desktop),
64px vertical section spacing on mobile, 96px on desktop.
