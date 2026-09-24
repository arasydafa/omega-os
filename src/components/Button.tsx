import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Spinner } from './Spinner.js';

export type ButtonVariant = 'primary' | 'secondary' | 'solid' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Leading icon (16px). Use lucide-react, never emoji. */
  icon?: ReactNode;
  /** Shows a spinner and disables the button. */
  loading?: boolean;
}

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-navy text-white hover:bg-navy-600',
  secondary: 'bg-transparent border-ot-border text-ot-text hover:bg-ot-surface',
  solid: 'bg-ot-surface-2 border-ot-border text-ot-text hover:bg-ot-border',
  danger: 'bg-maroon text-white hover:bg-maroon-600',
  ghost: 'bg-transparent text-ot-muted hover:bg-ot-surface hover:text-ot-text',
};

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-[13px] rounded-ot-sm',
  md: 'h-10 px-4 text-sm rounded-ot-md',
  lg: 'h-12 px-6 text-base rounded-ot-md',
};

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  disabled,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <button
      type="button"
      disabled={isDisabled}
      className={`inline-flex items-center justify-center gap-2 border border-transparent font-sans font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...rest}
    >
      {loading ? <Spinner size={16} /> : icon}
      {children}
    </button>
  );
}
