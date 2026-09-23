import type { ReactNode } from 'react';

export type CardPadding = 'none' | 'md' | 'lg';

export interface CardProps {
  children: ReactNode;
  padding?: CardPadding;
  className?: string;
}

const PADDING: Record<CardPadding, string> = {
  none: 'p-0',
  md: 'p-5',
  lg: 'p-6',
};

export function Card({ children, padding = 'md', className = '' }: CardProps) {
  return (
    <div className={`rounded-ot-lg border border-ot-border bg-ot-surface font-sans ${PADDING[padding]} ${className}`}>
      {children}
    </div>
  );
}
