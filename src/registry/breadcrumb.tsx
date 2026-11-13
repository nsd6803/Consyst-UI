import * as React from "react";
import { IconChevronRight } from "./icons";
import { cn } from "./utils";
import "./breadcrumb.css";

export interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  /** Сколько пунктов показывать; середина сворачивается в «…» */
  maxItems?: number;
}

/** Хлебные крошки: путь до текущей страницы. Последний пункт — текущая страница */
export function Breadcrumb({ items, maxItems = 4, className, ...props }: BreadcrumbProps) {
  const [expanded, setExpanded] = React.useState(false);
  const collapse = !expanded && items.length > maxItems;
  const shown: (BreadcrumbItem | "ellipsis")[] = collapse ? [items[0], "ellipsis", ...items.slice(-(maxItems - 2))] : items;

  return (
    <nav aria-label="Навигационная цепочка" className={cn("cs-breadcrumb", className)} {...props}>
      <ol>
        {shown.map((it, i) => {
          const last = i === shown.length - 1;
          return (
            <li key={i}>
              {it === "ellipsis" ? (
                <button type="button" className="cs-breadcrumb__more" onClick={() => setExpanded(true)} aria-label="Показать весь путь">
                  …
                </button>
              ) : last ? (
                <span aria-current="page" className="cs-breadcrumb__current">
                  {it.label}
                </span>
              ) : it.href ? (
                <a href={it.href} onClick={it.onClick} className="cs-breadcrumb__link">
                  {it.label}
                </a>
              ) : (
                <button type="button" onClick={it.onClick} className="cs-breadcrumb__link">
                  {it.label}
                </button>
              )}
              {!last && <IconChevronRight size={10} className="cs-breadcrumb__sep" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
