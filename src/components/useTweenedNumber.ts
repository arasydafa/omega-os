import { useEffect, useRef, useState } from 'react';

/** easeInOutCubic — matches the ot-ease-smooth token curve. */
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Tweens toward `target` over `duration` ms so chart domains rescale
 * smoothly instead of teleporting. Jumps instantly under
 * prefers-reduced-motion. Timer-based (not rAF) so tests stay deterministic.
 */
export function useTweenedNumber(target: number, duration = 700): number {
  const [value, setValue] = useState(target);
  const current = useRef(target);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduce = useRef(
    typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    if (reduce.current || duration <= 0 || current.current === target) {
      if (current.current !== target) {
        current.current = target;
        setValue(target);
      }
      return;
    }
    const from = current.current;
    const start = Date.now();
    const step = () => {
      const t = Math.min((Date.now() - start) / duration, 1);
      const v = from + (target - from) * easeInOutCubic(t);
      current.current = v;
      setValue(v);
      if (t < 1) timer.current = setTimeout(step, 16);
    };
    timer.current = setTimeout(step, 16);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [target, duration]);

  return value;
}
