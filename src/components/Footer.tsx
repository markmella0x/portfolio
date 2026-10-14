import { ui } from '../data/ui';
import { profile } from '../data/profile';

export function Footer(): JSX.Element {
  return (
    <footer className="footer container">
      <p>
        {ui.copyrightPrefix} {profile.name}
      </p>
      <p>{ui.footerNote}</p>
      <a href="#main-content" className="text-link">
        {ui.backToTop}
      </a>
    </footer>
  );
}
