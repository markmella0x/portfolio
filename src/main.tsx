import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/main.css';

async function mountApplication(root: HTMLElement): Promise<void> {
  // Keep the prerendered article visible until a directly requested route can render.
  const initialCaseStudy = window.location.pathname.startsWith('/projects/')
    ? (await import('./pages/CaseStudy')).CaseStudy
    : undefined;
  const initialResume = /^\/resume\/?$/.test(window.location.pathname)
    ? (await import('./pages/Resume')).Resume
    : undefined;
  const initialAbout = /^\/about\/?$/.test(window.location.pathname)
    ? (await import('./pages/About')).AboutPage
    : undefined;
  const initialContact = /^\/contact\/?$/.test(window.location.pathname)
    ? (await import('./pages/Contact')).ContactPage
    : undefined;
  createRoot(root).render(
    <StrictMode>
      <App
        initialCaseStudy={initialCaseStudy}
        initialResume={initialResume}
        initialAbout={initialAbout}
        initialContact={initialContact}
      />
    </StrictMode>,
  );
}

const root = document.getElementById('root');
if (!root) throw new Error('Application root is missing.');
void mountApplication(root);
