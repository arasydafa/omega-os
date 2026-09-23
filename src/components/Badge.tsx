import type { ReactNode } from 'react';

export type BadgeTone = 'navy' | 'grey' | 'info' | 'warning' | 'success' | 'danger';

export interface BadgeProps {
  tone?: BadgeTone;
  /** Leading icon (12px). Use lucide-react, never emoji. */
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

const TONES: Record<BadgeTone, string> = {
  navy: 'bg-navy-bg text-navy-text',
  grey: 'bg-ot-surface-2 text-ot-muted',
  info: 'bg-info-bg text-info',
  warning: 'bg-warning-bg text-warning',
  success: 'bg-success-bg text-success',
  danger: 'bg-danger-bg text-danger',
};

export function Badge({ tone = 'grey', icon, children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border border-transparent font-sans ${TONES[tone]} ${className}`}
    >
      {icon}
      {children}
    </span>
  );
}
