export const SITE = {
  name: 'Syed Aamir',
  title: 'Data & AI Solutions Architect',
  // "10+ years" is intentionally manual here (meta description, ~5-year cadence).
  // Rationale and the milestone to bump live in src/CLAUDE.md, "Computed figures".
  description:
    'Data and AI solutions architect based in Dubai, UAE. 10+ years across data platforms and analytics systems, now building production AI.',
  url: 'https://syedaamir.com',
  author: 'Syed Aamir',
  email: 'aamir@syedaamir.com',
  location: 'Dubai, UAE',
  avatar: '/assets/syedaamir.jpeg',
  ogImage: '/assets/og-card.jpg',
  titleSeparator: ' | ',
};

const GMAIL_COMPOSE =
  'https://mail.google.com/mail/?' +
  new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: SITE.email,
    su: "Let's talk",
    body: 'Hi Aamir,\n\n',
  }).toString();

export const SOCIAL = {
  linkedin: 'https://www.linkedin.com/in/syedaamiruddin/',
  linkedinHandle: '@syedaamiruddin',
  github: 'https://github.com/syedaamir229',
  tableau: 'https://public.tableau.com/app/profile/syed.aamir/vizzes',
  emailCompose: GMAIL_COMPOSE,
};

// Google Calendar appointment scheduling: public intro call only.
// The discovery call link is shared privately after a good intro call, so it
// intentionally does not live here.
export const BOOKING = {
  intro: 'https://calendar.app.google/FfXvw4dDF2aaNQYC9',
};

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Experience', href: '/experience/' },
  { label: 'Writing', href: '/blog/' },
  { label: 'Contact', href: '/contact/' },
] as const;
