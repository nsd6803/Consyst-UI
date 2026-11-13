import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "./utils";
import "./feedback.css";

/* ------------------------------------------------------------------ */
/* Spinner — индикатор загрузки неизвестной длительности              */
/* ------------------------------------------------------------------ */

export function Spinner({
  size = "md",
  label = "Загрузка",
  className,
}: {
  size?: "sm" | "md" | "lg";
  /** Текст для скринридера */
  label?: string;
  className?: string;
}) {
  return (
    <span role="status" className={cn("cs-spinner", `cs-spinner--${size}`, className)}>
      <span className="cs-spinner__ring" aria-hidden="true" />
      <span className="cs-sr-only">{label}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Skeleton — заглушка контента во время загрузки                      */
/* ------------------------------------------------------------------ */

export function Skeleton({
  width,
  height = 16,
  circle,
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { width?: number | string; height?: number | string; circle?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn("cs-skeleton", circle && "cs-skeleton--circle", className)}
      style={{ width: circle ? height : width, height, ...style }}
      {...props}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Progress — прогресс известной длительности                          */
/* ------------------------------------------------------------------ */

export interface ProgressProps {
  /** 0–100 */
  value: number;
  tone?: "primary" | "success" | "warning" | "danger";
  size?: "sm" | "md";
  label?: React.ReactNode;
  /** Показывать «45%» справа от подписи */
  showValue?: boolean;
  className?: string;
}

export function Progress({ value, tone = "primary", size = "md", label, showValue, className }: ProgressProps) {
  const v = Math.max(0, Math.min(100, value));
  const id = React.useId();
  return (
    <div className={cn("cs-progress", className)}>
      {(label || showValue) && (
        <div className="cs-progress__meta">
          {label && <span id={id}>{label}</span>}
          {showValue && <span className="cs-progress__value">{Math.round(v)}%</span>}
        </div>
      )}
      <ProgressPrimitive.Root
        value={v}
        aria-labelledby={label ? id : undefined}
        className={cn("cs-progress__track", `cs-progress__track--${size}`)}
      >
        <ProgressPrimitive.Indicator
          className={cn("cs-progress__bar", `cs-progress__bar--${tone}`)}
          style={{ transform: `translateX(-${100 - v}%)` }}
        />
      </ProgressPrimitive.Root>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Separator                                                           */
/* ------------------------------------------------------------------ */

export function Separator({
  orientation = "horizontal",
  label,
  className,
}: {
  orientation?: "horizontal" | "vertical";
  /** Текст по центру линии («или») */
  label?: React.ReactNode;
  className?: string;
}) {
  if (label)
    return (
      <div role="separator" className={cn("cs-separator-label", className)}>
        <span>{label}</span>
      </div>
    );
  return <div role="separator" aria-orientation={orientation} className={cn("cs-separator", `cs-separator--${orientation}`, className)} />;
}
