import { Link, useParams } from 'react-router-dom';
import { caseStudies } from '../data/caseStudies';
import { getCaseStudyMetadata, notFoundMetadata } from '../data/metadata';
import { useMetadata } from '../hooks/useMetadata';
import { ui } from '../data/ui';
import { NotFound } from './NotFound';
export function CaseStudy(): JSX.Element {
  const { slug } = useParams();
  const study = caseStudies.find((item) => item.slug === slug);
  useMetadata(study ? getCaseStudyMetadata(study) : notFoundMetadata);
  if (!study) return <NotFound />;
  return (
    <article className="container case-study">
      <Link className="text-link case-back" to="/#work">
        {ui.backToWork}
      </Link>
      <header className="case-header">
        <p className="case-category">{study.category}</p>
        <h1>{study.title}</h1>
        <p className="case-summary">{study.summary}</p>
        <dl className="case-facts">
          <div>
            <dt>{ui.roleLabel}</dt>
            <dd>{study.role}</dd>
          </div>
        </dl>
      </header>
      <div className="case-layout">
        <aside className="case-nav">
          <nav aria-label={ui.caseContentsLabel}>
            <p>{ui.caseContentsLabel}</p>
            {study.sections.map((section) => (
              <a key={section.id} href={'#' + section.id}>
                {section.title}
              </a>
            ))}
            <a href="#skills-used">{ui.skillsLabel}</a>
          </nav>
        </aside>
        <div className="case-body">
          {study.sections.map((section) => (
            <section
              id={section.id}
              key={section.id}
              aria-labelledby={'heading-' + section.id}
            >
              <h2 id={'heading-' + section.id}>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
          <section id="skills-used" aria-labelledby="heading-skills">
            <h2 id="heading-skills">{ui.skillsLabel}</h2>
            <ul className="skill-tags">
              {study.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
      <section className="related-work" aria-labelledby="related-work-title">
        <h2 id="related-work-title">{ui.relatedWorkTitle}</h2>
        <div>
          {caseStudies
            .filter((item) => item.slug !== study.slug)
            .map((item) => (
              <Link key={item.slug} to={'/projects/' + item.slug}>
                <span>{item.category}</span>
                <h3>{item.title}</h3>
                <span className="case-study-link">{ui.caseStudyLink}</span>
              </Link>
            ))}
        </div>
      </section>
    </article>
  );
}
