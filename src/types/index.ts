export type Theme = 'light' | 'dark';
export type WorkbenchPhase = 'scope' | 'implement' | 'verify';

export interface WorkbenchStep {
  id: WorkbenchPhase;
  label: string;
  title: string;
  description: string;
  practices: string[];
}

export interface WorkbenchContent {
  title: string;
  navigationLabel: string;
  note: string;
  steps: WorkbenchStep[];
}
export type ProjectVisual =
  | 'theme'
  | 'retail'
  | 'performance'
  | 'platform'
  | 'wallet'
  | 'tracking'
  | 'storefront'
  | 'inventory'
  | 'catalog'
  | 'draw'
  | 'form'
  | 'reporting';

export interface Profile {
  name: string;
  fullName: string;
  role: string;
  title: string;
  headline: string[];
  summary: string;
  strengths: { title: string; description: string }[];
  focus: string[];
  about: string[];
  contact: {
    email: string | null;
    github: string | null;
    linkedin: string | null;
    resume: string | null;
  };
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  contributions: string[];
  result: string;
  skills: string[];
  visual: ProjectVisual;
  caseStudySlug?: string;
}

export interface PageMetadata {
  title: string;
  description: string;
  noIndex?: boolean;
  caseStudy?: Pick<CaseStudy, 'title' | 'skills'>;
}
export interface SeoMetaTag {
  attribute: 'name' | 'property';
  key: string;
  content: string;
}
export interface PageSeo {
  canonical: string | null;
  tags: SeoMetaTag[];
  structuredData: Record<string, unknown> | null;
}
export interface Skill {
  name: string;
}
export interface SkillGroup {
  title: string;
  description: string;
  skills: Skill[];
  featured?: boolean;
}
export interface ResumeSkillGroup {
  label: string;
  skills: string[];
}
export interface ResumeExperience {
  role: string;
  organization: string;
  period?: string;
  bullets: string[];
}
export interface ResumeProject {
  title: string;
  description: string;
  skills: string[];
}
export interface ResumeContent {
  phone: string;
  summary: string;
  skills: ResumeSkillGroup[];
  experience: ResumeExperience[];
  education: { degree: string; institution: string; period: string };
  projects: ResumeProject[];
  aiIntroduction: string;
  aiPractices: string[];
  additionalExperience: ResumeExperience[];
  achievements: string[];
}
export interface TimelineItem {
  id: string;
  period: string;
  dateTime?: string;
  title: string;
  description: string;
  skills: string[];
  link: { label: string; href: string };
  current?: boolean;
}
export interface WorkflowStep {
  title: string;
  description: string;
}
export interface AiWorkflow {
  title: string;
  introduction: string;
  steps: WorkflowStep[];
  tools: string[];
}
export interface CaseStudySection {
  id: string;
  title: string;
  paragraphs: string[];
}
export interface CaseStudy {
  slug: string;
  title: string;
  category: string;
  summary: string;
  role: string;
  skills: string[];
  sections: CaseStudySection[];
}
