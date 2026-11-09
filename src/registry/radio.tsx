import * as React from "react";
import "./radio.css";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: React.ReactNode;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, className, disabled, ...props }, ref) => (
    <label
      className={["cs-radio", disabled && "cs-radio--disabled", className].filter(Boolean).join(" ")}
    >
      <input ref={ref} type="radio" className="cs-radio__input" disabled={disabled} {...props} />
      <span className="cs-radio__circle" />
      {label && <span className="cs-radio__label">{label}</span>}
    </label>
  ),
);
Radio.displayName = "Radio";

export interface RadioGroupProps {
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options: { value: string; label: React.ReactNode; disabled?: boolean }[];
  /** Расположение пунктов */
  direction?: "vertical" | "horizontal";
  className?: string;
}

export function RadioGroup({
  name,
  value,
  defaultValue,
  onChange,
  options,
  direction = "vertical",
  className,
}: RadioGroupProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const current = value ?? inner;
  return (
    <div
      role="radiogroup"
      className={["cs-radio-group", `cs-radio-group--${direction}`, className].filter(Boolean).join(" ")}
    >
      {options.map((o) => (
        <Radio
          key={o.value}
          name={name}
          value={o.value}
          label={o.label}
          disabled={o.disabled}
          checked={current === o.value}
          onChange={() => {
            setInner(o.value);
            onChange?.(o.value);
          }}
        />
      ))}
    </div>
  );
}
