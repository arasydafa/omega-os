import { useState } from 'react';
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
  showLegend?: boolean;
  label?: string;
  className?: string;
}

export function Bar({ data, height = 180, showLegend = true, label, className = '' }: BarProps) {
  const [hidden, setHidden] = useState<string[]>([]);
  if (data.length === 0) {
    return <EmptyState title="No data" description="Add values to render the chart." className={className} />;
  }
  const toggle = (name: string) =>
    setHidden((prev) => (prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]));
  const max = Math.max(...data.filter((d) => !hidden.includes(d.label)).map((d) => d.value), 0);
  const safeMax = max > 0 ? max : 1;
  const showing = data.filter((d) => !hidden.includes(d.label));
  const lastId = showing.length > 0 ? showing[showing.length - 1].label : null;
  return (
    <figure className={`font-sans ${className}`}>
      <div
        role="img"
        aria-label={label ?? `Bar chart with ${data.length} bars, maximum ${max}`}
        className="flex items-end border-b border-ot-border pb-px"
        style={{ height }}
      >
        {data.map((d, i) => {
          const off = hidden.includes(d.label);
          return (
            <div
              key={d.label}
              style={{
                flexGrow: off ? 0 : 1,
                flexBasis: off ? 0 : undefined,
                opacity: off ? 0 : 1,
                marginRight: off || d.label === lastId ? 0 : 12,
              }}
              className="ot-chart-resize flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5 overflow-hidden"
            >
              <span className={`font-mono text-[11px] text-ot-muted transition-opacity ${off ? 'opacity-0' : ''}`}>
                {d.value}
              </span>
              <div
                title={`${d.label}: ${d.value}`}
                style={{
                  height: off ? '0%' : `${(Math.max(d.value, 0) / safeMax) * 100}%`,
                  background: d.color ?? 'var(--ot-navy)',
                  animationDelay: `${Math.min(i * 40, 400)}ms`,
                  opacity: off ? 0 : 1,
                }}
                className="ot-chart-grow-up ot-chart-resize min-h-[3px] w-full max-w-12 rounded-ot-sm"
              />
            </div>
          );
        })}
      </div>
      <figcaption className="mt-2 flex">
        {data.map((d) => {
          const off = hidden.includes(d.label);
          return (
            <span
              key={d.label}
              style={{
                flexGrow: off ? 0 : 1,
                flexBasis: off ? 0 : undefined,
                opacity: off ? 0 : 1,
                marginRight: off || d.label === lastId ? 0 : 12,
              }}
              className="ot-chart-resize min-w-0 flex-1 truncate overflow-hidden text-center text-xs text-ot-muted"
            >
              {d.label}
            </span>
          );
        })}
      </figcaption>
      {showLegend ? (
        <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1.5 text-[13px]">
          {data.map((d) => {
            const off = hidden.includes(d.label);
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
                  style={{ background: d.color ?? 'var(--ot-navy)' }}
                />
                {d.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </figure>
  );
}
