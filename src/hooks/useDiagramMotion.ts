import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

export function useDiagramMotion(): RefObject<HTMLDivElement> {
  const grid = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = grid.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const hover = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!root || !('IntersectionObserver' in window)) return;
    const diagrams = root.querySelectorAll<HTMLElement>('.project-diagram');
    const seen = new WeakSet<HTMLElement>();
    const visible = new Set<HTMLElement>();
    const animations = new Map<HTMLElement, Set<Animation>>();

    function cancel(diagram: HTMLElement): void {
      animations.get(diagram)?.forEach((animation) => animation.cancel());
      animations.delete(diagram);
    }

    function play(diagram: HTMLElement, delay = 0): void {
      if (preference.matches || document.hidden || animations.has(diagram)) return;
      const active = new Set<Animation>();
      animations.set(diagram, active);
      seen.add(diagram);

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
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        });
        active.add(animation);
        animation.onfinish = () => {
          active.delete(animation);
          if (!active.size) animations.delete(diagram);
        };
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
            cancel(diagram);
            return;
          }
          visible.add(diagram);
          if (!seen.has(diagram)) play(diagram, Math.min(index, 2) * 70);
        });
      },
      { threshold: 0.4 },
    );
    diagrams.forEach((diagram) => observer.observe(diagram));

    function replay(event: PointerEvent): void {
      if (!hover.matches || event.pointerType === 'touch') return;
      if (!(event.target instanceof Element)) return;
      const card = event.target.closest('.project-card');
      if (!card) return;
      const previous = event.relatedTarget;
      if (previous instanceof Node && card.contains(previous)) return;
      const diagram = card.querySelector<HTMLElement>('.project-diagram');
      if (diagram && visible.has(diagram)) play(diagram);
    }

    function focus(event: FocusEvent): void {
      if (!(event.target instanceof Element)) return;
      const diagram = event.target
        .closest('.project-card')
        ?.querySelector<HTMLElement>('.project-diagram');
      if (!diagram) return;
      seen.add(diagram);
      cancel(diagram);
    }

    function updateMotion(): void {
      if (preference.matches || document.hidden) {
        diagrams.forEach(cancel);
        return;
      }
      visible.forEach((diagram) => {
        if (!seen.has(diagram)) play(diagram);
      });
    }
    root.addEventListener('pointerover', replay);
    root.addEventListener('focusin', focus);
    preference.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateMotion);
    return () => {
      observer.disconnect();
      diagrams.forEach(cancel);
      root.removeEventListener('pointerover', replay);
      root.removeEventListener('focusin', focus);
      preference.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateMotion);
    };
  }, []);
  return grid;
}
