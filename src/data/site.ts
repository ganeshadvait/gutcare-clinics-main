export const site = {
  name: 'GutCare Clinics',
  phone: '+91 84315 50550',
  phoneHref: 'tel:+918431550550',
  email: 'info@gutcareclinics.com',
  whatsapp: '918062277762',
  address: {
    line1: '1st Floor, #4024, 13th ‘H’ Main, 1st Cross Rd',
    line2: 'HAL 2nd Stage, Indiranagar',
    city: 'Bengaluru, Karnataka 560008',
  },
  mapsUrl: 'https://maps.app.goo.gl/9ENArKW2ixRspNvS6',
  reviewsUrl: 'https://maps.app.goo.gl/TCgMkRWipkxXEDmS9',
  mapEmbed:
    'https://www.google.com/maps?q=GutCare+Clinics+Indiranagar+Bengaluru&output=embed',
  social: {
    facebook: 'https://www.facebook.com/GutCareClinics',
    x: 'https://x.com/GutCareClinics',
    instagram: 'https://www.instagram.com/gutcare_clinics/',
    youtube: 'https://www.youtube.com/channel/UCSbtxRgUR9OGWSdKboE5V9A',
  },
};

export const whatsappLink = (text = 'Hi GutCare, I would like to book a consultation.') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about-gut-care/' },
  { label: 'Our Doctor', href: '/dr-yuvraj-singh-gehlot/' },
  { label: 'Treatments', href: '/#treatments', children: true },
  { label: 'International Patients', href: '/medical-tourism/' },
  { label: 'Blogs', href: '/blog/' },
];

export type Treatment = {
  name: string;
  slug: string;
  blurb: string;
  tags: string[];
  icon: string;
};

export const treatments: Treatment[] = [
  {
    name: 'Piles / Hemorrhoids',
    slug: 'best-piles-treatment-bangalore',
    blurb: 'Laser treatment for piles with minimal pain and same-day discharge.',
    tags: ['Laser', 'Same-day discharge'],
    icon: 'piles',
  },
  {
    name: 'Anal Fistula',
    slug: 'fistula-treatment-in-bangalore',
    blurb: 'USFDA-approved laser procedures that preserve sphincter function.',
    tags: ['Laser', 'USFDA approved'],
    icon: 'fistula',
  },
  {
    name: 'Anal Fissures',
    slug: 'anal-fissures-surgery-treatment',
    blurb: 'Painless, advanced laser treatment for acute and chronic fissures.',
    tags: ['Painless', 'Laser'],
    icon: 'fissure',
  },
  {
    name: 'Hernia',
    slug: 'hernia-treatment-hospital-in-bangalore',
    blurb: 'Laparoscopic hernia repair by an experienced laparoscopic surgeon.',
    tags: ['Laparoscopic', 'Faster recovery'],
    icon: 'hernia',
  },
  {
    name: 'Gallstones',
    slug: 'gallstones',
    blurb: 'Keyhole gall bladder removal with small incisions and quick recovery.',
    tags: ['Laparoscopic'],
    icon: 'gallbladder',
  },
  {
    name: 'Appendix',
    slug: 'appendix',
    blurb: 'Laparoscopic appendectomy, with a 24x7 emergency facility.',
    tags: ['24x7 emergency', 'Laparoscopic'],
    icon: 'appendix',
  },
  {
    name: 'Acid Reflux / GERD',
    slug: 'acid-reflux-gerd-treatment',
    blurb: 'Diagnosis and long-term management of reflux, from medicine to surgery.',
    tags: ['Diagnosis', 'Surgery if needed'],
    icon: 'reflux',
  },
  {
    name: 'Constipation',
    slug: 'treatment-for-constipation',
    blurb: 'Evaluation and personalised care plans for chronic constipation.',
    tags: ['Personalised care'],
    icon: 'constipation',
  },
  {
    name: 'Colorectal Cancer',
    slug: 'colorectal-cancer-treatment',
    blurb: 'Colon cancer specialist care, from screening to surgery.',
    tags: ['Specialist', 'Affordable'],
    icon: 'cancer',
  },
];
