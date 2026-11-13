import { IconChevronLeft, IconChevronRight } from "./icons";
import { cn } from "./utils";
import "./pagination.css";

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Сколько соседних страниц показывать вокруг текущей */
  siblings?: number;
  size?: "sm" | "md";
  className?: string;
}

function range(page: number, count: number, siblings: number): (number | "…")[] {
  const out: (number | "…")[] = [];
  for (let p = 1; p <= count; p++) {
    if (p === 1 || p === count || Math.abs(p - page) <= siblings) out.push(p);
    else if (out[out.length - 1] !== "…") out.push("…");
  }
  return out;
}

/** Постраничная навигация. Используется в Table, можно отдельно */
export function Pagination({ page, pageCount, onPageChange, siblings = 1, size = "md", className }: PaginationProps) {
  if (pageCount <= 1) return null;
  return (
    <nav aria-label="Страницы" className={cn("cs-pagination", `cs-pagination--${size}`, className)}>
      <button
        type="button"
        className="cs-pagination__item"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Предыдущая страница"
      >
        <IconChevronLeft size={12} />
      </button>
      {range(page, pageCount, siblings).map((p, i) =>
        p === "…" ? (
          <span key={`e${i}`} className="cs-pagination__ellipsis" aria-hidden="true">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            className={cn("cs-pagination__item", p === page && "cs-pagination__item--active")}
            aria-current={p === page ? "page" : undefined}
            aria-label={`Страница ${p}`}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ),
      )}
      <button
        type="button"
        className="cs-pagination__item"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= pageCount}
        aria-label="Следующая страница"
      >
        <IconChevronRight size={12} />
      </button>
    </nav>
  );
}
