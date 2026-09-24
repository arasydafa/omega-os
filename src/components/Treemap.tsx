import { EmptyState } from './EmptyState.js';

export interface TreemapDatum {
  label: string;
  value: number;
  /** CSS color. Defaults cycle through the Omega palette. */
  color?: string;
}

export interface TreemapProps {
  data: TreemapDatum[];
  width?: number;
  height?: number;
  onSelect?: (label: string) => void;
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

interface Placed {
  x: number;
  y: number;
  w: number;
  h: number;
  datum: TreemapDatum;
}

function worst(row: { norm: number }[], sum: number, side: number): number {
  let max = 0;
  for (const it of row) {
    const r = Math.max((side * side * it.norm) / (sum * sum), (sum * sum) / (side * side * it.norm));
    if (r > max) max = r;
  }
  return max;
}

/** Squarified treemap layout. Pure function — total area is preserved. */
export function squarifyLayout(
  data: TreemapDatum[],
  x0: number,
  y0: number,
  W: number,
  H: number,
): Placed[] {
  const total = data.reduce((s, d) => s + Math.max(d.value, 0), 0);
  if (total <= 0 || W <= 0 || H <= 0) return [];
  const items = data
    .map((datum, i) => ({ datum, i, norm: (Math.max(datum.value, 0) / total) * W * H }))
    .filter((it) => it.norm > 0)
    .sort((a, b) => b.norm - a.norm);
  const out: Placed[] = [];
  let row: typeof items = [];
  let rowSum = 0;
  let x = x0;
  let y = y0;
  let w = W;
  let h = H;

  const flush = () => {
    if (w >= h) {
      const rh = rowSum / w;
      let rx = x;
      for (const it of row) {
        const rw = it.norm / rh;
        out.push({ x: rx, y, w: rw, h: rh, datum: it.datum });
        rx += rw;
      }
      y += rh;
      h -= rh;
    } else {
      const rw = rowSum / h;
      let ry = y;
      for (const it of row) {
        const rh = it.norm / rw;
        out.push({ x, y: ry, w: rw, h: rh, datum: it.datum });
        ry += rh;
      }
      x += rw;
      w -= rw;
    }
    row = [];
    rowSum = 0;
  };

  while (items.length > 0) {
    const next = items[0];
    const side = Math.min(w, h);
    if (row.length === 0 || worst([...row, next], rowSum + next.norm, side) <= worst(row, rowSum, side)) {
      row.push(items.shift()!);
      rowSum += next.norm;
    } else {
      flush();
    }
  }
  if (row.length > 0) flush();
  return out;
}

export function Treemap({ data, width = 320, height = 220, onSelect, label, className = '' }: TreemapProps) {
  if (data.every((d) => d.value <= 0)) {
    return <EmptyState title="No data" description="Add values to render the chart." className={className} />;
  }
  const colored = data.map((d, i) => ({ ...d, color: d.color ?? PALETTE[i % PALETTE.length] }));
  const rects = squarifyLayout(colored, 0, 0, width, height);

  return (
    <figure className={`font-sans ${className}`}>
      <svg
        width="100%"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={label ?? `Treemap with ${data.length} blocks`}
        className="block overflow-hidden rounded-ot-md"
      >
        {rects.map((r, i) => {
          const showLabel = r.w > 44 && r.h > 26;
          return (
            <g
              key={i}
              role={onSelect ? 'button' : undefined}
              aria-label={onSelect ? r.datum.label : undefined}
              tabIndex={onSelect ? 0 : undefined}
              onClick={onSelect ? () => onSelect(r.datum.label) : undefined}
              onKeyDown={
                onSelect
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelect(r.datum.label);
                      }
                    }
                  : undefined
              }
              className={`ot-chart-fade ${onSelect ? 'cursor-pointer outline-none' : ''}`}
              style={{ animationDelay: `${Math.min(i * 25, 250)}ms` }}
            >
              <rect
                x={r.x + 1}
                y={r.y + 1}
                width={Math.max(r.w - 2, 0)}
                height={Math.max(r.h - 2, 0)}
                rx={8}
                style={{ fill: r.datum.color }}
                opacity={0.88}
              >
                <title>{`${r.datum.label}: ${r.datum.value}`}</title>
              </rect>
              {showLabel ? (
                <text x={r.x + 8} y={r.y + 20} fontSize={12} fontWeight={600} fill="#fff">
                  {r.datum.label}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
