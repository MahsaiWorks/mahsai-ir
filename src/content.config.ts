import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const apps = defineCollection({
  loader: glob({ base: './src/content/apps', pattern: '**/*.{json,yaml,yml}' }),
  schema: z.object({
    name: z.string(),
    shortDescription: z.string(),
    fullDescription: z.string(),
    icon: z.string(),
    wordmark: z.string(),
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
    pricing: z.object({
      installPrice: z.number().nonnegative(),
      currency: z.string(),
      hasInAppPurchase: z.boolean(),
    }),
    storeUpdatedAt: z.coerce.date(),
    storeCheckedAt: z.coerce.date(),
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
    seoTitle: z.string().optional(),
    description: z.string(),
    category: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    readingTime: z.string(),
    cover: z.string(),
    coverWidth: z.number().int().positive(),
    coverHeight: z.number().int().positive(),
    coverAlt: z.string(),
    coverPosition: z.enum(['center', 'left', 'right']).default('center'),
    accent: z.enum(['navy', 'teal', 'sand']),
    cluster: z.enum(['files', 'clients', 'marketing', 'legal']),
    seriesOrder: z.number().int().positive(),
    related: z.array(z.string()).default([]),
    takeaways: z.array(z.string()).min(2).max(4),
    scenario: z.object({
      title: z.string(),
      situation: z.string(),
      action: z.string(),
      result: z.string(),
    }),
    copyBlock: z.object({
      title: z.string(),
      intro: z.string(),
      lines: z.array(z.string()).min(2).max(12),
    }),
    metrazh: z.object({
      title: z.string(),
      description: z.string(),
      visual: z.enum([
        'property-catalog',
        'smart-matching',
        'smart-listing',
        'visit-routing',
        'customer-follow-up',
      ]),
    }),
    keywords: z.array(z.string()),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  apps,
  articles,
};
