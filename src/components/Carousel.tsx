import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CarouselProps {
  children: ReactNode[];
  /** Auto-advance interval in ms. Off by default; disabled under reduced motion. */
  autoplay?: number;
  label?: string;
  className?: string;
}

export function Carousel({ children, autoplay, label = 'Carousel', className = '' }: CarouselProps) {
  const slides = Array.isArray(children) ? children : [children];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;
  const go = (next: number) => setIndex(((next % count) + count) % count);
  const reduce = useRef(
    typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    if (!autoplay || paused || reduce.current || count < 2) return;
    const t = setTimeout(() => go(index + 1), autoplay);
    return () => clearTimeout(t);
  });

  if (count === 0) return null;

  return (
    <div
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={`font-sans ${className}`}
    >
      <div className="overflow-hidden rounded-ot-lg border border-ot-border">
        <div
          className="flex ot-transition-slow"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              className="w-full shrink-0"
            >
              {slide}
            </div>
          ))}
        </div>
      </div>
      {count > 1 ? (
        <div className="mt-3 flex items-center justify-center gap-2">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => go(index - 1)}
            className="grid h-8 w-8 place-items-center rounded-ot-sm text-ot-muted transition-colors hover:bg-ot-surface hover:text-ot-text"
          >
            <ChevronLeft size={16} aria-hidden />
          </button>
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index || undefined}
              onClick={() => go(i)}
              className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-navy' : 'w-2 bg-ot-border hover:bg-ot-muted'}`}
            />
          ))}
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => go(index + 1)}
            className="grid h-8 w-8 place-items-center rounded-ot-sm text-ot-muted transition-colors hover:bg-ot-surface hover:text-ot-text"
          >
            <ChevronRight size={16} aria-hidden />
          </button>
        </div>
      ) : null}
    </div>
  );
}
