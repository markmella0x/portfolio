import { Link } from 'react-router-dom';
import { profile } from '../data/profile';
import { ui } from '../data/ui';

export function About(): JSX.Element {
  return (
    <section
      className="section container page-callout"
      id="about"
      aria-labelledby="about-title"
    >
      <div>
        <h2 id="about-title">{ui.aboutTitle}</h2>
        <p>{profile.about[0]}</p>
      </div>
      <Link className="button button-secondary" to="/about/">
        {ui.aboutPageLink}
      </Link>
    </section>
  );
}
