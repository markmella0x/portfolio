import { Link } from 'react-router-dom';
import { ui } from '../data/ui';

export function Contact(): JSX.Element {
  return (
    <section
      className="section container page-callout"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div>
        <h2 id="contact-title">{ui.contactTitle}</h2>
        <p>{ui.contactDescription}</p>
      </div>
      <Link className="button button-primary" to="/contact/">
        {ui.contactPageLink}
      </Link>
    </section>
  );
}
