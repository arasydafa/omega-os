import { useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { EmptyState } from './EmptyState.js';

export interface WordDatum {
  text: string;
  weight: number;
  /** CSS color. Defaults cycle through the Omega palette. */
  color?: string;
}

export interface WordCloudProps {
  words: WordDatum[];
  onSelect?: (text: string) => void;
  label?: string;
  className?: string;
}

const PALETTE = [
  'var(--ot-navy)',
  'var(--ot-maroon)',
  'var(--ot-info)',
  'var(--ot-warning)',
  'var(--ot-success)',
  'var(--ot-muted)',
];

const MIN_FONT = 12;
const MAX_FONT = 40;

/** Deterministic size scale — same input always yields the same cloud. */
export function wordFontSize(weight: number, min: number, max: number): number {
  if (max <= min) return (MIN_FONT + MAX_FONT) / 2;
  const t = (Math.sqrt(weight) - Math.sqrt(min)) / (Math.sqrt(max) - Math.sqrt(min));
  return MIN_FONT + t * (MAX_FONT - MIN_FONT);
}

/** Deterministic tilt in degrees, stable across renders. */
export function wordTilt(index: number): number {
  return (((index * 37) % 5) - 2) * 6;
}

export function WordCloud({ words, onSelect, label, className = '' }: WordCloudProps) {
  const valid = words.filter((w) => w.weight > 0);
  const [offsets, setOffsets] = useState<Record<string, { x: number; y: number }>>({});
  const [dragging, setDragging] = useState<string | null>(null);
  const dragRef = useRef<{ text: string; sx: number; sy: number; ox: number; oy: number } | null>(null);
  if (valid.length === 0) {
    return <EmptyState title="No data" description="Add words to render the cloud." className={className} />;
  }
  const weights = valid.map((w) => w.weight);
  const min = Math.min(...weights);
  const max = Math.max(...weights);
  const sorted = [...valid].sort((a, b) => b.weight - a.weight);

  const grab = (text: string) => ({
    onPointerDown: (e: ReactPointerEvent) => {
      const o = offsets[text] ?? { x: 0, y: 0 };
      dragRef.current = { text, sx: e.clientX ?? 0, sy: e.clientY ?? 0, ox: o.x, oy: o.y };
      setDragging(text);
      (e.target as Element).setPointerCapture?.(e.pointerId);
    },
  });
  const move = (e: ReactPointerEvent) => {
    const d = dragRef.current;
    if (!d) return;
    const x = d.ox + (e.clientX ?? 0) - d.sx;
    const y = d.oy + (e.clientY ?? 0) - d.sy;
    setOffsets((prev) => ({ ...prev, [d.text]: { x, y } }));
  };
  const drop = () => {
    dragRef.current = null;
    setDragging(null);
  };

  return (
    <div
      role="img"
      aria-label={label ?? `Word cloud with ${valid.length} words. Drag words to rearrange them.`}
      className={`flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2 p-4 font-sans ${className}`}
      onPointerMove={move}
      onPointerUp={drop}
      onPointerCancel={drop}
    >
      {sorted.map((w, i) => {
        const o = offsets[w.text] ?? { x: 0, y: 0 };
        const style = {
          fontSize: wordFontSize(w.weight, min, max),
          color: w.color ?? PALETTE[i % PALETTE.length],
          transform: `translate(${o.x}px, ${o.y}px) rotate(${wordTilt(i)}deg)`,
          animationDelay: `${Math.min(i * 30, 300)}ms`,
        };
        const interactive = `touch-none select-none ${dragging === w.text ? 'cursor-grabbing' : 'cursor-grab'}`;
        return onSelect ? (
          <button
            key={w.text}
            type="button"
            onClick={() => {
              if (o.x === 0 && o.y === 0) onSelect(w.text);
            }}
            title={`${w.text}: ${w.weight}`}
            style={style}
            className={`ot-chart-fade font-semibold leading-none transition-opacity hover:opacity-70 ${interactive}`}
            {...grab(w.text)}
          >
            {w.text}
          </button>
        ) : (
          <span
            key={w.text}
            title={`${w.text}: ${w.weight}`}
            style={style}
            className={`ot-chart-fade font-semibold leading-none ${interactive}`}
            {...grab(w.text)}
          >
            {w.text}
          </span>
        );
      })}
    </div>
  );
}
