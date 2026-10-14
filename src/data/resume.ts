import type { ResumeContent } from '../types';

export const resume: ResumeContent = {
  phone: '9625881552',
  summary:
    'Agentic AI Engineer with 6+ years across freelance and product development. Can plan and build full-stack web applications, connecting interfaces, REST APIs and persistent data. Strong in frontend engineering, performance, caching, search engine optimization (SEO) and output validation.',
  skills: [
    {
      label: 'Programming and frontend',
      skills: [
        'JavaScript',
        'TypeScript',
        'Vue 2 / Vue 3',
        'React',
        'Next.js',
        'HTML',
        'CSS',
        'Sass',
        'Tailwind CSS',
      ],
    },
    {
      label: 'APIs and state management',
      skills: [
        'Vue Router',
        'Pinia',
        'Vuex',
        'REST APIs',
        'Axios',
        'TanStack Vue Query',
        'SignalR',
        'Zustand',
        'Zod',
        'React Hook Form',
        'Mobile WebViews',
      ],
    },
    {
      label: 'Performance and SEO',
      skills: [
        'Caching',
        'IndexedDB',
        'Data fetching',
        'Image optimization',
        'Lazy loading',
        'Code splitting',
        'Hydration',
        'Lighthouse',
        'Search engine optimization (SEO)',
      ],
    },
    {
      label: 'Agentic AI workflows',
      skills: [
        'Cursor',
        'Claude Code',
        'Codex',
        'ChatGPT',
        'AI-assisted research',
        'Structured prompts',
        'Task decomposition',
        'Context and constraints',
        'Output validation',
        'Automation knowledge',
      ],
    },
    {
      label: 'Backend, data and development tools',
      skills: [
        'Node.js',
        'PHP',
        'Laravel',
        'Firebase',
        'Firestore',
        'Chart.js',
        'Vite',
        'Git',
        'Figma-to-code',
        'Agile / Scrum',
      ],
    },
  ],
  experience: [
    {
      role: 'Software Developer — Frontend & API Integration',
      organization: 'DigiPlus Interactive Corp',
      period: 'May 2022 - Present',
      bullets: [
        'Integrate REST APIs and real-time features for sports, account management, deposits, withdrawals, and customer support.',
        'Develop and maintain sportsbook and SEO-focused web applications using Vue 3, TypeScript, Vite, and Tailwind CSS.',
        'Build responsive user interfaces, reusable components, shared layouts, design tokens, and light and dark themes for web and mobile.',
        'Optimize application loading through caching, image and font delivery, lazy loading, and code splitting.',
        'Support Vue 2-to-Vue 3 migrations and collaborate with product managers, designers, and backend engineers.',
      ],
    },
    {
      role: 'Frontend Developer',
      organization: 'Solid Leisure Solutions',
      period: 'May 2022 - May 2023',
      bullets: [
        'Maintained production web applications and delivered frontend updates.',
        'Translated Figma designs into responsive user interfaces.',
        'Integrated REST APIs to connect interfaces with backend services.',
        'Integrated customer-support chat into web applications.',
        'Optimized frontend performance to improve application responsiveness.',
      ],
    },
  ],
  education: {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'Pamantasan ng Lungsod ng Pasig',
    period: '2018 - 2022',
  },
  projects: [
    {
      title: 'Frontend Performance, Themes and Retail Interfaces',
      description:
        'Integrated REST APIs for account and wallet journeys. Built shared themes and authenticated layouts; optimized image delivery, SDK loading and caching.',
      skills: ['Vue 3', 'TypeScript', 'REST APIs', 'Pinia', 'Vite'],
    },
    {
      title: 'Product Storefront and Inventory Management',
      description:
        'Contributed image loading, description fallbacks and version-aware caching. Added subcategory management, Firestore access rules, publication controls and cache refresh.',
      skills: ['React', 'Next.js', 'TypeScript', 'Firebase', 'IndexedDB'],
    },
    {
      title: 'Catalog Editing Workspace',
      description:
        'Contributed multi-catalog management, saved design settings and database-backed item ordering with optimistic updates and rollback.',
      skills: ['React', 'Next.js', 'TypeScript', 'Zustand', 'Zod', 'Firestore'],
    },
    {
      title: 'Campaign Forms, Event Draws and Reporting',
      description:
        'Adjusted receipt upload and participation states; updated draw participant loading and animation. Added duplicate receipt review, date filters and reporting views.',
      skills: ['React', 'Next.js', 'Vue 3', 'TypeScript', 'Firebase', 'Chart.js'],
    },
  ],
  aiIntroduction:
    'My foundations began with self-study while I was in college in 2018. I started learning AI in early March 2025 and moved into agentic AI engineering to make the most of the AI era.',
  aiPractices: [
    'Use Codex and ChatGPT for research, and Cursor and Claude Code for code audits, debugging, and incremental refactoring.',
    'Structure prompts with context, constraints, and reviewable tasks; validate output through code review, type checks, builds, and browser inspection.',
    'Apply knowledge of automation to task planning while reviewing and validating AI-generated code.',
  ],
  additionalExperience: [
    {
      role: 'Frontend Developer - Internship',
      organization: 'Public Safety Savings and Loan Association, Inc. (PSSLAI)',
      period: 'March - April 2022',
      bullets: [
        'Built employee risk-calculation interfaces for a risk management application using React, Node.js, and AWS.',
      ],
    },
    {
      role: 'Freelance Frontend Developer',
      organization: '',
      period: '2020 - 2022',
      bullets: [
        'Translated Figma designs into responsive web and mobile layouts, and built reusable UI components.',
      ],
    },
    {
      role: 'Freelance Computer Technician',
      organization: '',
      period: '2020 - 2022',
      bullets: [
        'Installed and configured hardware and software; diagnosed and repaired desktop and laptop issues.',
      ],
    },
  ],
  achievements: [
    'Best in Thesis - AWIT, an interpreted Turing-complete scripting language written in C with bytecode generation and garbage collection.',
    "Dean's Lister, 2021-2022.",
    'Google Tech Challenge certificate, September 28, 2019.',
  ],
};
