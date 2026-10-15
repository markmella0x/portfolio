import type { PageMetadata, Profile } from '../types';

const engineerTitle = 'Software Engineer | Agentic AI Engineer';

export const profile: Profile = {
  name: 'Mark Julius',
  fullName: 'Mark Julius P. Mella',
  role: engineerTitle,
  title: engineerTitle,
  headline: ['Engineering reliable software.'],
  summary:
    'I’m Mark Julius P. Mella, a software engineer with 6+ years across freelance and product development, transitioning into agentic AI engineering. I plan and build web applications with strong frontend development and full-stack knowledge, connecting interfaces, REST APIs, and persistent data. Performance, SEO, and careful validation guide my work.',
  strengths: [
    {
      title: 'Planning and application structure',
      description:
        'I turn requirements into user journeys, application structure, and data flows. Clear acceptance criteria and manageable features keep implementation focused on the result the application needs to deliver.',
    },
    {
      title: 'Full-stack software development',
      description:
        'My stack spans Vue, React, TypeScript, Node.js, PHP, Laravel, and Firebase. I connect responsive interfaces with application logic and persistent data, including Firestore-backed editing, validation, and access rules.',
    },
    {
      title: 'API and real-time integration',
      description:
        'API integration is a main part of my current work. I connect account, wallet, sports, and support interfaces to REST APIs and real-time services, with authentication, loading feedback, and clear error states.',
    },
    {
      title: 'Performance, caching and SEO',
      description:
        'I work on image delivery, caching, efficient data fetching, code splitting, and loading strategies for applications with large amounts of content. Clear page structure and metadata also support search engine optimization.',
    },
    {
      title: 'Agentic AI workflows and research',
      description:
        'I use Codex and ChatGPT for research, and Cursor and Claude Code for scoped audits, debugging, and refactoring. Structured prompts, explicit constraints, and human review keep the work focused and verifiable.',
    },
    {
      title: 'Quality and maintainability',
      description:
        'I review code, check types and builds, and validate user journeys across browsers and screen sizes. Reusable components, predictable state, error handling, and session cleanup support ongoing maintenance.',
    },
  ],
  focus: ['6+ years of experience', 'Full-stack development', 'Agentic AI workflows'],
  about: [
    'My software engineering foundation began with self-study while I was in college in 2018. I now bring 6+ years of experience across freelance work and product development, with the full-stack knowledge to plan and build complete web applications.',
    'I start with the required result: user journeys, application structure, API integration, and how data is validated and saved. My work includes modular application foundations, authenticated interfaces, Firestore-backed editing, access-rule changes, and optimistic updates with rollback.',
    'API integration is a main part of my current frontend role, connecting sports, accounts, wallets, and customer support to backend services. I also work on shared UI, embedded apps, design tokens, and themes. Caching, image delivery, loading strategies, and SEO help keep large applications usable.',
    'I’m transitioning into agentic AI engineering, building on my software engineering experience. I use Codex and ChatGPT for research, guide coding agents with clear scope and constraints, and review the result through code checks and browser validation. Product behavior and maintainability guide the decisions throughout.',
  ],
  contact: {
    email: 'markmella.dev@gmail.com',
    github: 'https://github.com/mark-dev0x',
    linkedin: 'https://www.linkedin.com/in/markzxc24',
    resume: '/resume/Mark-Julius-Mella-Resume.pdf',
  },
};

export const homeMetadata: PageMetadata = {
  title: profile.fullName + ' | ' + profile.role,
  description:
    'Mark Julius P. Mella: software engineer with 6+ years in frontend development, REST API integration and performance, transitioning into agentic AI engineering.',
};
