export type ProgressTone = 'navy' | 'info' | 'success' | 'warning' | 'danger';

export interface ProgressProps {
  value: number;
  max?: number;
  tone?: ProgressTone;
  /** Shows a sliding bar when the value is unknown. */
  indeterminate?: boolean;
  label?: string;
  className?: string;
}

const TONES: Record<ProgressTone, string> = {
  navy: 'var(--ot-navy)',
  info: 'var(--ot-info)',
  warning: 'var(--ot-warning)',
  success: 'var(--ot-success)',
  danger: 'var(--ot-danger)',
};

export function Progress({ value, max = 100, tone = 'navy', indeterminate = false, label, className = '' }: ProgressProps) {
  const pct = Math.min(Math.max(value / (max || 1), 0), 1) * 100;
  return (
    <div className={`font-sans ${className}`}>
      {label ? (
        <div className="mb-1.5 flex items-center justify-between text-[13px]">
          <span className="font-medium text-ot-text">{label}</span>
          {!indeterminate ? <span className="font-mono text-ot-muted">{Math.round(pct)}%</span> : null}
        </div>
      ) : null}
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={indeterminate ? undefined : Math.round(value)}
        aria-label={label ?? 'Progress'}
        className="h-2 w-full overflow-hidden rounded-full bg-ot-surface-2"
      >
        <div
          style={{ background: TONES[tone], width: indeterminate ? '40%' : `${pct}%` }}
          className={`h-full rounded-full ot-chart-resize ${
            indeterminate ? 'ot-anim-progress-slide' : ''
          }`}
        />
      </div>
    </div>
  );
}
