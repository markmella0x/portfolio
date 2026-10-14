import { Link } from 'react-router-dom';
import { timeline } from '../data/timeline';
import { ui } from '../data/ui';

export function Timeline(): JSX.Element {
  return (
    <section
      className="section container career-section"
      id="career"
      aria-labelledby="timeline-title"
    >
      <div className="section-heading">
        <h2 id="timeline-title">{ui.timelineTitle}</h2>
        <p>{ui.timelineIntroduction}</p>
      </div>
      <ol className="timeline">
        {timeline.map((item) => (
          <li
            className={'timeline-item' + (item.current ? ' timeline-item-current' : '')}
            aria-current={item.current ? 'true' : undefined}
            key={item.id}
          >
            <span className="timeline-rail" aria-hidden="true" />
            <span className="timeline-node" aria-hidden="true" />
            <article className="timeline-entry" aria-labelledby={'milestone-' + item.id}>
              <div className="timeline-period">
                {item.dateTime ? (
                  <time dateTime={item.dateTime}>{item.period}</time>
                ) : (
                  <span>{item.period}</span>
                )}
                {item.current ? (
                  <span className="timeline-status">{ui.timelineCurrentLabel}</span>
                ) : null}
              </div>
              <h3 id={'milestone-' + item.id}>{item.title}</h3>
              <p>{item.description}</p>
              <ul className="skill-tags" aria-label={ui.skillsLabel}>
                {item.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
              {item.link.href.startsWith('#') ? (
                <a className="text-link timeline-proof" href={item.link.href}>
                  {item.link.label}
                </a>
              ) : (
                <Link className="text-link timeline-proof" to={item.link.href}>
                  {item.link.label}
                </Link>
              )}
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
