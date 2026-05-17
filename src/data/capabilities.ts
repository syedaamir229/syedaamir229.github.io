export interface CapabilityDeliverable {
  label: string;
  text: string;
}

export interface Capability {
  title: string;
  headline: string;
  deliverables: CapabilityDeliverable[];
  icon: 'database' | 'chart' | 'brain' | 'robot';
  heroTitle: string;
  heroLink: string;
  allWorkLink?: string;
  allWorkLabel?: string;
}

export const CAPABILITIES: Capability[] = [
  {
    title: 'Data Architecture & Engineering',
    headline: 'Build the data foundation everything else runs on.',
    deliverables: [
      {
        label: 'Unified data model',
        text: 'Every system that runs the business stitched into a single picture.',
      },
      {
        label: 'Trusted pipelines',
        text: 'Data lands on time, with quality checks and a clear trail of where every number came from.',
      },
      {
        label: 'Single source of truth',
        text: 'One definitive record per entity, so every team works from the same data.',
      },
    ],
    icon: 'database',
    heroTitle: 'Enterprise Data Model for Streaming Analytics',
    heroLink: '/projects/data-model/',
    allWorkLink: '/projects/#data-engineering',
    allWorkLabel: 'All data engineering work',
  },
  {
    title: 'BI & Analytics',
    headline: 'End KPI disputes and make reporting self-serve.',
    deliverables: [
      {
        label: 'One set of KPIs',
        text: 'Every team measures the same numbers the same way, defined in one place.',
      },
      {
        label: 'A single reporting platform',
        text: 'Fragmented dashboards consolidated so leaders stop reconciling spreadsheets.',
      },
      {
        label: 'Self-serve answers',
        text: 'Finance, operations, and frontline teams slice their own data without waiting on a queue.',
      },
    ],
    icon: 'chart',
    heroTitle: 'Enterprise Semantic Layer & KPI Framework',
    heroLink: '/projects/semantic-layer/',
    allWorkLink: '/projects/#bi-analytics',
    allWorkLabel: 'All BI & analytics work',
  },
  {
    title: 'Data Science & ML',
    headline: 'Turn patterns into predictions you can act on.',
    deliverables: [
      {
        label: 'Segments that act',
        text: 'Groups defined by behavior, not by surface attributes.',
      },
      {
        label: 'Predictions you can use',
        text: 'Risk, intent, and missing attributes scored so teams can intervene early.',
      },
      {
        label: 'Models that stay honest',
        text: 'Monitoring and retraining built in, so accuracy does not quietly decay.',
      },
    ],
    icon: 'brain',
    heroTitle: 'Viewing Behavior Clustering',
    heroLink: '/projects/audience-segmentation/',
  },
  {
    title: 'AI & Automation',
    headline: 'Build AI that retrieves, reasons, and acts on your data.',
    deliverables: [
      {
        label: 'Answers from your own content',
        text: 'Retrieval over internal docs and data, so the AI is grounded in your business, not guessing.',
      },
      {
        label: 'Multilingual intelligence',
        text: 'Sentiment, classification, and extraction across the languages your audience actually uses.',
      },
      {
        label: 'Hands-off workflows',
        text: 'Operational handoffs automated so analysts stop being a routing layer.',
      },
    ],
    icon: 'robot',
    heroTitle: 'Voice-of-Customer Intelligence Platform',
    heroLink: '/projects/voice-of-customer/',
  },
];
