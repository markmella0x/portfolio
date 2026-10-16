import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useClientLayoutEffect } from '../hooks/useClientLayoutEffect';

export function RouteEffects(): null {
  const { pathname, hash, key } = useLocation();
  const previousPath = useRef(pathname);
  useEffect(() => {
    const root = document.documentElement;
    const onPointer = (): void => {
      root.dataset.inputMethod = 'pointer';
    };
    const onKeyboard = (): void => {
      root.dataset.inputMethod = 'keyboard';
    };
    // Track real input across routes, including pages without decorative motion.
    document.addEventListener('pointerdown', onPointer, true);
    document.addEventListener('keydown', onKeyboard, true);
    return () => {
      document.removeEventListener('pointerdown', onPointer, true);
      document.removeEventListener('keydown', onKeyboard, true);
      delete root.dataset.inputMethod;
    };
  }, []);
  // A repeated section link gets a new navigation key even when its hash is unchanged.
  useClientLayoutEffect(() => {
    const didNavigate = previousPath.current !== pathname;
    previousPath.current = pathname;
    if (hash) {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
    } else {
      // Restore the destination before its entrance is measured or painted.
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (didNavigate) document.getElementById('main-content')?.focus({ preventScroll: true });
    }
  }, [pathname, hash, key]);
  return null;
}
