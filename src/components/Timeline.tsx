import type { ReactNode } from 'react';

export type TimelineTone = 'navy' | 'grey' | 'info' | 'warning' | 'success' | 'danger';

export interface TimelineItemDef {
  id: string;
  time?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  tone?: TimelineTone;
  icon?: ReactNode;
}

export interface TimelineProps {
  items: TimelineItemDef[];
  label?: string;
  className?: string;
}

const DOTS: Record<TimelineTone, string> = {
  navy: 'bg-navy',
  grey: 'bg-ot-surface-2',
  info: 'bg-info',
  warning: 'bg-warning',
  success: 'bg-success',
  danger: 'bg-danger',
};

export function Timeline({ items, label = 'Timeline', className = '' }: TimelineProps) {
  if (items.length === 0) return null;
  return (
    <ol aria-label={label} className={`font-sans ${className}`}>
      {items.map((item, i) => (
        <li key={item.id} className="relative flex gap-3 pb-5 last:pb-0">
          {i < items.length - 1 ? (
            <span aria-hidden className="absolute bottom-0 left-[7px] top-5 w-px bg-ot-border" />
          ) : null}
          <span
            aria-hidden
            className={`z-10 grid h-4 w-4 shrink-0 place-items-center rounded-full ${DOTS[item.tone ?? 'grey']}`}
          >
            {item.icon}
          </span>
          <div className="min-w-0 flex-1">
            {item.time ? <p className="font-mono text-xs text-ot-muted">{item.time}</p> : null}
            <p className="text-sm font-semibold text-ot-text">{item.title}</p>
            {item.description ? <p className="mt-0.5 text-sm text-ot-muted">{item.description}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
