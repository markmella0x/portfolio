import { Link } from 'react-router-dom';
import { profile } from '../data/profile';
import { ui } from '../data/ui';

export function Contact(): JSX.Element {
  const links = [
    {
      label: ui.emailLabel,
      value: profile.contact.email,
      href: profile.contact.email ? 'mailto:' + profile.contact.email : null,
    },
    { label: ui.githubLabel, value: profile.contact.github, href: profile.contact.github },
    {
      label: ui.linkedinLabel,
      value: profile.contact.linkedin,
      href: profile.contact.linkedin,
    },
  ];
  return (
    <section
      className="section container contact-section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div>
        <h2 id="contact-title">{ui.contactTitle}</h2>
        <p>{ui.contactDescription}</p>
      </div>
      <div className="contact-links">
        {links.map((link) =>
          link.href ? (
            <a
              href={link.href}
              key={link.label}
              className="contact-link"
              rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'}
            >
              <span>{link.label}</span>
              <span>{link.value}</span>
            </a>
          ) : (
            <div className="contact-link contact-placeholder" key={link.label}>
              <span>{link.label}</span>
              <span>{ui.needsInput}</span>
            </div>
          ),
        )}
        {profile.contact.resume ? (
          <Link className="contact-link" to="/resume/">
            <span>{ui.resumeLabel}</span>
            <span>{ui.previewResume}</span>
          </Link>
        ) : null}
      </div>
    </section>
  );
}
