import { useTheme } from '../hooks/useTheme';
import { ui } from '../data/ui';

export function ThemeToggle(): JSX.Element {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={(event) => toggleTheme(event.detail > 0)}
      aria-label={theme === 'dark' ? ui.switchToLight : ui.switchToDark}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        <svg
          className="theme-icon-sun"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
        </svg>
        <svg
          className="theme-icon-moon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path d="M20 15.4A8.5 8.5 0 0 1 8.6 4 8.5 8.5 0 1 0 20 15.4Z" />
        </svg>
      </span>
    </button>
  );
}
