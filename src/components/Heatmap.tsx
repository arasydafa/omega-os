import { Fragment } from 'react';
import { EmptyState } from './EmptyState.js';

export interface HeatDatum {
  x: string;
  y: string;
  value: number;
}

export interface HeatmapProps {
  data: HeatDatum[];
  /** Column order. Defaults to order of first appearance. */
  xLabels?: string[];
  /** Row order. Defaults to order of first appearance. */
  yLabels?: string[];
  onSelect?: (cell: HeatDatum) => void;
  label?: string;
  className?: string;
}

export function Heatmap({ data, xLabels, yLabels, onSelect, label, className = '' }: HeatmapProps) {
  if (data.length === 0) {
    return <EmptyState title="No data" description="Add cells to render the heatmap." className={className} />;
  }
  const xs = xLabels ?? [...new Set(data.map((d) => d.x))];
  const ys = yLabels ?? [...new Set(data.map((d) => d.y))];
  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const byKey = new Map(data.map((d) => [`${d.x}\n${d.y}`, d]));

  return (
    <figure className={`font-sans ${className}`}>
      <div
        role="img"
        aria-label={label ?? `Heatmap with ${xs.length} columns and ${ys.length} rows`}
        className="grid gap-1"
        style={{ gridTemplateColumns: `auto repeat(${xs.length}, minmax(0, 1fr))` }}
      >
        <span />
        {xs.map((x) => (
          <span key={x} className="truncate pb-1 text-center text-xs text-ot-muted">
            {x}
          </span>
        ))}
        {ys.map((y) => (
          <Fragment key={y}>
            <span key={`row-${y}`} className="flex items-center pr-1 text-xs text-ot-muted">
              {y}
            </span>
            {xs.map((x, xi) => {
              const cell = byKey.get(`${x}\n${y}`);
              const t = cell ? (cell.value - min) / span : 0;
              return (
                <button
                  key={`${x}-${y}`}
                  type="button"
                  title={cell ? `${x} · ${y}: ${cell.value}` : `${x} · ${y}: —`}
                  aria-label={cell ? `${x}, ${y}, value ${cell.value}` : `${x}, ${y}, no data`}
                  onClick={cell && onSelect ? () => onSelect(cell) : undefined}
                  data-intensity={t.toFixed(2)}
                  style={{
                    background: `color-mix(in srgb, var(--ot-navy) ${Math.round(t * 100)}%, var(--ot-surface-2))`,
                    animationDelay: `${Math.min((xi + ys.indexOf(y)) * 40, 320)}ms`,
                  }}
                  className={`ot-chart-fade aspect-square w-full rounded-ot-sm transition-transform ${
                    cell && onSelect ? 'cursor-pointer hover:scale-[1.04]' : 'cursor-default'
                  }`}
                />
              );
            })}
          </Fragment>
        ))}
      </div>
    </figure>
  );
}
