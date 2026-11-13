import * as React from "react";
import { IconCircleCheck, IconCircleX, IconInfo, IconWarning, IconX } from "./icons";
import { cn } from "./utils";
import "./alert.css";

export type AlertTone = "info" | "success" | "warning" | "danger";

const icons: Record<AlertTone, React.ReactNode> = {
  info: <IconInfo />,
  success: <IconCircleCheck />,
  warning: <IconWarning />,
  danger: <IconCircleX />,
};

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  tone?: AlertTone;
  title?: React.ReactNode;
  /** false — без иконки; ReactNode — своя иконка */
  icon?: boolean | React.ReactNode;
  /** Кнопка действия справа или под текстом */
  action?: React.ReactNode;
  /** Показывает крестик */
  onClose?: () => void;
}

/** Встроенное сообщение на странице (бывший Info field). Для всплывающих — Toast */
export function Alert({ tone = "info", title, icon = true, action, onClose, className, children, ...props }: AlertProps) {
  const iconNode = icon === true ? icons[tone] : icon || null;
  return (
    <div
      role={tone === "danger" || tone === "warning" ? "alert" : "status"}
      className={cn("cs-alert", `cs-alert--${tone}`, className)}
      {...props}
    >
      {iconNode && <span className="cs-alert__icon">{iconNode}</span>}
      <div className="cs-alert__body">
        {title && <p className="cs-alert__title">{title}</p>}
        {children && <div className="cs-alert__text">{children}</div>}
      </div>
      {action && <div className="cs-alert__action">{action}</div>}
      {onClose && (
        <button type="button" className="cs-alert__close" onClick={onClose} aria-label="Закрыть">
          <IconX size={14} />
        </button>
      )}
    </div>
  );
}

/** @deprecated Старое имя из макетов — используйте Alert */
export const InfoField = Alert;
