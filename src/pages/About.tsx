import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { aboutPage } from '../data/pages';
import { aboutMetadata } from '../data/metadata';
import { ui } from '../data/ui';
import { useMetadata } from '../hooks/useMetadata';
import { usePageMotion } from '../hooks/usePageMotion';

export function AboutPage(): JSX.Element {
  useMetadata(aboutMetadata);
  const motion = usePageMotion<HTMLElement>();
  return (
    <article className="container information-page about-page" ref={motion}>
      <PageHeader
        label={aboutPage.label}
        title={aboutPage.title}
        description={aboutPage.introduction}
      />
      <div className="about-page-layout">
        <div className="about-story">
          {aboutPage.sections.map((section, index) => (
            <section key={section.title} aria-labelledby={'about-section-' + index}>
              <h2 id={'about-section-' + index}>{section.title}</h2>
              <p>{section.paragraph}</p>
            </section>
          ))}
        </div>
        <aside className="about-related" aria-labelledby="about-explore-title">
          <h2 id="about-explore-title">{aboutPage.exploreTitle}</h2>
          <p>{aboutPage.exploreDescription}</p>
          <ul>
            {aboutPage.links.map((link) => (
              <li key={link.href}>
                <Link className="text-link" to={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link className="button button-primary" to="/contact/">
            {ui.contactPageLink}
          </Link>
        </aside>
      </div>
    </article>
  );
}
