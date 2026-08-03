import type { CollectionEntry } from 'astro:content';
import { SITE } from '../config';

const absolute = (path: string) => new URL(path, SITE.url).toString();

export function getBlogPostingSchema(
  post: CollectionEntry<'blog'>,
  path: string,
  imagePath: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.data.title,
    description: post.data.description,
    image: absolute(imagePath),
    datePublished: post.data.date.toISOString(),
    author: { '@type': 'Person', name: SITE.name, url: SITE.url },
    mainEntityOfPage: absolute(path),
  };
}

export function getBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
  };
}
