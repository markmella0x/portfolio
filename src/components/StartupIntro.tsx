import { useEffect, useRef, useState } from 'react';
import { intro } from '../data/intro';
import { profile } from '../data/profile';

export function StartupIntro(): JSX.Element | null {
  const [visible, setVisible] = useState(
    () =>
      typeof document === 'undefined' ||
      (document.documentElement.dataset.intro === 'playing' &&
        !matchMedia('(prefers-reduced-motion: reduce)').matches),
  );
  const overlay = useRef<HTMLDivElement>(null);

  function finish(): void {
    const hadFocus = overlay.current?.contains(document.activeElement);
    delete document.documentElement.dataset.intro;
    delete document.documentElement.dataset.introStarted;
    try {
      sessionStorage.setItem('julius-intro-seen', '1');
    } catch {
      // The intro still completes when browser storage is unavailable.
    }
    setVisible(false);
    if (hadFocus) {
      requestAnimationFrame(() =>
        document.getElementById('main-content')?.focus({ preventScroll: true }),
      );
    }
  }

  useEffect(() => {
    if (!visible) {
      delete document.documentElement.dataset.intro;
      delete document.documentElement.dataset.introStarted;
      if (document.documentElement.dataset.introFocus === 'main') {
        delete document.documentElement.dataset.introFocus;
        document.getElementById('main-content')?.focus({ preventScroll: true });
      }
      return;
    }
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const started = Number(document.documentElement.dataset.introStarted);
    const timer = window.setTimeout(finish, Math.max(0, 1800 - (performance.now() - started)));
    function onKey(event: KeyboardEvent): void {
      if (event.key === 'Escape') finish();
    }
    function onPreference(): void {
      if (preference.matches) finish();
    }
    preference.addEventListener('change', onPreference);
    document.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(timer);
      preference.removeEventListener('change', onPreference);
      document.removeEventListener('keydown', onKey);
    };
  }, [visible]);

  if (!visible) return null;
  return (
    <div
      className="startup-intro"
      ref={overlay}
      role="dialog"
      aria-modal="true"
      aria-label={intro.label}
    >
      <div className="startup-intro-content">
        <p className="startup-intro-role">{profile.title}</p>
        <p className="startup-intro-name">
          {profile.name}
          <span aria-hidden="true">.</span>
        </p>
        <p className="startup-intro-message">{intro.message}</p>
        <div className="startup-intro-pipeline" role="img" aria-label={intro.pipelineLabel}>
          <svg
            className="startup-intro-connection"
            viewBox="0 0 300 64"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path className="intro-connection-track" d="M50 32H250" />
            <path className="intro-connection-signal" d="M50 32H250" pathLength="1" />
          </svg>
          {intro.nodes.map((node) => (
            <div className="startup-intro-node" key={node.label}>
              <div className="startup-intro-node-icon">
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d={node.path} />
                </svg>
              </div>
              <span>{node.label}</span>
            </div>
          ))}
        </div>
        <ul className="startup-intro-skills" aria-label={intro.strengthsLabel}>
          {intro.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
      <button className="startup-intro-skip" type="button" onClick={finish}>
        {intro.skip}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M5 12h14m-5-5 5 5-5 5" />
        </svg>
      </button>
    </div>
  );
}
