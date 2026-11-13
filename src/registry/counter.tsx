import * as React from "react";
import { cn } from "./utils";
import "./counter.css";

export interface CounterProps extends React.HTMLAttributes<HTMLSpanElement> {
  count?: number;
  /** Больше этого числа показывается как «99+» */
  max?: number;
  /** Только точка без числа */
  dot?: boolean;
  tone?: "danger" | "primary" | "neutral";
  /** Показывать при count = 0 */
  showZero?: boolean;
  /** Элемент, к углу которого крепится счётчик (иконка, аватар) */
  children?: React.ReactNode;
}

/** Счётчик непрочитанного / точка-индикатор. С children — прикрепляется к углу элемента */
export function Counter({ count = 0, max = 99, dot, tone = "danger", showZero, className, children, ...props }: CounterProps) {
  const hidden = !dot && count <= 0 && !showZero;
  const badge = hidden ? null : (
    <span
      className={cn("cs-counter", `cs-counter--${tone}`, dot && "cs-counter--dot", children != null && "cs-counter--attached", className)}
      aria-label={dot ? "Есть новые" : `${count} новых`}
      {...props}
    >
      {!dot && (count > max ? `${max}+` : count)}
    </span>
  );
  if (children == null) return badge;
  return (
    <span className="cs-counter-anchor">
      {children}
      {badge}
    </span>
  );
}
