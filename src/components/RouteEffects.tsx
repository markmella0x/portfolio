import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export function RouteEffects(): null {
  const { pathname, hash, key } = useLocation();
  const previousPath = useRef(pathname);
  // A repeated section link gets a new navigation key even when its hash is unchanged.
  useEffect(() => {
    const didNavigate = previousPath.current !== pathname;
    previousPath.current = pathname;
    const frame = requestAnimationFrame(() => {
      if (hash) {
        document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
      } else {
        window.scrollTo(0, 0);
        if (didNavigate)
          document.getElementById('main-content')?.focus({ preventScroll: true });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);
  return null;
}
