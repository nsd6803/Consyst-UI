import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "./utils";
import "./tabs.css";

export interface TabItem {
  value: string;
  label: React.ReactNode;
  /** Счётчик справа от названия */
  count?: number;
  disabled?: boolean;
  /** Содержимое вкладки (если используете Tabs как контейнер) */
  content?: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** underline — переключение разделов страницы, pill — переключатель вида/периода */
  variant?: "underline" | "pill";
  size?: "sm" | "md";
  /** Растянуть вкладки на всю ширину */
  fullWidth?: boolean;
  className?: string;
  "aria-label"?: string;
}

/** Вкладки. Стрелки ←/→, Home/End и ARIA (tablist/tab/tabpanel) — из Radix */
export function Tabs({
  items,
  value,
  defaultValue,
  onValueChange,
  variant = "underline",
  size = "md",
  fullWidth,
  className,
  "aria-label": ariaLabel,
}: TabsProps) {
  const hasContent = items.some((i) => i.content !== undefined);
  return (
    <TabsPrimitive.Root
      value={value}
      defaultValue={defaultValue ?? items[0]?.value}
      onValueChange={onValueChange}
      className={cn("cs-tabs", className)}
    >
      <TabsPrimitive.List
        aria-label={ariaLabel}
        className={cn("cs-tabs__list", `cs-tabs__list--${variant}`, `cs-tabs__list--${size}`, fullWidth && "cs-tabs__list--full")}
      >
        {items.map((it) => (
          <TabsPrimitive.Trigger key={it.value} value={it.value} disabled={it.disabled} className="cs-tabs__tab">
            {it.label}
            {it.count !== undefined && <span className="cs-tabs__count">{it.count}</span>}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {hasContent &&
        items.map((it) => (
          <TabsPrimitive.Content key={it.value} value={it.value} className="cs-tabs__panel">
            {it.content}
          </TabsPrimitive.Content>
        ))}
    </TabsPrimitive.Root>
  );
}
