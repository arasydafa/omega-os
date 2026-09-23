import { EmptyState } from './EmptyState.js';

export interface ScatterPoint {
  x: number;
  y: number;
  label?: string;
  /** CSS color. Defaults to navy. */
  color?: string;
}

export interface ScatterProps {
  points: ScatterPoint[];
  width?: number;
  height?: number;
  label?: string;
  className?: string;
}

const PAD = 28;

export function Scatter({ points, width = 320, height = 220, label, className = '' }: ScatterProps) {
  if (points.length === 0) {
    return <EmptyState title="No data" description="Add points to render the chart." className={className} />;
  }
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const spanX = maxX - minX || 1;
  const spanY = maxY - minY || 1;
  const innerW = width - PAD * 2;
  const innerH = height - PAD * 2;
  const sx = (x: number) => PAD + ((x - minX) / spanX) * innerW;
  const sy = (y: number) => PAD + innerH - ((y - minY) / spanY) * innerH;

  return (
    <figure className={`font-sans ${className}`}>
      <svg
        width="100%"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={label ?? `Scatter plot with ${points.length} points`}
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
        {points.map((p, i) => (
          <circle key={i} cx={sx(p.x)} cy={sy(p.y)} r={4.5} style={{ fill: p.color ?? 'var(--ot-navy)' }}>
            <title>{p.label ? `${p.label} (${p.x}, ${p.y})` : `(${p.x}, ${p.y})`}</title>
          </circle>
        ))}
      </svg>
    </figure>
  );
}
