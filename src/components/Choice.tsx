import type { InputHTMLAttributes, ReactNode } from 'react';

interface LabeledControlProps {
  label: ReactNode;
  description?: ReactNode;
  className?: string;
}

function ControlShell({
  label,
  description,
  className = '',
  children,
}: LabeledControlProps & { children: ReactNode }) {
  return (
    <label className={`flex cursor-pointer items-start gap-2.5 font-sans ${className}`}>
      {children}
      <span className="min-w-0">
        <span className="block text-sm font-medium text-ot-text">{label}</span>
        {description ? <span className="mt-0.5 block text-[13px] text-ot-muted">{description}</span> : null}
      </span>
    </label>
  );
}

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement>, LabeledControlProps {}

export function Radio({ label, description, className = '', ...rest }: RadioProps) {
  return (
    <ControlShell label={label} description={description} className={className}>
      <input
        type="radio"
        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-navy disabled:cursor-not-allowed disabled:opacity-50"
        {...rest}
      />
    </ControlShell>
  );
}

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement>, LabeledControlProps {}

export function Checkbox({ label, description, className = '', ...rest }: CheckboxProps) {
  return (
    <ControlShell label={label} description={description} className={className}>
      <input
        type="checkbox"
        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-navy disabled:cursor-not-allowed disabled:opacity-50"
        {...rest}
      />
    </ControlShell>
  );
}

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: ReactNode;
  disabled?: boolean;
  className?: string;
}

export function Switch({ checked, onChange, label, disabled = false, className = '' }: SwitchProps) {
  return (
    <label className={`inline-flex cursor-pointer items-center gap-2.5 font-sans ${className}`}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={typeof label === 'string' ? label : undefined}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
          checked ? 'bg-navy' : 'bg-ot-surface-2'
        }`}
      >
        <span
          aria-hidden
          className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
      {label ? <span className="text-sm font-medium text-ot-text">{label}</span> : null}
    </label>
  );
}
