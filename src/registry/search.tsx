import * as React from "react";
import { IconCircleX, IconSearch } from "./icons";
import "./input.css";
import "./search.css";

export interface SearchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "medium" | "small";
  error?: string;
  onClear?: () => void;
  containerClassName?: string;
}

export const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  (
    { size = "medium", error, onClear, containerClassName, className, disabled, value, defaultValue, onChange, placeholder = "Поиск", ...props },
    ref,
  ) => {
    const [inner, setInner] = React.useState(String(defaultValue ?? ""));
    const current = value !== undefined ? String(value) : inner;

    return (
      <div className={["cs-field-wrap", containerClassName].filter(Boolean).join(" ")}>
        <div
          className={[
            "cs-field",
            "cs-search",
            `cs-search--${size}`,
            error && "cs-field--error",
            disabled && "cs-field--disabled",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <span className="cs-field__icon">
            <IconSearch size={size === "small" ? 12 : 14} />
          </span>
          <input
            ref={ref}
            type="search"
            disabled={disabled}
            placeholder={placeholder}
            aria-invalid={!!error || undefined}
            className={["cs-field__control", className].filter(Boolean).join(" ")}
            value={current}
            onChange={(e) => {
              setInner(e.target.value);
              onChange?.(e);
            }}
            {...props}
          />
          {current.length > 0 && !disabled && (
            <button
              type="button"
              className="cs-field__clear"
              aria-label="Очистить"
              onClick={() => {
                setInner("");
                onClear?.();
              }}
            >
              <IconCircleX size={size === "small" ? 12 : 14} />
            </button>
          )}
        </div>
        {error && <p className="cs-field__error">{error}</p>}
      </div>
    );
  },
);
Search.displayName = "Search";
