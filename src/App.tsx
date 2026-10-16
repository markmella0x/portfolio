import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SiteShell } from './components/SiteShell';
import { Home } from './pages/Home';
import { Resume } from './pages/Resume';
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

const LazyAbout = lazy(async () => ({
  default: (await import('./pages/About')).AboutPage,
}));
const LazyContact = lazy(async () => ({
  default: (await import('./pages/Contact')).ContactPage,
}));

export function App({
  initialCaseStudy,
  initialAbout,
  initialContact,
}: {
  initialCaseStudy?: typeof import('./pages/CaseStudy').CaseStudy;
  initialAbout?: typeof import('./pages/About').AboutPage;
  initialContact?: typeof import('./pages/Contact').ContactPage;
}): JSX.Element {
  const CaseStudyRoute = initialCaseStudy ?? LazyCaseStudy;
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
            <Route path="/resume" element={<Resume />} />
            <Route path="/about" element={<AboutRoute />} />
            <Route path="/contact" element={<ContactRoute />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </SiteShell>
    </BrowserRouter>
  );
}
