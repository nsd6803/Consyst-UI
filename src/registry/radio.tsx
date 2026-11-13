import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { useFieldControl } from "./field";
import { cn } from "./utils";
import "./checkbox.css";
import "./radio.css";

export interface RadioOption {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>, "children"> {
  options?: RadioOption[];
  /** horizontal — в строку */
  orientation?: "vertical" | "horizontal";
  invalid?: boolean;
  children?: React.ReactNode;
}

/** Группа радиокнопок. Стрелки переключают выбор — из Radix */
export const RadioGroup = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Root>, RadioGroupProps>(
  ({ options, orientation = "vertical", invalid, className, children, id, ...props }, ref) => {
    const field = useFieldControl({ id, disabled: props.disabled, invalid });
    return (
      <RadioGroupPrimitive.Root
        ref={ref}
        id={field.id}
        orientation={orientation}
        aria-invalid={field["aria-invalid"]}
        aria-describedby={field["aria-describedby"]}
        className={cn("cs-radio-group", `cs-radio-group--${orientation}`, className)}
        {...props}
        disabled={field.disabled}
      >
        {options?.map((o) => <RadioItem key={o.value} {...o} />)}
        {children}
      </RadioGroupPrimitive.Root>
    );
  },
);
RadioGroup.displayName = "RadioGroup";

export function RadioItem({ value, label, description, disabled }: RadioOption) {
  const id = React.useId();
  return (
    <div className={cn("cs-choice", disabled && "cs-choice--disabled")}>
      <RadioGroupPrimitive.Item id={id} value={value} disabled={disabled} className="cs-radio">
        <RadioGroupPrimitive.Indicator className="cs-radio__dot" />
      </RadioGroupPrimitive.Item>
      <div className="cs-choice__text">
        <label htmlFor={id} className="cs-choice__label">
          {label}
        </label>
        {description && <p className="cs-choice__description">{description}</p>}
      </div>
    </div>
  );
}
