import { Hero } from '../components/Hero';
import { ProjectsGrid } from '../components/ProjectsGrid';
import { SkillsSection } from '../components/SkillsSection';
import { About } from '../components/About';
import { AiSection } from '../components/AiSection';
import { Contact } from '../components/Contact';
import { Timeline } from '../components/Timeline';
import { homeMetadata } from '../data/profile';
import { useMetadata } from '../hooks/useMetadata';
import { usePageMotion } from '../hooks/usePageMotion';

export function Home(): JSX.Element {
  useMetadata(homeMetadata);
  const motion = usePageMotion<HTMLDivElement>();
  return (
    <div className="home-page" ref={motion}>
      <Hero />
      <ProjectsGrid />
      <SkillsSection />
      <AiSection />
      <Timeline />
      <About />
      <Contact />
    </div>
  );
}
