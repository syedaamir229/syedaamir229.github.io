// Raw, authored facts only. Dates are 'YYYY-MM'; an `end` of null marks the
// ongoing role. Everything derived from these (period labels, durations, the
// company tenure summary, which role is "current") is computed at build time by
// the helpers in ../lib/tenure. Never store a computed value here: it will drift.

export interface RoleProject {
  name: string;
  href: string;
}

export interface Role {
  title: string;
  start: string; // 'YYYY-MM'
  end: string | null; // 'YYYY-MM', or null if ongoing
  bullets: string[];
  projects: RoleProject[];
}

export interface Company {
  company: string;
  employmentType: string;
  location: string;
  roles: Role[]; // newest first
  // When true, the entry is kept as a record (and still anchors the
  // years-of-experience count) but is not rendered in the timeline.
  hidden?: boolean;
}

export const EXPERIENCE: Company[] = [
  {
    company: 'MBC Shahid (MBC Group)',
    employmentType: 'Full-time',
    location: 'Dubai, UAE',
    roles: [
      {
        title: 'Assistant Advanced Analytics and Insights Manager',
        start: '2025-01',
        end: null,
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
          { name: 'Feature Store', href: '/projects/profile-feature-store/' },
          { name: 'Audience Segmentation', href: '/projects/audience-segmentation/' },
        ],
      },
      {
        title: 'Assistant Data and Analytics Manager',
        start: '2024-04',
        end: '2025-01',
        bullets: [
          'Migrated the governed KPI layer from Power BI Premium to SSAS Tabular to resolve memory pressure at scale',
          'Expanded the ad inventory and revenue pipeline with delivery pacing, ad-serving error monitoring, and Slack-based alerting',
          'Standardised KPIs across marketing, finance, and operations through cross-functional governance reviews',
          'Mentored the BI and analytics team on DAX, SQL, and Power BI, building bench depth across the function',
        ],
        projects: [
          { name: 'Semantic Layer', href: '/projects/semantic-layer/' },
          { name: 'Ad Inventory & Revenue', href: '/projects/ad-revenue-pipeline/' },
        ],
      },
      {
        title: 'Senior BI Analyst',
        start: '2022-03',
        end: '2024-03',
        bullets: [
          'Designed the enterprise data model consolidating 5 source systems into a unified Silver/Gold reporting layer that became the foundation for every downstream BI, ML, and AI project',
          'Led the BI modernisation roadmap, migrating legacy reporting to governed Power BI and Tableau',
          'Built the governed semantic layer and KPI framework serving finance, marketing, and content teams',
          'Shipped Phase 1 of the ad inventory and revenue pipeline covering ad delivery, performance tracking, and reconciliation',
        ],
        projects: [
          { name: 'Enterprise Data Model', href: '/projects/enterprise-data-model/' },
          { name: 'BI Migration', href: '/projects/bi-migration/' },
        ],
      },
    ],
  },
  {
    company: 'Beinex',
    employmentType: 'Full-time',
    location: 'Dubai, UAE',
    roles: [
      {
        title: 'Senior Consultant - Analytics',
        start: '2021-01',
        end: '2022-03',
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
        start: '2019-01',
        end: '2020-12',
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
    employmentType: 'Full-time',
    location: 'Dubai, UAE',
    roles: [
      {
        title: 'Business Intelligence Consultant',
        start: '2018-05',
        end: '2019-01',
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
    employmentType: 'Full-time',
    location: 'Dubai, UAE',
    roles: [
      {
        title: 'Business Intelligence Consultant',
        start: '2016-10',
        end: '2018-04',
        bullets: [
          'Designed sales, financial, and performance dashboards in Tableau for near real-time executive insights',
          'Built interactive KPI visualisations that moved executive reviews from static decks to live drill-downs',
          'Replaced recurring manual report builds with Alteryx workflows, freeing the team from rebuilding the same exports each cycle',
        ],
        projects: [],
      },
    ],
  },
  {
    // Earliest professional experience. Hidden from the timeline to keep it
    // focused on full-time roles, but its start date anchors the headline
    // years-of-experience figure shown on the home page and experience header.
    company: 'Central Motors & Equipment (Bosch)',
    employmentType: 'Internship',
    location: 'Dubai, UAE',
    hidden: true,
    roles: [
      {
        title: 'Intern',
        start: '2016-02',
        end: '2016-07',
        bullets: [
          'Designed and developed sales dashboards for weekly, monthly, quarterly, and yearly tracking',
          'Analysed weekly turnover reports, identifying areas for improvement and optimisation',
          'Conducted market analysis and formulated distribution strategies for power tools',
          'Provided technical sales support for clients, driving new customer acquisition and retention',
        ],
        projects: [],
      },
    ],
  },
];

/** The ongoing role: first company with a role whose `end` is null. */
export const CURRENT_ROLE = (() => {
  for (const company of EXPERIENCE) {
    const role = company.roles.find((r) => r.end === null);
    if (role) return { company: company.company, title: role.title };
  }
  return null;
})();
