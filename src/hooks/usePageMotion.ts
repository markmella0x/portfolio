import { useRef } from 'react';
import type { RefObject } from 'react';
import { useClientLayoutEffect } from './useClientLayoutEffect';

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

  useClientLayoutEffect(() => {
    const root = scope.current;
    if (!root || !('IntersectionObserver' in window) || !('animate' in Element.prototype))
      return;
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches || window.location.hash) return;
    const inputMethod = document.documentElement.dataset.inputMethod;
    if (
      inputMethod === 'keyboard' ||
      (inputMethod !== 'pointer' && document.activeElement?.matches(':focus-visible'))
    )
      return;

    const styles = getComputedStyle(document.documentElement);
    const easing = styles.getPropertyValue('--ease-out').trim();
    const duration = milliseconds(styles.getPropertyValue('--motion-enter-duration'));
    const stagger = milliseconds(styles.getPropertyValue('--motion-stagger'));
    const distance = parseFloat(styles.getPropertyValue('--motion-distance'));
    if (!easing || ![duration, stagger, distance].every(Number.isFinite)) return;

    // One document-ordered list gives visible sections the same entrance sequence
    // as page headings; lower sections wait for their first viewport entry.
    const targets = Array.from(
      root.querySelectorAll<HTMLElement>(arrivalSelector + ', ' + revealSelector),
    ).filter((element) => !element.matches('h1'));
    const seen = new WeakSet<HTMLElement>();
    const active = new Map<HTMLElement, Animation>();
    const prepared = new Map<HTMLElement, { transform: string; opacity: string }>();
    const introWasPlaying = document.documentElement.dataset.intro === 'playing';
    const fadeOnArrival = introWasPlaying || inputMethod === 'pointer';
    const initialWidth = innerWidth;
    let releaseFrame: number | undefined;
    let pointerActive = false;
    let stopped = false;

    function entrance(element: HTMLElement): string {
      const surface = element.matches(
        '.project-card, .workbench, .about-related, .contact-primary, .contact-audiences > section, .page-callout, .public-work, .related-work',
      );
      // Reading text moves less; surfaces gain a little depth as they arrive.
      return surface
        ? 'translateY(' + distance + 'px) scale(0.97)'
        : 'translateY(' + distance / 2 + 'px)';
    }

    function restore(element: HTMLElement): void {
      const original = prepared.get(element);
      if (!original) return;
      const { transform, opacity } = original;
      if (transform) element.style.transform = transform;
      else element.style.removeProperty('transform');
      if (opacity) element.style.opacity = opacity;
      else element.style.removeProperty('opacity');
      prepared.delete(element);
    }

    function settle(): void {
      pointerActive = false;
      if (releaseFrame !== undefined) {
        cancelAnimationFrame(releaseFrame);
        releaseFrame = undefined;
      }
      // No persistent hidden styles: cancelling restores the fully visible HTML.
      active.forEach((animation, element) => {
        restore(element);
        animation.cancel();
      });
      active.clear();
    }

    function pauseForPointer(): void {
      // Preserve the hit target until the browser has dispatched its click.
      active.forEach((animation) => animation.pause());
    }

    function reveal(element: HTMLElement, delay: number, opacity = 0): void {
      seen.add(element);
      // Observe once: the entrance transform must not change its own scroll trigger.
      observer.unobserve(element);
      if (stopped || reducedMotion.matches || document.hidden) {
        restore(element);
        return;
      }
      try {
        const animation = element.animate(
          [
            { opacity, transform: entrance(element) },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          // Keep the final frame until prepared styles are restored; otherwise
          // the offscreen opacity could flash back for a frame at completion.
          { duration, delay, easing, fill: 'both' },
        );
        animation.id = 'portfolio-reveal';
        active.set(element, animation);
        animation.onfinish = () => {
          restore(element);
          active.delete(element);
          animation.cancel();
        };
        animation.oncancel = () => {
          restore(element);
          active.delete(element);
        };
      } catch {
        // Unsupported animation options must never hide readable content.
        active.delete(element);
        restore(element);
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let index = 0;
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (!entry.isIntersecting || seen.has(element)) return;
          // Only fade content prepared while offscreen, never hide text the
          // visitor has already seen. Fast scrolling keeps that same start state.
          if (!prepared.has(element)) {
            seen.add(element);
            observer.unobserve(element);
            restore(element);
            return;
          }
          reveal(element, Math.min(index++, 2) * stagger);
        });
      },
      { threshold: 0, rootMargin: '0px 0px -32px 0px' },
    );

    function observe(element: HTMLElement): void {
      if (prepared.has(element)) return;
      if (element.getBoundingClientRect().top >= innerHeight) {
        // Set the entire start state before entry so the fade cannot flash from
        // visible to hidden when the observer fires.
        prepared.set(element, {
          transform: element.style.transform,
          opacity: element.style.opacity,
        });
        element.style.transform = entrance(element);
        element.style.opacity = '0';
      }
      observer.observe(element);
    }

    function begin(): void {
      if (stopped) return;
      let index = 0;
      targets.forEach((element) => {
        const bounds = element.getBoundingClientRect();
        if (bounds.top < innerHeight && bounds.bottom > 0) {
          // Direct visits preserve already visible prerendered text. Pointer
          // navigation prepares its fade before the destination's first paint.
          const opacity = fadeOnArrival ? 0 : 1;
          const delay = element.matches('.workbench')
            ? 2 * stagger
            : Math.min(index++, 2) * stagger;
          reveal(element, delay, opacity);
        } else {
          observe(element);
        }
      });
    }

    function stop(): void {
      stopped = true;
      observer.disconnect();
      introObserver.disconnect();
      settle();
      prepared.forEach((_, element) => restore(element));
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
      pointerActive = true;
      pauseForPointer();
    }
    function onActivate(event: MouseEvent): void {
      if (!(event.target instanceof Element)) return;
      const control = event.target.closest('a, button, summary');
      if (!control) return;
      if (control.matches('a[href*="#"]')) stop();
      else settle();
    }
    function onPointerUp(): void {
      if (!pointerActive) return;
      // Also release a press dragged off its control, after native click handling.
      releaseFrame = requestAnimationFrame(() => {
        releaseFrame = undefined;
        settle();
      });
    }
    function onFocus(event: FocusEvent): void {
      if (!(event.target instanceof Element)) return;
      if (
        event.target.matches(':focus-visible') &&
        document.documentElement.dataset.inputMethod !== 'pointer'
      )
        stop();
      else if (root?.contains(event.target)) {
        if (pointerActive) pauseForPointer();
        else settle();
      }
    }
    function onVisibility(): void {
      if (document.hidden) settle();
    }
    function onPreference(): void {
      if (reducedMotion.matches) stop();
    }
    function onResize(): void {
      // Mobile browser chrome changes viewport height during ordinary scrolling.
      if (innerWidth !== initialWidth) stop();
    }

    document.addEventListener('keydown', onKey, true);
    document.addEventListener('pointerdown', onPointer, true);
    document.addEventListener('pointerup', onPointerUp, true);
    document.addEventListener('pointercancel', settle, true);
    document.addEventListener('dragend', settle, true);
    document.addEventListener('click', onActivate, true);
    document.addEventListener('focusin', onFocus);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('hashchange', stop);
    window.addEventListener('beforeprint', stop);
    window.addEventListener('resize', onResize, { passive: true });
    reducedMotion.addEventListener('change', onPreference);
    if (introWasPlaying)
      introObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-intro'],
      });
    // RouteEffects runs earlier in the layout-effect order, so the new page's
    // scroll and focus are settled before this preparation and the first paint.
    else begin();

    return () => {
      stop();
      document.removeEventListener('keydown', onKey, true);
      document.removeEventListener('pointerdown', onPointer, true);
      document.removeEventListener('pointerup', onPointerUp, true);
      document.removeEventListener('pointercancel', settle, true);
      document.removeEventListener('dragend', settle, true);
      document.removeEventListener('click', onActivate, true);
      document.removeEventListener('focusin', onFocus);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('hashchange', stop);
      window.removeEventListener('beforeprint', stop);
      window.removeEventListener('resize', onResize);
      reducedMotion.removeEventListener('change', onPreference);
    };
  }, [routeKey]);

  return scope;
}
