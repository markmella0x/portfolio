import { useState } from 'react';
import { projects } from '../data/projects';
import { ui } from '../data/ui';
import { ProjectCard } from './ProjectCard';
import { useDiagramMotion } from '../hooks/useDiagramMotion';

export function ProjectsGrid(): JSX.Element {
  const grid = useDiagramMotion();
  const [pointerMotion, setPointerMotion] = useState(false);
  const featured = projects.filter((project) => project.caseStudySlug);
  const additional = projects.filter((project) => !project.caseStudySlug);
  return (
    <section className="section container" id="work" aria-labelledby="work-title">
      <div className="section-heading">
        <h2 id="work-title">{ui.workTitle}</h2>
        <p>{ui.workDescription}</p>
      </div>
      <div ref={grid}>
        <div className="project-grid featured-work">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <p className="work-scope-note">{ui.workScopeNote}</p>
        <details
          className="additional-work"
          data-motion={pointerMotion ? 'pointer' : 'instant'}
          onKeyDownCapture={() => setPointerMotion(false)}
        >
          <summary onClick={(event) => setPointerMotion(event.detail > 0)}>
            <span>
              <span className="additional-work-title">{ui.additionalWorkTitle}</span>
              <span className="additional-work-description">
                {ui.additionalWorkDescription}
              </span>
            </span>
            <span className="additional-work-count">
              {additional.length} {ui.projectCountLabel}
            </span>
            <svg
              className="additional-work-toggle"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="m6 9 6 6 6-6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </summary>
          <div className="project-grid">
            {additional.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </details>
        <div className="public-work">
          <div>
            <h3>{ui.publicWorkTitle}</h3>
            <p>{ui.publicWorkDescription}</p>
          </div>
          <a className="text-link" href={ui.publicWorkUrl}>
            {ui.publicWorkLink}
          </a>
        </div>
      </div>
    </section>
  );
}
