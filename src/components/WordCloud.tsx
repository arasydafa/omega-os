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
  if (valid.length === 0) {
    return <EmptyState title="No data" description="Add words to render the cloud." className={className} />;
  }
  const weights = valid.map((w) => w.weight);
  const min = Math.min(...weights);
  const max = Math.max(...weights);
  const sorted = [...valid].sort((a, b) => b.weight - a.weight);

  return (
    <div
      role="img"
      aria-label={label ?? `Word cloud with ${valid.length} words`}
      className={`flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2 p-4 font-sans ${className}`}
    >
      {sorted.map((w, i) => {
        const style = {
          fontSize: wordFontSize(w.weight, min, max),
          color: w.color ?? PALETTE[i % PALETTE.length],
          transform: `rotate(${wordTilt(i)}deg)`,
          animationDelay: `${Math.min(i * 30, 300)}ms`,
        };
        return onSelect ? (
          <button
            key={w.text}
            type="button"
            onClick={() => onSelect(w.text)}
            title={`${w.text}: ${w.weight}`}
            style={style}
            className="ot-anim-fade-in font-semibold leading-none transition-opacity hover:opacity-70"
          >
            {w.text}
          </button>
        ) : (
          <span
            key={w.text}
            title={`${w.text}: ${w.weight}`}
            style={style}
            className="ot-anim-fade-in font-semibold leading-none"
          >
            {w.text}
          </span>
        );
      })}
    </div>
  );
}
