export type TimingSegmentTone = 'navy' | 'info' | 'warning' | 'success' | 'danger' | 'grey';

export interface TimingSegment {
  id: string;
  label: string;
  /** Duration in the same unit for every segment (e.g. ms). */
  value: number;
  tone?: TimingSegmentTone;
}

export interface TimingBarProps {
  segments: TimingSegment[];
  /** Unit suffix appended to values, e.g. 'ms'. Defaults to 'ms'. */
  unit?: string;
  /** Total label. Defaults to 'Total'. */
  totalLabel?: string;
  label?: string;
  className?: string;
}

const SEGMENT_BG: Record<TimingSegmentTone, string> = {
  navy: 'bg-navy',
  info: 'bg-info',
  warning: 'bg-warning',
  success: 'bg-success',
  danger: 'bg-danger',
  grey: 'bg-ot-surface-2',
};

const LEGEND_TEXT: Record<TimingSegmentTone, string> = {
  navy: 'text-navy-text',
  info: 'text-info',
  warning: 'text-warning',
  success: 'text-success',
  danger: 'text-danger',
  grey: 'text-ot-muted',
};

export function TimingBar({ segments, unit = 'ms', totalLabel = 'Total', label, className = '' }: TimingBarProps) {
  const total = segments.reduce((sum, s) => sum + Math.max(s.value, 0), 0);
  if (segments.length === 0 || total === 0) {
    return <p className={`text-xs text-ot-muted font-sans ${className}`}>No timing data</p>;
  }
  const aria = label ?? `Timing breakdown, total ${total.toFixed(2)}${unit}`;
  return (
    <div className={`flex flex-col gap-2 font-sans ${className}`}>
      <div role="img" aria-label={aria} className="flex h-5 flex-1 overflow-hidden rounded-ot-sm bg-ot-surface-2">
        {segments.map((s) => {
          const pct = (Math.max(s.value, 0) / total) * 100;
          if (pct <= 0) return null;
          return (
            <div
              key={s.id}
              title={`${s.label}: ${s.value.toFixed(1)}${unit}`}
              style={{ width: `${pct}%` }}
              className={`flex h-full items-center justify-center overflow-hidden whitespace-nowrap text-[10px] font-semibold text-white ot-chart-resize ${SEGMENT_BG[s.tone ?? 'navy']}`}
            >
              {s.value >= 0.1 ? `${s.value.toFixed(1)}${unit}` : ''}
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-3 text-[11px] text-ot-muted">
        {segments.map((s) => (
          <span key={s.id} className={`font-medium ${LEGEND_TEXT[s.tone ?? 'navy']}`}>
            {s.label}
          </span>
        ))}
      </div>
      <div className="text-right text-[11px] text-ot-muted">
        {totalLabel}: {total.toFixed(2)} {unit}
      </div>
    </div>
  );
}
