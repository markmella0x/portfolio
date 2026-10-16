import { profile } from './profile';
import { ui } from './ui';

export const aboutPage = {
  label: 'About',
  title: 'About ' + profile.name,
  introduction:
    'I’m ' +
    profile.fullName +
    ', a software engineer with 6+ years across freelance and product development, transitioning into agentic AI engineering.',
  sections: [
    { title: 'Software engineering foundations', paragraph: profile.about[0] },
    { title: 'Planning, implementation and delivery', paragraph: profile.about[1] },
    { title: 'Frontend, APIs and performance', paragraph: profile.about[2] },
    { title: 'My transition into agentic AI engineering', paragraph: profile.about[3] },
  ],
  exploreTitle: 'Explore the work',
  exploreDescription:
    'See the projects, experience, and practices behind my software engineering work.',
  links: [
    { label: ui.viewWork, href: '/#work' },
    { label: ui.timelineLink, href: '/#career' },
    { label: ui.viewResume, href: '/resume/' },
  ],
};

export const contactPage = {
  label: 'Contact',
  title: 'Contact ' + profile.name,
  introduction:
    'Have a project in mind or a role to discuss? Reach me by email or LinkedIn, and tell me a little about what you’re building or the team you’re hiring for.',
  emailHeading: 'Start a conversation',
  emailDraft: {
    body: 'Hi ' + profile.name + ',\n\nI’d like to discuss a project or opportunity.\n\n',
  },
  audiences: [
    {
      title: 'For clients',
      description:
        'Share what you want to build or improve, your current technology stack, and any timeline or constraints. I can discuss frontend development, API integration, performance, and application planning.',
      action: 'Email about a project',
      subject: 'Project enquiry — ' + profile.name,
    },
    {
      title: 'For recruiters',
      description:
        'Share the role, team, technology stack, and job description. My background is in software engineering, with a focus on frontend and API integration, and I’m transitioning into agentic AI engineering.',
      action: 'Email about a role',
      subject: 'Recruitment enquiry — ' + profile.name,
    },
  ],
  elsewhereTitle: 'Profiles and resume',
  methods: [
    { label: ui.linkedinLabel, value: 'Connect on LinkedIn', href: profile.contact.linkedin },
    {
      label: ui.githubLabel,
      value: 'Explore my GitHub profile',
      href: profile.contact.github,
    },
    { label: ui.resumeLabel, value: ui.previewResume, href: '/resume/' },
  ],
};
