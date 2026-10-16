import { useEffect, useLayoutEffect } from 'react';

// Prepare visual state before a browser paint; keep static rendering effect-free.
export const useClientLayoutEffect =
  typeof document === 'undefined' ? useEffect : useLayoutEffect;
