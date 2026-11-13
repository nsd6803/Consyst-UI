import * as React from "react";
import { cn } from "./utils";
import "./card.css";

/** Карточка — контейнер для группы связанного контента. Составная: Card > CardHeader / CardContent / CardFooter */
export function Card({
  className,
  variant = "elevated",
  padding = "md",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  /** elevated — белая поверхность с тенью, filled — залитая карточка на белом фоне */
  variant?: "elevated" | "filled";
  padding?: "sm" | "md" | "lg";
}) {
  return <div className={cn("cs-card", `cs-card--${variant}`, `cs-card--pad-${padding}`, className)} {...props} />;
}

export function CardHeader({
  className,
  action,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { /** Кнопки или меню справа в шапке */ action?: React.ReactNode }) {
  return (
    <div className={cn("cs-card__header", className)} {...props}>
      <div className="cs-card__heading">{children}</div>
      {action && <div className="cs-card__action">{action}</div>}
    </div>
  );
}

export function CardTitle({ className, as: Tag = "h3", ...props }: React.HTMLAttributes<HTMLHeadingElement> & { as?: "h2" | "h3" | "h4" }) {
  return <Tag className={cn("cs-card__title", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("cs-card__description", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("cs-card__content", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("cs-card__footer", className)} {...props} />;
}
