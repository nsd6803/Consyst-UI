import * as React from "react";
import { IconCheck, IconChevronDown, IconRotate, IconSearch } from "./icons";
import "./checkbox.css";
import "./dropdown.css";

/* ------------------------------------------------------------------ */
/* Примитивы: меню и пункт меню                                        */
/* ------------------------------------------------------------------ */

export function DropdownMenu({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div role="menu" className={["cs-dropdown-menu", className].filter(Boolean).join(" ")} {...props} />;
}

export interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  /** Показать чекбокс слева (для множественного выбора) */
  checkbox?: boolean;
  icon?: React.ReactNode;
  /** Цвет текста пункта */
  tone?: "default" | "success" | "error" | "primary";
}

export function DropdownItem({
  selected = false,
  checkbox = false,
  icon,
  tone = "default",
  className,
  children,
  ...props
}: DropdownItemProps) {
  return (
    <button
      type="button"
      role={checkbox ? "menuitemcheckbox" : "menuitem"}
      aria-checked={checkbox ? selected : undefined}
      className={[
        "cs-dropdown-item",
        selected && "cs-dropdown-item--selected",
        `cs-dropdown-item--${tone}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {checkbox && (
        <span className="cs-checkbox__box" data-checked={selected || undefined}>
          <IconCheck size={12} strokeWidth={3} />
        </span>
      )}
      {icon && <span className="cs-dropdown-item__icon">{icon}</span>}
      <span className="cs-dropdown-item__text">{children}</span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Dropdown: триггер + выпадающий список                               */
/* ------------------------------------------------------------------ */

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownBaseProps {
  options: DropdownOption[];
  placeholder?: string;
  /** Поле поиска внутри списка */
  searchable?: boolean;
  /** Кнопка «Сбросить» внизу списка */
  resettable?: boolean;
  disabled?: boolean;
  className?: string;
  /** Ширина списка (по умолчанию — по триггеру) */
  menuWidth?: number | string;
}

export type DropdownProps = DropdownBaseProps &
  (
    | { multiple?: false; value?: string | null; defaultValue?: string | null; onChange?: (value: string | null) => void }
    | { multiple: true; value?: string[]; defaultValue?: string[]; onChange?: (value: string[]) => void }
  );

export function Dropdown(props: DropdownProps) {
  const { options, placeholder = "Выберите", searchable = false, resettable = false, disabled, className, menuWidth } = props;
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const rootRef = React.useRef<HTMLDivElement>(null);

  const [innerSingle, setInnerSingle] = React.useState<string | null>(
    !props.multiple ? (props.defaultValue ?? null) : null,
  );
  const [innerMulti, setInnerMulti] = React.useState<string[]>(props.multiple ? (props.defaultValue ?? []) : []);

  const selected: string[] = props.multiple
    ? (props.value ?? innerMulti)
    : [(props.value !== undefined ? props.value : innerSingle) ?? ""].filter(Boolean);

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const select = (value: string) => {
    if (props.multiple) {
      const next = selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value];
      setInnerMulti(next);
      props.onChange?.(next);
    } else {
      setInnerSingle(value);
      props.onChange?.(value);
      setOpen(false);
    }
  };

  const reset = () => {
    if (props.multiple) {
      setInnerMulti([]);
      props.onChange?.([]);
    } else {
      setInnerSingle(null);
      props.onChange?.(null);
    }
  };

  const filtered = query
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  const labels = options.filter((o) => selected.includes(o.value)).map((o) => o.label);
  const triggerText = labels.length === 0 ? null : props.multiple && labels.length > 1 ? `${labels[0]} +${labels.length - 1}` : labels[0];

  return (
    <div ref={rootRef} className={["cs-dropdown", className].filter(Boolean).join(" ")}>
      <button
        type="button"
        className={["cs-dropdown__trigger", open && "cs-dropdown__trigger--open"].filter(Boolean).join(" ")}
        aria-haspopup="menu"
        aria-expanded={open}
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={triggerText ? "cs-dropdown__value" : "cs-dropdown__placeholder"}>
          {triggerText ?? placeholder}
        </span>
        <IconChevronDown size={14} className="cs-dropdown__chevron" />
      </button>

      {open && (
        <DropdownMenu className="cs-dropdown__menu" style={{ width: menuWidth }}>
          {searchable && (
            <div className="cs-dropdown__search">
              <IconSearch size={14} />
              <input autoFocus placeholder="Поиск" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
          )}
          <div className="cs-dropdown__list">
            {filtered.map((o) => (
              <DropdownItem
                key={o.value}
                checkbox={props.multiple}
                selected={selected.includes(o.value)}
                onClick={() => select(o.value)}
              >
                {o.label}
              </DropdownItem>
            ))}
            {filtered.length === 0 && <div className="cs-dropdown__empty">Ничего не найдено</div>}
          </div>
          {resettable && (
            <DropdownItem icon={<IconRotate size={14} />} className="cs-dropdown__reset" onClick={reset}>
              Сбросить
            </DropdownItem>
          )}
        </DropdownMenu>
      )}
    </div>
  );
}
