import * as React from "react";
import { IconCheck, IconMinus } from "./icons";
import "./checkbox.css";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** Частичный выбор (например, «выбраны не все строки») */
  indeterminate?: boolean;
  /** Подпись справа от чекбокса */
  label?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ indeterminate = false, label, className, disabled, ...props }, ref) => {
    const innerRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);
    React.useEffect(() => {
      if (innerRef.current) innerRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    return (
      <label
        className={["cs-checkbox", disabled && "cs-checkbox--disabled", className]
          .filter(Boolean)
          .join(" ")}
      >
        <input ref={innerRef} type="checkbox" className="cs-checkbox__input" disabled={disabled} {...props} />
        <span className="cs-checkbox__box" data-indeterminate={indeterminate || undefined}>
          {indeterminate ? <IconMinus size={12} strokeWidth={3} /> : <IconCheck size={12} strokeWidth={3} />}
        </span>
        {label && <span className="cs-checkbox__label">{label}</span>}
      </label>
    );
  },
);
Checkbox.displayName = "Checkbox";
