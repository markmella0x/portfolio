import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SiteShell } from './components/SiteShell';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { ui } from './data/ui';
import { StartupIntro } from './components/StartupIntro';

async function loadCaseStudy(): Promise<{
  default: typeof import('./pages/CaseStudy').CaseStudy;
}> {
  const module = await import('./pages/CaseStudy');
  return { default: module.CaseStudy };
}

const LazyCaseStudy = lazy(loadCaseStudy);

async function loadResume(): Promise<{
  default: typeof import('./pages/Resume').Resume;
}> {
  const module = await import('./pages/Resume');
  return { default: module.Resume };
}

const LazyResume = lazy(loadResume);

const LazyAbout = lazy(async () => ({
  default: (await import('./pages/About')).AboutPage,
}));
const LazyContact = lazy(async () => ({
  default: (await import('./pages/Contact')).ContactPage,
}));

export function App({
  initialCaseStudy,
  initialResume,
  initialAbout,
  initialContact,
}: {
  initialCaseStudy?: typeof import('./pages/CaseStudy').CaseStudy;
  initialResume?: typeof import('./pages/Resume').Resume;
  initialAbout?: typeof import('./pages/About').AboutPage;
  initialContact?: typeof import('./pages/Contact').ContactPage;
}): JSX.Element {
  const CaseStudyRoute = initialCaseStudy ?? LazyCaseStudy;
  const ResumeRoute = initialResume ?? LazyResume;
  const AboutRoute = initialAbout ?? LazyAbout;
  const ContactRoute = initialContact ?? LazyContact;
  return (
    <BrowserRouter>
      <StartupIntro />
      <SiteShell>
        <Suspense
          fallback={
            <p className="container route-loading" role="status">
              {ui.loadingLabel}
            </p>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<CaseStudyRoute />} />
            <Route path="/resume" element={<ResumeRoute />} />
            <Route path="/about" element={<AboutRoute />} />
            <Route path="/contact" element={<ContactRoute />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </SiteShell>
    </BrowserRouter>
  );
}
