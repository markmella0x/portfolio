import { skillGroups } from '../data/skills';
import { ui } from '../data/ui';

export function SkillsSection(): JSX.Element {
  return (
    <section className="section container" id="skills" aria-labelledby="skills-title">
      <div className="section-heading">
        <h2 id="skills-title">{ui.skillsTitle}</h2>
        <p>{ui.skillsDescription}</p>
      </div>
      <div className="skills-grid">
        {skillGroups.map((group) => (
          <div
            className={group.featured ? 'skill-group skill-group-featured' : 'skill-group'}
            key={group.title}
          >
            <h3>{group.title}</h3>
            <p>{group.description}</p>
            <ul>
              {group.skills.map((skill) => (
                <li key={skill.name}>
                  <span>{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
