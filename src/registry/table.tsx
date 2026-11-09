import * as React from "react";
import { IconChevronDown, IconSort } from "./icons";
import "./checkbox.css";
import "./table.css";

export interface TableColumn<T> {
  key: string;
  title: React.ReactNode;
  /** Своя отрисовка ячейки. По умолчанию выводится row[key] */
  render?: (row: T, index: number) => React.ReactNode;
  /** Разрешить сортировку по колонке (нужна функция sortValue или примитивное значение row[key]) */
  sortable?: boolean;
  sortValue?: (row: T) => string | number;
  width?: number | string;
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
  /** Пагинация внизу таблицы. Если не передана — показываются все строки */
  pageSize?: number;
  pageSizeOptions?: number[];
  emptyText?: React.ReactNode;
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
  emptyText = "Нет данных",
  className,
}: TableProps<T>) {
  const [sort, setSort] = React.useState<Sort>(null);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(initialPageSize ?? data.length);
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

  const toggleSort = (key: string) =>
    setSort((s) => (!s || s.key !== key ? { key, dir: "asc" } : s.dir === "asc" ? { key, dir: "desc" } : null));

  const pageKeys = rows.map(rowKey);
  const allChecked = pageKeys.length > 0 && pageKeys.every((k) => selected.includes(k));
  const someChecked = !allChecked && pageKeys.some((k) => selected.includes(k));

  return (
    <div className={["cs-table", className].filter(Boolean).join(" ")}>
      <div className="cs-table__scroll">
        <table>
          <thead>
            <tr>
              {selectable && (
                <th className="cs-table__check">
                  <CheckboxCell
                    checked={allChecked}
                    indeterminate={someChecked}
                    onChange={() =>
                      setSelected(
                        allChecked ? selected.filter((k) => !pageKeys.includes(k)) : [...new Set([...selected, ...pageKeys])],
                      )
                    }
                  />
                </th>
              )}
              {columns.map((c) => (
                <th
                  key={c.key}
                  style={{ width: c.width, textAlign: c.align }}
                  className={c.sticky ? "cs-table__sticky" : undefined}
                >
                  {c.sortable ? (
                    <button type="button" className="cs-table__sort" onClick={() => toggleSort(c.key)}>
                      {c.title}
                      <IconSort
                        size={12}
                        className={sort?.key === c.key ? `cs-table__sort-icon--${sort.dir}` : undefined}
                      />
                    </button>
                  ) : (
                    c.title
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const key = rowKey(row);
              const isSel = selected.includes(key);
              return (
                <tr key={key} className={isSel ? "cs-table__row--selected" : undefined}>
                  {selectable && (
                    <td className="cs-table__check">
                      <CheckboxCell
                        checked={isSel}
                        onChange={() => setSelected(isSel ? selected.filter((k) => k !== key) : [...selected, key])}
                      />
                    </td>
                  )}
                  {columns.map((c) => (
                    <td
                      key={c.key}
                      style={{ textAlign: c.align }}
                      className={c.sticky ? "cs-table__sticky" : undefined}
                    >
                      {c.render ? c.render(row, i) : String((row as Record<string, unknown>)[c.key] ?? "")}
                    </td>
                  ))}
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td className="cs-table__empty" colSpan={columns.length + (selectable ? 1 : 0)}>
                  {emptyText}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {paginated && (
        <div className="cs-table__footer">
          <span className="cs-table__range">
            {sorted.length === 0 ? 0 : (safePage - 1) * pageSize + 1}–{Math.min(safePage * pageSize, sorted.length)} из{" "}
            {sorted.length}
          </span>
          <div className="cs-table__footer-right">
            <label className="cs-table__size">
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
              >
                {pageSizeOptions.map((n) => (
                  <option key={n} value={n}>
                    {n} элементов
                  </option>
                ))}
              </select>
              <IconChevronDown size={12} />
            </label>
            <Pagination page={safePage} pageCount={pageCount} onPageChange={setPage} />
          </div>
        </div>
      )}
    </div>
  );
}

function CheckboxCell({ checked, indeterminate, onChange }: { checked: boolean; indeterminate?: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? "mixed" : checked}
      className="cs-table__checkbox"
      onClick={onChange}
    >
      <span
        className="cs-checkbox__box"
        data-checked={(checked && !indeterminate) || undefined}
        data-indeterminate={indeterminate || undefined}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          {indeterminate ? <path d="M5 12h14" /> : <path d="M20 6 9 17l-5-5" />}
        </svg>
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  const items: (number | "…")[] = [];
  const push = (v: number | "…") => items[items.length - 1] !== v && items.push(v);
  for (let p = 1; p <= pageCount; p++) {
    if (p === 1 || p === pageCount || Math.abs(p - page) <= 1) push(p);
    else push("…");
  }
  return (
    <nav className="cs-pagination" aria-label="Пагинация">
      {items.map((it, i) =>
        it === "…" ? (
          <span key={`e${i}`} className="cs-pagination__ellipsis">
            …
          </span>
        ) : (
          <button
            key={it}
            type="button"
            className={["cs-pagination__page", it === page && "cs-pagination__page--active"].filter(Boolean).join(" ")}
            aria-current={it === page ? "page" : undefined}
            onClick={() => onPageChange(it)}
          >
            {it}
          </button>
        ),
      )}
    </nav>
  );
}
