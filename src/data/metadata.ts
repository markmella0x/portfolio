import type { CaseStudy, PageMetadata } from '../types';
import { profile } from './profile';
import { ui } from './ui';
import { projects } from './projects';
export const notFoundMetadata: PageMetadata = {
  title: ui.notFoundTitle + ' — ' + profile.name,
  description: ui.notFoundDescription,
  noIndex: true,
};
export const resumeMetadata: PageMetadata = {
  title: profile.fullName + ' — Software Engineer Resume',
  description:
    'Resume for ' +
    profile.fullName +
    ': 6+ years in Vue, React, Next.js, TypeScript, API integration, performance and SEO. View experience, skills and the PDF.',
  breadcrumb: ui.resumeLabel,
};
export const aboutMetadata: PageMetadata = {
  title: 'About ' + profile.name + ' | Software Engineer',
  description:
    'Meet ' +
    profile.name +
    ', a software engineer with 6+ years of frontend, API and full-stack experience, transitioning into agentic AI engineering.',
  pageType: 'AboutPage',
  breadcrumb: 'About',
};
export const contactMetadata: PageMetadata = {
  title: 'Contact ' + profile.name + ' | Software Engineer',
  description:
    'Contact ' +
    profile.name +
    ' for software development projects or recruitment. Reach me by email or LinkedIn, and review my software engineering resume.',
  pageType: 'ContactPage',
  breadcrumb: 'Contact',
};
export function getCaseStudyMetadata(study: CaseStudy): PageMetadata {
  const project = projects.find((entry) => entry.caseStudySlug === study.slug);
  return {
    title: (project?.title ?? study.title) + ' | ' + profile.name,
    description: study.summary,
    caseStudy: study,
    breadcrumb: study.title,
  };
}
