import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

const arrivalSelector =
  '.hero-copy > *, .workbench, .page-header > h1, .page-header > p, .case-header > h1, .case-summary, .case-facts';
const revealSelector =
  '.hero-strengths > div, .section-heading, .featured-work .project-card, .skill-group, .ai-intro, .ai-steps > li, .timeline-entry, .page-callout, .public-work, .about-story > section, .about-related, .contact-primary, .contact-audiences > section, .contact-elsewhere, .case-body > section, .related-work';

function milliseconds(value: string): number {
  const time = value.trim();
  return parseFloat(time) * (time.endsWith('ms') ? 1 : 1000);
}

export function usePageMotion<T extends HTMLElement>(routeKey = ''): RefObject<T> {
  const scope = useRef<T>(null);

  useEffect(() => {
    const root = scope.current;
    if (!root || !('IntersectionObserver' in window) || !('animate' in Element.prototype))
      return;
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches || window.location.hash) return;
    if (document.activeElement?.matches(':focus-visible')) return;

    const styles = getComputedStyle(document.documentElement);
    const easing = styles.getPropertyValue('--ease-out').trim();
    const duration = milliseconds(styles.getPropertyValue('--motion-enter-duration'));
    const stagger = milliseconds(styles.getPropertyValue('--motion-stagger'));
    const distance = parseFloat(styles.getPropertyValue('--motion-distance'));
    if (!easing || ![duration, stagger, distance].every(Number.isFinite)) return;

    const arrivals = Array.from(root.querySelectorAll<HTMLElement>(arrivalSelector));
    const reveals = Array.from(root.querySelectorAll<HTMLElement>(revealSelector));
    const seen = new WeakSet<HTMLElement>();
    const active = new Map<HTMLElement, Animation>();
    const introWasPlaying = document.documentElement.dataset.intro === 'playing';
    let stopped = false;

    function settle(): void {
      // No persistent hidden styles: cancelling restores the fully visible HTML.
      active.forEach((animation) => animation.cancel());
      active.clear();
    }

    function reveal(element: HTMLElement, delay: number, opacity = 1): void {
      seen.add(element);
      // Observe once: the entrance transform must not change its own scroll trigger.
      observer.unobserve(element);
      if (stopped || reducedMotion.matches || document.hidden) return;
      try {
        const animation = element.animate(
          [
            { opacity, transform: 'translateY(' + distance + 'px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          { duration, delay, easing, fill: 'backwards' },
        );
        animation.id = 'portfolio-reveal';
        active.set(element, animation);
        animation.onfinish = () => {
          active.delete(element);
          animation.cancel();
        };
        animation.oncancel = () => active.delete(element);
      } catch {
        // Unsupported animation options must never hide readable content.
        active.delete(element);
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let index = 0;
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (!entry.isIntersecting || seen.has(element)) return;
          // Fast scrolling and restored positions can put content on screen before
          // this callback. Leave that content in place instead of restarting it.
          if (element.getBoundingClientRect().top < innerHeight) {
            seen.add(element);
            observer.unobserve(element);
            return;
          }
          reveal(element, Math.min(index++, 2) * stagger);
        });
      },
      { rootMargin: '0px 0px 96px 0px', threshold: 0 },
    );

    function begin(): void {
      if (stopped) return;
      let index = 0;
      arrivals.forEach((element) => {
        const bounds = element.getBoundingClientRect();
        if (bounds.top < innerHeight && bounds.bottom > 0) {
          // Keep the primary heading visible for the first contentful render.
          const opacity = introWasPlaying && !element.matches('h1') ? 0 : 1;
          reveal(element, Math.min(index++, 3) * stagger, opacity);
        } else {
          observer.observe(element);
        }
      });
      reveals.forEach((element) => observer.observe(element));
    }

    function stop(): void {
      stopped = true;
      observer.disconnect();
      introObserver.disconnect();
      settle();
    }

    const introObserver = new MutationObserver(() => {
      if (document.documentElement.dataset.intro !== 'playing') {
        introObserver.disconnect();
        begin();
      }
    });

    function onKey(event: KeyboardEvent): void {
      if (
        [
          'Tab',
          'Enter',
          ' ',
          'Escape',
          'ArrowUp',
          'ArrowDown',
          'ArrowLeft',
          'ArrowRight',
          'Home',
          'End',
          'PageUp',
          'PageDown',
        ].includes(event.key)
      )
        stop();
    }
    function onPointer(event: PointerEvent): void {
      if (!(event.target instanceof Element)) return;
      const control = event.target.closest('a, button, summary');
      if (!control) return;
      settle();
      if (control.matches('a[href*="#"]')) stop();
    }
    function onFocus(event: FocusEvent): void {
      if (!(event.target instanceof Element)) return;
      if (event.target.matches(':focus-visible')) stop();
      else if (root?.contains(event.target)) settle();
    }
    function onVisibility(): void {
      if (document.hidden) settle();
    }
    function onPreference(): void {
      if (reducedMotion.matches) stop();
    }

    document.addEventListener('keydown', onKey, true);
    document.addEventListener('pointerdown', onPointer, true);
    document.addEventListener('focusin', onFocus);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('hashchange', stop);
    window.addEventListener('beforeprint', stop);
    reducedMotion.addEventListener('change', onPreference);
    if (introWasPlaying)
      introObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-intro'],
      });
    else begin();

    return () => {
      stop();
      document.removeEventListener('keydown', onKey, true);
      document.removeEventListener('pointerdown', onPointer, true);
      document.removeEventListener('focusin', onFocus);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('hashchange', stop);
      window.removeEventListener('beforeprint', stop);
      reducedMotion.removeEventListener('change', onPreference);
    };
  }, [routeKey]);

  return scope;
}
