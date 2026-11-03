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
  /** Placeholder shown until real reviews are added. */
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
export const manualReviews: Review[] = [
  ['Narenderreddy', 'Doctor Consultation', 'Dr. Yuvaraj was professional and kind, taking time to explain everything clearly. I felt heard and respected throughout the consultation and reassured about my treatment plan.'],
  ['Prakash Sundaran', 'Piles / Haemorrhoids', 'I visited for my dad’s haemorrhoid treatment. The doctor explained the issues well, and the support staff helped us throughout, from the first visit to surgery, insurance and follow-ups.'],
  ['karuna Karan', 'Piles / Haemorrhoids', 'My sister was suffering from piles and was treated by a female doctor. She is feeling much better now. I would recommend this clinic to others.'],
  ['Raviendra Kumar Awasthi', 'Piles, Fissure & Fistula', 'After suffering with pain for forty years, I found relief following treatment by Dr. Yuvraj Singh, including procedures for haemorrhoids, fissure and fistula. Thank you, doctor, for everything.'],
  ['Sandeep G', 'Fissure & Internal Piles', 'Dr. Yuvrajsingh was patient and thorough, explaining my condition and treatment clearly. Surgery went smoothly, recovery was better than expected, and the follow-up care and staff support were excellent.'],
  ['Lalitha B', 'Piles & Polyp Removal', 'I had piles and polyp removal surgery. Dr. Yuvaraj was friendly, and the team made the process hassle-free. Mr. Balaji helped with insurance and answered my questions after surgery throughout recovery.'],
  ['Adithya Manickavasakam', 'Digestive Health', 'I visited with loose stools, bloating and irregular bowel movements. Dr. Yuvaraj listened patiently, answered my questions and prescribed a long-term plan. My bowel movements are now under control, and the bloating has gone.'],
  ['prachi Pawar', 'Piles / Haemorrhoids', 'I recommend Dr. Yuvraj Singh Gehlot for piles treatment. He explained things very well and helped with my complicated problem. Thank you, doctor, for the care and treatment.'],
  ['Anusha Reddy', 'Complex Anal Fistula', 'I came for complex fistula surgery feeling very afraid, but felt comfortable with the doctor and staff. I followed Dr. Yuvaraj’s instructions and have now recovered well. Thank you to the entire team.'],
  ['J Shireesha', 'Piles / Haemorrhoids', 'My father underwent laser surgery for piles with Dr. Yuvraj. His treatment went smoothly, and recovery was fast. The doctor explained everything clearly and took good care of him throughout the process.'],
  ['Shiny Shanbagam', 'Surgical Care', 'The doctor understood my pain and health concerns and advised surgery. Although my surgery was complicated, I felt confident in Dr. Yuvrajsingh’s care. The team guided us throughout the journey.'],
  ['Naveen M', 'Fissure & Haemorrhoids', 'I had fissure and haemorrhoids for years without success from previous treatment. Dr. Gehlot diagnosed the issue and advised surgery. I am doing much better now. Thank you to the doctor and team.'],
].map(([name, condition, text]) => ({ name, rating: 5, text, condition, source: 'Google' }));

// Placeholder reviews shown (including in production) until a real review is added above or Google is
// configured; the first real review replaces all of them.
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
