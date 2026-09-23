import type { ReactNode } from 'react';
import { CircleCheck, Info, OctagonX, TriangleAlert, X } from 'lucide-react';

export type AlertTone = 'info' | 'warning' | 'success' | 'danger';

export interface AlertProps {
  tone: AlertTone;
  /** Bold lead-in, e.g. "Warning." */
  title?: ReactNode;
  children: ReactNode;
  /** Renders a close button when provided. */
  onClose?: () => void;
  /** Overrides the default tone icon. Use lucide-react, never emoji. */
  icon?: ReactNode;
  className?: string;
}

const TONES: Record<AlertTone, { classes: string; icon: ReactNode }> = {
  info: { classes: 'bg-info-bg text-info', icon: <Info size={18} aria-hidden /> },
  warning: { classes: 'bg-warning-bg text-warning', icon: <TriangleAlert size={18} aria-hidden /> },
  success: { classes: 'bg-success-bg text-success', icon: <CircleCheck size={18} aria-hidden /> },
  danger: { classes: 'bg-danger-bg text-danger', icon: <OctagonX size={18} aria-hidden /> },
};

export function Alert({ tone, title, children, onClose, icon, className = '' }: AlertProps) {
  const t = TONES[tone];
  return (
    <div
      role="alert"
      className={`flex items-start gap-2.5 rounded-ot-md px-3.5 py-3 text-sm font-sans ${t.classes} ${className}`}
    >
      <span className="shrink-0 [&>svg]:block">{icon ?? t.icon}</span>
      <div className="min-w-0">
        {title ? <strong className="font-semibold">{title} </strong> : null}
        <span>{children}</span>
      </div>
      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          className="ml-auto grid h-8 w-8 shrink-0 place-items-center rounded-ot-sm opacity-70 transition-opacity hover:opacity-100"
        >
          <X size={15} aria-hidden />
        </button>
      ) : null}
    </div>
  );
}
