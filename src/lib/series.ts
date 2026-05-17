import type { CollectionEntry } from 'astro:content';
import { SERIES } from '../data/series';

export interface SeriesNeighbor {
  slug: string;
  title: string;
  part: number;
}

export interface SeriesInfo {
  label: string;
  part: number;
  total: number;
  prev?: SeriesNeighbor;
  next?: SeriesNeighbor;
}

export function getSeriesInfo(
  post: CollectionEntry<'blog'>,
  allPosts: CollectionEntry<'blog'>[],
): SeriesInfo | null {
  const seriesName = post.data.series;
  const seriesPart = post.data.series_part;
  if (!seriesName || typeof seriesPart !== 'number') return null;

  const siblings = allPosts
    .filter(
      (p) => p.data.series === seriesName && typeof p.data.series_part === 'number',
    )
    .sort((a, b) => (a.data.series_part as number) - (b.data.series_part as number));

  const toNeighbor = (p: CollectionEntry<'blog'> | undefined): SeriesNeighbor | undefined =>
    p
      ? { slug: p.id, title: p.data.title, part: p.data.series_part as number }
      : undefined;

  return {
    label: SERIES[seriesName]?.label ?? seriesName,
    part: seriesPart,
    total: siblings.length,
    prev: toNeighbor(siblings.find((p) => (p.data.series_part as number) === seriesPart - 1)),
    next: toNeighbor(siblings.find((p) => (p.data.series_part as number) === seriesPart + 1)),
  };
}
