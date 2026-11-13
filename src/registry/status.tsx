import * as React from "react";
import { cn } from "./utils";
import "./status.css";

export type StatusTone = "neutral" | "primary" | "success" | "warning" | "danger" | "info" | "accent";

export interface StatusProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Смысл статуса: success — завершено, warning — ожидание, danger — отклонено… */
  tone?: StatusTone;
  /** subtle — мягкая заливка (по умолчанию), solid — насыщенная */
  variant?: "subtle" | "solid";
  size?: "sm" | "md";
  /** Цветная точка перед текстом */
  dot?: boolean;
  icon?: React.ReactNode;
}

/** Статус объекта (заявки, практики, документа). Не кликабельный — для действий используйте Tag или Button */
export function Status({ tone = "neutral", variant = "subtle", size = "md", dot, icon, className, children, ...props }: StatusProps) {
  return (
    <span className={cn("cs-status", `cs-status--${tone}`, `cs-status--${variant}`, `cs-status--${size}`, className)} {...props}>
      {dot && <span className="cs-status__dot" aria-hidden="true" />}
      {icon && <span className="cs-status__icon">{icon}</span>}
      <span className="cs-status__text">{children}</span>
    </span>
  );
}
