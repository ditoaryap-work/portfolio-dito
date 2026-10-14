import type { Locale } from './copy';

export const site = {
  name: 'Dito Aryaputra Ramadhani',
  shortName: 'Dito',
  osName: 'DitoOS',
  title: {
    id: 'Dito Aryaputra Ramadhani | Otomasi Alur Kerja & Sistem Internal',
    en: 'Dito Aryaputra Ramadhani | Workflow Automation & Internal Systems',
  },
  description: {
    id: 'Perjalanan Dito Aryaputra Ramadhani dalam membangun otomasi, sistem pelaporan, dan aplikasi web.',
    en: 'Follow Dito Aryaputra Ramadhani’s work across automation, reporting systems, and web applications.',
  },
  role: {
    id: 'Pengembang otomasi alur kerja dan sistem internal',
    en: 'Workflow Automation & Internal Systems Developer',
  },
  summary: {
    id: 'Menghubungkan kebutuhan pengguna dengan data, otomasi, dan aplikasi web. Dari pelaporan lapangan hingga produk digital.',
    en: 'Connecting user needs with data, automation, and web applications, from field reporting to digital products.',
  },
  location: 'West Java, Indonesia',
  email: 'ditoaryaputra1324@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ditoaryap/',
  github: 'https://github.com/ditoaryap',
  website: 'https://ditoaryap.my.id',
  skills: [
    'n8n', 'Google Apps Script', 'Excel VBA', 'Looker Studio', 'REST APIs',
    'WhatsApp / Telegram integrations', 'Next.js', 'React', 'Node.js', 'NestJS',
    'PostgreSQL', 'Prisma', 'Drizzle ORM', 'Astro', 'GSAP',
  ],
};

export function getSiteMetadata(locale: Locale) {
  return { title: site.title[locale], description: site.description[locale] };
}
