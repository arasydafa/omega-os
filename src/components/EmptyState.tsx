import type { ReactNode } from 'react';
import { Inbox } from 'lucide-react';

export interface EmptyStateProps {
  /** 32px icon in a muted tile. Defaults to Inbox. Use lucide-react, never emoji. */
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className = '' }: EmptyStateProps) {
  return (
    <div className={`px-4 py-10 text-center font-sans ${className}`}>
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-ot-lg bg-ot-surface-2 text-ot-muted [&>svg]:block">
        {icon ?? <Inbox size={24} aria-hidden />}
      </div>
      <p className="mt-3 text-sm font-semibold text-ot-text">{title}</p>
      {description ? <p className="mx-auto mt-1 max-w-sm text-sm text-ot-muted">{description}</p> : null}
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  );
}
