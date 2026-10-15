import type { ResumeContent } from '../types';

export const resume: ResumeContent = {
  phone: '9625881552',
  summary:
    'Software engineer with 6+ years across freelance and product development. Plan and build web applications with full-stack knowledge, REST APIs and persistent data. Focus on frontend architecture, API integration, performance and reliability; transitioning into agentic AI engineering.',
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
      period: 'May 2023 - Present',
      bullets: [
        'Integrate REST APIs and real-time services for ArenaPlus sportsbook features, including sports data, accounts, deposits, withdrawals, and customer support.',
        'Develop and maintain sportsbook and SEO-focused web applications using Vue 3, TypeScript, Vite, and Tailwind CSS.',
        'Build shared layouts, reusable components and design tokens for responsive light and dark interfaces.',
        'Optimize startup loading through caching, image and font delivery, lazy loading, and code splitting.',
        'Support Vue 2-to-Vue 3 migrations and collaborate with product managers, designers, and backend engineers.',
      ],
    },
    {
      role: 'Frontend Developer',
      organization: 'Solid Leisure Solutions',
      period: 'May 2022 - May 2023',
      bullets: [
        'Maintained and enhanced BingoPlus web interfaces for a digital bingo platform.',
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
      title: 'Application Foundations, API Integration and Reliability',
      description:
        'Scaffolded authenticated routing, layouts, stores and services; integrated account and wallet APIs. Built shared themes, deferred SDK loading, and refined caching, stale-request handling and session cleanup.',
      skills: ['Vue 3', 'TypeScript', 'REST APIs', 'Pinia', 'Vite'],
    },
    {
      title: 'Product Storefront and Inventory Management',
      description:
        'Contributed image loading, description fallbacks and version-aware caching that retains data on refresh failure. Added subcategory management, Firestore access rules, publication controls and inventory cache refresh.',
      skills: ['React', 'Next.js', 'TypeScript', 'Firebase', 'IndexedDB'],
    },
    {
      title: 'Catalog Editing Workspace',
      description:
        'Contributed multi-catalog management and saved design settings. Persisted item ordering in Firestore with optimistic updates and rollback when writes fail.',
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
    'My foundations began with self-study in college in 2018. I started learning AI in early March 2025 and am now transitioning into agentic AI engineering.',
  aiPractices: [
    'Use Codex and ChatGPT for research, and Cursor and Claude Code for code audits, debugging, and incremental refactoring.',
    'Define scope, context, constraints and acceptance criteria; break AI-assisted changes into reviewable phases.',
    'Review generated changes and affected call sites; validate behavior through code review, type checks, builds and browser inspection.',
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
