import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { useFieldControl } from "./field";
import { cn } from "./utils";
import "./checkbox.css";
import "./switch.css";

export interface SwitchProps extends Omit<React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>, "children"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  size?: "sm" | "md";
  /** Подпись слева от переключателя (как в настройках) */
  labelPosition?: "left" | "right";
}

/** Переключатель (Toggle): мгновенно включает/выключает настройку без кнопки «Сохранить» */
export const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, SwitchProps>(
  ({ label, description, size = "md", labelPosition = "right", className, id, ...props }, ref) => {
    const autoId = React.useId();
    const field = useFieldControl({ id, disabled: props.disabled });
    const controlId = field.id ?? autoId;

    const control = (
      <SwitchPrimitive.Root
        ref={ref}
        id={controlId}
        className={cn("cs-switch", `cs-switch--${size}`, !label && className)}
        aria-describedby={field["aria-describedby"]}
        {...props}
        disabled={field.disabled}
      >
        <SwitchPrimitive.Thumb className="cs-switch__thumb" />
      </SwitchPrimitive.Root>
    );
    if (!label) return control;

    return (
      <div
        className={cn(
          "cs-choice",
          "cs-switch-field",
          labelPosition === "left" && "cs-switch-field--left",
          field.disabled && "cs-choice--disabled",
          className,
        )}
      >
        {control}
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
Switch.displayName = "Switch";

/** Старое имя из макетов Figma */
export const Toggle = Switch;
