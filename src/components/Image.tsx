import { useState } from 'react';
import type { ImgHTMLAttributes, ReactNode } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { Skeleton } from './Skeleton.js';

export type ImageRadius = 'sm' | 'md' | 'lg' | 'xl';

export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  /** CSS aspect-ratio, e.g. "16/10". Defaults to "16/10". */
  aspect?: string;
  rounded?: ImageRadius;
  /** Shown when the image fails to load. */
  fallbackLabel?: ReactNode;
  className?: string;
}

const RADII: Record<ImageRadius, string> = {
  sm: 'rounded-ot-sm',
  md: 'rounded-ot-md',
  lg: 'rounded-ot-lg',
  xl: 'rounded-ot-xl',
};

export function Image({
  src,
  alt,
  aspect = '16/10',
  rounded = 'lg',
  fallbackLabel,
  className = '',
  ...rest
}: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <span
      role="img"
      aria-label={alt}
      className={`relative block overflow-hidden border border-ot-border bg-ot-surface-2 font-sans ${RADII[rounded]} ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {!failed ? (
        <img
          src={src}
          alt=""
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          {...rest}
        />
      ) : null}
      {!loaded || failed ? (
        <span className="absolute inset-0 grid place-items-center">
          {failed ? (
            <span className="flex flex-col items-center gap-1.5 px-3 text-center">
              <ImageIcon size={24} aria-hidden className="text-ot-muted" />
              {fallbackLabel ? <span className="text-xs text-ot-muted">{fallbackLabel}</span> : null}
            </span>
          ) : (
            <Skeleton className="absolute inset-0" />
          )}
        </span>
      ) : null}
    </span>
  );
}
