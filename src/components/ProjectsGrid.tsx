import { projects } from '../data/projects';
import { ui } from '../data/ui';
import { ProjectCard } from './ProjectCard';
import { useDiagramMotion } from '../hooks/useDiagramMotion';

export function ProjectsGrid(): JSX.Element {
  const grid = useDiagramMotion();
  return (
    <section className="section container" id="work" aria-labelledby="work-title">
      <div className="section-heading">
        <h2 id="work-title">{ui.workTitle}</h2>
        <p>{ui.workDescription}</p>
      </div>
      <div className="project-grid" ref={grid}>
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
