import { useEffect, useId, useRef, useState } from 'react';
import type { ReactNode } from 'react';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: TooltipPosition;
  /** Show delay in ms. Defaults to 200. */
  delay?: number;
}

const POSITIONS: Record<TooltipPosition, string> = {
  top: 'bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2',
  bottom: 'top-[calc(100%+8px)] left-1/2 -translate-x-1/2',
  left: 'right-[calc(100%+8px)] top-1/2 -translate-y-1/2',
  right: 'left-[calc(100%+8px)] top-1/2 -translate-y-1/2',
};

export function Tooltip({ content, children, position = 'top', delay = 200 }: TooltipProps) {
  const tipId = useId();
  const [visible, setVisible] = useState(false);
  const [hiding, setHiding] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const schedule = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setVisible(true);
      setHiding(false);
    }, delay);
  };
  const hide = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    if (!visible) return;
    // Delayed unmount so the exit animation can play.
    setHiding(true);
    timer.current = setTimeout(() => {
      setVisible(false);
      setHiding(false);
    }, 120);
  };

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={schedule}
      onMouseLeave={hide}
      onFocus={schedule}
      onBlur={hide}
      onKeyDown={(e) => {
        if (e.key === 'Escape') hide();
      }}
    >
      <span aria-describedby={visible ? tipId : undefined}>{children}</span>
      {visible ? (
        <span
          id={tipId}
          role="tooltip"
          className={`pointer-events-none absolute z-20 whitespace-nowrap rounded-ot-sm border border-ot-border bg-ot-surface px-2 py-1 font-sans text-xs text-ot-text shadow-ot-md ${POSITIONS[position]} ${
            hiding ? 'ot-anim-fade-out' : 'ot-anim-fade-in'
          }`}
        >
          {content}
        </span>
      ) : null}
    </span>
  );
}
