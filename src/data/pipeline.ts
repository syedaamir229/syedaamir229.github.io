export type PipelinePhase = 'foundation' | 'insight' | 'intelligence';

export interface PhaseStyle {
  border: string;
  iconBg: string;
  iconColor: string;
}

export interface PhaseMeta {
  label: string;
  caption: string;
}

export interface PipelineStage {
  phase: PipelinePhase;
  eyebrow: string;
  title: string;
  description: string;
  answers: string;
  icon: string;
  active?: boolean;
}

export const PIPELINE_PHASE_STYLES: Record<PipelinePhase, PhaseStyle> = {
  foundation: {
    border: 'border-cyan-500/10',
    iconBg: 'bg-cyan-500/10',
    iconColor: 'text-cyan-400/70',
  },
  insight: {
    border: 'border-cyan-500/25',
    iconBg: 'bg-cyan-500/15',
    iconColor: 'text-cyan-400/85',
  },
  intelligence: {
    border: 'border-cyan-500/40',
    iconBg: 'bg-cyan-500/20',
    iconColor: 'text-cyan-400',
  },
};

export const PIPELINE_PHASE_META: Record<PipelinePhase, PhaseMeta> = {
  foundation: { label: 'Foundation', caption: 'trust before analysis' },
  insight: { label: 'Insight', caption: 'people see, understand, act' },
  intelligence: { label: 'Intelligence', caption: 'the system decides alongside you' },
};

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    phase: 'foundation',
    eyebrow: 'Connect',
    title: 'Bring every source together',
    description:
      'Pull data from every system your business runs on, so nothing is missing, stale, or stuck in a silo.',
    answers: 'What is happening across the business right now, in one place?',
    icon: 'M5 5h3M5 12h3M5 19h3M8 5l5 4M8 12h5M8 19l5-4M13 9h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2M19 12h2',
  },
  {
    phase: 'foundation',
    eyebrow: 'Trust',
    title: 'Store it cleanly and reliably',
    description:
      'A single, governed home for every record, with full history and quality checks before anyone touches it.',
    answers: 'Can I rely on this number, and can I prove where it came from?',
    icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4',
  },
  {
    phase: 'foundation',
    eyebrow: 'Shape',
    title: 'Model it the way the business thinks',
    description:
      'Turn raw records into the things your teams actually talk about: customers, products, content, transactions.',
    answers: 'Show me revenue by segment, not by raw table joins.',
    icon: 'M12 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0M5 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0M19 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0M11 9l-5 7M13 9l5 7M7 19h10',
  },
  {
    phase: 'insight',
    eyebrow: 'Serve',
    title: 'Make it instant to explore',
    description:
      'A fast, governed layer where thousands of people can slice years of data in seconds, without breaking anything upstream.',
    answers: 'Let a finance director answer their own question in two clicks.',
    icon: 'M3 7l9-4 9 4M3 7v10l9 4 9-4V7M3 7l9 4 9-4M12 11v10',
  },
  {
    phase: 'insight',
    eyebrow: 'Show',
    title: 'Put answers in front of people',
    description:
      'Self-serve dashboards and reports built for finance, marketing, and operations, in the language they already use.',
    answers: 'What changed this week, and what should I do about it?',
    icon: 'M3 3v18h18M9 17V9m4 8v-5m4 5V6',
  },
  {
    phase: 'intelligence',
    eyebrow: 'Predict',
    title: 'See what is likely to happen next',
    description:
      'Models that score risk, anticipate behavior, and surface patterns no human review would catch in time.',
    answers: 'Which customers are about to leave, and which are worth saving?',
    icon: 'M3 17l6-6 4 4 8-8M15 7h6v6',
  },
  {
    phase: 'intelligence',
    eyebrow: 'Act',
    title: 'Turn decisions into action',
    description:
      'AI and automations that respond, recommend, and execute decisions at scale, with humans setting the rules.',
    answers: 'Generate the summary, route the case, send the offer, no ticket required.',
    icon: 'M14 3L15.4 5.6L18 7L15.4 8.4L14 11L12.6 8.4L10 7L12.6 5.6ZM5 19L10 14',
    active: true,
  },
];
