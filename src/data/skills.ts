import type { SkillGroup } from '../types';

export const skillGroups: SkillGroup[] = [
  {
    title: 'Full-stack software engineering',
    description:
      'Planning application structure and connecting responsive interfaces, backend technologies, APIs, and persistent data.',
    featured: true,
    skills: [
      { name: 'JavaScript & TypeScript' },
      { name: 'Vue 2 & Vue 3' },
      { name: 'React & Next.js' },
      { name: 'Node.js' },
      { name: 'PHP & Laravel' },
      { name: 'Firebase & Firestore' },
      { name: 'Application planning & structure' },
      { name: 'Data persistence & access rules' },
      { name: 'Zustand, Zod & React Hook Form' },
      { name: 'HTML, CSS & responsive interfaces' },
      { name: 'Sass & Tailwind CSS' },
      { name: 'CSS design tokens & theming' },
      { name: 'Vue Router, Pinia & Vuex' },
    ],
  },
  {
    title: 'API integration, performance and SEO',
    description:
      'Connecting product interfaces to REST APIs and real-time services, with thoughtful caching, efficient data handling, and SEO.',
    skills: [
      { name: 'REST API integration & Axios' },
      { name: 'Authentication & session handling' },
      { name: 'Validation, error states & optimistic rollback' },
      { name: 'SignalR & real-time services' },
      { name: 'Caching & efficient data fetching' },
      { name: 'IndexedDB & browser storage' },
      { name: 'Mobile WebView integration' },
      { name: 'Image optimization & loading' },
      { name: 'Search engine optimization (SEO)' },
      { name: 'TanStack Vue Query & caching' },
      { name: 'Vite & build configuration' },
      { name: 'Lighthouse & loading strategies' },
      { name: 'Code splitting & deferred hydration' },
      { name: 'Type checks, browser QA & Git' },
    ],
  },
  {
    title: 'Agentic AI workflows',
    description:
      'Transitioning into agentic AI engineering through research, scoped coding tasks, and human review of the output.',
    skills: [
      { name: 'Codex & ChatGPT for research' },
      { name: 'Cursor & Claude Code' },
      { name: 'Structured prompts & constraints' },
      { name: 'Task decomposition & phased planning' },
      { name: 'Codebase audits & debugging' },
      { name: 'Incremental refactoring' },
      { name: 'Automation knowledge' },
      { name: 'Code review & output validation' },
    ],
  },
];
