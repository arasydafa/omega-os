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
  const total = data.reduce((sum, d) => sum + Math.max(d.value, 0), 0);
  if (total <= 0) {
    return <EmptyState title="No data" description="Add values to render the chart." className={className} />;
  }
  const colored = data.map((d, i) => ({ ...d, color: d.color ?? PALETTE[i % PALETTE.length] }));
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
            {colored.map((d, i) => {
              const pct = (Math.max(d.value, 0) / total) * 100;
              const el = (
                <circle
                  key={i}
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
          colored.map((d, i) => {
            const start = (acc / total) * 360;
            acc += Math.max(d.value, 0);
            const end = (acc / total) * 360;
            const [x1, y1] = polar(100, 100, 78, start);
            const [x2, y2] = polar(100, 100, 78, end);
            return (
              <path
                key={i}
                d={`M100,100 L${x1.toFixed(2)},${y1.toFixed(2)} A78,78 0 ${end - start > 180 ? 1 : 0},1 ${x2.toFixed(2)},${y2.toFixed(2)} Z`}
                style={{ fill: d.color, stroke: 'var(--ot-bg)', strokeWidth: 2 }}
              >
                <title>{`${d.label}: ${d.value}`}</title>
              </path>
            );
          })
        )}
      </svg>
      {showLegend ? (
        <figcaption className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[13px]">
          {colored.map((d, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 text-ot-muted">
              <span aria-hidden className="h-3 w-3 rounded-full" style={{ background: d.color }} />
              {d.label} <b className="text-ot-text">{Math.round((Math.max(d.value, 0) / total) * 100)}%</b>
            </span>
          ))}
        </figcaption>
      ) : null}
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

