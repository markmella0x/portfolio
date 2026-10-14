import { useCallback, useEffect, useRef, useState } from 'react';
import type { Theme } from '../types';

const storageKey = 'julius-theme';

function readInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

function readSavedTheme(): Theme | null {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved === 'light' || saved === 'dark' ? saved : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'dark' ? '#12141b' : '#f7f8fb');
}

export function useTheme(): { theme: Theme; toggleTheme: (animate?: boolean) => void } {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);
  const requestedTheme = useRef(theme);
  const fadeTimer = useRef<number | undefined>(undefined);

  const clearEffect = useCallback((): void => {
    window.clearTimeout(fadeTimer.current);
    delete document.documentElement.dataset.themeTransition;
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    applyTheme(requestedTheme.current);
    function syncTheme(next: Theme): void {
      clearEffect();
      requestedTheme.current = next;
      applyTheme(next);
      setTheme(next);
    }
    function syncSystem(event: MediaQueryListEvent): void {
      if (!readSavedTheme()) syncTheme(event.matches ? 'dark' : 'light');
    }
    function syncStorage(event: StorageEvent): void {
      if (event.key !== storageKey && event.key !== null) return;
      syncTheme(readSavedTheme() ?? (media.matches ? 'dark' : 'light'));
    }
    function stopMotion(): void {
      syncTheme(requestedTheme.current);
    }
    function syncMotion(): void {
      if (motion.matches) stopMotion();
    }
    media.addEventListener('change', syncSystem);
    motion.addEventListener('change', syncMotion);
    window.addEventListener('storage', syncStorage);
    window.addEventListener('beforeprint', stopMotion);
    return () => {
      clearEffect();
      media.removeEventListener('change', syncSystem);
      motion.removeEventListener('change', syncMotion);
      window.removeEventListener('storage', syncStorage);
      window.removeEventListener('beforeprint', stopMotion);
    };
  }, [clearEffect]);

  function toggleTheme(animate = true): void {
    const next = requestedTheme.current === 'light' ? 'dark' : 'light';
    requestedTheme.current = next;
    clearEffect();
    try {
      localStorage.setItem(storageKey, next);
    } catch {
      /* Preferences still work in memory. */
    }
    if (
      animate &&
      !matchMedia('(prefers-reduced-motion: reduce)').matches &&
      !document.hidden
    ) {
      document.documentElement.dataset.themeTransition = 'fade';
      fadeTimer.current = window.setTimeout(clearEffect, 240);
    }
    applyTheme(next);
    setTheme(next);
  }

  return { theme, toggleTheme };
}
