import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ui } from '../data/ui';
import { profile } from '../data/profile';
import { ThemeToggle } from './ThemeToggle';

export function Header(): JSX.Element {
  const location = useLocation();
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = header.current;
    if (!element) return;
    const root = document.documentElement;
    const updateOffset = (): void => {
      const height =
        getComputedStyle(element).position === 'sticky'
          ? element.getBoundingClientRect().height
          : 0;
      root.style.setProperty('--header-offset', height + 8 + 'px');
    };
    updateOffset();
    const observer =
      typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(updateOffset);
    observer?.observe(element);
    window.addEventListener('resize', updateOffset);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', updateOffset);
      root.style.removeProperty('--header-offset');
    };
  }, []);

  return (
    <header className="header" ref={header}>
      <div className="container header-inner">
        <Link className="wordmark" to="/" aria-label={ui.homeLabel}>
          {profile.name}
          <span aria-hidden="true">.</span>
        </Link>
        <nav aria-label={ui.brandLabel}>
          {ui.nav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              aria-current={
                location.pathname + location.hash === item.href ? 'location' : undefined
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link
            className="header-resume"
            to="/resume/"
            aria-current={
              location.pathname.replace(/\/$/, '') === '/resume' ? 'page' : undefined
            }
          >
            {ui.resumeLabel}
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
