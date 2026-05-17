const WORDS_PER_MINUTE = 200;

export function readingTime(body: string | undefined | null): number {
  if (!body) return 1;
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
