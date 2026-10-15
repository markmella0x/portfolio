import { profile } from '../data/profile';
import { resume } from '../data/resume';
import { ui } from '../data/ui';
import type { ResumeExperience } from '../types';

function ExperienceEntry({ entry }: { entry: ResumeExperience }): JSX.Element {
  return (
    <article className="resume-entry">
      <div className="resume-entry-heading">
        <h3>{entry.role}</h3>
        {entry.period ? <span>{entry.period}</span> : null}
      </div>
      {entry.organization ? <p className="resume-organization">{entry.organization}</p> : null}
      <ul>
        {entry.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  );
}

function PageFooter({ page }: { page: number }): JSX.Element {
  return (
    <footer className="resume-sheet-footer">
      <span>{profile.fullName}</span>
      <span>
        {ui.resumePage} {page} {ui.resumeOf} 2
      </span>
    </footer>
  );
}

export function ResumeDocument(): JSX.Element {
  return (
    <article className="resume-document" aria-label={ui.resumePreviewLabel}>
      <section className="resume-sheet" aria-labelledby="resume-name">
        <div className="resume-sheet-content">
          <div className="resume-document-header">
            <h1 id="resume-name">{profile.fullName}</h1>
            <p className="resume-role">{profile.title}</p>
            <ul className="resume-contacts">
              <li>
                <a href={profile.contact.website}>
                  {ui.websiteLabel}:{' '}
                  {profile.contact.website.replace(/^https:\/\//, '').replace(/\/$/, '')}
                </a>
              </li>
              {profile.contact.email ? (
                <li>
                  <a href={'mailto:' + profile.contact.email}>
                    {ui.emailLabel}: {profile.contact.email}
                  </a>
                </li>
              ) : null}
              <li>
                <a href={'tel:' + resume.phone}>
                  {ui.resumePhone}: {resume.phone}
                </a>
              </li>
              {profile.contact.github ? (
                <li>
                  <a href={profile.contact.github}>
                    {ui.githubLabel}: {profile.contact.github.replace('https://', '')}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
          <section className="resume-section" aria-labelledby="resume-summary">
            <h2 id="resume-summary">{ui.resumeSummary}</h2>
            <p>{resume.summary}</p>
          </section>
          <section className="resume-section" aria-labelledby="resume-skills">
            <h2 id="resume-skills">{ui.resumeSkills}</h2>
            <dl className="resume-skills">
              {resume.skills.map((group) => (
                <div key={group.label}>
                  <dt>{group.label}: </dt>
                  <dd>{group.skills.join(', ')}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section className="resume-section" aria-labelledby="resume-experience">
            <h2 id="resume-experience">{ui.resumeExperience}</h2>
            {resume.experience.map((entry) => (
              <ExperienceEntry entry={entry} key={entry.role + entry.organization} />
            ))}
          </section>
          <section className="resume-section" aria-labelledby="resume-education">
            <h2 id="resume-education">{ui.resumeEducation}</h2>
            <div className="resume-entry-heading">
              <h3>{resume.education.degree}</h3>
              <span>{resume.education.period}</span>
            </div>
            <p>{resume.education.institution}</p>
          </section>
        </div>
        <PageFooter page={1} />
      </section>
      <section className="resume-sheet" aria-labelledby="resume-projects">
        <div className="resume-sheet-content">
          <section className="resume-section" aria-labelledby="resume-projects">
            <h2 id="resume-projects">{ui.resumeProjects}</h2>
            {resume.projects.map((project) => (
              <article className="resume-entry" key={project.title}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <p className="resume-project-skills">{project.skills.join(', ')}</p>
              </article>
            ))}
          </section>
          <section className="resume-section" aria-labelledby="resume-ai">
            <h2 id="resume-ai">{ui.resumeAi}</h2>
            <p>{resume.aiIntroduction}</p>
            <ul>
              {resume.aiPractices.map((practice) => (
                <li key={practice}>{practice}</li>
              ))}
            </ul>
          </section>
          <section className="resume-section" aria-labelledby="resume-additional">
            <h2 id="resume-additional">{ui.resumeAdditionalExperience}</h2>
            {resume.additionalExperience.map((entry) => (
              <ExperienceEntry entry={entry} key={entry.role} />
            ))}
          </section>
          <section className="resume-section" aria-labelledby="resume-achievements">
            <h2 id="resume-achievements">{ui.resumeAchievements}</h2>
            <ul>
              {resume.achievements.map((achievement) => (
                <li key={achievement}>{achievement}</li>
              ))}
            </ul>
          </section>
        </div>
        <PageFooter page={2} />
      </section>
    </article>
  );
}
