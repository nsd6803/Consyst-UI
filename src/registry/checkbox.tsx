import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { IconCheck, IconMinus } from "./icons";
import { useFieldControl } from "./field";
import { cn } from "./utils";
import "./checkbox.css";

export interface CheckboxProps extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, "children"> {
  /** Подпись справа */
  label?: React.ReactNode;
  /** Пояснение под подписью */
  description?: React.ReactNode;
  invalid?: boolean;
}

/** checked: true | false | "indeterminate" (частичный выбор) */
export const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ label, description, invalid, className, id, ...props }, ref) => {
    const autoId = React.useId();
    const field = useFieldControl({ id, disabled: props.disabled, invalid });
    const controlId = field.id ?? autoId;

    const box = (
      <CheckboxPrimitive.Root
        ref={ref}
        id={controlId}
        className={cn("cs-checkbox", !label && className)}
        aria-invalid={field["aria-invalid"]}
        aria-describedby={field["aria-describedby"]}
        {...props}
        disabled={field.disabled}
      >
        <CheckboxPrimitive.Indicator className="cs-checkbox__indicator">
          {props.checked === "indeterminate" ? <IconMinus /> : <IconCheck />}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );

    if (!label) return box;
    return (
      <div className={cn("cs-choice", field.disabled && "cs-choice--disabled", className)}>
        {box}
        <div className="cs-choice__text">
          <label htmlFor={controlId} className="cs-choice__label">
            {label}
          </label>
          {description && <p className="cs-choice__description">{description}</p>}
        </div>
      </div>
    );
  },
);
Checkbox.displayName = "Checkbox";
