import * as React from "react";
import { IconChevronLeft, IconChevronRight, IconSupport } from "./icons";
import "./sidebar.css";

/* ------------------------------------------------------------------ */
/* SidebarItem — пункт меню                                            */
/* ------------------------------------------------------------------ */

export interface SidebarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: React.ReactNode;
  active?: boolean;
  /** Счётчик (например, непрочитанные). В свёрнутом виде — красная точка */
  badge?: number;
  /** Только иконка */
  collapsed?: boolean;
}

export function SidebarItem({ icon, label, active = false, badge, collapsed = false, className, ...props }: SidebarItemProps) {
  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      title={collapsed && typeof label === "string" ? label : undefined}
      className={[
        "cs-sidebar-item",
        active && "cs-sidebar-item--active",
        collapsed && "cs-sidebar-item--collapsed",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <span className="cs-sidebar-item__icon">
        {icon}
        {collapsed && !!badge && <span className="cs-sidebar-item__dot" />}
      </span>
      {!collapsed && <span className="cs-sidebar-item__label">{label}</span>}
      {!collapsed && !!badge && <span className="cs-sidebar-item__badge">{badge}</span>}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Sidebar — боковая панель                                            */
/* ------------------------------------------------------------------ */

export interface SidebarNavItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
}

export interface SidebarProps {
  items: SidebarNavItem[];
  activeKey?: string;
  onSelect?: (key: string) => void;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  onSupportClick?: () => void;
  className?: string;
}

export function Sidebar({
  items,
  activeKey,
  onSelect,
  collapsed: collapsedProp,
  onCollapsedChange,
  onSupportClick,
  className,
}: SidebarProps) {
  const [inner, setInner] = React.useState(false);
  const collapsed = collapsedProp ?? inner;
  const toggle = () => {
    setInner(!collapsed);
    onCollapsedChange?.(!collapsed);
  };

  return (
    <aside className={["cs-sidebar", collapsed && "cs-sidebar--collapsed", className].filter(Boolean).join(" ")}>
      <nav className="cs-sidebar__nav">
        {items.map((it) => (
          <SidebarItem
            key={it.key}
            icon={it.icon}
            label={it.label}
            badge={it.badge}
            collapsed={collapsed}
            active={it.key === activeKey}
            onClick={() => onSelect?.(it.key)}
          />
        ))}
      </nav>
      <div className="cs-sidebar__bottom">
        <SidebarItem icon={<IconSupport size={14} />} label="Поддержка" collapsed={collapsed} onClick={onSupportClick} />
        <SidebarItem
          icon={collapsed ? <IconChevronRight size={14} /> : <IconChevronLeft size={14} />}
          label="Свернуть"
          collapsed={collapsed}
          onClick={toggle}
        />
      </div>
    </aside>
  );
}
