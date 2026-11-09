import * as React from "react";
import "./tooltip.css";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  /** Задержка появления, мс */
  delay?: number;
  className?: string;
}

export function Tooltip({ content, children, side = "top", delay = 150, className }: TooltipProps) {
  const [open, setOpen] = React.useState(false);
  const timer = React.useRef<number>();
  const id = React.useId();

  const show = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(true), delay);
  };
  const hide = () => {
    window.clearTimeout(timer.current);
    setOpen(false);
  };
  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <span
      className={["cs-tooltip", className].filter(Boolean).join(" ")}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      aria-describedby={open ? id : undefined}
    >
      {children}
      {open && (
        <span role="tooltip" id={id} className={`cs-tooltip__content cs-tooltip__content--${side}`}>
          {content}
        </span>
      )}
    </span>
  );
}
