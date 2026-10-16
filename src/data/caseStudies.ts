import type { CaseStudy } from '../types';

export const caseStudies: CaseStudy[] = [
  {
    slug: 'wallet-payment-journeys',
    title: 'Integrating payment APIs across web and embedded views.',
    category: 'API integration',
    summary:
      'Deposit, withdrawal, linked-wallet, and transaction interfaces with explicit request states, payment redirects, and mobile WebView navigation.',
    role: 'Frontend API integration, transaction states, and payment navigation',
    outcome:
      'Payment journeys connected to backend services, with loading and error feedback and navigation handling across browser and embedded views.',
    skills: ['Vue', 'TypeScript', 'REST APIs', 'Axios', 'State management', 'WebViews'],
    sections: [
      {
        id: 'context',
        title: 'Context',
        paragraphs: [
          'I developed payment-related frontend journeys across web applications, embedded mobile browsers, and a retail interface. My work connected deposit, withdrawal, transaction, and linked-wallet views to existing backend APIs. It included the interface behavior around requests, payment redirects, and navigation between the application and embedded checkout.',
        ],
      },
      {
        id: 'problem',
        title: 'Problem',
        paragraphs: [
          'Payment journeys involve more than submitting a request. The interface needs to show loading, errors, and in-progress transactions while handling redirects and return navigation. Embedded mobile browsers also have navigation constraints that differ from a normal browser tab, so the same journey needs appropriate behavior in each environment.',
        ],
      },
      {
        id: 'approach',
        title: 'Approach',
        paragraphs: [
          'I integrated REST APIs into deposit, withdrawal, linked-wallet, and transaction interfaces using the existing frontend service and state-management layers. Loading and error states made request progress visible, while transaction feedback covered journeys that were still in progress. The implementation connected the interface to the existing payment services.',
          'I also adapted redirect and navigation behavior for mobile WebViews and embedded payment checkout. This included the way wallet journeys move between views and return to the surrounding application. These changes treated request feedback, embedded content, and navigation as connected parts of the frontend integration.',
        ],
      },
      {
        id: 'decisions',
        title: 'Engineering decisions',
        paragraphs: [],
        points: [
          {
            title: 'Represent request and transaction states explicitly',
            description:
              'Loading, errors, and in-progress transactions need distinct interface states. Request feedback and transaction feedback describe different stages of a payment journey and need to stay aligned with the API response.',
          },
          {
            title: 'Include embedded navigation in the integration',
            description:
              'Payment redirects, return navigation, and embedded checkout belong to the same journey. Mobile WebView behavior needs attention alongside the standard browser flow.',
          },
          {
            title: 'Connect through existing service and state layers',
            description:
              'Frontend services handle API communication, while interface state reflects the request and transaction lifecycle. This keeps the integration responsibilities explicit as wallet features change.',
          },
        ],
      },
      {
        id: 'validation',
        title: 'Validation and maintainability',
        paragraphs: [
          'I refined loading and error states alongside redirect and navigation behavior. The work covered browser and mobile WebView journeys, including how the interface presents an in-progress transaction and returns from payment-related navigation. Maintaining these flows requires keeping interface feedback aligned with the surrounding application and service behavior.',
        ],
      },
      {
        id: 'result',
        title: 'Result',
        paragraphs: [
          'The resulting interfaces connect deposit, withdrawal, linked-wallet, and transaction journeys to backend services. They provide request-state feedback and handle payment-related navigation across browser and embedded views. This work demonstrates frontend integration across API communication, application state, and the environments where a payment journey runs.',
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
