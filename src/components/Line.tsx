import { useState } from 'react';
import { EmptyState } from './EmptyState.js';

export interface LinePoint {
  x: number | string;
  y: number;
}

export interface LineSeries {
  id: string;
  label: string;
  /** CSS color. Defaults cycle through the Omega palette. */
  color?: string;
  points: LinePoint[];
}

export interface LineProps {
  /** Legacy single series. Prefer `series`. */
  points?: LinePoint[];
  series?: LineSeries[];
  width?: number;
  height?: number;
  showArea?: boolean;
  label?: string;
  className?: string;
}

const PALETTE = [
  'var(--ot-navy)',
  'var(--ot-maroon)',
  'var(--ot-info)',
  'var(--ot-warning)',
  'var(--ot-success)',
];

const PAD = 10;

interface Placed {
  x: number;
  y: number;
  sx: string;
  sy: number;
  seriesId: string;
  seriesLabel: string;
  color: string;
  index: number;
}

export function Line({ points, series, width = 320, height = 180, showArea = true, label, className = '' }: LineProps) {
  const all: LineSeries[] = series ?? (points ? [{ id: 'line', label: 'Value', points }] : []);
  const [hidden, setHidden] = useState<string[]>([]);
  const [hover, setHover] = useState<Placed | null>(null);
  const visible = all.filter((s) => !hidden.includes(s.id) && s.points.length > 0);
  const multi = all.length > 1;

  if (all.length === 0) {
    return <EmptyState title="No data" description="Add points to render the chart." className={className} />;
  }

  const toggle = (id: string) =>
    setHidden((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const ys = visible.flatMap((s) => s.points.map((p) => p.y));
  const min = ys.length ? Math.min(...ys) : 0;
  const max = ys.length ? Math.max(...ys) : 1;
  const span = max - min || 1;
  const innerW = width - PAD * 2;
  const innerH = height - PAD * 2;
  const longest = Math.max(...visible.map((s) => s.points.length), 1);
  const step = longest > 1 ? innerW / (longest - 1) : 0;

  const placed: Placed[][] = visible.map((s) => {
    const color = s.color ?? PALETTE[all.findIndex((o) => o.id === s.id) % PALETTE.length];
    return s.points.map((p, i) => ({
      x: PAD + i * step,
      y: PAD + innerH - ((p.y - min) / span) * innerH,
      sx: String(p.x),
      sy: p.y,
      seriesId: s.id,
      seriesLabel: s.label,
      color,
      index: i,
    }));
  });

  return (
    <figure className={`font-sans ${className}`}>
      <div className="relative">
        <svg
          width="100%"
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={label ?? `Line chart with ${visible.length} series`}
          className="block"
        >
          {[0.25, 0.5, 0.75].map((f) => (
            <line
              key={f}
              x1={PAD}
              x2={width - PAD}
              y1={PAD + innerH * f}
              y2={PAD + innerH * f}
              strokeDasharray="3 4"
              className="stroke-ot-border"
            />
          ))}
          {placed.map((coords, si) => (
            <g key={visible[si].id}>
              {showArea ? (
                <polygon
                  points={`${PAD},${height - PAD} ${coords.map((c) => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ')} ${PAD + innerW},${height - PAD}`}
                  style={{ fill: coords[0]?.color, opacity: 0.12 }}
                />
              ) : null}
              <polyline
                points={coords.map((c) => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ')}
                fill="none"
                strokeWidth={2}
                strokeLinejoin="round"
                style={{ stroke: coords[0]?.color }}
              />
              {coords.map((c) => (
                <circle
                  key={c.index}
                  cx={c.x}
                  cy={c.y}
                  r={5.5}
                  fill="transparent"
                  onMouseEnter={() => setHover(c)}
                  onMouseLeave={() => setHover((h) => (h?.seriesId === c.seriesId && h?.index === c.index ? null : h))}
                >
                  <title>{`${c.seriesLabel} ${c.sx}: ${c.sy}`}</title>
                </circle>
              ))}
              {coords.map((c) => (
                <circle key={`dot-${c.index}`} cx={c.x} cy={c.y} r={3} pointerEvents="none" style={{ fill: c.color }} />
              ))}
            </g>
          ))}
        </svg>
        {hover ? (
          <div
            role="tooltip"
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[130%] whitespace-nowrap rounded-ot-sm border border-ot-border bg-ot-surface px-2 py-1 text-xs shadow-ot-md"
            style={{ left: `${(hover.x / width) * 100}%`, top: `${(hover.y / height) * 100}%` }}
          >
            <span className="mr-1.5 inline-block h-2 w-2 rounded-full" style={{ background: hover.color }} />
            <b>{hover.seriesLabel}</b> {hover.sx}: {hover.sy}
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
