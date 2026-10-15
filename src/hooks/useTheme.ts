import { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
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
  const transition = useRef<ViewTransition | null>(null);
  const revision = useRef(0);

  const clearEffect = useCallback((): void => {
    revision.current += 1;
    transition.current?.skipTransition();
    transition.current = null;
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
    function syncVisibility(): void {
      if (document.hidden) stopMotion();
    }
    media.addEventListener('change', syncSystem);
    motion.addEventListener('change', syncMotion);
    window.addEventListener('storage', syncStorage);
    window.addEventListener('beforeprint', stopMotion);
    document.addEventListener('visibilitychange', syncVisibility);
    return () => {
      clearEffect();
      media.removeEventListener('change', syncSystem);
      motion.removeEventListener('change', syncMotion);
      window.removeEventListener('storage', syncStorage);
      window.removeEventListener('beforeprint', stopMotion);
      document.removeEventListener('visibilitychange', syncVisibility);
    };
  }, [clearEffect]);

  function toggleTheme(animate = true): void {
    const next = requestedTheme.current === 'light' ? 'dark' : 'light';
    const interrupted = transition.current !== null;
    requestedTheme.current = next;
    clearEffect();
    try {
      localStorage.setItem(storageKey, next);
    } catch {
      /* Preferences still work in memory. */
    }
    function commitTheme(): void {
      applyTheme(next);
      setTheme(next);
    }
    if (
      !animate ||
      interrupted ||
      matchMedia('(prefers-reduced-motion: reduce)').matches ||
      document.hidden ||
      typeof document.startViewTransition !== 'function'
    ) {
      commitTheme();
      return;
    }

    const currentRevision = revision.current;
    document.documentElement.dataset.themeTransition = 'crossfade';
    try {
      const active = document.startViewTransition(() => {
        // A skipped transition still invokes its callback. Never restore an older choice.
        if (revision.current !== currentRevision) return;
        // Capture the updated palette, icon and accessible label together.
        flushSync(commitTheme);
      });
      transition.current = active;
      function finish(): void {
        if (transition.current !== active) return;
        transition.current = null;
        delete document.documentElement.dataset.themeTransition;
      }
      // Cancellation rejects ready even though the theme update can still succeed.
      void active.ready.catch(() => {});
      void active.finished.then(finish, finish);
    } catch {
      clearEffect();
      commitTheme();
    }
  }

  return { theme, toggleTheme };
}
