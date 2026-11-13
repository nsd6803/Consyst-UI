import * as React from "react";
import { IconCalendar, IconSort, IconSortDown, IconSortUp, IconStar } from "./icons";
import { Avatar } from "./avatar";
import { Checkbox } from "./checkbox";
import { Tag } from "./tag";
import { Pagination } from "./pagination";
import { Select } from "./select";
import { Skeleton } from "./feedback";
import { EmptyState } from "./empty-state";
import { cn } from "./utils";
import "./table.css";

export interface TableColumn<T> {
  key: string;
  title: React.ReactNode;
  /** Своя отрисовка ячейки. По умолчанию выводится row[key] */
  render?: (row: T, index: number) => React.ReactNode;
  /** Сортировка по колонке (по sortValue или по row[key]) */
  sortable?: boolean;
  sortValue?: (row: T) => string | number;
  width?: number | string;
  /** Числа и суммы выравнивайте вправо */
  align?: "left" | "right" | "center";
  /** Закрепить колонку справа (например, «Действия») */
  sticky?: boolean;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey: (row: T) => string;
  /** Колонка с чекбоксами */
  selectable?: boolean;
  selected?: string[];
  onSelectedChange?: (keys: string[]) => void;
  /** Включает пагинацию */
  pageSize?: number;
  pageSizeOptions?: number[];
  /** Плотность строк: default 72 (как в Figma) · compact 48 */
  density?: "compact" | "default";
  /** Показывает скелетоны вместо строк */
  loading?: boolean;
  /** Пустое состояние (по умолчанию «Нет данных») */
  empty?: React.ReactNode;
  /** Клик по строке */
  onRowClick?: (row: T) => void;
  /** Подпись для скринридера */
  caption?: string;
  /** Высота области прокрутки — шапка закрепляется */
  maxHeight?: number | string;
  className?: string;
}

type Sort = { key: string; dir: "asc" | "desc" } | null;

