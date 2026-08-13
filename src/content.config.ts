import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const sourceLink = z.object({
  label: z.string(),
  url: z.url(),
});

const apps = defineCollection({
  loader: glob({ base: './src/content/apps', pattern: '**/*.{json,yaml,yml}' }),
  schema: z.object({
    name: z.string(),
    shortDescription: z.string(),
    fullDescription: z.string(),
    icon: z.string(),
    logo: z.object({
      dark: z.string(),
      light: z.string(),
    }),
    screenshots: z.array(
      z.object({
        src: z.string(),
        alt: z.string(),
      }),
    ),
    platforms: z.array(z.string()),
    status: z.enum(['development', 'beta', 'available', 'archived']),
    tagline: z.string(),
    version: z.string(),
    minOs: z.string(),
    audience: z.array(z.string()),
    features: z.array(z.string()),
    releaseNote: z.string(),
    storeLinks: z.array(
      z.object({
        label: z.string(),
        url: z.string(),
      }),
    ),
    supportUrl: z.string(),
    privacyUrl: z.string(),
    supportLinks: z.array(
      z.object({
        label: z.string(),
        url: z.string(),
      }),
    ),
    featured: z.boolean(),
    order: z.number(),
  }),
});

const articles = defineCollection({
  loader: glob({ base: './src/content/articles', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    readingTime: z.string(),
    cover: z.string(),
    coverAlt: z.string(),
    coverPosition: z.enum(['center', 'left', 'right']).default('center'),
    accent: z.enum(['navy', 'teal', 'sand']),
    cluster: z.enum(['files', 'clients', 'marketing', 'legal']),
    seriesOrder: z.number().int().positive(),
    related: z.array(z.string()).default([]),
    takeaways: z.array(z.string()).min(2).max(4),
    keywords: z.array(z.string()),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

const aiGuides = defineCollection({
  loader: glob({ base: './src/content/ai-guides', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    answerFirst: z.string(),
    nextStep: z.string(),
    kind: z.enum(['guide', 'comparison', 'workflow']),
    topic: z.enum([
      'starting',
      'offline',
      'productivity',
      'research',
      'persian',
    ]),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    verifiedAt: z.coerce.date(),
    readingTime: z.string(),
    level: z.enum(['beginner', 'intermediate', 'advanced']),
    takeaways: z.array(z.string()).min(2).max(4),
    sources: z.array(sourceLink).min(1),
    keywords: z.array(z.string()).min(2),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

const aiUpdates = defineCollection({
  loader: glob({ base: './src/content/ai-updates', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    answerFirst: z.string(),
    impact: z.string(),
    category: z.enum(['tools', 'models', 'policy', 'research']),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    verifiedAt: z.coerce.date(),
    readingTime: z.string(),
    takeaways: z.array(z.string()).min(2).max(4),
    sources: z.array(sourceLink).min(1),
    keywords: z.array(z.string()).min(2),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

const aiTools = defineCollection({
  loader: glob({
    base: './src/content/ai-tools',
    pattern: '**/*.{json,yaml,yml}',
  }),
  schema: z.object({
    name: z.string(),
    shortName: z.string(),
    description: z.string(),
    plainSummary: z.string(),
    officialUrl: z.url(),
    category: z.enum(['assistant', 'research', 'local']),
    access: z.enum(['cloud', 'local', 'hybrid']),
    platforms: z.array(z.string()).min(1),
    bestFor: z.array(z.string()).min(2).max(4),
    features: z.array(z.string()).min(2).max(5),
    limitations: z.array(z.string()).min(1).max(4),
    verification: z.enum(['source-checked', 'hands-on']),
    verifiedAt: z.coerce.date(),
    sources: z.array(sourceLink).min(1),
    featured: z.boolean().default(false),
    order: z.number().int().positive(),
  }),
});

export const collections = {
  apps,
  articles,
  aiGuides,
  aiUpdates,
  aiTools,
};
