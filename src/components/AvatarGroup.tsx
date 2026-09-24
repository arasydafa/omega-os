import { Avatar } from './Avatar.js';
import type { AvatarSize } from './Avatar.js';

export interface AvatarPerson {
  name: string;
  src?: string;
}

export interface AvatarGroupProps {
  avatars: AvatarPerson[];
  /** Visible avatars before collapsing into +N. Defaults to 4. */
  max?: number;
  size?: AvatarSize;
  className?: string;
}

export function AvatarGroup({ avatars, max = 4, size = 'md', className = '' }: AvatarGroupProps) {
  const shown = avatars.slice(0, Math.max(max, 1));
  const rest = avatars.length - shown.length;
  return (
    <span className={`inline-flex items-center font-sans ${className}`} role="group" aria-label={`${avatars.length} people`}>
      {shown.map((a, i) => (
        <span key={a.name} style={{ zIndex: shown.length - i }} className="-ml-2 shrink-0 first:ml-0">
          <span className="block rounded-full border-2 border-ot-bg">
            <Avatar name={a.name} src={a.src} size={size} />
          </span>
        </span>
      ))}
      {rest > 0 ? (
        <span
          className={`-ml-2 grid shrink-0 place-items-center rounded-full border-2 border-ot-bg bg-ot-surface-2 text-xs font-semibold text-ot-muted ${
            size === 'sm' ? 'h-8 w-8' : size === 'lg' ? 'h-12 w-12' : 'h-10 w-10'
          }`}
          aria-label={`${rest} more`}
        >
          +{rest}
        </span>
      ) : null}
    </span>
  );
}
