import * as React from "react";
import { IconGraduation } from "./icons";
import "./notification-item.css";

export interface NotificationItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Время события, например «2 ч назад» */
  time?: React.ReactNode;
  /** Непрочитанное уведомление — красная точка у времени */
  unread?: boolean;
  /** Иконка в кружке слева */
  icon?: React.ReactNode;
  /** Действие под текстом (например, <Button size="tiny">) */
  action?: React.ReactNode;
}

export function NotificationItem({
  title,
  description,
  time,
  unread = false,
  icon = <IconGraduation size={12} />,
  action,
  className,
  ...props
}: NotificationItemProps) {
  return (
    <div className={["cs-notification-item", className].filter(Boolean).join(" ")} {...props}>
      <span className="cs-notification-item__avatar">{icon}</span>
      <div className="cs-notification-item__body">
        <div className="cs-notification-item__head">
          <span className="cs-notification-item__title">{title}</span>
          {time && <NotificationTime unread={unread}>{time}</NotificationTime>}
        </div>
        {description && <p className="cs-notification-item__desc">{description}</p>}
        {action && <div className="cs-notification-item__action">{action}</div>}
      </div>
    </div>
  );
}

export function NotificationTime({ unread, children }: { unread?: boolean; children: React.ReactNode }) {
  return (
    <span className="cs-notification-time">
      {children}
      {unread && <span className="cs-notification-time__dot" aria-label="Не прочитано" />}
    </span>
  );
}

export function NotificationList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={["cs-notification-list", className].filter(Boolean).join(" ")} {...props} />;
}
