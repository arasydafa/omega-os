import { EmptyState } from './EmptyState.js';

export interface BarDatum {
  label: string;
  value: number;
  /** CSS color. Defaults to navy. */
  color?: string;
}

export interface BarProps {
  data: BarDatum[];
  /** Chart height in px. Defaults to 180. */
  height?: number;
  label?: string;
  className?: string;
}

export function Bar({ data, height = 180, label, className = '' }: BarProps) {
  if (data.length === 0) {
    return <EmptyState title="No data" description="Add values to render the chart." className={className} />;
  }
  const max = Math.max(...data.map((d) => d.value), 0);
  const safeMax = max > 0 ? max : 1;
  return (
    <figure className={`font-sans ${className}`}>
      <div
        role="img"
        aria-label={label ?? `Bar chart with ${data.length} bars, maximum ${max}`}
        className="flex items-end gap-3 border-b border-ot-border pb-px"
        style={{ height }}
      >
        {data.map((d, i) => (
          <div key={i} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5">
            <span className="font-mono text-[11px] text-ot-muted">{d.value}</span>
            <div
              title={`${d.label}: ${d.value}`}
              style={{
                height: `${(Math.max(d.value, 0) / safeMax) * 100}%`,
                background: d.color ?? 'var(--ot-navy)',
                animationDelay: `${Math.min(i * 40, 400)}ms`,
              }}
              className="ot-chart-grow-up ot-chart-resize min-h-[3px] w-full max-w-12 rounded-ot-sm"
            />
          </div>
        ))}
      </div>
      <figcaption className="mt-2 flex gap-3">
        {data.map((d, i) => (
          <span key={i} className="min-w-0 flex-1 truncate text-center text-xs text-ot-muted">
            {d.label}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
