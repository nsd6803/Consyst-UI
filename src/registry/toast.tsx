import * as React from "react";
import { IconCircleCheck, IconCircleX, IconInfo, IconWarning, IconX } from "./icons";
import { cn } from "./utils";
import "./toast.css";

export type ToastTone = "success" | "danger" | "warning" | "info";

const icons: Record<ToastTone, React.ReactNode> = {
  success: <IconCircleCheck />,
  danger: <IconCircleX />,
  warning: <IconWarning />,
  info: <IconInfo />,
};

export interface ToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  tone?: ToastTone;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Кнопка действия (например, «Отменить») */
  action?: { label: string; onClick: () => void };
  onClose?: () => void;
}

/** Всплывающее уведомление о результате действия */
export function Toast({ tone = "success", title, description, action, onClose, className, ...props }: ToastProps) {
  return (
    <div className={cn("cs-toast", `cs-toast--${tone}`, className)} {...props}>
      <span className="cs-toast__icon">{icons[tone]}</span>
      <div className="cs-toast__body">
        <p className="cs-toast__title">{title}</p>
        {description && <p className="cs-toast__description">{description}</p>}
        {action && (
          <button type="button" className="cs-toast__action" onClick={action.onClick}>
            {action.label}
          </button>
        )}
      </div>
      {onClose && (
        <button type="button" className="cs-toast__close" onClick={onClose} aria-label="Закрыть уведомление">
          <IconX size={14} />
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Глобальные тосты: toast({...}) + <Toaster /> один раз в корне       */
/* ------------------------------------------------------------------ */

export type ToastOptions = Omit<ToastProps, "onClose" | keyof React.HTMLAttributes<HTMLDivElement>> & {
  title: React.ReactNode;
  /** мс, 0 — не скрывать. По умолчанию 5000, для danger — 8000 */
  duration?: number;
};
type ToastItem = ToastOptions & { id: number };

let items: ToastItem[] = [];
let counter = 0;
const listeners = new Set<(items: ToastItem[]) => void>();
const emit = () => listeners.forEach((l) => l(items));

export function toast(options: ToastOptions) {
  const id = ++counter;
  const duration = options.duration ?? (options.tone === "danger" ? 8000 : 5000);
  items = [...items, { ...options, duration, id }].slice(-5);
  emit();
  return id;
}
toast.dismiss = (id: number) => {
  items = items.filter((t) => t.id !== id);
  emit();
};

export function Toaster({ position = "bottom-right" }: { position?: "top-right" | "bottom-right" | "top-center" | "bottom-center" }) {
  const [list, setList] = React.useState<ToastItem[]>(items);
  React.useEffect(() => {
    listeners.add(setList);
    return () => {
      listeners.delete(setList);
    };
  }, []);

  return (
    <section className={cn("cs-toaster", `cs-toaster--${position}`)} aria-live="polite" aria-label="Уведомления">
      {list.map(({ id, duration, ...t }) => (
        <TimedToast key={id} id={id} duration={duration}>
          <Toast {...t} role={t.tone === "danger" ? "alert" : "status"} onClose={() => toast.dismiss(id)} />
        </TimedToast>
      ))}
    </section>
  );
}

/** Автоскрытие; таймер ставится на паузу при наведении и фокусе */
function TimedToast({ id, duration, children }: { id: number; duration?: number; children: React.ReactNode }) {
  const [paused, setPaused] = React.useState(false);
  React.useEffect(() => {
    if (!duration || paused) return;
    const t = window.setTimeout(() => toast.dismiss(id), duration);
    return () => window.clearTimeout(t);
  }, [id, duration, paused]);
  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {children}
    </div>
  );
}
