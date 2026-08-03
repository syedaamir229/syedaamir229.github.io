import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export interface GetPublishedProjectsOptions {
  featuredOnly?: boolean;
  limit?: number;
  kind?: 'enterprise' | 'personal';
}

export async function getPublishedProjects(
  options: GetPublishedProjectsOptions = {},
): Promise<CollectionEntry<'projects'>[]> {
  const { featuredOnly = false, limit, kind } = options;
  let projects = (await getCollection('projects'))
    .filter(
      (p) =>
        !p.data.draft &&
        (!featuredOnly || p.data.featured) &&
        (!kind || p.data.kind === kind),
    )
    .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
  if (typeof limit === 'number') projects = projects.slice(0, limit);
  return projects;
}
