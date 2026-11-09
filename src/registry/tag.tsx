import * as React from "react";
import { IconPen, IconTrash } from "./icons";
import "./tag.css";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** default — обычный, active — выбранный, inactive — недоступный */
  state?: "default" | "active" | "inactive";
  /** Если передан — при наведении появляется кнопка редактирования */
  onEdit?: () => void;
  /** Если передан — при наведении появляется кнопка удаления */
  onRemove?: () => void;
}

export function Tag({ state = "default", onEdit, onRemove, className, children, ...props }: TagProps) {
  const editable = !!(onEdit || onRemove);
  return (
    <span
      className={["cs-tag", `cs-tag--${state}`, editable && "cs-tag--editable", className].filter(Boolean).join(" ")}
      {...props}
    >
      <span className="cs-tag__text">{children}</span>
      {editable && (
        <span className="cs-tag__actions">
          {onEdit && (
            <button type="button" className="cs-tag__action" onClick={onEdit} aria-label="Редактировать">
              <IconPen size={10} />
            </button>
          )}
          {onRemove && (
            <button type="button" className="cs-tag__action" onClick={onRemove} aria-label="Удалить">
              <IconTrash size={10} />
            </button>
          )}
        </span>
      )}
    </span>
  );
}
