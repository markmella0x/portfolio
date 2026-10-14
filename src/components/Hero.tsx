import { Link } from 'react-router-dom';
import { profile } from '../data/profile';
import { ui } from '../data/ui';
import { EngineeringWorkbench } from './EngineeringWorkbench';

export function Hero(): JSX.Element {
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="hero-intro">{profile.title}</p>
        <h1 id="hero-title">
          {profile.name}
          <span className="hero-period" aria-hidden="true">
            .
          </span>
        </h1>
        <h2 className="hero-headline">
          {profile.headline.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
        <p className="hero-summary">{profile.summary}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#work">
            {ui.viewWork}
          </a>
          <Link className="button button-secondary" to="/resume/">
            {ui.viewResume}
          </Link>
          <a className="text-link" href="#contact">
            {ui.getInTouch}
          </a>
        </div>
        <ul className="focus-tags" aria-label={profile.title}>
          {profile.focus.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <EngineeringWorkbench />
      <dl className="hero-strengths">
        {profile.strengths.map((strength) => (
          <div key={strength.title}>
            <dt>{strength.title}</dt>
            <dd>{strength.description}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
