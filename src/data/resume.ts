import type { ResumeContent } from '../types';

export const resume: ResumeContent = {
  phone: '9625881552',
  summary:
    'Software engineer with 6+ years across freelance and product development, focused on Vue, TypeScript, API integration and frontend reliability. Build applications from requirements through delivery with full-stack knowledge of APIs and data; transitioning into agentic AI engineering through scoped, validated AI-assisted workflows.',
  skills: [
    {
      label: 'Frontend engineering',
      skills: [
        'JavaScript',
        'TypeScript',
        'Vue 2 / Vue 3',
        'React',
        'Next.js',
        'HTML',
        'CSS',
        'Tailwind CSS',
      ],
    },
    {
      label: 'API integration and state',
      skills: [
        'REST APIs',
        'Axios',
        'Pinia',
        'Vuex',
        'TanStack Vue Query',
        'SignalR',
        'Mobile WebViews',
      ],
    },
    {
      label: 'Performance and SEO',
      skills: [
        'Lighthouse',
        'Caching',
        'IndexedDB',
        'Lazy loading',
        'Code splitting',
        'Search engine optimization (SEO)',
      ],
    },
    {
      label: 'AI-assisted engineering',
      skills: [
        'Codex',
        'ChatGPT',
        'Cursor',
        'Claude Code',
        'AI-assisted research',
        'Task decomposition',
        'Output validation',
      ],
    },
    {
      label: 'Version control and delivery',
      skills: [
        'Git / GitHub',
        'Pull requests',
        'CI/CD (continuous integration and delivery)',
        'Vite',
        'Vercel',
      ],
    },
  ],
  experience: [
    {
      role: 'Software Developer — Frontend & API Integration',
      organization: 'DigiPlus Interactive Corp',
      period: 'May 2023 - Present',
      bullets: [
        'Integrate sports data, account and customer-support REST APIs and real-time services for ArenaPlus, connecting web and mobile interfaces to backend data.',
        'Build deposit, withdrawal, linked-wallet and transaction-history interfaces with loading, pending and error states so users can follow payment progress.',
        'Scaffold Vue 3 and TypeScript applications with authenticated routing, shared layouts, stores and services, providing a reusable foundation for new features.',
        'Keep noncritical SDKs and below-the-fold content off the initial render through deferred loading, code splitting and image/font delivery changes.',
        'Refine persistent caching, stale-request handling and session cleanup to prevent outdated responses and retained resources from carrying into later journeys.',
        'Contribute to Vue 2-to-Vue 3 migrations and shared responsive components, keeping layouts and theme behavior consistent across product features.',
      ],
    },
    {
      role: 'Frontend Developer',
      organization: 'Solid Leisure Solutions',
      period: 'May 2022 - May 2023',
      bullets: [
        'Delivered UI updates and fixes for the BingoPlus digital bingo platform.',
        'Built reusable components from Figma designs, adapting layouts to desktop and mobile.',
        'Integrated REST APIs to connect frontend features with backend data and service responses.',
        'Embedded customer-support chat so users could access assistance within the application.',
        'Refined frontend performance to keep application interactions responsive.',
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
      title: 'Frontend Architecture and Payment API Integration',
      description:
        'Built authenticated routing, layouts, stores and services. Integrated four wallet journeys: deposits, withdrawals, linked accounts and transaction history, with request-state feedback and embedded navigation.',
      skills: ['Vue 3', 'TypeScript', 'REST APIs', 'Pinia', 'Vite'],
    },
    {
      title: 'Product Storefront and Inventory Management',
      description:
        'Preserved loaded storefront data when refreshes fail through version-aware caching. Added subcategory controls, Firestore access rules and inventory cache refresh so updates reach the storefront.',
      skills: ['React', 'Next.js', 'TypeScript', 'Firebase', 'IndexedDB'],
    },
    {
      title: 'Catalog Editing Workspace',
      description:
        'Saved catalog settings and item order in Firestore so edits survive reloads. Added optimistic updates with rollback on failed writes to keep the interface aligned with saved data.',
      skills: ['React', 'Next.js', 'TypeScript', 'Firestore'],
    },
    {
      title: 'Campaign Forms, Event Draws and Reporting',
      description:
        'Refined receipt-upload, participation and draw-loading states. Added duplicate-receipt review, date filters and reporting so operators can inspect campaign submissions.',
      skills: ['React', 'Vue 3', 'TypeScript', 'Firebase'],
    },
  ],
  aiIntroduction:
    'AI study began in March 2025. Apply coding agents to scoped research, debugging and refactoring, with explicit constraints and human review.',
  aiPractices: [
    'Use Codex and ChatGPT for research, and Cursor and Claude Code to audit code, debug defects and refactor in small, reviewable changes.',
    'Define scope, context, constraints and acceptance criteria so agent output can be checked against a specific result.',
    'Review Git changes and affected call sites; validate types, builds and browser behavior, and check CI/CD results before release.',
  ],
  additionalExperience: [
    {
      role: 'Frontend Developer - Internship',
      organization: 'Public Safety Savings and Loan Association, Inc. (PSSLAI)',
      period: 'March - April 2022',
      bullets: [
        'Built employee risk-calculation interfaces using React, Node.js and AWS, giving staff a web interface for risk assessment.',
      ],
    },
    {
      role: 'Freelance Frontend Developer',
      organization: '',
      period: '2020 - 2022',
      bullets: [
        'Delivered responsive web and mobile layouts from Figma designs, with reusable components for consistent page structure.',
      ],
    },
  ],
  achievements: [
    'Best in Thesis - AWIT, an interpreted Turing-complete scripting language written in C with bytecode generation and garbage collection.',
    "Dean's Lister, 2021-2022.",
  ],
};
