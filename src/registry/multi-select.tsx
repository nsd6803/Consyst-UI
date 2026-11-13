import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { IconCheck, IconChevronDown, IconRotate, IconSearch } from "./icons";
import { FloatingLabel, useFieldControl, useFloatingLabel } from "./field";
import { cn } from "./utils";
import "./control.css";
import "./menu.css";
import "./select.css";
import "./multi-select.css";

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  /** Плавающая подпись внутри поля (внутри <Field> берётся из его label) */
  label?: React.ReactNode;
  /** Поиск по списку (включается автоматически, если пунктов больше 7) */
  searchable?: boolean;
  /** Пункт «Сбросить» внизу */
  resettable?: boolean;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  invalid?: boolean;
  id?: string;
  className?: string;
  "aria-label"?: string;
}

/** Множественный выбор с поиском — для фильтров таблиц (статус, ВУЗ, наставник) */
export function MultiSelect({
  options,
  value,
  defaultValue = [],
  onValueChange,
  placeholder = "Выберите",
  label,
  searchable,
  resettable = true,
  size = "md",
  className,
  "aria-label": ariaLabel,
  ...rest
}: MultiSelectProps) {
  const field = useFieldControl(rest);
  const float = useFloatingLabel(label, size);
  const labelId = React.useId();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [inner, setInner] = React.useState<string[]>(defaultValue);
  const selected = value ?? inner;
  const listRef = React.useRef<HTMLDivElement>(null);
  const listId = React.useId();
  const showSearch = searchable ?? options.length > 7;

  const set = (next: string[]) => {
    setInner(next);
    onValueChange?.(next);
  };
  const toggle = (v: string) => set(selected.includes(v) ? selected.filter((x) => x !== v) : [...selected, v]);

  const filtered = query ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase())) : options;
  const labels = options.filter((o) => selected.includes(o.value)).map((o) => o.label);

  // Стрелки ↑/↓ перемещают фокус по пунктам
  const onListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const items = Array.from(listRef.current?.querySelectorAll<HTMLButtonElement>("[role=option]:not(:disabled)") ?? []);
    const i = items.indexOf(document.activeElement as HTMLButtonElement);
    const next = e.key === "ArrowDown" ? Math.min(i + 1, items.length - 1) : Math.max(i - 1, 0);
    items[next]?.focus();
  };

  return (
    <PopoverPrimitive.Root
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setQuery("");
      }}
    >
      <PopoverPrimitive.Trigger
        id={field.id}
        disabled={field.disabled}
        aria-label={ariaLabel}
        aria-labelledby={float.floating && !ariaLabel ? labelId : undefined}
        aria-haspopup="listbox"
        aria-controls={listId}
        aria-invalid={field["aria-invalid"]}
        aria-describedby={field["aria-describedby"]}
        className={cn("cs-control", `cs-control--${size}`, "cs-select__trigger", float.floating && "cs-control--floating", className)}
        data-invalid={field.invalid || undefined}
        data-disabled={field.disabled || undefined}
        data-placeholder={labels.length === 0 || undefined}
      >
        <span className="cs-control__float">
          <span className="cs-select__value">
            {labels.length === 0 ? placeholder : labels.length === 1 ? labels[0] : `${labels[0]} и ещё ${labels.length - 1}`}
          </span>
          {float.floating && (
            <FloatingLabel as="span" id={labelId} required={field.required ?? float.required}>
              {float.label}
            </FloatingLabel>
          )}
        </span>
        {labels.length > 1 && <span className="cs-multi-select__count">{labels.length}</span>}
        <span className="cs-select__chevron">
          <IconChevronDown size={12} />
        </span>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className="cs-menu cs-multi-select__content"
          align="start"
          sideOffset={4}
          onOpenAutoFocus={(e) => {
            if (!showSearch) {
              e.preventDefault();
              listRef.current?.querySelector<HTMLButtonElement>("[role=option]")?.focus();
            }
          }}
        >
          {showSearch && (
            <div className="cs-multi-select__search">
              <IconSearch size={14} />
              <input
                autoFocus
                placeholder="Поиск"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    listRef.current?.querySelector<HTMLButtonElement>("[role=option]")?.focus();
                  }
                }}
                aria-label="Поиск по списку"
              />
            </div>
          )}
          <div ref={listRef} id={listId} role="listbox" aria-multiselectable="true" onKeyDown={onListKeyDown}>
            {filtered.map((o) => {
              const isSel = selected.includes(o.value);
              return (
                <button
                  key={o.value}
                  type="button"
                  role="option"
                  aria-selected={isSel}
                  disabled={o.disabled}
                  data-disabled={o.disabled || undefined}
                  className="cs-menu-item"
                  onClick={() => toggle(o.value)}
                >
                  <span className="cs-menu-item__box">
                    <IconCheck />
                  </span>
                  <span className="cs-menu-item__text">{o.label}</span>
                </button>
              );
            })}
            {filtered.length === 0 && <div className="cs-menu__empty">Ничего не найдено</div>}
          </div>
          {resettable && selected.length > 0 && (
            <>
              <div className="cs-menu__separator" />
              <button type="button" className="cs-menu-item cs-multi-select__reset" onClick={() => set([])}>
                <span className="cs-menu-item__icon">
                  <IconRotate size={12} />
                </span>
                Сбросить
              </button>
            </>
          )}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
