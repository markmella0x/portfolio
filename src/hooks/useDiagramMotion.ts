import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

export function useDiagramMotion(): RefObject<HTMLDivElement> {
  const grid = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = grid.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!root || !('IntersectionObserver' in window) || !('animate' in Element.prototype))
      return;
    if (preference.matches || window.location.hash) return;
    if (document.activeElement?.matches(':focus-visible')) return;
    const easing = getComputedStyle(document.documentElement)
      .getPropertyValue('--ease-out')
      .trim();
    let stopped = false;
    const diagrams = root.querySelectorAll<HTMLElement>('.project-diagram');
    const seen = new WeakSet<HTMLElement>();
    const visible = new Set<HTMLElement>();
    const animations = new Map<HTMLElement, Set<Animation>>();

    function cancel(diagram: HTMLElement): void {
      animations.get(diagram)?.forEach((animation) => animation.cancel());
      animations.delete(diagram);
    }

    function play(diagram: HTMLElement, delay = 0): void {
      if (stopped || preference.matches || document.hidden || animations.has(diagram)) return;
      const active = new Set<Animation>();
      animations.set(diagram, active);
      seen.add(diagram);
      observer.unobserve(diagram);

      function animate(
        element: Element | null,
        frames: Keyframe[],
        duration: number,
        offset = 0,
      ): void {
        if (!element || typeof element.animate !== 'function') return;
        const animation = element.animate(frames, {
          duration,
          delay: delay + offset,
          easing,
        });
        animation.id = 'portfolio-diagram';
        active.add(animation);
        function release(): void {
          active.delete(animation);
          if (!active.size) animations.delete(diagram);
        }
        animation.onfinish = release;
        animation.oncancel = release;
      }

      animate(
        diagram.querySelector('.diagram-flow-signal'),
        [
          { strokeDashoffset: '1', opacity: 0 },
          { strokeDashoffset: '1', opacity: 0.9, offset: 0.12 },
          { strokeDashoffset: '0', opacity: 0.9, offset: 0.7 },
          { strokeDashoffset: '0', opacity: 0 },
        ],
        1050,
      );

      diagram.querySelectorAll<HTMLElement>('.diagram-nodes > span').forEach((node, index) => {
        const order = diagram.dataset.diagram === 'retail' ? 2 - index : index;
        const offset = order * 110;
        animate(
          node.querySelector('.diagram-node-signal'),
          [{ opacity: 0 }, { opacity: 0.8, offset: 0.35 }, { opacity: 0 }],
          900,
          offset,
        );
        if (diagram.dataset.diagram === 'retail') {
          animate(
            node,
            [{ transform: 'translateY(5px)' }, { transform: 'none' }],
            650,
            offset,
          );
        }
        animate(
          node.querySelector('.diagram-node-fill'),
          [
            { transform: 'scaleY(0)', opacity: 0.18 },
            { transform: 'scaleY(1)', opacity: 0.18, offset: 0.7 },
            { transform: 'scaleY(1)', opacity: 0 },
          ],
          1050,
          offset,
        );
      });
      if (!active.size) animations.delete(diagram);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          const diagram = entry.target as HTMLElement;
          if (!entry.isIntersecting || entry.intersectionRatio < 0.4) {
            visible.delete(diagram);
            return;
          }
          visible.add(diagram);
          if (!seen.has(diagram)) play(diagram, Math.min(index, 2) * 70);
        });
      },
      { threshold: 0.4 },
    );
    diagrams.forEach((diagram) => observer.observe(diagram));

    function stop(): void {
      stopped = true;
      observer.disconnect();
      diagrams.forEach(cancel);
    }

    function onKey(event: KeyboardEvent): void {
      if (!event.ctrlKey && !event.metaKey && !event.altKey) stop();
    }

    function onPointer(event: PointerEvent): void {
      if (!(event.target instanceof Element)) return;
      const control = event.target.closest('a, button, summary');
      if (!control) return;
      diagrams.forEach(cancel);
      if (control.matches('a[href*="#"]')) stop();
    }

    function focus(event: FocusEvent): void {
      if (!(event.target instanceof Element)) return;
      if (event.target.matches(':focus-visible')) {
        stop();
        return;
      }
      const diagram = event.target
        .closest('.project-card')
        ?.querySelector<HTMLElement>('.project-diagram');
      if (!diagram) return;
      seen.add(diagram);
      cancel(diagram);
    }

    function updateMotion(): void {
      if (preference.matches) {
        stop();
        return;
      }
      if (document.hidden) {
        diagrams.forEach(cancel);
        return;
      }
      visible.forEach((diagram) => {
        if (!seen.has(diagram)) play(diagram);
      });
    }
    document.addEventListener('keydown', onKey, true);
    document.addEventListener('pointerdown', onPointer, true);
    document.addEventListener('focusin', focus);
    window.addEventListener('hashchange', stop);
    window.addEventListener('beforeprint', stop);
    preference.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateMotion);
    return () => {
      stop();
      document.removeEventListener('keydown', onKey, true);
      document.removeEventListener('pointerdown', onPointer, true);
      document.removeEventListener('focusin', focus);
      window.removeEventListener('hashchange', stop);
      window.removeEventListener('beforeprint', stop);
      preference.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateMotion);
    };
  }, []);
  return grid;
}
