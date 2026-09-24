import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';

export type CopyButtonSize = 'sm' | 'md';

export interface CopyButtonProps {
  /** Text written to the clipboard. */
  text: string;
  size?: CopyButtonSize;
  onCopy?: () => void;
  className?: string;
}

const SIZES: Record<CopyButtonSize, string> = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
};

export function CopyButton({ text, size = 'sm', onCopy, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = async () => {
    try {
      await navigator.clipboard?.writeText(text);
    } catch {
      // Clipboard unavailable — still confirm so the UI never dead-ends.
    }
    setCopied(true);
    onCopy?.();
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={() => void copy()}
      aria-label={copied ? 'Copied' : 'Copy'}
      className={`grid shrink-0 place-items-center rounded-ot-sm text-ot-muted transition-colors hover:bg-ot-surface-2 hover:text-ot-text ${SIZES[size]} ${className}`}
    >
      {copied ? <Check size={15} aria-hidden /> : <Copy size={15} aria-hidden />}
    </button>
  );
}
