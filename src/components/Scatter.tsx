import { useState } from 'react';
import { EmptyState } from './EmptyState.js';

export interface ScatterPoint {
  x: number;
  y: number;
  label?: string;
  /** CSS color. Defaults to navy (single) or palette cycle (series). */
  color?: string;
}

export interface ScatterSeries {
  id: string;
  label: string;
  color?: string;
  points: ScatterPoint[];
}

export interface ScatterProps {
  /** Legacy single series. Prefer `series`. */
  points?: ScatterPoint[];
  series?: ScatterSeries[];
  width?: number;
  height?: number;
  label?: string;
  className?: string;
}

const PAD = 28;

const PALETTE = [
  'var(--ot-navy)',
  'var(--ot-maroon)',
  'var(--ot-info)',
  'var(--ot-warning)',
  'var(--ot-success)',
];

interface Placed {
  cx: number;
  cy: number;
  color: string;
  text: string;
  seriesId: string;
}

export function Scatter({ points, series, width = 320, height = 220, label, className = '' }: ScatterProps) {
  const all: ScatterSeries[] = series ?? (points ? [{ id: 'scatter', label: 'Points', points }] : []);
  const [hidden, setHidden] = useState<string[]>([]);
  const [hover, setHover] = useState<Placed | null>(null);
  const visible = all.filter((s) => !hidden.includes(s.id) && s.points.length > 0);
  const multi = all.length > 1;

  if (all.length === 0) {
    return <EmptyState title="No data" description="Add points to render the chart." className={className} />;
  }

  const toggle = (id: string) =>
    setHidden((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const flat = visible.flatMap((s) => s.points.map((p) => ({ ...p })));
  const xs = flat.map((p) => p.x);
  const ys = flat.map((p) => p.y);
  const minX = xs.length ? Math.min(...xs) : 0;
  const maxX = xs.length ? Math.max(...xs) : 1;
  const minY = ys.length ? Math.min(...ys) : 0;
  const maxY = ys.length ? Math.max(...ys) : 1;
  const spanX = maxX - minX || 1;
  const spanY = maxY - minY || 1;
  const innerW = width - PAD * 2;
  const innerH = height - PAD * 2;

  return (
    <figure className={`font-sans ${className}`}>
      <div className="relative">
        <svg
          width="100%"
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={label ?? `Scatter plot with ${flat.length} points`}
          className="block"
        >
          {[0, 0.25, 0.5, 0.75, 1].map((f) => (
            <g key={f}>
              <line
                x1={PAD}
                x2={width - PAD}
                y1={PAD + innerH * f}
                y2={PAD + innerH * f}
                strokeDasharray="3 4"
                className="stroke-ot-border"
              />
              <line
                x1={PAD + innerW * f}
                x2={PAD + innerW * f}
                y1={PAD}
                y2={height - PAD}
                strokeDasharray="3 4"
                className="stroke-ot-border"
              />
            </g>
          ))}
          <text x={PAD} y={height - 8} fontSize={10} className="fill-ot-muted">
            {minX}
          </text>
          <text x={width - PAD} y={height - 8} fontSize={10} textAnchor="end" className="fill-ot-muted">
            {maxX}
          </text>
          {visible.map((s) => {
            const color = s.color ?? PALETTE[all.findIndex((o) => o.id === s.id) % PALETTE.length];
            return (
              <g key={s.id}>
                {s.points.map((p, i) => {
                  const cx = PAD + ((p.x - minX) / spanX) * innerW;
                  const cy = PAD + innerH - ((p.y - minY) / spanY) * innerH;
                  const text = p.label ? `${p.label} (${p.x}, ${p.y})` : `(${p.x}, ${p.y})`;
                  const placed: Placed = { cx, cy, color: p.color ?? color, text, seriesId: s.id };
                  return (
                    <g key={i}>
                      <circle
                        cx={cx}
                        cy={cy}
                        r={9}
                        fill="transparent"
                        onMouseEnter={() => setHover(placed)}
                        onMouseLeave={() => setHover(null)}
                      >
                        <title>{text}</title>
                      </circle>
                      <circle
                        cx={cx}
                        cy={cy}
                        r={4.5}
                        pointerEvents="none"
                        style={{ fill: p.color ?? color, animationDelay: `${Math.min(i * 30, 300)}ms` }}
                        className="ot-anim-pop"
                      />
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
        {hover ? (
          <div
            role="tooltip"
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[130%] whitespace-nowrap rounded-ot-sm border border-ot-border bg-ot-surface px-2 py-1 text-xs text-ot-text shadow-ot-md"
            style={{ left: `${(hover.cx / width) * 100}%`, top: `${(hover.cy / height) * 100}%` }}
          >
            <span className="mr-1.5 inline-block h-2 w-2 rounded-full" style={{ background: hover.color }} />
            {hover.text}
          </div>
        ) : null}
      </div>
      {multi ? (
        <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1.5 text-[13px]">
          {all.map((s) => {
            const off = hidden.includes(s.id);
            const color = s.color ?? PALETTE[all.findIndex((o) => o.id === s.id) % PALETTE.length];
            return (
              <button
                key={s.id}
                type="button"
                aria-pressed={!off}
                aria-label={`Toggle ${s.label}`}
                onClick={() => toggle(s.id)}
                className={`inline-flex items-center gap-1.5 rounded-ot-sm px-1.5 py-0.5 transition-opacity ${
                  off ? 'opacity-50' : 'text-ot-muted hover:bg-ot-surface'
                }`}
              >
                <span aria-hidden className="h-3 w-3 rounded-full" style={{ background: color }} />
                {s.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </figure>
  );
}
