import * as React from "react";
import { IconCircleX, IconEye, IconEyeSlash } from "./icons";
import { FloatingLabel, useFieldControl, useFloatingLabel } from "./field";
import { cn } from "./utils";
import "./control.css";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
  size?: "sm" | "md" | "lg";
  /** Плавающая подпись внутри поля (внутри <Field> берётся из его label) */
  label?: React.ReactNode;
  /** Иконка или текст слева (например, ₽ или иконка поиска) */
  prefix?: React.ReactNode;
  /** Иконка или текст справа */
  suffix?: React.ReactNode;
  /** Кнопка очистки, когда поле заполнено */
  clearable?: boolean;
  onClear?: () => void;
  /** Ошибка без <Field> (внутри Field берётся из него) */
  invalid?: boolean;
  /** Класс оболочки */
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = "md",
      label,
      prefix,
      suffix,
      clearable = false,
      onClear,
      invalid,
      containerClassName,
      className,
      type = "text",
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref,
  ) => {
    const field = useFieldControl({ ...props, invalid });
    const float = useFloatingLabel(label, size);
    const innerRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

    const [inner, setInner] = React.useState(String(defaultValue ?? ""));
    const current = value !== undefined ? String(value) : inner;
    const [reveal, setReveal] = React.useState(false);
    const isPassword = type === "password";

    const clear = () => {
      setInner("");
      onClear?.();
      innerRef.current?.focus();
    };

    return (
      <div
        className={cn("cs-control", `cs-control--${size}`, float.floating && "cs-control--floating", containerClassName)}
        data-filled={current.length > 0 || undefined}
        data-invalid={field.invalid || undefined}
        data-disabled={field.disabled || undefined}
      >
        {prefix && <span className="cs-control__affix">{prefix}</span>}
        <div className="cs-control__float">
        <input
          ref={innerRef}
          type={isPassword && reveal ? "text" : type}
          className={cn("cs-control__input", className)}
          value={current}
          onChange={(e) => {
            setInner(e.target.value);
            onChange?.(e);
          }}
          {...props}
          id={field.id}
          disabled={field.disabled}
          required={field.required}
          aria-invalid={field["aria-invalid"]}
          aria-describedby={field["aria-describedby"]}
        />
        {float.floating && (
          <FloatingLabel htmlFor={field.id} required={field.required ?? float.required}>
            {float.label}
          </FloatingLabel>
        )}
        </div>
        {clearable && current.length > 0 && !field.disabled && (
          <button type="button" className="cs-control__action" onClick={clear} aria-label="Очистить">
            <IconCircleX size={14} />
          </button>
        )}
        {isPassword && (
          <button
            type="button"
            className="cs-control__action"
            onClick={() => setReveal((r) => !r)}
            aria-label={reveal ? "Скрыть пароль" : "Показать пароль"}
            aria-pressed={reveal}
          >
            {reveal ? <IconEyeSlash size={14} /> : <IconEye size={14} />}
          </button>
        )}
        {suffix && <span className="cs-control__affix">{suffix}</span>}
      </div>
    );
  },
);
Input.displayName = "Input";
