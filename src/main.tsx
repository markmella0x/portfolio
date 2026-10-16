import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import './styles/main.css';

async function mountApplication(root: HTMLElement): Promise<void> {
  // Keep the prerendered article visible until a directly requested route can render.
  const initialCaseStudy = window.location.pathname.startsWith('/projects/')
    ? (await import('./pages/CaseStudy')).CaseStudy
    : undefined;
  const initialAbout = /^\/about\/?$/.test(window.location.pathname)
    ? (await import('./pages/About')).AboutPage
    : undefined;
  const initialContact = /^\/contact\/?$/.test(window.location.pathname)
    ? (await import('./pages/Contact')).ContactPage
    : undefined;
  const application = (
    <StrictMode>
      <App
        initialCaseStudy={initialCaseStudy}
        initialAbout={initialAbout}
        initialContact={initialContact}
      />
    </StrictMode>
  );
  // Production pages already contain this tree. Attach to it instead of
  // replacing the visible header and article when JavaScript becomes ready.
  if (root.hasChildNodes()) hydrateRoot(root, application);
  else createRoot(root).render(application);
}

const root = document.getElementById('root');
if (!root) throw new Error('Application root is missing.');
void mountApplication(root);
