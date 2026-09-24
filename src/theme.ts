/**
 * Circular Reveal Effect for theme toggling.
 *
 * Expands a circle from the clicked point (Theme Toggle Ripple origin)
 * that wipes the page from the old theme to the new one. Declarative:
 * this function only sets `--ot-reveal-x` / `--ot-reveal-y` and starts a
 * same-document view transition — the wipe itself is the
 * `::view-transition-new(root)` animation in tokens.css. No WAAPI timing
 * race, so behavior is identical in dev and production builds. Duration
 * and easing come from `--ot-duration-reveal` / `--ot-ease-smooth`
 * (0ms under prefers-reduced-motion, i.e. instant).
 *
 * `REVEAL_DURATION_FALLBACK`, `REVEAL_EASING_FALLBACK`, and
 * `readRevealTokens` stay exported for consumers driving custom
 * animations; the built-in wipe reads the tokens directly in CSS.
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

interface VTDocument {
  startViewTransition?: (cb: () => void) => unknown;
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
  const root = document.documentElement;
  root.style.setProperty('--ot-reveal-x', `${x}px`);
  root.style.setProperty('--ot-reveal-y', `${y}px`);
  const doc = document as unknown as VTDocument;
  try {
    if (doc.startViewTransition) {
      doc.startViewTransition(applyOnce);
      return;
    }
  } catch {
    // Fall through to the instant toggle below.
  }
  applyOnce();
}
