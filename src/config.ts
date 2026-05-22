export const SITE = {
  name: 'Syed Aamir',
  title: 'Data & AI Solutions Engineer',
  // The "10+ years" here is the one place this figure stays manual: it is a meta
  // description (search/link-preview only, not visible on the page), it changes
  // just once every 5 years, and keeping config free of data/ imports preserves
  // the layering rule. The visible figures (home hero, experience header) are
  // computed from the experience data via experienceYears(). Bump this at the
  // next milestone (15+) when the time comes.
  description:
    'Data and AI solutions engineer based in Dubai, UAE. 10+ years delivering practical data platforms, analytics systems, and AI automation.',
  url: 'https://syedaamir229.github.io',
  author: 'Syed Aamir',
  email: 'saamir259@gmail.com',
  location: 'Dubai, UAE',
  avatar: '/assets/syedaamir.jpeg',
  ogImage: '/assets/og-card.jpg',
  titleSeparator: ' | ',
};

const GMAIL_COMPOSE =
  'https://mail.google.com/mail/?view=cm&fs=1&to=saamir259@gmail.com&su=Let%27s%20talk';

export const SOCIAL = {
  linkedin: 'https://www.linkedin.com/in/syedaamiruddin/',
  linkedinHandle: '@syedaamiruddin',
  github: 'https://github.com/syedaamir229',
  tableau: 'https://public.tableau.com/app/profile/syed.aamir/vizzes',
  emailCompose: GMAIL_COMPOSE,
};

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Experience', href: '/experience/' },
  { label: 'Writing', href: '/blog/' },
  { label: 'Contact', href: '/contact/' },
] as const;
