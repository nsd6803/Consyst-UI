import * as React from "react";
import "./input.css";
import "./textarea.css";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  /** Показывать счётчик символов (нужен maxLength) */
  showCount?: boolean;
  containerClassName?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { label, error, showCount = true, maxLength = 256, containerClassName, className, disabled, id, value, defaultValue, onChange, rows = 4, ...props },
    ref,
  ) => {
    const autoId = React.useId();
    const fieldId = id ?? autoId;
    const [inner, setInner] = React.useState(String(defaultValue ?? ""));
    const current = value !== undefined ? String(value) : inner;

    return (
      <div className={["cs-field-wrap", containerClassName].filter(Boolean).join(" ")}>
        <div
          className={[
            "cs-field",
            "cs-textarea",
            error && "cs-field--error",
            disabled && "cs-field--disabled",
            current.length > 0 && "cs-field--filled",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <textarea
            ref={ref}
            id={fieldId}
            rows={rows}
            maxLength={maxLength}
            placeholder=" "
            disabled={disabled}
            aria-invalid={!!error || undefined}
            className={["cs-field__control", "cs-textarea__control", className].filter(Boolean).join(" ")}
            value={current}
            onChange={(e) => {
              setInner(e.target.value);
              onChange?.(e);
            }}
            {...props}
          />
          {label && (
            <label htmlFor={fieldId} className="cs-field__label">
              {label}
            </label>
          )}
          {showCount && (
            <span className="cs-textarea__count">
              {current.length}/{maxLength}
            </span>
          )}
        </div>
        {error && <p className="cs-field__error">{error}</p>}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";
