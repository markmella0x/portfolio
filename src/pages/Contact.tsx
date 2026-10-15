import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { EmailLink } from '../components/EmailLink';
import { contactPage } from '../data/pages';
import { contactMetadata } from '../data/metadata';
import { profile } from '../data/profile';
import { ui } from '../data/ui';
import { useMetadata } from '../hooks/useMetadata';

export function ContactPage(): JSX.Element {
  useMetadata(contactMetadata);
  const email = profile.contact.email;
  return (
    <article className="container information-page contact-page">
      <PageHeader
        label={contactPage.label}
        title={contactPage.title}
        description={contactPage.introduction}
      />
      <section className="contact-primary" aria-labelledby="contact-email-title">
        <h2 id="contact-email-title">{contactPage.emailHeading}</h2>
        {email ? (
          <EmailLink className="contact-email" email={email} {...contactPage.emailDraft}>
            {email}
          </EmailLink>
        ) : (
          <p>{ui.needsInput}</p>
        )}
      </section>
      <div className="contact-audiences">
        {contactPage.audiences.map((audience, index) => (
          <section key={audience.title} aria-labelledby={'contact-audience-' + index}>
            <h2 id={'contact-audience-' + index}>{audience.title}</h2>
            <p>{audience.description}</p>
            {email ? (
              <EmailLink
                className="text-link"
                email={email}
                subject={audience.subject}
                body={audience.body}
              >
                {audience.action}
              </EmailLink>
            ) : null}
          </section>
        ))}
      </div>
      <section className="contact-elsewhere" aria-labelledby="contact-elsewhere-title">
        <h2 id="contact-elsewhere-title">{contactPage.elsewhereTitle}</h2>
        <div className="contact-methods">
          {contactPage.methods.map((method) =>
            method.href ? (
              method.href.startsWith('/') ? (
                <Link className="contact-link" to={method.href} key={method.label}>
                  <span>{method.label}</span>
                  <span>{method.value}</span>
                </Link>
              ) : (
                <a
                  className="contact-link"
                  href={method.href}
                  key={method.label}
                  rel="noreferrer"
                >
                  <span>{method.label}</span>
                  <span>{method.value}</span>
                </a>
              )
            ) : null,
          )}
        </div>
      </section>
    </article>
  );
}
