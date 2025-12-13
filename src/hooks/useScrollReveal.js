import { useEffect, useRef } from 'react';

/**
 * useScrollReveal
 * Adds a `reveal` class to elements when they enter the viewport
 * Supports options: rootMargin, threshold, once
 */
export default function useScrollReveal({ root = null, rootMargin = '0px', threshold = 0.15, once = true } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const t = entry.target;

            // Apply base reveal class, then `is-visible` when visible
            t.classList.add('reveal');

            // Allow per-element animation selection: data-reveal-animation="fade-in-up" or data-reveal-animation="slide-left" etc.
            const anim = t.dataset.revealAnimation || t.dataset.reveal || null;
            if (anim) {
              // map friendly names to classes used in animations.css
              const map = {
                'fade-in-up': 'animate-fade-in-up',
                'fade-in-down': 'animate-fade-in-down',
                'fade-in-left': 'animate-fade-in-left',
                'fade-in-right': 'animate-fade-in-right',
                'slide-up': 'animate-slide-up',
                'slide-down': 'animate-slide-down',
                'slide-left': 'animate-slide-left',
                'slide-right': 'animate-slide-right',
                'scale-in': 'animate-scale-in'
              };
              const cls = map[anim] || anim;
              if (cls) t.classList.add(cls);
            }

            // Respect custom delay if provided
            if (t.dataset.revealDelay) {
              t.style.transitionDelay = t.dataset.revealDelay;
              t.style.animationDelay = t.dataset.revealDelay;
            }

            // Respect custom duration if provided
            if (t.dataset.revealDuration) {
              t.style.transitionDuration = t.dataset.revealDuration;
              t.style.animationDuration = t.dataset.revealDuration;
            }

            // Mark visible
            requestAnimationFrame(() => t.classList.add('is-visible'));

            if (once) observer.unobserve(t);
          }
        });
      },
      { root, rootMargin, threshold }
    );

    // Observe the element and any children with [data-reveal]
    if (el.hasAttribute('data-reveal')) {
      observer.observe(el);
    } else {
      const targets = el.querySelectorAll('[data-reveal]');
      targets.forEach((t) => observer.observe(t));
    }

    return () => {
      observer.disconnect();
    };
  }, [root, rootMargin, threshold, once]);

  return ref;
}
