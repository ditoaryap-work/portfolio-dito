import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    projectSlug: z.string(),
    locale: z.enum(['id', 'en']),
    order: z.number().int(),
    title: z.string(),
    summary: z.string(),
    description: z.string(),
    kind: z.string(),
    role: z.string(),
    year: z.string().optional(),
    status: z.string(),
    tools: z.array(z.string()),
    artwork: z.enum([
      'ecesa',
      'salesone',
      'spj-vba',
      'leave-system',
      'company-site',
      'property-listing',
      'serocoffee',
      'coffeespace',
    ]),
    highlight: z.string().optional(),
    siteUrl: z.url().optional(),
  }),
});

export const collections = { projects };
