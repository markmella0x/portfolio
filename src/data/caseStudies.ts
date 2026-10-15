import type { CaseStudy } from '../types';

export const caseStudies: CaseStudy[] = [
  {
    slug: 'design-token-system',
    title: 'Shared tokens for consistent light and dark themes.',
    category: 'Design systems',
    summary:
      'Turning repeated styling decisions into reusable tokens, theme-aware components, and a consistent migration path.',
    role: 'Frontend implementation, styling migration, and audit tooling',
    outcome:
      'A shared color vocabulary, theme-aware components, and documented conventions for continued migration.',
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
        id: 'decisions',
        title: 'Engineering decisions',
        paragraphs: [],
        points: [
          {
            title: 'Name colors by their role',
            description:
              'Role-based CSS properties let components refer to surfaces, text, and accents across themes. This keeps palette choices in a shared layer; token names and usage still need consistent conventions.',
          },
          {
            title: 'Migrate the existing interface incrementally',
            description:
              'Moving legacy styles toward token-driven utilities provides a path through an existing application. During the transition, audit tooling helps find hardcoded colors and inconsistencies between styling approaches.',
          },
          {
            title: 'Treat theme state and assets as shared concerns',
            description:
              'Shared state and theme-aware composables give components a consistent way to select images and styles. The shared layer also becomes a maintenance responsibility when themes or assets change.',
          },
        ],
      },
      {
        id: 'validation',
        title: 'Validation and maintainability',
        paragraphs: [
          'Color-audit tooling and whole-codebase checks supported the styling changes and helped locate affected call sites. Written conventions documented the intended token and component patterns so subsequent changes could follow the same foundation.',
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
    title: 'Building an API-connected retail application.',
    category: 'Product engineering',
    summary:
      'Application structure, authenticated journeys, and lifecycle handling for a dedicated retail terminal.',
    role: 'Application scaffolding and frontend product development',
    outcome:
      'Integrated account and wallet journeys within a modular frontend, with explicit session and resource cleanup.',
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
        id: 'decisions',
        title: 'Engineering decisions',
        paragraphs: [],
        points: [
          {
            title: 'Give application layers clear responsibilities',
            description:
              'Layouts and routing organize journeys; stores, services, and composables separate shared state from integration logic. The structure supports reuse, while requiring explicit ownership of UI state, cached queries, and session data.',
          },
          {
            title: 'Make asynchronous work respect the session',
            description:
              'Cancelling or ignoring stale work helps keep a response from updating a journey that has already ended. This has to be considered alongside query persistence and session cleanup, particularly in a long-running terminal interface.',
          },
          {
            title: 'Include embedded views in lifecycle handling',
            description:
              'Wallet redirects, embedded checkout, and widgets need loading feedback and predictable navigation. Listener and subscription cleanup are part of the integration, alongside rendering the initial view.',
          },
        ],
      },
      {
        id: 'validation',
        title: 'Validation and maintainability',
        paragraphs: [
          'Type checks and browser inspection supported validation of the affected journeys. Project conventions and scoped audit guidance documented the application structure, while follow-up work made ownership of cached state, listeners, and session resources more explicit.',
        ],
      },
      {
        id: 'result',
        title: 'Result',
        paragraphs: [
          'The frontend connects account, wallet, and betting views through shared layouts and application layers. Loading feedback, status updates, and checkout handling support the wallet journeys. Later lifecycle changes made stale-request handling and resource cleanup explicit across sessions and embedded views.',
        ],
      },
    ],
  },
  {
    slug: 'frontend-performance',
    title: 'Improving startup loading and runtime reliability.',
    category: 'Frontend performance',
    summary:
      'Phased loading improvements and build guardrails, followed by runtime reliability work across browser and terminal interfaces.',
    role: 'Performance remediation, resource delivery, and runtime cleanup',
    outcome:
      'Deferred startup work, build-time asset checks, and clearer cache and widget lifecycles.',
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
        id: 'decisions',
        title: 'Engineering decisions',
        paragraphs: [],
        points: [
          {
            title: 'Schedule work around when it is needed',
            description:
              'Dynamic SDK imports, idle initialization, and visible or idle hydration separate essential startup work from later work. Deferral also means accounting for when a component or integration becomes available.',
          },
          {
            title: 'Catch problematic assets during the build',
            description:
              'Image-conversion tooling and build checks bring asset problems into the development workflow. This adds a guardrail for future exports, with tooling and rules that need to stay aligned with the asset pipeline.',
          },
          {
            title: 'Review what a long-running interface retains',
            description:
              'Caching and persistence need clear retention and cleanup rules. The runtime work addressed repeated writes, subscriptions, widgets, and stale responses so these responsibilities were considered together.',
          },
        ],
      },
      {
        id: 'validation',
        title: 'Validation and maintainability',
        paragraphs: [
          'Lighthouse remediation was split into focused source and build changes, accompanied by type checks and browser validation. Build checks provide a repeatable asset guardrail; documented follow-ups identify work that depends on other parts of the product.',
        ],
      },
      {
        id: 'result',
        title: 'Result',
        paragraphs: [
          'SDK and below-the-fold component work moved to explicit loading strategies, while asset checks became part of the build. Runtime changes addressed cache persistence, retained listeners, embedded views, and stale asynchronous work. The outcomes cover both the first load and the maintenance of an active session.',
        ],
      },
    ],
  },
];
