/**
 * Circular Reveal Effect for theme toggling.
 *
 * Expands a circle from the clicked point (Theme Toggle Ripple origin)
 * that wipes the page from the old theme to the new one. Driven by the
 * View Transitions API with an instant-toggled fallback, so behavior is
 * identical everywhere the package is used. Duration and easing come
 * from `--ot-duration-reveal` / `--ot-ease-smooth` with safe fallbacks.
 */

export const REVEAL_DURATION_FALLBACK = 650;
export const REVEAL_EASING_FALLBACK = 'cubic-bezier(0.65, 0, 0.35, 1)';

export interface RevealTokens {
  duration: number;
  easing: string;
}

export function readRevealTokens(root: HTMLElement = document.documentElement): RevealTokens {
  const cs = getComputedStyle(root);
  const rawMs = parseFloat(cs.getPropertyValue('--ot-duration-reveal'));
  const easing = cs.getPropertyValue('--ot-ease-smooth').trim();
  return {
    duration: Number.isFinite(rawMs) && rawMs > 0 ? rawMs : REVEAL_DURATION_FALLBACK,
    easing: easing || REVEAL_EASING_FALLBACK,
  };
}

interface ViewTransitionLike {
  ready: Promise<void>;
}

interface VTDocument {
  startViewTransition?: (cb: () => void) => ViewTransitionLike;
}

/**
 * Toggles the theme with a circular reveal starting at (x, y).
 * `apply` flips the theme (e.g. toggles `.dark`) and runs exactly once,
 * even if the transition API is missing or throws mid-flight.
 */
export function toggleThemeReveal(x: number, y: number, apply: () => void): void {
  let applied = false;
  const applyOnce = () => {
    if (applied) return;
    applied = true;
    apply();
  };
  const doc = document as unknown as VTDocument;
  try {
    if (doc.startViewTransition) {
      const t = doc.startViewTransition(applyOnce);
      t.ready.then(() => {
        const { duration, easing } = readRevealTokens();
        const r = Math.hypot(window.innerWidth, window.innerHeight);
        document.documentElement.animate(
          {
            clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`],
          },
          {
            duration,
            easing,
            pseudoElement: '::view-transition-new(root)',
          },
        );
      }).catch(applyOnce);
      return;
    }
  } catch {
    // Fall through to the instant toggle below.
  }
  applyOnce();
}
