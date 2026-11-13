import * as React from "react";
import {
  IconBook,
  IconBriefcase,
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
  IconFile,
  IconFileLines,
  IconGraduation,
  IconHome,
  IconSupport,
  IconUserTie,
} from "./icons";
import { cn } from "./utils";
import "./sidebar.css";

/* ------------------------------------------------------------------ */
/* SidebarItem — пункт меню                                            */
/* ------------------------------------------------------------------ */

export interface SidebarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  /** Счётчик (непрочитанные). В свёрнутом виде — точка */
  badge?: number;
  /** Только иконка (название — в title и aria-label) */
  collapsed?: boolean;
}

export function SidebarItem({ icon, label, active = false, badge, collapsed = false, className, ...props }: SidebarItemProps) {
  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      aria-label={collapsed ? (badge ? `${label}, новых: ${badge}` : label) : undefined}
      title={collapsed ? label : undefined}
      className={cn("cs-sidebar-item", active && "cs-sidebar-item--active", collapsed && "cs-sidebar-item--collapsed", className)}
      {...props}
    >
      <span className="cs-sidebar-item__icon">
        {icon}
        {collapsed && !!badge && <span className="cs-sidebar-item__dot" />}
      </span>
      {!collapsed && <span className="cs-sidebar-item__label">{label}</span>}
      {!collapsed && !!badge && <span className="cs-sidebar-item__badge">{badge > 99 ? "99+" : badge}</span>}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Sidebar — боковая навигация приложения                              */
/* ------------------------------------------------------------------ */

export interface SidebarNavItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
}

export type SidebarRole = "admin" | "mentor" | "student";

/** Пункты меню по ролям — как в макете Figma */
export const sidebarRoleItems: Record<SidebarRole, SidebarNavItem[]> = {
  admin: [
    { key: "home", icon: <IconHome />, label: "Главная" },
    { key: "mentors", icon: <IconUserTie />, label: "Наставники" },
    { key: "students", icon: <IconGraduation />, label: "Практиканты" },
    { key: "reports", icon: <IconFile />, label: "Отчёты" },
    { key: "dictionaries", icon: <IconBook />, label: "Справочники" },
  ],
  mentor: [
    { key: "students", icon: <IconGraduation />, label: "Практиканты" },
    { key: "vacancies", icon: <IconBriefcase />, label: "Мои вакансии" },
    { key: "planning", icon: <IconCalendar />, label: "Планирование" },
  ],
  student: [
    { key: "practice", icon: <IconFileLines />, label: "Практика" },
    { key: "mentor", icon: <IconUserTie />, label: "Наставник" },
  ],
};

export interface SidebarProps {
  /** Готовый набор пунктов для роли: admin (кадровый администратор), mentor, student */
  role?: SidebarRole;
  /** Свои пункты (вместо role) */
  items?: SidebarNavItem[];
  /** Группы пунктов с заголовками (вместо items) */
  groups?: { title?: string; items: SidebarNavItem[] }[];
  activeKey?: string;
  onSelect?: (key: string) => void;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  onSupportClick?: () => void;
  className?: string;
}

/** Боковая навигация. Логотип продукта живёт в Header, в сайдбаре его нет */
export function Sidebar({
  role,
  items,
  groups,
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
  const sections = groups ?? [{ items: items ?? (role ? sidebarRoleItems[role] : []) }];

  return (
    <aside className={cn("cs-sidebar", collapsed && "cs-sidebar--collapsed", className)} aria-label="Основная навигация">
      <nav className="cs-sidebar__nav">
        {sections.map((s, i) => (
          <div key={i} className="cs-sidebar__group">
            {s.title && !collapsed && <p className="cs-sidebar__group-title">{s.title}</p>}
            {s.items.map((it) => (
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
          </div>
        ))}
      </nav>
      <div className="cs-sidebar__footer">
        <SidebarItem icon={<IconSupport />} label="Поддержка" collapsed={collapsed} onClick={onSupportClick} />
        <SidebarItem
          icon={collapsed ? <IconChevronRight /> : <IconChevronLeft />}
          label={collapsed ? "Развернуть меню" : "Свернуть меню"}
          collapsed={collapsed}
          aria-expanded={!collapsed}
          onClick={toggle}
        />
      </div>
    </aside>
  );
}
