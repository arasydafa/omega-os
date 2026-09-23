import { afterEach, describe, expect, it, vi } from 'vitest';
import { toggleThemeReveal } from './theme.js';

describe('toggleThemeReveal', () => {
  afterEach(() => {
    document.documentElement.classList.remove('test-dark-xyz');
    delete (document as unknown as Record<string, unknown>).startViewTransition;
    vi.restoreAllMocks();
  });

  it('toggles exactly once without the transition API', () => {
    const apply = vi.fn(() => document.documentElement.classList.toggle('test-dark-xyz', true));
    toggleThemeReveal(10, 20, apply);
    expect(apply).toHaveBeenCalledTimes(1);
    expect(document.documentElement.classList.contains('test-dark-xyz')).toBe(true);
  });

  it('runs the circular wipe from the click point when supported', async () => {
    const animate = vi.fn(() => ({}));
    const el = document.documentElement as unknown as Record<string, unknown>;
    const prevAnimate = el.animate;
    el.animate = animate;
    try {
      const startViewTransition = vi.fn((cb: () => void) => {
        cb();
        return { ready: Promise.resolve() };
      });
      (document as unknown as Record<string, unknown>).startViewTransition = startViewTransition;
      const apply = vi.fn();
      toggleThemeReveal(10, 20, apply);
      await Promise.resolve();
      expect(startViewTransition).toHaveBeenCalledTimes(1);
      expect(apply).toHaveBeenCalledTimes(1);
      expect(animate).toHaveBeenCalledTimes(1);
      const [frames, opts] = animate.mock.calls[0] as unknown as [
        { clipPath: string[] },
        { pseudoElement: string },
      ];
      expect(frames.clipPath[0]).toBe('circle(0px at 10px 20px)');
      expect(frames.clipPath[1]).toMatch(/^circle\(\d+(\.\d+)?px at 10px 20px\)$/);
      expect(opts.pseudoElement).toBe('::view-transition-new(root)');
    } finally {
      if (prevAnimate === undefined) delete el.animate;
      else el.animate = prevAnimate;
    }
  });

  it('still applies exactly once when the API throws mid-flight', () => {
    (document as unknown as Record<string, unknown>).startViewTransition = (cb: () => void) => {
      cb();
      throw new Error('transition crashed');
    };
    const apply = vi.fn();
    toggleThemeReveal(10, 20, apply);
    expect(apply).toHaveBeenCalledTimes(1);
  });
});
