import type { Locale } from './copy';

export type JourneyCategory = 'education' | 'experience' | 'milestones';
export interface JourneyEntry {
  category: JourneyCategory;
  period: string;
  title: Record<Locale, string>;
  place?: Record<Locale, string>;
  description: Record<Locale, string>;
  projectSlug?: string;
}

export const journeyEntries: JourneyEntry[] = [
  {
    category: 'education',
    period: 'Sep 2018 – Jan 2023',
    title: {
      id: 'Sistem Informasi · Sarjana',
      en: 'Information Systems · Bachelor’s degree',
    },
    place: {
      id: 'Universitas Gunadarma · IPK 3,61 / 4,00',
      en: 'Universitas Gunadarma · GPA 3.61 / 4.00',
    },
    description: {
      id: 'Belajar membangun dasar sistem informasi, lalu memperluas minat ke UX dan pengembangan web.',
      en: 'Built a foundation in information systems, then expanded my interests into UX and web development.',
    },
  },
  {
    category: 'education',
    period: '2022',
    title: { id: 'UI/UX Research & Design', en: 'UI/UX Research & Design' },
    place: {
      id: 'Binar Academy · Kampus Merdeka',
      en: 'Binar Academy · Kampus Merdeka',
    },
    description: {
      id: 'Program intensif yang memperkenalkan saya pada riset pengguna dan proses merancang pengalaman digital.',
      en: 'An intensive program that introduced me to user research and the process of designing digital experiences.',
    },
  },
  {
    category: 'education',
    period: '2024',
    title: {
      id: 'Full Stack Website Developer',
      en: 'Full Stack Website Developer',
    },
    place: { id: 'Purwadhika', en: 'Purwadhika' },
    description: {
      id: 'Memperdalam JavaScript, React, Next.js, Node.js, API, basis data, dan alur pengembangan aplikasi.',
      en: 'Deepened my skills in JavaScript, React, Next.js, Node.js, APIs, databases, and application development workflows.',
    },
  },
  {
    category: 'experience',
    period: 'Sep 2023 – Agu 2024',
    title: {
      id: 'Administrasi program lahan',
      en: 'Land program administration',
    },
    place: {
      id: 'Kementerian Pertanian Republik Indonesia',
      en: 'Ministry of Agriculture of the Republic of Indonesia',
    },
    description: {
      id: 'Mengelola dokumentasi program dan membangun formulir Excel VBA untuk laporan perjalanan dinas. Alat ini digunakan sekitar 50 staf. CV versi sebelumnya mencatat waktu proses turun dari sekitar 20 menit menjadi kurang dari 5 menit per siklus.',
      en: 'Managed program documentation and built Excel VBA forms for travel expense reports. The tool was used by about 50 staff. An earlier CV version reported processing time falling from around 20 minutes to under 5 per cycle.',
    },
    projectSlug: 'spj-vba',
  },
  {
    category: 'experience',
    period: 'Sep 2024 – Mei 2025',
    title: { id: 'Sekretaris Direktur', en: 'Director’s Secretary' },
    place: {
      id: 'Kementerian Pertanian Republik Indonesia',
      en: 'Ministry of Agriculture of the Republic of Indonesia',
    },
    description: {
      id: 'Mengoordinasikan surat-menyurat, dokumen rapat, dan komunikasi lintas direktorat serta kantor daerah. Saya juga membuat bot Telegram yang terhubung ke Google Drive untuk alur surat masuk dan keluar.',
      en: 'Coordinated correspondence, meeting records, and communication across directorates and regional offices. I also built a Telegram bot connected to Google Drive for incoming and outgoing letters.',
    },
  },
  {
    category: 'experience',
    period: 'Mei 2025 – sekarang',
    title: {
      id: 'Staf Teknis · sistem dan pelaporan',
      en: 'Technical Staff · systems and reporting',
    },
    place: {
      id: 'Kementerian Pertanian Republik Indonesia',
      en: 'Ministry of Agriculture of the Republic of Indonesia',
    },
    description: {
      id: 'Mengembangkan sistem pelaporan lapangan, otomasi Apps Script dan n8n, integrasi WhatsApp, serta dashboard Looker Studio untuk mendukung pemantauan program.',
      en: 'Develops field reporting systems, Apps Script and n8n automations, WhatsApp integrations, and Looker Studio dashboards for program monitoring.',
    },
    projectSlug: 'ecesa',
  },
  {
    category: 'experience',
    period: '2024 – sekarang',
    title: { id: 'Web Developer lepas', en: 'Freelance Web Developer' },
    place: { id: 'Kolaborasi jarak jauh', en: 'Remote collaboration' },
    description: {
      id: 'Membangun dan memelihara website perusahaan, listing properti, produk web, dan aplikasi internal—mencakup antarmuka, backend, deployment, serta dukungan setelah rilis.',
      en: 'Builds and maintains company websites, property listings, web products, and internal applications across interface design, backend, deployment, and post-release support.',
    },
  },
  {
    category: 'milestones',
    period: '2026',
    title: {
      id: 'ecesa.id · pelaporan 24 provinsi',
      en: 'ecesa.id · reporting across 24 provinces',
    },
    place: {
      id: 'Kementerian Pertanian Republik Indonesia',
      en: 'Ministry of Agriculture of the Republic of Indonesia',
    },
    description: {
      id: 'Sistem berisi lebih dari 14.000 laporan harian kumulatif, termasuk catatan historis yang dimigrasikan. Input petugas lapangan dimulai pada Agustus 2026.',
      en: 'The system contains more than 14,000 cumulative daily reports, including migrated historical records. Field staff began entering reports in August 2026.',
    },
    projectSlug: 'ecesa',
  },
  {
    category: 'milestones',
    period: 'Apr 2023',
    title: {
      id: 'Google UX Design Certificate',
      en: 'Google UX Design Certificate',
    },
    place: { id: 'Coursera', en: 'Coursera' },
    description: {
      id: 'Sertifikasi desain UX yang menambah praktik riset pengguna dan wireframing ke cara saya merancang produk.',
      en: 'A UX design certificate that added user research and wireframing practice to the way I approach products.',
    },
  },
  {
    category: 'milestones',
    period: 'Okt 2022',
    title: { id: 'UX Masterclass', en: 'UX Masterclass' },
    place: { id: 'Mezink', en: 'Mezink' },
    description: {
      id: 'Pelatihan UX dengan fokus pada user research dan wireframing.',
      en: 'UX training focused on user research and wireframing.',
    },
  },
  {
    category: 'milestones',
    period: 'Kurang dari 2 minggu',
    title: {
      id: 'salesone.id · sekitar 130 pengguna',
      en: 'salesone.id · about 130 users',
    },
    place: {
      id: 'Produk pribadi bersama satu partner',
      en: 'Personal product with one partner',
    },
    description: {
      id: 'Platform persiapan pembelian rumah yang mencakup simulasi KPR, checklist pembelian, inspeksi rumah, dan perencanaan renovasi.',
      en: 'A home-buying preparation platform with mortgage simulations, purchase checklists, home inspections, and renovation planning.',
    },
    projectSlug: 'salesone',
  },
];

export const journeyCategories = [
  { id: 'education', key: 'education' },
  { id: 'experience', key: 'experience' },
  { id: 'milestones', key: 'milestones' },
] as const;

export function journeyText(entry: JourneyEntry, locale: Locale) {
  return {
    title: entry.title[locale],
    place: entry.place?.[locale],
    description: entry.description[locale],
  };
}
