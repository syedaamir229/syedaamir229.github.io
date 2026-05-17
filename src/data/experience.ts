export interface RoleProject {
  name: string;
  href: string;
}

export interface Role {
  title: string;
  period: string;
  bullets: string[];
  projects: RoleProject[];
}

export interface Company {
  company: string;
  tenure: string;
  location: string;
  current: boolean;
  roles: Role[];
}

export const EXPERIENCE: Company[] = [
  {
    company: 'MBC Shahid (MBC Group)',
    tenure: 'Full-time, 4 yrs 1 mo',
    location: 'Dubai, UAE',
    current: true,
    roles: [
      {
        title: 'Assistant Advanced Analytics and Insights Manager',
        period: 'Jan 2025 - Present',
        bullets: [
          'Shipped a GenAI-powered voice-of-customer intelligence platform unifying support, review, and social signals',
          'Designed and operationalised a CRM campaign automation platform, cutting manual setup time on recurring campaigns',
          'Delivered behavior-based attribute inference and viewing clusters feeding targeted marketing and personalization',
          'Built the profile-level feature store powering segmentation, inference, and GenAI use cases across teams',
        ],
        projects: [
          { name: 'CRM Automation', href: '/projects/crm-automation/' },
          { name: 'Voice-of-Customer', href: '/projects/voice-of-customer/' },
          { name: 'Attribute Inference', href: '/projects/attribute-inference/' },
          { name: 'Feature Store', href: '/projects/profile-features/' },
          { name: 'Audience Segmentation', href: '/projects/audience-segmentation/' },
        ],
      },
      {
        title: 'Assistant Data and Analytics Manager',
        period: 'Apr 2024 - Jan 2025',
        bullets: [
          'Migrated the governed KPI layer from Power BI Premium to SSAS Tabular to resolve memory pressure at scale',
          'Expanded the ad inventory and revenue pipeline with delivery pacing, ad-serving error monitoring, and Slack-based alerting',
          'Standardised KPIs across marketing, finance, and operations through cross-functional governance reviews',
          'Mentored the BI and analytics team on DAX, SQL, and Power BI, building bench depth across the function',
        ],
        projects: [
          { name: 'Semantic Layer', href: '/projects/semantic-layer/' },
          { name: 'Ad Inventory & Revenue', href: '/projects/ad-pipeline/' },
        ],
      },
      {
        title: 'Senior BI Analyst',
        period: 'Mar 2022 - Mar 2024',
        bullets: [
          'Designed the enterprise data model consolidating 5 source systems into a unified Silver/Gold reporting layer that became the foundation for every downstream BI, ML, and AI project',
          'Led the BI modernisation roadmap, migrating legacy reporting to governed Power BI and Tableau',
          'Built the governed semantic layer and KPI framework serving finance, marketing, and content teams',
          'Shipped Phase 1 of the ad inventory and revenue pipeline covering ad delivery, performance tracking, and reconciliation',
        ],
        projects: [
          { name: 'Enterprise Data Model', href: '/projects/data-model/' },
          { name: 'BI Modernization', href: '/projects/bi-migration/' },
        ],
      },
    ],
  },
  {
    company: 'Beinex',
    tenure: 'Full-time, 3 yrs 3 mo',
    location: 'Dubai, UAE',
    current: false,
    roles: [
      {
        title: 'Senior Consultant - Analytics',
        period: 'Jan 2021 - Mar 2022',
        bullets: [
          'Owned the HHRC engagement, expanded from short-term into a multi-year delivery track',
          'Led cross-departmental Power BI workshops that drove adoption across teams previously stuck on legacy reports',
          'Rolled out self-service reporting patterns so business teams answered routine questions without queueing on an analyst',
          'Led presales, product demos, and Proof-of-Technology engagements',
        ],
        projects: [],
      },
      {
        title: 'Business Intelligence Consultant',
        period: 'Jan 2019 - Dec 2020',
        bullets: [
          'Delivered consulting across enterprise clients (ADIC, ADEC, Jaguar Land Rover)',
          'Built ETL processes with SSIS, Alteryx, Tableau Prep, and SQL Server',
          'Delivered secure dashboards with row-level security and user-specific access controls',
          'Trained end-users and senior stakeholders on Tableau, Power BI, and SQL',
        ],
        projects: [],
      },
    ],
  },
  {
    company: 'Al-Futtaim Engineering and Technologies (Al-Futtaim Group)',
    tenure: 'Full-time, 9 mo',
    location: 'Dubai, UAE',
    current: false,
    roles: [
      {
        title: 'Business Intelligence Consultant',
        period: 'May 2018 - Jan 2019',
        bullets: [
          'Consolidated fragmented legacy reporting into a governed BI layer that opened cross-department data access',
          'Converted static legacy reports into dynamic Tableau dashboards refreshing without analyst handoff',
        ],
        projects: [],
      },
    ],
  },
  {
    company: 'Scan Technology LLC',
    tenure: 'Full-time, 1 yr 7 mo',
    location: 'Dubai, UAE',
    current: false,
    roles: [
      {
        title: 'Business Intelligence Consultant',
        period: 'Oct 2016 - Apr 2018',
        bullets: [
          'Designed sales, financial, and performance dashboards in Tableau for near real-time executive insights',
          'Built interactive KPI visualisations that moved executive reviews from static decks to live drill-downs',
          'Replaced recurring manual report builds with Alteryx workflows, freeing the team from rebuilding the same exports each cycle',
        ],
        projects: [],
      },
    ],
  },
];

export const CURRENT_ROLE = (() => {
  const company = EXPERIENCE.find((c) => c.current);
  const role = company?.roles[0];
  if (!company || !role) return null;
  return {
    company: company.company,
    title: role.title,
  };
})();
