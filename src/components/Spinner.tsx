import { Loader2 } from 'lucide-react';

export interface SpinnerProps {
  size?: number;
  label?: string;
  className?: string;
}

export function Spinner({ size = 16, label = 'Loading', className = '' }: SpinnerProps) {
  return (
    <span role="status" aria-label={label} className={`inline-grid place-items-center ${className}`}>
      <Loader2 size={size} aria-hidden className="animate-spin" />
    </span>
  );
}
