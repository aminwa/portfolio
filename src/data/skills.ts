export type SkillGroup = {
  label: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    skills: ['Python', 'C', 'C++', 'SQL', 'Bash'],
  },
  {
    label: 'AI / ML',
    skills: ['PyTorch', 'Hugging Face', 'YOLOv8', 'ONNX', 'OpenCV', 'scikit-learn', 'RAG', 'Fine-tuning', 'LLM APIs', 'spaCy'],
  },
  {
    label: 'Web & Backend',
    skills: ['Flask', 'SQLAlchemy', 'PostgreSQL', 'REST APIs', 'SQLite', 'Jinja2'],
  },
  {
    label: 'Data',
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'LAPACK'],
  },
  {
    label: 'Infra & Tooling',
    skills: ['Docker', 'Linux', 'Git', 'CI/CD', 'GitHub Actions', 'POSIX IPC', 'Make'],
  },
  {
    label: 'AI Governance',
    skills: ['GDPR', 'EU AI Act', 'EDPB', 'PII handling', 'Deployment ethics'],
  },
  {
    label: 'Formal Methods',
    skills: ['CSP-M', 'FDR4 model checking', 'Trace refinement', 'Concurrency verification'],
  },
];
