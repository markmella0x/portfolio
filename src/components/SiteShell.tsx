import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { RouteEffects } from './RouteEffects';
import { ui } from '../data/ui';
export function SiteShell({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div className="site-content">
      <a className="skip-link" href="#main-content">
        {ui.skipLink}
      </a>
      <Header />
      <RouteEffects />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
