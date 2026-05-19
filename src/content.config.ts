import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { BLOG_CATEGORIES, PRACTICE_AREA_NAMES } from './data/categories';

const blogCategoryEnum = z.enum(
  BLOG_CATEGORIES as unknown as [string, ...string[]],
);
const practiceAreaEnum = z.enum(
  PRACTICE_AREA_NAMES as unknown as [string, ...string[]],
);

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    categories: z.array(blogCategoryEnum).default([]),
    draft: z.boolean().default(false),
    series: z.string().optional(),
    series_part: z.number().optional(),
    og_title: z.string().min(8).max(42),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: practiceAreaEnum,
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    metrics: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        }),
      )
      .default([]),
    order: z.number().default(99),
  }),
});

export const collections = { blog, projects };
