import type { ImageMetadata } from 'astro';
import spigelian from '../assets/blog/spigelian-hernia.webp';
import sportsHernia from '../assets/blog/sports-hernia.webp';
import hereditaryCrc from '../assets/blog/hereditary-colorectal-cancer.webp';
import pilesHereditary from '../assets/blog/is-piles-hereditary.webp';
import dopplerThd from '../assets/blog/doppler-thd.webp';

export type BlogCategory = 'Piles' | 'Anal Fistula' | 'Hernia' | 'Constipation' | 'Colorectal Cancer';

export type Article = {
  title: string;
  url: string;
  category: BlogCategory;
  excerpt: string;
  image?: ImageMetadata;
};

const base = 'https://www.gutcareclinics.com';

// Latest posts from the existing WordPress blog (covers copied from wp-content/uploads). Swap for a content collection once posts move into Astro.
export const articles: Article[] = [
  {
    title: 'What Is a Spigelian Hernia? Symptoms, Risks, and Treatment Options',
    url: `${base}/spigelian-hernia-symptoms-treatment/`,
    image: spigelian,
    category: 'Hernia',
    excerpt: 'A rare hernia that is easy to miss. How to recognise it, why it matters and how it is repaired.',
  },
  {
    title: 'Sports Hernia (Athletic Pubalgia): Symptoms and Treatment',
    url: `${base}/sports-hernia-treatment/`,
    image: sportsHernia,
    category: 'Hernia',
    excerpt: 'Groin pain that flares with sport? What a sports hernia is and the options for getting back in the game.',
  },
  {
    title: 'Hereditary Colorectal Cancer: Who Needs Genetic Testing?',
    url: `${base}/hereditary-colorectal-cancer/`,
    image: hereditaryCrc,
    category: 'Colorectal Cancer',
    excerpt: 'When family history raises your risk, and how genetic testing guides earlier screening.',
  },
  {
    title: 'Rectocele and Constipation: When the Rectum Bulges',
    url: `${base}/rectocele-and-constipation/`,
    category: 'Constipation',
    excerpt: 'How a rectocele can cause difficult bowel movements, and the treatments that help.',
  },
  {
    title: 'Slow Transit Constipation: Causes, Tests and Treatment',
    url: `${base}/slow-transit-constipation/`,
    category: 'Constipation',
    excerpt: 'When the bowel moves too slowly: what causes it, how it is diagnosed and managed.',
  },
  {
    title: 'Is Piles Hereditary? Understanding Genetic Risk Factors',
    url: `${base}/is-piles-hereditary/`,
    image: pilesHereditary,
    category: 'Piles',
    excerpt: 'Does piles run in families? Separating genetic risk from lifestyle factors you can control.',
  },
  {
    title: 'Doppler-Guided Hemorrhoidal Artery Ligation (THD) for Piles',
    url: `${base}/doppler-guided-hemorrhoidal-artery-ligation/`,
    image: dopplerThd,
    category: 'Piles',
    excerpt: 'A minimally invasive technique that targets the blood supply to piles. Who it suits and what to expect.',
  },
  {
    title: 'Seton Treatment for Anal Fistula: Types, Duration, and Care',
    url: `${base}/seton-treatment-for-anal-fistula/`,
    category: 'Anal Fistula',
    excerpt: 'How a seton helps a fistula heal, the different types used, and caring for it at home.',
  },
  {
    title: 'LIFT Procedure for Anal Fistula: How It Preserves the Sphincter',
    url: `${base}/lift-procedure-for-anal-fistula/`,
    category: 'Anal Fistula',
    excerpt: 'A sphincter-sparing fistula operation that protects continence. How LIFT works and recovery.',
  },
];
