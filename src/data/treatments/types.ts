/** Content for one treatment page, rendered by src/pages/[slug].astro. */
export type TreatmentContent = {
  /** Must match the `slug` of the same treatment in src/data/site.ts (it is also the page URL). */
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  /** Page H1. Wrap the words to emphasise in *asterisks*. */
  heroTitle: string;
  heroSubtitle: string;
  /** 3–4 short facts shown under the hero, e.g. { label: 'Hospital stay', value: 'Same day*' }. */
  quickFacts: { label: string; value: string }[];
  /** 2–3 short paragraphs explaining the condition in plain language. */
  overview: string[];
  symptoms: string[];
  causes: string[];
  /** Optional grades / types of the condition. */
  types?: { title: string; text: string }[];
  /** Treatment options offered, from conservative to surgical. */
  treatments: { title: string; text: string; tag?: string }[];
  /** What happens on the day, in order. */
  procedureSteps: { title: string; text: string }[];
  /** Typical recovery milestones. */
  recovery: { when: string; text: string }[];
  /** Red-flag symptoms that need prompt medical attention. */
  whenToSeeDoctor: string[];
  faqs: { q: string; a: string }[];
  /** Slugs of 2–3 related treatments from src/data/site.ts. */
  related: string[];
  /** Footnote for any value marked with * in quickFacts. */
  footnote?: string;
};
