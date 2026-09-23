import { EmptyState } from './EmptyState.js';

export interface LinePoint {
  x: number | string;
  y: number;
}

export interface LineProps {
  points: LinePoint[];
  width?: number;
  height?: number;
  showArea?: boolean;
  label?: string;
  className?: string;
}

const PAD = 10;

export function Line({ points, width = 320, height = 180, showArea = true, label, className = '' }: LineProps) {
  if (points.length === 0) {
    return <EmptyState title="No data" description="Add points to render the chart." className={className} />;
  }
  const ys = points.map((p) => p.y);
  const min = Math.min(...ys);
  const max = Math.max(...ys);
  const span = max - min || 1;
  const innerW = width - PAD * 2;
  const innerH = height - PAD * 2;
  const step = points.length > 1 ? innerW / (points.length - 1) : 0;
  const coords = points.map((p, i) => ({
    x: PAD + i * step,
    y: PAD + innerH - ((p.y - min) / span) * innerH,
    p,
  }));
  const line = coords.map((c) => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ');
  const area = `${PAD},${height - PAD} ${line} ${PAD + innerW},${height - PAD}`;

  return (
    <figure className={`font-sans ${className}`}>
      <svg
        width="100%"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={label ?? `Line chart with ${points.length} points`}
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
        {showArea ? <polygon points={area} style={{ fill: 'var(--ot-navy-bg)' }} /> : null}
        <polyline points={line} fill="none" strokeWidth={2} strokeLinejoin="round" style={{ stroke: 'var(--ot-navy)' }} />
        {coords.map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r={3.5} style={{ fill: 'var(--ot-navy)' }}>
            <title>{`${c.p.x}: ${c.p.y}`}</title>
          </circle>
        ))}
      </svg>
    </figure>
  );
}
