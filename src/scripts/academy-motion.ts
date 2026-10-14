// Keep the first screen static. Load Motion only when a lower section is reached
// or an accordion is opened; failed downloads leave all content usable.
const page = document.querySelector<HTMLElement>('.course-page');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const connection = (
  navigator as Navigator & {
    connection?: Partial<EventTarget> & {
      saveData?: boolean;
      effectiveType?: string;
    };
  }
).connection;

const motionAllowed = () =>
  !reducedMotion.matches &&
  !connection?.saveData &&
  !['slow-2g', '2g'].includes(connection?.effectiveType ?? '');

if (
  page &&
  motionAllowed() &&
  'IntersectionObserver' in window &&
  'animate' in Element.prototype
) {
  type Animate = typeof import('motion/mini').animate;
  let motion: Promise<Animate> | undefined;
  let stopped = false;
  const canAnimate = () => !stopped && motionAllowed();
  const active = new Map<HTMLElement, () => void>();
  const requests = new WeakMap<HTMLElement, number>();
  const invalidate = (element: HTMLElement) => {
    const generation = (requests.get(element) ?? 0) + 1;
    requests.set(element, generation);
    return generation;
  };
  const loadMotion = () =>
    (motion ??= import('motion/mini').then(({ animate }) => animate));

  async function reveal(
    element: HTMLElement,
    distance: number,
    details?: HTMLDetailsElement,
  ) {
    const generation = invalidate(element);
    if (
      !canAnimate() ||
      (details && !details.open) ||
      element.contains(document.activeElement)
    )
      return;
    try {
      const animate = await loadMotion();
      const rect = element.getBoundingClientRect();
      if (
        !canAnimate() ||
        requests.get(element) !== generation ||
        (details && !details.open) ||
        !element.isConnected ||
        rect.height <= 0 ||
        rect.bottom <= 0 ||
        rect.top >= window.innerHeight ||
        element.contains(document.activeElement)
      ) {
        return;
      }

      active.get(element)?.();
      const originalTransform = element.style.transform;
      const originalOpacity = element.style.opacity;
      const restore = () => {
        element.style.transform = originalTransform;
        element.style.opacity = originalOpacity;
        active.delete(element);
      };
      const animation = animate(
        element,
        {
          transform: [`translateY(${distance}px)`, 'translateY(0px)'],
          opacity: [0.85, 1],
        },
        { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
      );
      const cancel = () => {
        animation.cancel();
        restore();
      };
      active.set(element, cancel);
      void animation.then(() => {
        if (active.get(element) === cancel) restore();
      });
    } catch {
      // Motion is optional: never hide content or block navigation on failure.
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        void reveal(entry.target as HTMLElement, 10);
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -24px 0px' },
  );

  page.querySelectorAll<HTMLElement>('[data-course-reveal]').forEach((node) => {
    // Restored scroll positions and initial content should never jump on load.
    if (node.getBoundingClientRect().top >= window.innerHeight) {
      observer.observe(node);
    }
  });

  page
    .querySelectorAll<HTMLDetailsElement>(
      '.course-outcomes details, .course-faq-list details',
    )
    .forEach((details) => {
      details.addEventListener('toggle', () => {
        for (const child of details.children) {
          if (child instanceof HTMLElement && child.tagName !== 'SUMMARY') {
            if (details.open && canAnimate()) void reveal(child, 4, details);
            else {
              invalidate(child);
              active.get(child)?.();
            }
          }
        }
      });
    });

  const stop = () => {
    stopped = true;
    observer.disconnect();
    for (const cancel of [...active.values()]) cancel();
  };
  const preferenceChanged = () => {
    if (!motionAllowed()) stop();
  };
  reducedMotion.addEventListener('change', preferenceChanged);
  connection?.addEventListener?.('change', preferenceChanged);
  window.addEventListener(
    'pagehide',
    () => {
      stop();
      reducedMotion.removeEventListener('change', preferenceChanged);
      connection?.removeEventListener?.('change', preferenceChanged);
    },
    { once: true },
  );
}
