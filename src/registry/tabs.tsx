import * as React from "react";
import "./tabs.css";

export interface TabItem {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** underline — строка с подчёркиванием, pill — сегментированный контейнер */
  variant?: "underline" | "pill";
  className?: string;
}

export function Tabs({ items, value, defaultValue, onChange, variant = "underline", className }: TabsProps) {
  const [inner, setInner] = React.useState(defaultValue ?? items[0]?.value);
  const current = value ?? inner;
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const select = (v: string) => {
    setInner(v);
    onChange?.(v);
  };

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const dir = e.key === "ArrowRight" ? 1 : -1;
    for (let i = 1; i <= items.length; i++) {
      const next = (index + dir * i + items.length) % items.length;
      if (!items[next].disabled) {
        refs.current[next]?.focus();
        select(items[next].value);
        break;
      }
    }
  };

  return (
    <div role="tablist" className={["cs-tabs", `cs-tabs--${variant}`, className].filter(Boolean).join(" ")}>
      {items.map((it, i) => {
        const active = it.value === current;
        return (
          <button
            key={it.value}
            ref={(el) => (refs.current[i] = el)}
            type="button"
            role="tab"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            disabled={it.disabled}
            className={["cs-tabs__tab", active && "cs-tabs__tab--active"].filter(Boolean).join(" ")}
            onClick={() => select(it.value)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
