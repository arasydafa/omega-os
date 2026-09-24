import { afterEach, describe, expect, it, vi } from 'vitest';
import { toggleThemeReveal } from './theme.js';

describe('toggleThemeReveal', () => {
  afterEach(() => {
    document.documentElement.classList.remove('test-dark-xyz');
    document.documentElement.style.removeProperty('--ot-reveal-x');
    document.documentElement.style.removeProperty('--ot-reveal-y');
    delete (document as unknown as Record<string, unknown>).startViewTransition;
    vi.restoreAllMocks();
  });

  it('toggles exactly once without the transition API', () => {
    const apply = vi.fn(() => document.documentElement.classList.toggle('test-dark-xyz', true));
    toggleThemeReveal(10, 20, apply);
    expect(apply).toHaveBeenCalledTimes(1);
    expect(document.documentElement.classList.contains('test-dark-xyz')).toBe(true);
  });

  it('publishes the click point as CSS vars for the declarative wipe', () => {
    const startViewTransition = vi.fn((cb: () => void) => {
      cb();
      return {};
    });
    (document as unknown as Record<string, unknown>).startViewTransition = startViewTransition;
    const apply = vi.fn();
    toggleThemeReveal(10, 20, apply);
    expect(startViewTransition).toHaveBeenCalledTimes(1);
    expect(apply).toHaveBeenCalledTimes(1);
    expect(document.documentElement.style.getPropertyValue('--ot-reveal-x')).toBe('10px');
    expect(document.documentElement.style.getPropertyValue('--ot-reveal-y')).toBe('20px');
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
