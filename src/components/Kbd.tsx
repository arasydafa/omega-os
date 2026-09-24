import type { ReactNode } from 'react';

export interface KbdProps {
  children: ReactNode;
  className?: string;
}

export function Kbd({ children, className = '' }: KbdProps) {
  return (
    <kbd
      className={`inline-block rounded-ot-sm border border-ot-border bg-ot-surface px-1.5 py-0.5 font-mono text-[11px] text-ot-muted ${className}`}
    >
      {children}
    </kbd>
  );
}