export function Table<T>({
  columns,
  data,
  rowKey,
  selectable = false,
  selected: selectedProp,
  onSelectedChange,
  pageSize: initialPageSize,
  pageSizeOptions = [10, 20, 50],
  density = "default",
  loading = false,
  empty,
  onRowClick,
  caption,
  maxHeight,
  className,
}: TableProps<T>) {
  const [sort, setSort] = React.useState<Sort>(null);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(initialPageSize ?? Math.max(data.length, 1));
  const [innerSelected, setInnerSelected] = React.useState<string[]>([]);
  const selected = selectedProp ?? innerSelected;
  const setSelected = (keys: string[]) => {
    setInnerSelected(keys);
    onSelectedChange?.(keys);
  };

  const sorted = React.useMemo(() => {
    if (!sort) return data;
    const col = columns.find((c) => c.key === sort.key);
    const get = (r: T) => (col?.sortValue ? col.sortValue(r) : ((r as Record<string, unknown>)[sort.key] as string | number));
    return [...data].sort((a, b) => {
      const va = get(a);
      const vb = get(b);
      const res = typeof va === "number" && typeof vb === "number" ? va - vb : String(va).localeCompare(String(vb), "ru");
      return sort.dir === "asc" ? res : -res;
    });
  }, [data, sort, columns]);

  const paginated = initialPageSize !== undefined;
  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const rows = paginated ? sorted.slice((safePage - 1) * pageSize, safePage * pageSize) : sorted;
  const pageKeys = rows.map(rowKey);
  const allChecked = pageKeys.length > 0 && pageKeys.every((k) => selected.includes(k));
  const someChecked = !allChecked && pageKeys.some((k) => selected.includes(k));
  const colCount = columns.length + (selectable ? 1 : 0);

  const toggleSort = (key: string) =>
    setSort((s) => (!s || s.key !== key ? { key, dir: "asc" } : s.dir === "asc" ? { key, dir: "desc" } : null));

  return (
    <div className={cn("cs-table", `cs-table--${density}`, className)}>
      {selectable && selected.length > 0 && (
        <div className="cs-table__selection" role="status">
          Выбрано: {selected.length}
          <button type="button" className="cs-table__selection-clear" onClick={() => setSelected([])}>
            Снять выбор
          </button>
        </div>
      )}
      <div className="cs-table__scroll" style={{ maxHeight }}>
        <table>
          {caption && <caption className="cs-table__caption">{caption}</caption>}
          <thead>
            <tr>
              {selectable && (
                <TableHeaderCell className="cs-table__check">
                  <Checkbox
                    aria-label="Выбрать все строки на странице"
                    checked={allChecked ? true : someChecked ? "indeterminate" : false}
                    onCheckedChange={() =>
                      setSelected(allChecked ? selected.filter((k) => !pageKeys.includes(k)) : [...new Set([...selected, ...pageKeys])])
                    }
                  />
                </TableHeaderCell>
              )}
              {columns.map((c) => (
                <TableHeaderCell
                  key={c.key}
                  width={c.width}
                  align={c.align}
                  sticky={c.sticky}
                  sortable={c.sortable}
                  sortDirection={sort?.key === c.key ? sort.dir : null}
                  onSort={() => toggleSort(c.key)}
                >
                  {c.title}
                </TableHeaderCell>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading &&
              Array.from({ length: Math.min(pageSize, 5) }, (_, i) => (
                <tr key={`s${i}`} aria-hidden="true">
                  {Array.from({ length: colCount }, (_, j) => (
                    <td key={j}>
                      <Skeleton width={j === 0 && selectable ? 18 : `${50 + ((i * 7 + j * 13) % 40)}%`} height={j === 0 && selectable ? 18 : 12} />
                    </td>
                  ))}
                </tr>
              ))}
            {!loading &&
              rows.map((row, i) => {
                const key = rowKey(row);
                const isSel = selected.includes(key);
                return (
                  <tr
                    key={key}
                    data-selected={isSel || undefined}
                    className={cn(onRowClick && "cs-table__row--clickable")}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                  >
                    {selectable && (
                      <TableCell className="cs-table__check" onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          aria-label="Выбрать строку"
                          checked={isSel}
                          onCheckedChange={() => setSelected(isSel ? selected.filter((k) => k !== key) : [...selected, key])}
                        />
                      </TableCell>
                    )}
                    {columns.map((c) => (
                      <TableCell key={c.key} align={c.align} sticky={c.sticky}>
                        {c.render ? c.render(row, i) : String((row as Record<string, unknown>)[c.key] ?? "")}
                      </TableCell>
                    ))}
                  </tr>
                );
              })}
            {!loading && rows.length === 0 && (
              <tr>
                <td colSpan={colCount} className="cs-table__empty">
                  {empty ?? <EmptyState size="sm" title="Нет данных" description="Измените фильтры или добавьте записи" />}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {paginated && sorted.length > 0 && (
        <div className="cs-table__footer">
          <span className="cs-table__range">
            {(safePage - 1) * pageSize + 1}–{Math.min(safePage * pageSize, sorted.length)} из {sorted.length}
          </span>
          <div className="cs-table__footer-right">
            <Select
              size="sm"
              aria-label="Строк на странице"
              className="cs-table__page-size"
              value={String(pageSize)}
              onValueChange={(v) => {
                setPageSize(Number(v));
                setPage(1);
              }}
              options={pageSizeOptions.map((n) => ({ value: String(n), label: `${n} на странице` }))}
            />
            <Pagination page={safePage} pageCount={pageCount} onPageChange={setPage} size="sm" />
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Ячейки. Table собирает строки из них сам; для своих таблиц          */
/* (<div className="cs-table"><table>…) их можно использовать напрямую. */
/* ------------------------------------------------------------------ */

export interface TableHeaderCellProps extends Omit<React.ThHTMLAttributes<HTMLTableCellElement>, "align"> {
  align?: "left" | "right" | "center";
  width?: number | string;
  /** Закрепить колонку справа */
  sticky?: boolean;
  /** Кнопка сортировки в заголовке */
  sortable?: boolean;
  /** Текущее направление сортировки этой колонки */
  sortDirection?: "asc" | "desc" | null;
  onSort?: () => void;
}

/** Ячейка шапки: 44px, текст 12px secondary, иконка сортировки, чекбокс «выбрать все» */
export function TableHeaderCell({
  align,
  width,
  sticky,
  sortable,
  sortDirection = null,
  onSort,
  className,
  style,
  children,
  ...props
}: TableHeaderCellProps) {
  return (
    <th
      scope="col"
      style={{ width, textAlign: align, ...style }}
      className={cn("cs-table__th", sticky && "cs-table__sticky", className)}
      aria-sort={sortDirection ? (sortDirection === "asc" ? "ascending" : "descending") : sortable ? "none" : undefined}
      {...props}
    >
      {sortable ? (
        <button type="button" className={cn("cs-table__sort", sortDirection && "cs-table__sort--active")} onClick={onSort}>
          {children}
          {sortDirection === "asc" ? <IconSortUp size={10} /> : sortDirection === "desc" ? <IconSortDown size={10} /> : <IconSort size={10} />}
        </button>
      ) : (
        children
      )}
    </th>
  );
}

export interface TableCellProps extends Omit<React.TdHTMLAttributes<HTMLTableCellElement>, "align"> {
  align?: "left" | "right" | "center";
  sticky?: boolean;
}

/** Ячейка тела: 72px, отступы 24px, разделитель снизу, подсветка строки при наведении */
export function TableCell({ align, sticky, className, style, ...props }: TableCellProps) {
  return <td style={{ textAlign: align, ...style }} className={cn("cs-table__td", sticky && "cs-table__sticky", className)} {...props} />;
}

/* ---------- Содержимое ячеек (типы из Figma) ---------- */

/** Текст: основной или вторичный */
export function TableCellText({ secondary, className, ...props }: React.HTMLAttributes<HTMLSpanElement> & { secondary?: boolean }) {
  return <span className={cn("cs-cell-text", secondary && "cs-cell-text--secondary", className)} {...props} />;
}

/** Пользователь: аватар 24 + ФИО, опционально email второй строкой */
export function TableCellUser({ name, email, src }: { name: string; email?: string; src?: string }) {
  return (
    <span className="cs-cell-user">
      <Avatar name={name} src={src} size="sm" />
      <span className="cs-cell-stack">
        <span className="cs-cell-text">{name}</span>
        {email && <span className="cs-cell-text cs-cell-text--secondary">{email}</span>}
      </span>
    </span>
  );
}

/** Оценка: звезда + число */
export function TableCellRating({ value, max }: { value: number; max?: number }) {
  return (
    <span className="cs-cell-rating" aria-label={max ? `Оценка ${value} из ${max}` : `Оценка ${value}`}>
      <IconStar size={10} />
      {value.toLocaleString("ru-RU", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
    </span>
  );
}

/** Документ: название и размер (или тип) второй строкой */
export function TableCellDocument({ name, meta, href }: { name: string; meta?: string; href?: string }) {
  return (
    <span className="cs-cell-stack">
      {href ? (
        <a className="cs-cell-text cs-cell-link" href={href}>
          {name}
        </a>
      ) : (
        <span className="cs-cell-text">{name}</span>
      )}
      {meta && <span className="cs-cell-text cs-cell-text--secondary">{meta}</span>}
    </span>
  );
}

/** Теги: первые max штук + «+N» */
export function TableCellTags({ tags, max = 2 }: { tags: string[]; max?: number }) {
  const rest = tags.length - max;
  return (
    <span className="cs-cell-tags">
      {tags.slice(0, max).map((t) => (
        <Tag key={t} size="sm">
          {t}
        </Tag>
      ))}
      {rest > 0 && (
        <Tag size="sm" title={tags.slice(max).join(", ")}>
          +{rest}
        </Tag>
      )}
    </span>
  );
}

/** Период дат: плашка с календарём */
export function TableCellDate({ from, to }: { from: string; to?: string }) {
  return (
    <span className="cs-cell-date">
      <IconCalendar size={12} />
      {to ? `${from} — ${to}` : from}
    </span>
  );
}

/** Кнопки действий в строке (прижаты вправо, gap 8). Клик не уходит в onRowClick */
export function TableCellActions({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("cs-cell-actions", className)} onClick={(e) => e.stopPropagation()} {...props} />;
}
