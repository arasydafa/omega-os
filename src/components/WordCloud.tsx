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

export interface Box {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

/**
 * Pushes overlapping boxes away along the smallest-penetration axis.
 * Pure function — the component feeds it live rects on every pointer move.
 */
export function repelOverlaps(
  moving: Box,
  others: { text: string; box: Box }[],
  gap = 10,
): Record<string, { x: number; y: number }> {
  const out: Record<string, { x: number; y: number }> = {};
  for (const o of others) {
    const ox = Math.min(moving.right, o.box.right) - Math.max(moving.left, o.box.left);
    const oy = Math.min(moving.bottom, o.box.bottom) - Math.max(moving.top, o.box.top);
    if (ox > 0 && oy > 0) {
      if (ox < oy) {
        const dir = (moving.left + moving.right) / 2 < (o.box.left + o.box.right) / 2 ? 1 : -1;
        out[o.text] = { x: dir * (ox + gap), y: 0 };
      } else {
        const dir = (moving.top + moving.bottom) / 2 < (o.box.top + o.box.bottom) / 2 ? 1 : -1;
        out[o.text] = { x: 0, y: dir * (oy + gap) };
      }
    }
  }
  return out;
}

export function WordCloud({ words, onSelect, label, className = '' }: WordCloudProps) {
  const valid = words.filter((w) => w.weight > 0);
  const [offsets, setOffsets] = useState<Record<string, { x: number; y: number }>>({});
  const [push, setPush] = useState<Record<string, { x: number; y: number }>>({});
  const [dragging, setDragging] = useState<string | null>(null);
  const dragRef = useRef<{ text: string; sx: number; sy: number; ox: number; oy: number } | null>(null);
  const wordRefs = useRef(new Map<string, HTMLElement>());
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
    const el = wordRefs.current.get(d.text);
    const rect = el?.getBoundingClientRect();
    if (!rect) return;
    const others: { text: string; box: Box }[] = [];
    wordRefs.current.forEach((other, text) => {
      if (text === d.text) return;
      const o = other.getBoundingClientRect();
      others.push({ text, box: { left: o.left, top: o.top, right: o.right, bottom: o.bottom } });
    });
    setPush(repelOverlaps({ left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom }, others));
  };
  const drop = () => {
    const d = dragRef.current;
    dragRef.current = null;
    setDragging(null);
    setPush({});
    if (!d) return;
    // No overlapping text: snap back when dropped onto another word.
    const el = wordRefs.current.get(d.text);
    const rect = el?.getBoundingClientRect();
    if (!rect) return;
    let hit = false;
    wordRefs.current.forEach((other, text) => {
      if (text === d.text || hit) return;
      const o = other.getBoundingClientRect();
      if (rect.left < o.right && rect.right > o.left && rect.top < o.bottom && rect.bottom > o.top) {
        hit = true;
      }
    });
    if (hit) setOffsets((prev) => ({ ...prev, [d.text]: { x: 0, y: 0 } }));
  };
  const remember = (text: string) => (el: HTMLElement | null) => {
    if (el) wordRefs.current.set(text, el);
    else wordRefs.current.delete(text);
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
        const pushed = push[w.text] ?? { x: 0, y: 0 };
        const tx = o.x + pushed.x;
        const ty = o.y + pushed.y;
        const style = {
          fontSize: wordFontSize(w.weight, min, max),
          color: w.color ?? PALETTE[i % PALETTE.length],
          transform: `translate(${tx}px, ${ty}px) rotate(${wordTilt(i)}deg)`,
          animationDelay: `${Math.min(i * 30, 300)}ms`,
        };
        const interactive = `touch-none select-none ${dragging === w.text ? 'cursor-grabbing' : 'cursor-grab'}`;
        // Snap-back and push release glide with a spring overshoot.
        const glide =
          dragging === w.text
            ? ''
            : 'transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]';
        return onSelect ? (
          <button
            key={w.text}
            type="button"
            onClick={() => {
              if (o.x === 0 && o.y === 0) onSelect(w.text);
            }}
            title={`${w.text}: ${w.weight}`}
            style={style}
            ref={remember(w.text)}
            className={`ot-chart-fade font-semibold leading-none transition-opacity hover:opacity-70 ${interactive} ${glide}`}
            {...grab(w.text)}
          >
            {w.text}
          </button>
        ) : (
          <span
            key={w.text}
            title={`${w.text}: ${w.weight}`}
            style={style}
            ref={remember(w.text)}
            className={`ot-chart-fade font-semibold leading-none ${interactive} ${glide}`}
            {...grab(w.text)}
          >
            {w.text}
          </span>
        );
      })}
    </div>
  );
}
