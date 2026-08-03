import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export async function getPublishedPosts(): Promise<CollectionEntry<'blog'>[]> {
  const now = Date.now();
  return (await getCollection('blog'))
    .filter((post) => !post.data.draft && post.data.date.valueOf() <= now)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
