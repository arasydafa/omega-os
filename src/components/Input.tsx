import { useId } from 'react';
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';

interface FieldMeta {
  label?: ReactNode;
  /** Muted helper text under the field. Hidden when `error` is set. */
  helper?: ReactNode;
  /** Error text under the field. Turns the border maroon. */
  error?: ReactNode;
  className?: string;
}

const CONTROL =
  'h-10 w-full rounded-ot-md border bg-ot-bg px-3 font-sans text-sm text-ot-text outline-none transition-shadow placeholder:text-ot-muted';

function FieldShell({
  fieldId,
  label,
  helper,
  error,
  className = '',
  children,
}: FieldMeta & { fieldId: string; children: ReactNode }) {
  return (
    <div className={className}>
      {label ? (
        <label htmlFor={fieldId} className="mb-1.5 block font-sans text-[13px] font-semibold text-ot-text">
          {label}
        </label>
      ) : null}
      {children}
      {error ? (
        <p role="alert" className="mt-1.5 font-sans text-[13px] text-danger">
          {error}
        </p>
      ) : helper ? (
        <p className="mt-1.5 font-sans text-[13px] text-ot-muted">{helper}</p>
      ) : null}
    </div>
  );
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, FieldMeta {
  /** Leading icon (16px). Use lucide-react, never emoji. */
  icon?: ReactNode;
}

export function Input({ label, helper, error, icon, className = '', id, ...rest }: InputProps) {
  const fieldId = useId();
  const controlId = id ?? fieldId;
  return (
    <FieldShell fieldId={controlId} label={label} helper={helper} error={error} className={className}>
      <div className="relative">
        {icon ? (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ot-muted [&>svg]:block">
            {icon}
          </span>
        ) : null}
        <input
          id={controlId}
          className={`${CONTROL} ${icon ? 'pl-9' : ''} ${
            error ? 'border-danger focus:border-danger' : 'border-ot-border focus:border-navy'
          } disabled:cursor-not-allowed disabled:opacity-50`}
          aria-invalid={error ? true : undefined}
          {...rest}
        />
      </div>
    </FieldShell>
  );
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, FieldMeta {}

export function Textarea({ label, helper, error, className = '', id, ...rest }: TextareaProps) {
  const fieldId = useId();
  const controlId = id ?? fieldId;
  return (
    <FieldShell fieldId={controlId} label={label} helper={helper} error={error} className={className}>
      <textarea
        id={controlId}
        rows={3}
        className={`min-h-[72px] w-full resize-y rounded-ot-md border bg-ot-bg px-3 py-2.5 font-sans text-sm text-ot-text outline-none transition-shadow placeholder:text-ot-muted ${
          error ? 'border-danger focus:border-danger' : 'border-ot-border focus:border-navy'
        } disabled:cursor-not-allowed disabled:opacity-50`}
        aria-invalid={error ? true : undefined}
        {...rest}
      />
    </FieldShell>
  );
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>, FieldMeta {}

export function Select({ label, helper, error, className = '', children, id, ...rest }: SelectProps) {
  const fieldId = useId();
  const controlId = id ?? fieldId;
  return (
    <FieldShell fieldId={controlId} label={label} helper={helper} error={error} className={className}>
      <div className="relative">
        <select
          id={controlId}
          className={`${CONTROL} appearance-none pr-9 ${
            error ? 'border-danger focus:border-danger' : 'border-ot-border focus:border-navy'
          } disabled:cursor-not-allowed disabled:opacity-50`}
          aria-invalid={error ? true : undefined}
          {...rest}
        >
          {children}
        </select>
        <ChevronDown
          size={16}
          aria-hidden
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ot-muted"
        />
      </div>
    </FieldShell>
  );
}
