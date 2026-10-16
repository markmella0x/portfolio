import type { WorkbenchContent } from '../types';

export const workbench: WorkbenchContent = {
  title: 'From requirements to working software',
  navigationLabel: 'Explore my engineering workflow',
  note: 'Define the result. Build the layers. Validate the behavior.',
  steps: [
    {
      id: 'scope',
      label: 'Scope',
      title: 'Plan the application and its purpose.',
      description:
        'Understand the requirements, map user journeys and data flows, and define what a successful result should do.',
      practices: [
        'Define requirements and constraints',
        'Plan application structure and data flows',
        'Set clear acceptance criteria',
      ],
    },
    {
      id: 'implement',
      label: 'Implement',
      title: 'Build in reviewable steps.',
      description:
        'Connect the interface, APIs, and persistent data in manageable features, with coding agents supporting focused tasks.',
      practices: [
        'Build reusable UI and application layers',
        'Handle authentication, data, and failure states',
        'Review each phase and its tradeoffs',
      ],
    },
    {
      id: 'verify',
      label: 'Verify',
      title: 'Validate against the required result.',
      description:
        'Review changes in Git, validate the user journey across browsers, and check CI/CD build and deployment results against the acceptance criteria.',
      practices: [
        'Use branches, commits, and pull requests',
        'Check browser and mobile behavior',
        'Validate CI/CD builds and deployments',
      ],
    },
  ],
};
