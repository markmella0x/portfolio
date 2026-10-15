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
  title: 'Resume — ' + profile.fullName + ' | ' + profile.role,
  description:
    'Resume for ' +
    profile.fullName +
    ': Software engineer with 6+ years of experience, transitioning into agentic AI engineering. Frontend development, REST APIs, performance, and SEO.',
};
export function getCaseStudyMetadata(study: CaseStudy): PageMetadata {
  const project = projects.find((entry) => entry.caseStudySlug === study.slug);
  return {
    title: (project?.title ?? study.title) + ' | ' + profile.fullName,
    description: study.summary,
    caseStudy: study,
  };
}
