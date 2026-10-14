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

export function App({
  initialCaseStudy,
  initialResume,
}: {
  initialCaseStudy?: typeof import('./pages/CaseStudy').CaseStudy;
  initialResume?: typeof import('./pages/Resume').Resume;
}): JSX.Element {
  const CaseStudyRoute = initialCaseStudy ?? LazyCaseStudy;
  const ResumeRoute = initialResume ?? LazyResume;
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </SiteShell>
    </BrowserRouter>
  );
}
