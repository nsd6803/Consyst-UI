import * as React from "react";
import { IconInbox } from "./icons";
import { cn } from "./utils";
import "./empty-state.css";

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Кнопки: главное действие и, при необходимости, второстепенное */
  action?: React.ReactNode;
  size?: "sm" | "md";
}

/** Пустое состояние: нет данных, ничего не найдено, нет доступа */
export function EmptyState({ icon = <IconInbox />, title, description, action, size = "md", className, ...props }: EmptyStateProps) {
  return (
    <div className={cn("cs-empty", `cs-empty--${size}`, className)} {...props}>
      <span className="cs-empty__icon">{icon}</span>
      <p className="cs-empty__title">{title}</p>
      {description && <p className="cs-empty__description">{description}</p>}
      {action && <div className="cs-empty__action">{action}</div>}
    </div>
  );
}
