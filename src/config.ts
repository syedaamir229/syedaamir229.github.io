export const SITE = {
  name: 'Syed Aamir',
  title: 'Data & AI Solutions Engineer',
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
  { label: 'About', href: '/experience/' },
  { label: 'Writing', href: '/blog/' },
  { label: 'Contact', href: '/contact/' },
] as const;
