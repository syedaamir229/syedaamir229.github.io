// Date math for experience entries. Raw dates are 'YYYY-MM' strings; an `end`
// of null means the role is ongoing. Display strings (period labels, durations,
// company tenure) are computed here at build time so they never go stale.
//
// Durations follow the LinkedIn convention: months are counted inclusively, so
// a role spanning Jan to Mar reads as "3 mos", not "2". This matches the values
// LinkedIn shows for these same roles.

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

interface YearMonth {
  year: number;
  month: number; // 1-12
}

function parse(ym: string): YearMonth {
  const [year, month] = ym.split('-').map(Number);
  return { year, month };
}

function toYearMonth(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

/** '2025-01' -> 'Jan 2025' */
export function formatMonth(ym: string): string {
  const { year, month } = parse(ym);
  return `${MONTHS[month - 1]} ${year}`;
}

/** 'Jan 2025 - Present' (end null) or 'Mar 2022 - Mar 2024'. */
export function formatPeriod(start: string, end: string | null): string {
  return `${formatMonth(start)} - ${end ? formatMonth(end) : 'Present'}`;
}

/** Inclusive count of calendar months from start to end. */
function monthsBetween(start: string, end: string): number {
  const a = parse(start);
  const b = parse(end);
  return (b.year - a.year) * 12 + (b.month - a.month) + 1;
}

/**
 * Human duration like '4 yrs 3 mos', '9 mos', or '1 yr'. When `end` is null the
 * span runs to the current month, so the figure stays correct on every build.
 */
export function formatDuration(start: string, end: string | null, now = new Date()): string {
  const endYm = end ?? toYearMonth(now);
  const total = monthsBetween(start, endYm);
  const years = Math.floor(total / 12);
  const months = total % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? 'mo' : 'mos'}`);
  return parts.join(' ') || '0 mos';
}

/**
 * The overall span of a company: earliest role start to latest role end. If any
 * role is ongoing, the company span is ongoing too.
 */
export function companySpan(roles: { start: string; end: string | null }[]): {
  start: string;
  end: string | null;
} {
  const start = roles.map((r) => r.start).sort()[0];
  const ongoing = roles.some((r) => r.end === null);
  const ends = roles
    .map((r) => r.end)
    .filter((e): e is string => e !== null)
    .sort();
  return { start, end: ongoing ? null : ends[ends.length - 1] };
}
