import * as React from "react";
import { IconCircleX } from "./icons";
import "./input.css";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Плавающая подпись — в пустом поле это плейсхолдер, при вводе поднимается на рамку */
  label?: string;
  /** Текст ошибки. Если передан — поле подсвечивается красным */
  error?: string;
  /** Иконка справа */
  icon?: React.ReactNode;
  /** Показывать кнопку очистки, когда поле заполнено */
  clearable?: boolean;
  onClear?: () => void;
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, icon, clearable = true, onClear, containerClassName, className, disabled, id, value, defaultValue, onChange, ...props },
    ref,
  ) => {
    const autoId = React.useId();
    const inputId = id ?? autoId;
    const innerRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

    const [inner, setInner] = React.useState(String(defaultValue ?? ""));
    const current = value !== undefined ? String(value) : inner;
    const hasValue = current.length > 0;

    const clear = () => {
      setInner("");
      onClear?.();
      innerRef.current?.focus();
    };

    return (
      <div className={["cs-field-wrap", containerClassName].filter(Boolean).join(" ")}>
        <div
          className={[
            "cs-field",
            error && "cs-field--error",
            disabled && "cs-field--disabled",
            hasValue && "cs-field--filled",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <input
            ref={innerRef}
            id={inputId}
            className={["cs-field__control", className].filter(Boolean).join(" ")}
            placeholder=" "
            disabled={disabled}
            aria-invalid={!!error || undefined}
            value={current}
            onChange={(e) => {
              setInner(e.target.value);
              onChange?.(e);
            }}
            {...props}
          />
          {label && (
            <label htmlFor={inputId} className="cs-field__label">
              {label}
            </label>
          )}
          {icon && <span className="cs-field__icon">{icon}</span>}
          {clearable && hasValue && !disabled && (
            <button type="button" className="cs-field__clear" onClick={clear} aria-label="Очистить">
              <IconCircleX size={14} />
            </button>
          )}
        </div>
        {error && <p className="cs-field__error">{error}</p>}
      </div>
    );
  },
);
Input.displayName = "Input";
