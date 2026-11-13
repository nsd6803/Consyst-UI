import * as React from "react";
import { IconX } from "./icons";
import { cn } from "./utils";
import "./tag.css";

export interface TagProps extends Omit<React.HTMLAttributes<HTMLElement>, "onClick"> {
  /** Выбранный тег (фильтр, навык) */
  selected?: boolean;
  disabled?: boolean;
  /** Делает тег кнопкой-переключателем */
  onClick?: () => void;
  /** Показывает крестик удаления */
  onRemove?: () => void;
  icon?: React.ReactNode;
  size?: "sm" | "md";
}

/** Метка: навык, фильтр, выбранное значение. Может быть выбираемой и удаляемой */
export function Tag({ selected = false, disabled, onClick, onRemove, icon, size = "md", className, children, ...props }: TagProps) {
  const classes = cn(
    "cs-tag",
    `cs-tag--${size}`,
    selected && "cs-tag--selected",
    onClick && "cs-tag--interactive",
    disabled && "cs-tag--disabled",
    className,
  );
  const content = (
    <>
      {icon && <span className="cs-tag__icon">{icon}</span>}
      <span className="cs-tag__text">{children}</span>
    </>
  );

  return (
    <span className={classes} {...props}>
      {onClick ? (
        <button type="button" className="cs-tag__main" aria-pressed={selected} disabled={disabled} onClick={onClick}>
          {content}
        </button>
      ) : (
        <span className="cs-tag__main">{content}</span>
      )}
      {onRemove && (
        <button
          type="button"
          className="cs-tag__remove"
          onClick={onRemove}
          disabled={disabled}
          aria-label={`Удалить ${typeof children === "string" ? children : ""}`.trim()}
        >
          <IconX size={10} />
        </button>
      )}
    </span>
  );
}
