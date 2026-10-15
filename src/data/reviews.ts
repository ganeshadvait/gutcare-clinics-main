export type Story = {
  name: string;
  condition: string;
  quote: string;
  before: { label: string; days: number };
  after: { label: string; days: number };
};

export type Review = {
  name: string;
  rating: number;
  text: string;
  when?: string;
  photo?: string;
  url?: string;
  condition?: string;
  source?: string;
  /** Placeholder shown only in local development. */
  sample?: boolean;
};

// Recovery stories shown as before/after cards. Only add real, consented patient stories.
export const stories: Story[] = [
  {
    name: 'Mr. Kumar',
    condition: 'Piles / Hemorrhoids',
    quote:
      'After consulting several doctors without relief, I came to GutCare on a friend’s suggestion, not with much hope. In exactly 5 days I was free, like I never had hemorrhoids.',
    before: { label: 'Living with recurring piles', days: 5 * 365 },
    after: { label: 'Free of hemorrhoids', days: 5 },
  },
];

// Google reviews are fetched at build time when GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID are set
// (see src/lib/googleReviews.ts). Add more real reviews here (e.g. copied from the clinic's Google
// Business Profile) to show them in the review wall as well.
export const manualReviews: Review[] = [];

// Placeholder reviews so the review wall can be previewed during local development (`npm run dev`).
// They are never included in production builds. Replace by adding real reviews above or configuring Google.
export const sampleReviews: Review[] = [
  ['Piles / Hemorrhoids', 'Sample review text. The procedure was quick and the team explained every step clearly. I went home the same day.'],
  ['Anal Fistula', 'Sample review text. After years of discomfort the laser treatment finally gave me relief. Follow-up calls were very reassuring.'],
  ['Hernia', 'Sample review text. Keyhole surgery with minimal pain, and I was back at work much sooner than I expected.'],
  ['Anal Fissures', 'Sample review text. Very professional and private. The doctor made me feel comfortable discussing a sensitive problem.'],
  ['Gallstones', 'Sample review text. Clear cost estimate upfront and the insurance paperwork was handled for us.'],
  ['Piles / Hemorrhoids', 'Sample review text. Friendly staff, clean clinic and excellent post-operative guidance on diet.'],
].map(([condition, text], i) => ({
  name: `Sample Patient ${i + 1}`,
  rating: 5,
  text,
  condition,
  source: 'Sample',
  sample: true,
}));
