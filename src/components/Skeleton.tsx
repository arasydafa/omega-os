export interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ className = '', width, height }: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={`rounded-ot-sm bg-ot-surface-2 motion-safe:animate-pulse ${className}`}
      style={{ width, height }}
    />
  );
}
