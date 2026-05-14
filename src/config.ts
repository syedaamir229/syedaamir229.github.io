export const SITE = {
  name: 'Syed Aamir',
  title: 'Data & AI Solutions Engineer',
  description:
    'Data and AI solutions engineer based in Dubai, UAE. 10+ years delivering practical data platforms, analytics systems, and AI automation.',
  url: 'https://syedaamir229.github.io',
  author: 'Syed Aamir',
  email: 'saamir259@gmail.com',
  location: 'Dubai, UAE',
};

export const SOCIAL = {
  linkedin: 'https://www.linkedin.com/in/syedaamiruddin/',
  github: 'https://github.com/syedaamir229',
  tableau: 'https://public.tableau.com/app/profile/syed.aamir/vizzes',
  email: 'mailto:saamir259@gmail.com',
};

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Experience', href: '/experience/' },
] as const;

export const CAPABILITIES = [
  {
    title: 'Data Architecture & Engineering',
    description:
      'Enterprise data models, medallion architectures, and governed pipelines that become the foundation for every analytics and AI initiative.',
    icon: 'database',
    link: '/projects/',
  },
  {
    title: 'BI & Analytics',
    description:
      'Semantic layers, governed KPI frameworks, and platform migrations that make reporting trustworthy and self-serve.',
    icon: 'chart',
    link: '/projects/',
  },
  {
    title: 'Data Science & ML',
    description:
      'Behavioral segmentation, inference models, and feature stores that turn raw user data into actionable intelligence.',
    icon: 'brain',
    link: '/projects/',
  },
  {
    title: 'AI & Automation',
    description:
      'CRM automation, GenAI-powered platforms, and NLP systems that remove manual bottlenecks and scale operations.',
    icon: 'robot',
    link: '/projects/',
  },
] as const;

export const METRICS = [
  { value: '10+', label: 'Years Experience' },
  { value: '14', label: 'Projects Delivered' },
  { value: '5', label: 'Certifications' },
  { value: '4', label: 'Industries' },
] as const;
