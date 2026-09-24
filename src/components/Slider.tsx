export interface SliderProps {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  showValue?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Slider({
  label,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  onChange,
  showValue = true,
  disabled = false,
  className = '',
}: SliderProps) {
  const current = value ?? defaultValue ?? min;
  return (
    <div className={`font-sans ${className}`}>
      {label || showValue ? (
        <div className="mb-1.5 flex items-center justify-between text-[13px]">
          {label ? <span className="font-semibold text-ot-text">{label}</span> : <span />}
          {showValue ? <span className="font-mono text-ot-muted">{current}</span> : null}
        </div>
      ) : null}
      <input
        type="range"
        aria-label={label ?? 'Slider'}
        min={min}
        max={max}
        step={step}
        value={current}
        disabled={disabled}
        onChange={(e) => onChange?.(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-ot-surface-2 accent-navy disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
}
