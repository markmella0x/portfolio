import type { CaseStudy } from '../types';

export const caseStudies: CaseStudy[] = [
  {
    slug: 'design-token-system',
    title: 'A shared foundation for light and dark.',
    category: 'Design systems',
    summary:
      'Turning repeated styling decisions into reusable tokens, theme-aware components, and a consistent migration path.',
    role: 'Frontend implementation, styling migration, and audit tooling',
    skills: [
      'CSS custom properties',
      'Tailwind CSS',
      'Sass',
      'Vue',
      'TypeScript',
      'Pinia',
      'Node.js tooling',
    ],
    sections: [
      {
        id: 'context',
        title: 'Context',
        paragraphs: [
          'I worked across frontend applications with different histories and styling approaches. The newer interface already needed light and dark experiences, while an older application still carried substantial legacy styling. My role covered theme behavior, shared styling foundations, reusable components, and the conventions used to maintain them.',
        ],
      },
      {
        id: 'problem',
        title: 'Problem',
        paragraphs: [
          'Color decisions and theme-specific behavior were spread across components. Updating an interface meant dealing with repeated styles, hardcoded colors, and assets that needed different treatments in each theme. A shared system needed to support the existing product while giving future changes a consistent vocabulary.',
        ],
      },
      {
        id: 'approach',
        title: 'Approach',
        paragraphs: [
          'I introduced role-based CSS custom properties and connected them to Tailwind utilities. Theme state and preferences became shared concerns, and legacy styling was progressively moved toward token-driven classes. I also implemented reusable components and composables that select images according to the active theme.',
          'The migration included color-audit tooling and written conventions. I used whole-codebase checks around structural changes to find affected call sites and guide follow-up edits. The audit scripts helped inspect color consistency, while the shared rules made the intended patterns easier for contributors and coding agents to follow.',
        ],
      },
      {
        id: 'result',
        title: 'Result',
        paragraphs: [
          'The work produced a light/dark foundation with reusable tokens, shared theme state, and theme-aware asset handling. It also left a practical migration path: component changes could use the same color vocabulary instead of repeating independent styling decisions. Audit tooling and documented conventions supported continued maintenance of that foundation.',
        ],
      },
    ],
  },
  {
    slug: 'retail-betting-application',
    title: 'Building a retail frontend from the foundations.',
    category: 'Product engineering',
    summary:
      'Application structure, authenticated journeys, and lifecycle handling for a dedicated retail terminal.',
    role: 'Application scaffolding and frontend product development',
    skills: [
      'Vue 3',
      'TypeScript',
      'Vite',
      'Vue Router',
      'Pinia',
      'TanStack Vue Query',
      'Axios',
      'SignalR',
    ],
    sections: [
      {
        id: 'context',
        title: 'Context',
        paragraphs: [
          'I scaffolded and developed a retail betting application for a dedicated terminal. It brought together account journeys, wallet interfaces, sports and game views, and shared navigation. My work started with the application structure and continued through feature integration and reliability refinements.',
        ],
      },
      {
        id: 'problem',
        title: 'Problem',
        paragraphs: [
          'A terminal application has to coordinate long-lived views, embedded content, asynchronous requests, and repeated user sessions. Routing, state, and services needed clear responsibilities. As the interface grew, caching, session cleanup, and navigation behavior also needed careful attention so that one journey could finish cleanly before another began.',
        ],
      },
      {
        id: 'approach',
        title: 'Approach',
        paragraphs: [
          'I set up layouts, authenticated routing, stores, services, and composables around Vue 3 and TypeScript. Shared components and theme-aware images supported a consistent interface. Wallet work connected deposit and withdrawal journeys to APIs, with loading feedback, status updates, and embedded checkout behavior.',
          'I then refined query persistence, widget lifecycles, and session handling. That included cancelling or ignoring stale asynchronous work, cleaning up listeners and subscriptions, and making wallet navigation more predictable. Project conventions and scoped audit guidance documented the structure, while type checks and browser inspection supported validation of affected journeys.',
        ],
      },
      {
        id: 'result',
        title: 'Result',
        paragraphs: [
          'The application gained a modular frontend foundation with shared UI and integrated account, wallet, and betting views. Subsequent changes made state ownership and cleanup more explicit across sessions and embedded content. The resulting work demonstrates both initial application setup and the ongoing engineering needed to maintain a complex product interface.',
        ],
      },
    ],
  },
  {
    slug: 'frontend-performance',
    title: 'A more deliberate path to the first useful screen.',
    category: 'Frontend performance',
    summary:
      'Phased loading improvements and build guardrails, followed by runtime reliability work across browser and terminal interfaces.',
    role: 'Performance remediation, resource delivery, and runtime cleanup',
    skills: [
      'Lighthouse',
      'Vite',
      'vite-ssg',
      'Vue 3',
      'Element Plus',
      'Dynamic imports',
      'Node.js scripts',
      'Cache lifecycle management',
    ],
    sections: [
      {
        id: 'context',
        title: 'Context',
        paragraphs: [
          'I worked on frontend performance in a product with a substantial UI, external SDKs, and varied image content. The work combined phased Lighthouse remediation in a browser application with later reliability changes in a long-running retail interface. My role focused on the frontend source, build behavior, and runtime lifecycle.',
        ],
      },
      {
        id: 'problem',
        title: 'Problem',
        paragraphs: [
          'Eager SDK initialization, global styles, font delivery, and below-the-fold component work competed during startup. Some image exports carried embedded raster content that existing optimization could miss. In the terminal application, repeated cache writes, retained listeners, and asynchronous session work introduced a different set of runtime costs.',
        ],
      },
      {
        id: 'approach',
        title: 'Approach',
        paragraphs: [
          'I split the remediation into focused changes. SDKs moved toward dynamic imports and idle initialization; vendor chunks were separated; component CSS became more selective; and font delivery was reviewed. Priority images received explicit loading treatment, while suitable below-the-fold components used visible or idle hydration.',
          'I added image-conversion tooling and build checks to catch problematic exports during future changes. Related runtime work addressed query persistence, cache subscriptions, widget cleanup, and stale asynchronous responses. Browser validation and type checks accompanied the changes, with documented follow-ups where work depended on other parts of the product.',
        ],
      },
      {
        id: 'result',
        title: 'Result',
        paragraphs: [
          'The work produced explicit loading strategies, deferred component work, and asset guardrails in the build. Runtime refinements also clarified when cached data, listeners, and embedded views should be retained or released. These are concrete implementation outcomes across loading and lifecycle behavior, supported by source changes and validation records.',
        ],
      },
    ],
  },
];
