import * as React from "react";
import "./status.css";

export type StatusState = "success" | "error" | "info" | "warning" | "default";

export interface StatusProps extends React.HTMLAttributes<HTMLSpanElement> {
  state?: StatusState;
  /** Иконка перед текстом */
  icon?: React.ReactNode;
}

export function Status({ state = "default", icon, className, children, ...props }: StatusProps) {
  return (
    <span className={["cs-status", `cs-status--${state}`, className].filter(Boolean).join(" ")} {...props}>
      {icon && <span className="cs-status__icon">{icon}</span>}
      <span className="cs-status__text">{children}</span>
    </span>
  );
}
