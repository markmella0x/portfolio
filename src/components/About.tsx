import { profile } from '../data/profile';
import { ui } from '../data/ui';

export function About(): JSX.Element {
  return (
    <section
      className="section container about-section"
      id="about"
      aria-labelledby="about-title"
    >
      <div className="about-heading">
        <h2 id="about-title">{ui.aboutTitle}</h2>
        <a className="text-link" href="#career">
          {ui.timelineLink}
        </a>
      </div>
      <div className="about-copy">
        {profile.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
