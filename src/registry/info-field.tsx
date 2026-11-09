import * as React from "react";
import { IconCircleCheck, IconCircleX, IconInfo, IconWarning } from "./icons";
import "./info-field.css";

export type InfoFieldType = "success" | "error" | "info" | "warning";

const icons: Record<InfoFieldType, React.ReactNode> = {
  success: <IconCircleCheck size={16} />,
  error: <IconCircleX size={16} />,
  info: <IconInfo size={16} />,
  warning: <IconWarning size={16} />,
};

export interface InfoFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: InfoFieldType;
  /** Показывать иконку статуса. Можно передать свою иконку */
  icon?: boolean | React.ReactNode;
}

export function InfoField({ type = "info", icon = true, className, children, ...props }: InfoFieldProps) {
  const iconNode = icon === true ? icons[type] : icon || null;
  return (
    <div
      role={type === "error" ? "alert" : "status"}
      className={["cs-info-field", `cs-info-field--${type}`, className].filter(Boolean).join(" ")}
      {...props}
    >
      {iconNode && <span className="cs-info-field__icon">{iconNode}</span>}
      <div className="cs-info-field__text">{children}</div>
    </div>
  );
}
