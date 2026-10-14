import type { TimelineItem } from '../types';

export const timeline: TimelineItem[] = [
  {
    id: 'career-start',
    period: '2018',
    title: 'Self-study and software foundations.',
    description:
      'I started learning software engineering through self-study while I was a college student, building the foundation for my later frontend work.',
    skills: ['Self-study', 'Software foundations'],
    link: { label: 'Explore my engineering work', href: '#work' },
  },
  {
    id: 'product-experience',
    period: 'May 2022 - Present',
    title: 'Software Developer — Frontend & API Integration.',
    description:
      'In my current software development role, I focus on frontend engineering and integrate REST APIs and real-time services for sports, accounts, wallets, and customer support, alongside responsive UI, caching, performance, and SEO.',
    skills: ['REST APIs', 'Frontend development', 'Performance', 'Caching', 'SEO'],
    link: {
      label: 'Read performance case study',
      href: '/projects/frontend-performance',
    },
  },
  {
    id: 'ai-learning',
    period: 'Early March 2025',
    dateTime: '2025-03',
    title: 'AI learning becomes a practice.',
    description:
      'Started learning AI and developing a workflow with coding agents, structured prompts, focused tasks, and human review of the result.',
    skills: ['Structured prompting', 'Coding agents', 'Human review'],
    link: { label: 'Explore my AI workflow', href: '#ai-workflow' },
  },
  {
    id: 'ai-engineering-direction',
    period: 'Now',
    title: 'Full-stack delivery and agentic AI.',
    description:
      'Bringing 6+ years of software experience and full-stack knowledge to application planning, implementation, and validation, with coding agents supporting the work.',
    skills: ['Full-stack development', 'Application planning', 'Agentic AI workflows'],
    link: { label: 'Get in touch', href: '#contact' },
    current: true,
  },
];
