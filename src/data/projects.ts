import type { Project } from '../types';

export const projects: Project[] = [
  {
    slug: 'product-storefront',
    title: 'Product storefront',
    category: 'Commerce interfaces',
    description:
      'Contributed image loading priorities, fallback product descriptions, and version-aware category caching that retains available data when refresh requests fail.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'IndexedDB'],
    contributions: [
      'Image loading priorities and product description fallbacks.',
      'Version-aware caching with retained data when refresh requests fail.',
    ],
    result: 'Cached categories remain available when refresh requests fail.',
    visual: 'storefront',
  },
  {
    slug: 'inventory-management',
    title: 'Inventory management',
    category: 'Administration tools',
    description:
      'Added subcategory management and validation, category publication controls, and inventory cache updates connected to Firestore-backed product editing.',
    skills: ['React', 'Next.js', 'TypeScript', 'Firebase', 'Tailwind CSS'],
    contributions: [
      'Subcategory management, validation, publication controls, and Firestore access rules.',
      'Inventory cache updates connected to product editing.',
    ],
    result: 'Product and category edits connect to publication controls and cache refresh.',
    visual: 'inventory',
  },
  {
    slug: 'catalog-workspace',
    title: 'Catalog workspace',
    category: 'Content tools',
    description:
      'Contributed a multi-catalog library, creation and management flows, saved design settings, and database-backed item ordering with optimistic updates and rollback.',
    skills: ['React', 'Next.js', 'TypeScript', 'Zustand', 'Zod', 'Firebase'],
    contributions: [
      'Multi-catalog creation, management, and saved design settings.',
      'Database-backed ordering with optimistic updates and rollback.',
    ],
    result:
      'Design settings and item order persist, with rollback when ordering updates fail.',
    visual: 'catalog',
  },
  {
    slug: 'event-draw-interface',
    title: 'Event draw interface',
    category: 'Interactive tools',
    description:
      'Updated participant loading from browser storage and refined the rolling-name display and selected-winner presentation in an event draw interface.',
    skills: ['React', 'Next.js', 'TypeScript', 'Browser storage', 'CSS animation'],
    contributions: [
      'Participant loading from browser storage.',
      'Rolling-name animation and selected-winner presentation.',
    ],
    result: 'Updated participant reload handling and the selected-winner display.',
    visual: 'draw',
  },
  {
    slug: 'campaign-entry-form',
    title: 'Campaign entry form',
    category: 'Form workflows',
    description:
      'Adjusted receipt upload and saved-draft handling, and contributed participation availability states through a merged pull request.',
    skills: ['React', 'Next.js', 'TypeScript', 'Firebase', 'React Hook Form'],
    contributions: [
      'Receipt upload and saved-draft handling.',
      'Participation availability states in a merged pull request.',
    ],
    result: 'Updated receipt uploads, draft handling, and participation availability states.',
    visual: 'form',
  },
  {
    slug: 'submission-reporting',
    title: 'Submission reporting dashboard',
    category: 'Data interfaces',
    description:
      'Added duplicate receipt grouping and a receipt viewer, updated date filtering, and contributed dashboard reporting and calendar views.',
    skills: ['Vue 3', 'TypeScript', 'Vite', 'Firebase', 'Chart.js'],
    contributions: [
      'Duplicate receipt grouping and a receipt viewer.',
      'Date filtering, dashboard reports, and calendar views.',
    ],
    result: 'Submissions can be reviewed for duplicate receipts and filtered by date.',
    visual: 'reporting',
  },
  {
    slug: 'design-token-system',
    title: 'Design tokens & dark mode',
    category: 'Design systems',
    description:
      'A consistent light and dark theme system, with reusable color tokens, theme-aware components, and a migration from legacy styling to Tailwind utilities.',
    skills: ['CSS tokens', 'Tailwind CSS', 'Vue', 'TypeScript'],
    contributions: [
      'Reusable color tokens and theme-aware components.',
      'Light and dark themes with a move toward Tailwind utilities.',
    ],
    result: 'Shared tokens and theme-aware components support light and dark interfaces.',
    visual: 'theme',
    caseStudySlug: 'design-token-system',
  },
  {
    slug: 'retail-betting-application',
    title: 'Retail betting application',
    category: 'Product engineering',
    description:
      'A retail frontend built from its foundations: layouts, authenticated routing, wallet journeys, embedded betting views, and careful session handling.',
    skills: ['Vue 3', 'TypeScript', 'REST APIs', 'Pinia', 'Vite'],
    contributions: [
      'REST API integrations for account and wallet journeys.',
      'Embedded betting views and session handling.',
    ],
    result: 'A modular frontend connects account, wallet, and embedded betting journeys.',
    visual: 'retail',
    caseStudySlug: 'retail-betting-application',
  },
  {
    slug: 'frontend-performance',
    title: 'Performance & reliability',
    category: 'Frontend performance',
    description:
      'Performance work on image delivery, caching, SDK loading, code splitting, and hydration, followed by session and widget lifecycle refinements.',
    skills: ['Lighthouse', 'Image optimization', 'Caching', 'Vite', 'vite-ssg'],
    contributions: [
      'Image delivery, caching, SDK loading, and code splitting.',
      'Hydration, session handling, and widget lifecycle refinements.',
    ],
    result:
      'Explicit loading strategies and cleanup rules support startup and session behavior.',
    visual: 'performance',
    caseStudySlug: 'frontend-performance',
  },
  {
    slug: 'sportsbook-platform',
    title: 'Sportsbook platform',
    category: 'Production interfaces',
    description:
      'Sports, live content, search, and account interfaces across two frontend applications, with browser compatibility work and production fixes.',
    skills: ['Vue 2 / Vue 3', 'JavaScript', 'TypeScript', 'API integration'],
    contributions: [
      'API integrations for sports, live content, search, and account interfaces.',
      'Browser compatibility work and production fixes.',
    ],
    result: 'Connected sports, search, and account views with browser compatibility fixes.',
    visual: 'platform',
  },
  {
    slug: 'wallet-payment-journeys',
    title: 'Wallet & payment journeys',
    category: 'API-driven experiences',
    description:
      'Deposit, withdrawal, linked-wallet, and transaction interfaces, including loading and error states, payment redirects, and mobile WebView behavior.',
    skills: ['REST APIs', 'Axios', 'State management', 'WebViews'],
    contributions: [
      'REST API integrations for deposits, withdrawals, and linked wallets.',
      'Loading and error states, redirects, and mobile WebView behavior.',
    ],
    result:
      'Payment interfaces handle loading, errors, and redirects across web and mobile views.',
    visual: 'wallet',
  },
  {
    slug: 'conversion-tracking',
    title: 'Conversion tracking integration',
    category: 'Frontend integration',
    description:
      'Browser attribution aligned with backend-bound conversion data, with support for multiple tracking pixels and allowlisted selections.',
    skills: ['JavaScript', 'TypeScript', 'Browser storage', 'Input validation'],
    contributions: [
      'Browser attribution connected to existing backend conversion data.',
      'Multiple tracking pixels and allowlisted selections.',
    ],
    result:
      'Browser attribution connects to existing conversion services with validated pixel choices.',
    visual: 'tracking',
  },
];
