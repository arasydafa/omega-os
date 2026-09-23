import { useState } from 'react';

export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps {
  /** Full name — initials are derived from the first two words. */
  name: string;
  src?: string;
  size?: AvatarSize;
  className?: string;
}

const SIZES: Record<AvatarSize, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
};

export function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

export function Avatar({ name, src, size = 'md', className = '' }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  return (
    <span
      role="img"
      aria-label={name}
      title={name}
      className={`inline-grid shrink-0 select-none place-items-center overflow-hidden rounded-full bg-navy-bg font-sans font-semibold text-navy-text ${SIZES[size]} ${className}`}
    >
      {src && !failed ? (
        <img src={src} alt="" onError={() => setFailed(true)} className="h-full w-full object-cover" />
      ) : (
        <span aria-hidden>{initials(name)}</span>
      )}
    </span>
  );
}
