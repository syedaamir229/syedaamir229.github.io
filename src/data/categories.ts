export const PRACTICE_AREAS = [
  { name: 'Data Engineering', slug: 'data-engineering' },
  { name: 'BI & Analytics', slug: 'bi-analytics' },
  { name: 'Data Science', slug: 'data-science' },
  { name: 'AI & Automation', slug: 'ai-automation' },
] as const;

export type PracticeArea = (typeof PRACTICE_AREAS)[number]['name'];

export const PRACTICE_AREA_NAMES = PRACTICE_AREAS.map((c) => c.name) as readonly PracticeArea[];

export const BLOG_CATEGORIES = [
  ...PRACTICE_AREA_NAMES,
  'Data Governance',
  'Data Modeling',
  'Career',
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const SLUG_TO_CATEGORY: Record<string, PracticeArea> = Object.fromEntries(
  PRACTICE_AREAS.map((c) => [c.slug, c.name]),
) as Record<string, PracticeArea>;
