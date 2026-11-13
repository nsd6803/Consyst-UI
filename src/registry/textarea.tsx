import * as React from "react";
import { FloatingLabel, useFieldControl, useFloatingLabel } from "./field";
import { cn } from "./utils";
import "./control.css";
import "./textarea.css";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Плавающая подпись внутри поля (внутри <Field> берётся из его label) */
  label?: React.ReactNode;
  /** Счётчик символов (нужен maxLength) */
  showCount?: boolean;
  /** Высота подстраивается под текст (до maxRows) */
  autoResize?: boolean;
  maxRows?: number;
  invalid?: boolean;
  containerClassName?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { label, showCount = false, autoResize = false, maxRows = 10, invalid, containerClassName, className, rows = 4, value, defaultValue, onChange, maxLength, ...props },
    ref,
  ) => {
    const field = useFieldControl({ ...props, invalid });
    const float = useFloatingLabel(label);
    const innerRef = React.useRef<HTMLTextAreaElement>(null);
    React.useImperativeHandle(ref, () => innerRef.current as HTMLTextAreaElement);
    const [inner, setInner] = React.useState(String(defaultValue ?? ""));
    const current = value !== undefined ? String(value) : inner;

    React.useLayoutEffect(() => {
      const el = innerRef.current;
      if (!autoResize || !el) return;
      el.style.height = "auto";
      const lh = parseFloat(getComputedStyle(el).lineHeight) || 20;
      el.style.height = `${Math.min(el.scrollHeight, lh * maxRows + 16)}px`;
    }, [current, autoResize, maxRows]);

    return (
      <div
        className={cn("cs-control", "cs-textarea", float.floating && "cs-control--floating", containerClassName)}
        data-filled={current.length > 0 || undefined}
        data-invalid={field.invalid || undefined}
        data-disabled={field.disabled || undefined}
      >
        <div className="cs-control__float">
        <textarea
          ref={innerRef}
          rows={rows}
          maxLength={maxLength}
          className={cn("cs-control__input", "cs-textarea__input", autoResize && "cs-textarea__input--auto", className)}
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
        {showCount && maxLength !== undefined && (
          <span className="cs-textarea__count" aria-live="polite">
            {current.length} / {maxLength}
          </span>
        )}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";
