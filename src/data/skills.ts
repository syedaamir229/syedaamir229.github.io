export interface SkillGroup {
  category: string;
  subtitle: string;
  items: string[];
}

export const SKILLS: SkillGroup[] = [
  {
    category: 'Data Engineering',
    subtitle: 'Platforms, formats, and tools for building data layers.',
    items: ['Databricks', 'PySpark', 'Delta Lake', 'PostgreSQL', 'SSIS', 'Alteryx'],
  },
  {
    category: 'BI & Analytics',
    subtitle: 'Dashboards, semantic layers, and governed metrics.',
    items: ['Power BI', 'SSAS Tabular', 'Tableau'],
  },
  {
    category: 'Data Science / ML',
    subtitle: 'Training, tracking, and tuning models.',
    items: ['scikit-learn', 'MLflow', 'pandas', 'NumPy', 'Hyperopt', 'Optuna'],
  },
  {
    category: 'AI & GenAI',
    subtitle: 'Building agents, RAG systems, and GenAI workflows.',
    items: ['OpenAI', 'Anthropic', 'LangGraph', 'RAG'],
  },
  {
    category: 'Languages',
    subtitle: 'The languages I write in directly.',
    items: ['Python', 'SQL', 'DAX'],
  },
  {
    category: 'Cloud',
    subtitle: 'Where data and AI workloads run.',
    items: ['AWS', 'Azure'],
  },
];
