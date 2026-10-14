import { Link } from 'react-router-dom';
import type { Project } from '../types';
import { ui } from '../data/ui';

const diagramPaths: Record<Project['visual'], string> = {
  theme: 'M50 18V47H24V73M50 47H76V73',
  retail: 'M50 15V85',
  performance: 'M3 98H97',
  platform: 'M12 50H88',
  wallet: 'M9 15V85',
  tracking: 'M12 50H88',
  storefront: 'M12 70H88',
  inventory: 'M12 15V85',
  catalog: 'M12 50H88',
  draw: 'M50 15V85',
  form: 'M12 15V85',
  reporting: 'M3 98H97',
};

const projectIcons: Record<Project['visual'], string> = {
  theme: 'M12 3a9 9 0 1 0 0 18V3Z M12 3a9 9 0 0 1 0 18',
  retail: 'M4 4h16v5H4z M6 9v11h12V9 M9 20v-6h6v6',
  performance: 'M4 17a9 9 0 1 1 16 0 M12 13l5-5 M6 18h12',
  platform: 'M3 4h18v16H3z M3 9h18 M9 9v11',
  wallet: 'M4 5h15v4 M3 9h18v11H3z M16 13h5v3h-5z',
  tracking: 'M4 5h6v6H4z M14 13h6v6h-6z M10 8h7v5 M7 11v6h7',
  storefront: 'M4 9h16l-2-5H6L4 9Z M5 9v11h14V9 M9 20v-6h6v6',
  inventory: 'M4 5h16v15H4z M4 10h16 M9 5v15 M4 15h16',
  catalog: 'M8 3h12v15H8z M4 7v14h12 M11 7h6 M11 11h6',
  draw: 'M8 4h8v7a4 4 0 0 1-8 0V4Z M8 6H4v3a4 4 0 0 0 4 4 M16 6h4v3a4 4 0 0 1-4 4 M12 15v5 M8 20h8',
  form: 'M5 3h14v18H5z M8 8l1 1 2-2 M13 8h3 M8 14l1 1 2-2 M13 14h3',
  reporting: 'M4 3v17h17 M8 15v-4 M13 15V7 M18 15V5',
};

export function ProjectCard({ project }: { project: Project }): JSX.Element {
  const visual = ui.projectVisuals[project.visual];
  return (
    <article
      className={'project-card project-' + project.visual}
      aria-labelledby={project.slug + '-title'}
    >
      <div
        className="project-diagram"
        data-diagram={project.visual}
        role="img"
        aria-label={visual.label + ': ' + visual.nodes.join(', ')}
      >
        <div className="project-meta" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            className="project-icon"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={projectIcons[project.visual]} />
          </svg>
          <span>{project.category}</span>
        </div>
        <div className="diagram-nodes">
          <svg
            className="diagram-flow"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path className="diagram-flow-track" d={diagramPaths[project.visual]} />
            <path
              className="diagram-flow-signal"
              d={diagramPaths[project.visual]}
              pathLength="1"
            />
          </svg>
          {visual.nodes.map((node) => (
            <span key={node}>
              {project.visual === 'catalog' ? (
                <i className="diagram-page-lines" aria-hidden="true" />
              ) : null}
              {project.visual === 'performance' || project.visual === 'reporting' ? (
                <i className="diagram-node-fill" aria-hidden="true" />
              ) : null}
              <strong className="diagram-node-label">{node}</strong>
              <i className="diagram-node-signal" aria-hidden="true" />
            </span>
          ))}
        </div>
        <span className="diagram-caption">{visual.label}</span>
      </div>
      <div className="project-card-content">
        <h3 id={project.slug + '-title'}>{project.title}</h3>
        <p className="project-contribution-label">{ui.contributionLabel}</p>
        <ul className="project-contributions">
          {project.contributions.map((contribution) => (
            <li key={contribution}>{contribution}</li>
          ))}
        </ul>
        <div className="project-result">
          <p className="project-result-label">{ui.projectResultLabel}</p>
          <p>{project.result}</p>
        </div>
        <div className="project-stack">
          <p>{ui.projectStackLabel}</p>
          <ul className="skill-tags" aria-label={ui.skillsLabel}>
            {project.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
        {project.caseStudySlug ? (
          <Link className="case-study-link" to={'/projects/' + project.caseStudySlug}>
            {ui.caseStudyLink}
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M5 12h14m-5-5 5 5-5 5" />
            </svg>
            <span className="sr-only">: {project.title}</span>
          </Link>
        ) : null}
      </div>
    </article>
  );
}
