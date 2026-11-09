import * as React from "react";
import "./toggle.css";

export interface ToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: React.ReactNode;
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ checked, defaultChecked = false, onCheckedChange, label, className, disabled, ...props }, ref) => {
    const [inner, setInner] = React.useState(defaultChecked);
    const isOn = checked ?? inner;

    const control = (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isOn}
        disabled={disabled}
        className={["cs-toggle", isOn && "cs-toggle--on", !label && className].filter(Boolean).join(" ")}
        onClick={() => {
          setInner(!isOn);
          onCheckedChange?.(!isOn);
        }}
        {...props}
      >
        <span className="cs-toggle__thumb" />
      </button>
    );

    if (!label) return control;
    return (
      <label className={["cs-toggle-field", className].filter(Boolean).join(" ")}>
        {control}
        <span>{label}</span>
      </label>
    );
  },
);
Toggle.displayName = "Toggle";
