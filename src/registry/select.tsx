import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { IconCheck, IconChevronDown } from "./icons";
import { FloatingLabel, useFieldControl, useFloatingLabel } from "./field";
import { cn } from "./utils";
import "./control.css";
import "./menu.css";
import "./select.css";

export interface SelectOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  /** Группа (заголовок группы в списке) */
  group?: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  /** Плавающая подпись внутри поля (внутри <Field> берётся из его label) */
  label?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  className?: string;
  "aria-label"?: string;
}

/** Выбор одного значения из списка. Клавиатура, поиск по первой букве и ARIA — из Radix */
export function Select({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Выберите",
  size = "md",
  label,
  name,
  className,
  "aria-label": ariaLabel,
  ...rest
}: SelectProps) {
  const field = useFieldControl(rest);
  const float = useFloatingLabel(label, size);
  const labelId = React.useId();
  const groups = React.useMemo(() => {
    const map = new Map<string, SelectOption[]>();
    for (const o of options) {
      const key = o.group ?? "";
      map.set(key, [...(map.get(key) ?? []), o]);
    }
    return [...map.entries()];
  }, [options]);

  return (
    <SelectPrimitive.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={field.disabled}
      required={field.required}
      name={name}
    >
      <SelectPrimitive.Trigger
        id={field.id}
        aria-label={ariaLabel}
        aria-labelledby={float.floating && !ariaLabel ? labelId : undefined}
        aria-invalid={field["aria-invalid"]}
        aria-describedby={field["aria-describedby"]}
        className={cn("cs-control", `cs-control--${size}`, "cs-select__trigger", float.floating && "cs-control--floating", className)}
        data-invalid={field.invalid || undefined}
        data-disabled={field.disabled || undefined}
      >
        <span className="cs-control__float">
          <span className="cs-select__value">
            <SelectPrimitive.Value placeholder={placeholder} />
          </span>
          {float.floating && (
            <FloatingLabel as="span" id={labelId} required={field.required ?? float.required}>
              {float.label}
            </FloatingLabel>
          )}
        </span>
        <SelectPrimitive.Icon className="cs-select__chevron">
          <IconChevronDown size={12} />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className="cs-menu" position="popper" sideOffset={4}>
          <SelectPrimitive.Viewport>
            {groups.map(([group, items], gi) => (
              <SelectPrimitive.Group key={group || gi}>
                {gi > 0 && <SelectPrimitive.Separator className="cs-menu__separator" />}
                {group && <SelectPrimitive.Label className="cs-menu__group-label">{group}</SelectPrimitive.Label>}
                {items.map((o) => (
                  <SelectPrimitive.Item key={o.value} value={o.value} disabled={o.disabled} className="cs-menu-item">
                    <SelectPrimitive.ItemText>{o.label}</SelectPrimitive.ItemText>
                    <SelectPrimitive.ItemIndicator className="cs-menu-item__check">
                      <IconCheck size={12} />
                    </SelectPrimitive.ItemIndicator>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Group>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
