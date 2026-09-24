import { useState } from 'react';
import { EmptyState } from './EmptyState.js';

export interface PieDatum {
  label: string;
  value: number;
  /** CSS color. Defaults cycle through the Omega palette. */
  color?: string;
}

export interface PieProps {
  data: PieDatum[];
  /** SVG viewport size. Defaults to 200. */
  size?: number;
  /** Donut hole. Defaults to true. */
  hole?: boolean;
  showLegend?: boolean;
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

const R = 70;

function polar(cx: number, cy: number, r: number, deg: number): [number, number] {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

export function Pie({ data, size = 200, hole = true, showLegend = true, label, className = '' }: PieProps) {
  const [hidden, setHidden] = useState<string[]>([]);
  const rawTotal = data.reduce((sum, d) => sum + Math.max(d.value, 0), 0);
  if (rawTotal <= 0) {
    return <EmptyState title="No data" description="Add values to render the chart." className={className} />;
  }
  const toggle = (name: string) =>
    setHidden((prev) => (prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]));
  const visible = data.filter((d) => !hidden.includes(d.label));
  const total = visible.reduce((sum, d) => sum + Math.max(d.value, 0), 0);
  const legend = (
    <div className="flex flex-wrap gap-x-2 gap-y-1.5 text-[13px]">
      {data.map((d) => {
        const off = hidden.includes(d.label);
        const pct = total > 0 && !off ? Math.round((Math.max(d.value, 0) / total) * 100) : 0;
        return (
          <button
            key={d.label}
            type="button"
            aria-pressed={!off}
            aria-label={`Toggle ${d.label}`}
            onClick={() => toggle(d.label)}
            className={`inline-flex items-center gap-1.5 rounded-ot-sm px-1.5 py-0.5 transition-opacity ${
              off ? 'opacity-50' : 'text-ot-muted hover:bg-ot-surface'
            }`}
          >
            <span
              aria-hidden
              className="h-3 w-3 rounded-full"
              style={{ background: d.color ?? PALETTE[data.findIndex((o) => o.label === d.label) % PALETTE.length] }}
            />
            {d.label} <b className="text-ot-text">{pct}%</b>
          </button>
        );
      })}
    </div>
  );
  if (total <= 0) {
    return (
      <figure className={`font-sans ${className}`}>
        <p className="rounded-ot-md border border-dashed border-ot-border p-4 text-center text-sm text-ot-muted">
          All series hidden — toggle the legend to show them.
        </p>
        {showLegend ? legend : null}
      </figure>
    );
  }
  const colored = visible.map((d) => {
    const i = data.findIndex((o) => o.label === d.label);
    return { ...d, color: d.color ?? PALETTE[i % PALETTE.length] };
  });
  let acc = 0;

  return (
    <figure className={`font-sans ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        role="img"
        aria-label={label ?? `Pie chart with ${data.length} segments totaling ${total}`}
      >
        {hole ? (
          <>
            <circle cx={100} cy={100} r={R} fill="none" strokeWidth={28} className="stroke-ot-surface-2" />
            {colored.map((d) => {
              const pct = (Math.max(d.value, 0) / total) * 100;
              const el = (
                <circle
                  key={d.label}
                  cx={100}
                  cy={100}
                  r={R}
                  fill="none"
                  strokeWidth={28}
                  pathLength={100}
                  strokeDasharray={`${pct} ${100 - pct}`}
                  strokeDashoffset={-acc}
                  transform="rotate(-90 100 100)"
                  style={{ stroke: d.color }}
                  className="ot-chart-fade ot-chart-sweep"
                >
                  <title>{`${d.label}: ${d.value}`}</title>
                </circle>
              );
              acc += pct;
              return el;
            })}
            <text x={100} y={100} textAnchor="middle" dominantBaseline="central" fontSize={26} fontWeight={700} className="fill-ot-text">
              {total}
            </text>
          </>
        ) : (
          colored.map((d) => {
            const start = (acc / total) * 360;
            acc += Math.max(d.value, 0);
            const end = (acc / total) * 360;
            const [x1, y1] = polar(100, 100, 78, start);
            const [x2, y2] = polar(100, 100, 78, end);
            return (
              <path
                key={d.label}
                d={`M100,100 L${x1.toFixed(2)},${y1.toFixed(2)} A78,78 0 ${end - start > 180 ? 1 : 0},1 ${x2.toFixed(2)},${y2.toFixed(2)} Z`}
                style={{ fill: d.color, stroke: 'var(--ot-bg)', strokeWidth: 2 }}
                className="ot-chart-fade"
              >
                <title>{`${d.label}: ${d.value}`}</title>
              </path>
            );
          })
        )}
      </svg>
      {showLegend ? <figcaption className="mt-3">{legend}</figcaption> : null}
      <table className="sr-only">
        <tbody>
          {colored.map((d, i) => (
            <tr key={i}>
              <th scope="row">{d.label}</th>
              <td>{d.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

